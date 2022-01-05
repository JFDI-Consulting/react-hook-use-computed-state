import { useComputedState } from "@jfdi/use-computed-state";

const computeFn = state => new Date(state).toLocaleString();

export const DateThing = () => {
    const { computedState: date, notifyChange } = useComputedState({
        computeFn,
        initialComputedState: computeFn(Date.now())
    });

    console.count("DateThing");

    return (
        <section>
            <h3>A display date/time derived from a timestamp</h3>
            <p>
                The actual state is a timestamp. When you click the button, the timestamp is updated to now, and the
                computed state (display date/time) is recomputed.
            </p>
            <h4>{date}</h4>
            <button onClick={notifyChange}>Update to Now</button>
        </section>
    );
};
