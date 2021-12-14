import "./styles.css";
import { DateThing } from "./DateThing";
import Contacts from "./Contacts";

export default function App() {
    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Click some things to see some magic happen!</h2>
            <DateThing />
            <Contacts />
        </div>
    );
}
