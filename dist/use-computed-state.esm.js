import { useRef, useEffect, useState, useCallback } from 'react';
import { attempt } from '@jfdi/attempt';

const useWhatChanged = function (deps) {
  if (deps === void 0) {
    deps = [];
  }

  const prev = useRef(deps);
  useEffect(() => {
    const changed = deps.map((x, i) => ({
      bef: prev.current[i],
      now: x
    })).filter(_ref => {
      let {
        bef,
        now
      } = _ref;
      return now !== bef;
    });
    if (changed.length) console.log("What Changed?", changed);
    prev.current = deps;
  }, deps);
};

const isFunc = x => typeof x === "function";

const useComputedState = _ref => {
  let {
    initialState = Date.now(),
    initialComputedState,
    computeFn,
    beforeChange,
    afterChange
  } = _ref;
  const [state, setState] = useState(initialState);
  const computedState = useRef(initialComputedState);
  useEffect(() => {
    if (isFunc(computeFn)) {
      const [e, res] = attempt(() => computeFn(state, computedState.current));
      if (!e) computedState.current = res;
    }
  }, [state, computeFn]);
  const callBeforeChange = useCallback((prevState, prevComputedState) => isFunc(beforeChange) && beforeChange(prevState, prevComputedState), [beforeChange]);
  const callAfterChange = useCallback((newState, newComputedState) => isFunc(afterChange) && afterChange(newState, newComputedState), [afterChange]);
  const notifyChange = useCallback(() => {
    const newState = Date.now();
    setState(newState);
    isFunc(afterChange) && afterChange(newState, computedState.current);
  }, [afterChange]);
  const setComputedState = useCallback(newComputedState => {
    const prevComputedState = computedState.current;
    computedState.current = newComputedState;
    const newState = Date.now();
    setState(prevState => {
      callBeforeChange(prevState, prevComputedState);
      return newState;
    });
    callAfterChange(newState, computedState.current);
  }, [callBeforeChange, callAfterChange]);
  useWhatChanged([state, beforeChange, afterChange]);
  return {
    state,
    computedState: computedState.current,
    setState,
    setComputedState,
    notifyChange
  };
};

export { useComputedState };
//# sourceMappingURL=use-computed-state.esm.js.map
