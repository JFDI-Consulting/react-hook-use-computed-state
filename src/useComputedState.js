import { useCallback, useEffect, useRef, useState } from "react";
import useWhatChanged from "./useWhatChanged";
import { attempt } from "@jfdi/attempt";

const isFunc = x => typeof x === "function";

export const useComputedState = ({
    initialState = Date.now(),
    initialComputedState,
    computeFn,
    beforeChange,
    afterChange
}) => {
    const [state, setState] = useState(initialState);
    const computedState = useRef(initialComputedState);

    useEffect(() => {
        if (isFunc(computeFn)) {
            const [e, res] = attempt(() => computeFn(state, computedState.current));

            if (!e) computedState.current = res;
        }
    }, [state, computeFn]);

    const callBeforeChange = useCallback(
        (prevState, prevComputedState) => isFunc(beforeChange) && beforeChange(prevState, prevComputedState),
        [beforeChange]
    );

    const callAfterChange = useCallback(
        (newState, newComputedState) => isFunc(afterChange) && afterChange(newState, newComputedState),
        [afterChange]
    );

    const notifyChange = useCallback(() => {
        const newState = Date.now();
        setState(newState);
        isFunc(afterChange) && afterChange(newState, computedState.current);
    }, [afterChange]);

    const setComputedState = useCallback(
        newComputedState => {
            const prevComputedState = computedState.current;
            computedState.current = newComputedState;
            const newState = Date.now();
            setState(prevState => {
                callBeforeChange(prevState, prevComputedState);
                return newState;
            });
            callAfterChange(newState, computedState.current);
        },
        [callBeforeChange, callAfterChange]
    );

    useWhatChanged([state, beforeChange, afterChange]);

    return {
        state,
        computedState: computedState.current,
        setState,
        setComputedState,
        notifyChange
    };
};
