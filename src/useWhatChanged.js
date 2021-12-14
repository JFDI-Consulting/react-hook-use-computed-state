import { useEffect, useRef } from "react";

const useWhatChanged = (deps = []) => {
    const prev = useRef(deps);

    useEffect(() => {
        const changed = deps.map((x, i) => ({ bef: prev.current[i], now: x })).filter(({ bef, now }) => now !== bef);
        if (changed.length) console.log("What Changed?", changed);
        prev.current = deps;
    }, deps);
};

export default useWhatChanged;
