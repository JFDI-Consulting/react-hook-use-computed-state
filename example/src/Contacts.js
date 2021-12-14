import { useCallback, useEffect, useState } from "react";
import { attemptPromise } from "@jfdi/attempt";
import { useComputedState } from "@jfdi/use-computed-state";

const getRandomPerson = async () => {
    const [, res] = await attemptPromise(() => fetch("https://randomuser.me/api/"));
    const [, person] = await attemptPromise(() => res.json());
    console.log("Person:", person);
    return person ?? {};
};

const ContactList = ({ contactData, setCurrentContact }) => (
    <aside style={{ padding: "1em", border: "1px dotted #ccc" }}>
        <h3>Click on a contact:</h3>
        <ul style={{ listStyleType: "none", marginRight: "2em", paddingLeft: 0 }}>
            {contactData.map((contact, idx) => {
                const { id, name } = contact;
                return (
                    <li key={id}>
                        <button
                            onClick={() => setCurrentContact(idx)}
                            style={{ border: "none", background: "none", cursor: "pointer" }}
                        >
                            {name}
                        </button>
                    </li>
                );
            })}
        </ul>
    </aside>
);

const ContactForm = ({ contact: { id, name } = {}, mungeContact }) => (
    <article style={{ minWidth: 300, padding: "1em", border: "1px dotted #ccc" }}>
        <p>ID: {id}</p>
        <p>Name: {name}</p>
        <button onClick={mungeContact}>Munge!</button>
    </article>
);

const Contacts = () => {
    const [currentContactIdx, setCurrentContactIdx] = useState();
    const { computedState: contacts, setComputedState: setContacts } = useComputedState({
        initialComputedState: []
    });

    useEffect(() => {
        const getContacts = async () => {
            const [, res] = await attemptPromise(() => fetch("https://jsonplaceholder.typicode.com/users"));
            const [, data] = await attemptPromise(() => res.json());
            console.log("Data", data);
            if (data) setContacts(data);
        };

        getContacts();
    }, [setContacts]);

    const mungeContact = useCallback(async () => {
        console.log("MUNGED!");
        const { results: [person] = {} } = await getRandomPerson();
        contacts[currentContactIdx] = {
            ...contacts[currentContactIdx],
            name: person.name.first + " " + person.name.last
        };
        setContacts(contacts);
    }, [contacts, currentContactIdx, setContacts]);

    useEffect(() => {
        console.count(`Computed state ${JSON.stringify(contacts).slice(0, 50)}`);
    }, [contacts]);

    return (
        <section
            style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "left",
                marginTop: "4em"
            }}
        >
            <ContactList contactData={contacts} setCurrentContact={setCurrentContactIdx} />
            {currentContactIdx !== undefined && (
                <ContactForm
                    contact={contacts[currentContactIdx]}
                    mungeContact={() => mungeContact(currentContactIdx)}
                />
            )}
        </section>
    );
};

export default Contacts;
