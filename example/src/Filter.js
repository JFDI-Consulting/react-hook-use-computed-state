import { useCallback, useEffect } from "react";
import { useComputedState } from "@jfdi/use-computed-state";
import { getContacts } from "./commonData";

const ContactList = ({ contactData, setCurrentContact }) => (
    <article style={{ padding: "1em", border: "1px dotted #ccc" }}>
        <ul style={{ listStyleType: "none", marginRight: "2em", paddingLeft: 0 }}>
            {contactData.map((contact, idx) => {
                const { id, name } = contact;
                return <li key={id}>{name}</li>;
            })}
        </ul>
    </article>
);

const Filter = ({ filter = "", setFilter }) => (
    <header>
        <label htmlFor="filter">Filter: </label>
        <input id="filter" value={filter} type="text" onChange={setFilter} />
    </header>
);

const initialComputedState = { contacts: [], filtered: [] };

const FilteredContacts = () => {
    const computeFn = useCallback((filterStr, { contacts } = {}) => {
        const filtered = contacts.filter(({ name }) => name.toLowerCase().includes(filterStr.toLowerCase()));
        return {
            contacts,
            filtered
        };
    }, []);

    const {
        state: filter,
        setState: setFilter,
        computedState,
        setComputedState: setContactData
    } = useComputedState({
        initialState: " ",
        initialComputedState,
        computeFn,
        debug: false
    });
    const { filtered = [] } = computedState ?? {};

    useEffect(() => {
        getContacts().then(data => {
            setContactData({ contacts: data, filtered: data });
            setFilter("");
        });
    }, [setContactData, setFilter]);

    return (
        <section>
            <h4>A simple filter box</h4>
            <p>
                We fetch backend data into a pair of lists (complete &amp; filtered), and store the filter string in
                state. Each time the filter changes, the list is re-filtered and the UI updates.
            </p>
            <Filter
                filter={filter}
                setFilter={e => {
                    const v = e.target.value;
                    console.log("Filter:", v);
                    return setFilter(v);
                }}
            />
            <ContactList contactData={filtered} />
        </section>
    );
};

export default FilteredContacts;
