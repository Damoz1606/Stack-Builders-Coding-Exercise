'use client'

import { useCallback, useEffect, useMemo, useState } from "react";

export type FetchHTTPMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

interface FetchHookOptions<T> extends Omit<RequestInit, 'body'> {
    loadOnMount?: boolean;
}

export type FetchResult<T> = {
    data: T | null;
    error: Error | null;
    loading: boolean;
    body: any | null;
    request: <R>(body: R | null) => void;
    reload: () => void;
    reset: () => void;
}

/**
 * Manage the use of fetch API for the frontend, it provides and manage its own states
 * @param url 
 * @param method 
 * @param options 
 * @returns 
 */
export const useFetch = <T>(url: string, method: FetchHTTPMethod, options?: FetchHookOptions<T>) => {
    const { loadOnMount = true, ...customOptions } = options || {}

    const [loadOnMountState, setLoadOnMountState] = useState<boolean>(loadOnMount);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [body, setBody] = useState<any | null>(null);

    const requestOptions = useMemo((): RequestInit => ({
        method,
        body: body
            ? JSON.stringify(body)
            : undefined,
        ...customOptions,
        headers: {
            ...customOptions.headers
        }
    }), [method, body, customOptions]);

    const handleFetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                const json = await response.json();
                setError(new Error(json.message || 'Algo salió mal!'));
            } else {
                const retrived = await response.json();
                setData(retrived);
            }
        } catch (error: any) {
            console.error('Fetch error:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [url, requestOptions]);

    useEffect(() => {
        if (loadOnMountState) {
            handleFetch();
            setLoadOnMountState(false);
        }
    }, [loadOnMountState, handleFetch]);

    const request = useCallback(<R>(body: R | null) => {
        setBody(body);
    }, []);

    const reload = useCallback(() => {
        handleFetch();
    }, [handleFetch]);

    const reset = useCallback(() => {
        setData(null);
        setBody(null);
        setError(null);
    }, []);

    return { data, error, loading, body, request, reload, reset };

}