import { attemptPromise } from "@jfdi/attempt";

const getJsonData = async (url, dflt) => {
    const [, res] = await attemptPromise(() => fetch(url));
    const [, data] = await attemptPromise(() => res.json());
    return data ?? dflt;
};
export const getRandomPerson = async () => {
    const person = await getJsonData("https://randomuser.me/api/", {});
    console.log("Person:", person);
    return person;
};
export const getContacts = async () => {
    const data = await getJsonData("https://jsonplaceholder.typicode.com/users", []);
    // console.log("Data", data);
    return data;
};
