import "./styles.css";
import { DateThing } from "./DateThing";
import Contacts from "./Contacts";
import FilteredContacts from "./Filter";

export default function App() {
    return (
        <div className="App">
            <h1>useComputedState Demo</h1>
            <h2>See it used in three different ways</h2>
            <DateThing />
            <Contacts />
            <FilteredContacts />
        </div>
    );
}
