import { useCallback, useEffect, useState } from "react";
import { useComputedState } from "@jfdi/use-computed-state";
import { getContacts, getRandomPerson } from "./commonData";
import is from "@sindresorhus/is";

const ContactList = ({ contactData, setCurrentContact }) => (
    <aside style={{ padding: "1em", border: "1px dotted #ccc" }}>
        <h3>Click on a contact:</h3>
        <ul>
            {contactData.map((contact, idx) => {
                const { id, name } = contact;
                return (
                    <li
                        key={id}
                        onClick={is.function(setCurrentContact) ? () => setCurrentContact(idx) : null}
                        style={{ cursor: "pointer" }}
                    >
                        {name}
                    </li>
                );
            })}
        </ul>
    </aside>
);

const ContactForm = ({ contact: { id, name } = {}, mungeContact: renameContact }) => (
    <article style={{ minWidth: 300, padding: "1em", border: "1px dotted #ccc" }}>
        <p>ID: {id}</p>
        <p>Name: {name}</p>
        <button onClick={renameContact}>Rename!</button>
    </article>
);

const Contacts = () => {
    const [currentContactIdx, setCurrentContactIdx] = useState();
    const { computedState: contacts, setComputedState: setContacts } = useComputedState({
        initialComputedState: []
    });

    useEffect(() => {
        console.log("FETCH");
        getContacts().then(data => setContacts(data));
    }, [setContacts]);

    const renameContact = useCallback(async () => {
        const { results: [person] = {} } = await getRandomPerson();
        contacts[currentContactIdx] = {
            ...contacts[currentContactIdx],
            name: person.name.first + " " + person.name.last
        };
        setContacts(contacts);
        console.log("Renamed!", contacts[currentContactIdx]);
        // we can also update the back-end
    }, [contacts, currentContactIdx, setContacts]);

    return (
        <section>
            <h4>A collection of records, optimistically updated locally</h4>
            <p>
                A fetched list is versioned using a timestamp. Local updates can be made, updating the UI, whilst
                asynchronchronously updating the backend through an API. Here we just change the name to a new random
                one.
            </p>
            <ContactList contactData={contacts} setCurrentContact={setCurrentContactIdx} />
            {currentContactIdx !== undefined && (
                <ContactForm
                    contact={contacts[currentContactIdx]}
                    mungeContact={() => renameContact(currentContactIdx)}
                />
            )}
        </section>
    );
};

export default Contacts;
