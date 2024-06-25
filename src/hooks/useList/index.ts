import { useState, useCallback } from "react";

export type ListHandler<T> = {
    append: (data: T) => void;
    remove: (key: keyof T, value: any) => void;
    update: (key: keyof T, value: any, newValue: Partial<T>) => void;
    override: (data: T[]) => void;
}

export const useList = <T extends object>(initialValues: T[]): [data: T[], handlers: ListHandler<T>] => {
    const [values, setValues] = useState<T[]>(initialValues);

    const override = useCallback((data: T[]) => {
        setValues(data);
    }, []);

    const append = useCallback((data: T) => {
        setValues(prevValues => [...prevValues, data]);
    }, []);

    const remove = useCallback((key: keyof T, value: any) => {
        setValues(prevValues => {
            const updatedValues = prevValues.filter(e => e[key] !== value);
            return updatedValues;
        });
    }, []);


    const update = useCallback((key: keyof T, value: any, newValue: Partial<T>) => {
        setValues(prevValues => {
            const index = prevValues.findIndex(e => e[key] === value);
            if (index === -1) return prevValues;

            const updatedValues = [...prevValues];
            updatedValues[index] = { ...updatedValues[index], ...newValue };
            return updatedValues;
        });
    }, []);
    return [values, { append, remove, update, override }]
}
