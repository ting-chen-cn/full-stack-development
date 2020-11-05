import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearchPerson, setSearchPerson] = useState("");
  const [searchedPerson, setSearched] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName,
      number: newNumber,
    };

    let pos = persons.find((n) => n.name === `${newName}`);
    if (pos === undefined) {
      setPersons(persons.concat(noteObject));
      setNewName("");
      setNewNumber("");
      let a = persons.concat(noteObject);

      let result = a.filter((w) =>
        w.name.toLowerCase().includes(newSearchPerson.toLowerCase())
      );
      setSearched(result);
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handelNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchPerson = (event) => {
    setSearchPerson(event.target.value);
    let result = persons.filter((w) =>
      w.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearched(result);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ul>
        filter shown with{" "}
        <input value={newSearchPerson} onChange={handleSearchPerson} />
      </ul>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handelNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {searchedPerson.map((note) => (
          <li key={note.name}>
            {note.name}&nbsp;{note.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
