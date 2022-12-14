
import { useLayoutEffect, useCallback, useRef } from 'react'

function useEvent(handler: any) {
    const handlerRef = useRef(null)

    useLayoutEffect(() => {
        handlerRef.current = handler;
    });

    return useCallback((...args: any[]) => {
        const fn: any = handlerRef.current;
        return fn(...args);
    }, []);
}

type RemoveIndexSignature<T extends any> = { [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]; };



export { useEvent }