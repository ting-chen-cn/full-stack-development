import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName,
      number: newNumber,
    };
    console.log(persons.name);
    // persons.name.indexOf(newName)
    let pos = persons.find((n) => n.name === `${newName}`);
    if (pos === undefined) {
      setPersons(persons.concat(noteObject));
      setNewName("");
      setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((note) => (
          <li key={note.name}>
            {note.name}&nbsp;
            {note.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
