# useComputedState

A custom hook for holding complex, derived or computed state along with its source or simple state, which can even be just a timestamp for versioning a set of derived state.

### Why?

Because I've seen so many devs get tied up in knots trying to manage the complexities of computed or derived state in React. Synchronising everything becomes a nightmare. As complexity grows, you add more and more lines of code to try to prevent all those unwanted renders or render loops. Don't do that. Use this instead.

### What's computed or derived state?

It's the bits of data you hold which are computed or derived from true state, or whose true state is actually held somewhere else. For example, a form maintains its own state, in its field values... duplicate it, and you have synchronisation problems. A backend database maintains the data you fetch from it... the only piece of true state you want to manage is probably the timestamp denoting when you last fetched that data. Updating backend data, particularly optimistically whilst immediately updating the UI, requires yet more synchronisation. This is why `useComputedState` exists.

Experienced devs normally get around this kind of problem in React by storing their computed or derived state in a `ref` using a `useRef` hook. That's exactly what this custom hook does. But it also abstracts away all the inner workings, giving you a nice clean API for doing this sort of thing as though it's just another piece of state but without the associated state update renders.

### Usage

```javascript
const { state, computedState, setState, setComputedState, notifyChange } = useComputedState({ initialState = Date.now(), initialComputedState, computeFn })
```

If all you pass to the hook is `initialComputedState`, `state` becomes a simple timestamp versioning that data.
Of course you can pass `initialState` instead, and the hook will call your `computeFn` callback to compute or derive your `computedState` whenever you call `setState`. If all you want is to notify the hook that something in your `computedState` changed, just call `notifyChange`, or you can specify how to change the `computedState` using `setComputedState`.

### Try It

Clone the repo, then...

```
pnpm i -r
pnpm start -r
```
