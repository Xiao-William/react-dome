
import { useLayoutEffect, useCallback, useRef } from 'react'

function useEvent(handler: any) {
    const handlerRef = useRef(null);

    useLayoutEffect(() => {
        handlerRef.current = handler;
    });

    return useCallback((...args: any[]) => {
        const fn: any = handlerRef.current;
        return fn(...args);
    }, []);
}
export { useEvent }