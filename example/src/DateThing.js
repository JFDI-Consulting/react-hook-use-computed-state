import { useComputedState } from "@jfdi/use-computed-state";

const computeFn = state => new Date(state).toLocaleString();

export const DateThing = () => {
    const { computedState: date, notifyChange } = useComputedState({
        computeFn,
        initialComputedState: computeFn(Date.now())
    });

    console.count("DateThing");

    return (
        <>
            <h3>{date}</h3>
            <button onClick={notifyChange}>Now!</button>
        </>
    );
};
