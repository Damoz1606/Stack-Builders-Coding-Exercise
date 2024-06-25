'use server'

import { FetchError } from "../error/fetch.error";

export type FetcherHTTPMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export interface FetcherConfiguration<T> extends Omit<RequestInit, 'method' | 'body'> {
    method: FetcherHTTPMethod;
    body?: T;
    responseType?: 'json' | 'text'
}

const fetchConfigurationObject = ({
    method,
    body,
    headers,
    ...customInit
}: FetcherConfiguration<string | undefined>): RequestInit => ({
    method,
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...headers
    },
    body,
    ...customInit
})

export const fetcher = async <T, R>(url: string, { body, responseType = 'json', ...options }: FetcherConfiguration<T>): Promise<R> => {
    try {
        const configurationInit = fetchConfigurationObject({ ...options, body: body ? JSON.stringify(body) : undefined });
        const response = await fetch(url, { ...configurationInit });
        const data = responseType === 'json' ? await response.json() : await response.text();
        if (!response.ok) {
            throw new FetchError(response, `Failed to ${options.method}:${url}`, data);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export interface GetFetcherConfiguration extends Omit<FetcherConfiguration<any>, 'method' | 'body'> { }
export const get = <R>(url: string, options?: GetFetcherConfiguration): Promise<R> => {
    return fetcher<any, R>(url, { method: 'GET', ...options });
}