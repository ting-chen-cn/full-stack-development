import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName,
    };
    console.log(persons.name);
    // persons.name.indexOf(newName)
    let pos = persons.find((n) => n.name === `${newName}`);
    if (pos === undefined) {
      setPersons(persons.concat(noteObject));
      setNewName("");
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
  };
  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((note) => (
          <li key={note.name}>{note.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
