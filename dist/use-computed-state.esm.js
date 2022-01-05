import { useRef, useState, useCallback } from 'react';
import { attempt } from '@jfdi/attempt';
import is from '@sindresorhus/is';

const resolveInitialState = inSt => is.nullOrUndefined(inSt) ? Date.now() : inSt;

const useComputedState = _ref => {
  let {
    initialState,
    initialComputedState,
    computeFn,
    debug = false
  } = _ref;
  const timestampMode = useRef(is.nullOrUndefined(initialState));
  const [simpleState, setSimpleState] = useState(resolveInitialState(initialState));
  const computedState = useRef(initialComputedState);
  const log = useCallback(function () {
    return debug && console.log(...arguments);
  }, [debug]);
  const setState = useCallback(newState => {
    log("setState:", {
      newState
    });
    setSimpleState(newState);

    if (is.function(computeFn)) {
      const [e, res] = attempt(() => computeFn(newState, computedState.current));
      log("computedState:", {
        e,
        res
      });
      if (e) console.error(e);else computedState.current = res;
    }
  }, [computeFn, log]);
  const notifyChange = useCallback(() => {
    log("notifyChange");
    setState(Date.now());
  }, [log, setState]);
  const setComputedState = useCallback(newComputedState => {
    log("setComputedState:", {
      newComputedState
    });
    computedState.current = newComputedState;
    if (timestampMode.current) setSimpleState(Date.now());
  }, [log]);
  return {
    state: simpleState,
    computedState: computedState.current,
    setState,
    setComputedState,
    notifyChange
  };
};

export { useComputedState };
//# sourceMappingURL=use-computed-state.esm.js.map
