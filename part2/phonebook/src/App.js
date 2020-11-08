import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handelNumberChange,
  handlePersonChange,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number:{' '}
          <input value={newNumber} onChange={handelNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}
const Filter = ({ newSearchPerson, handleSearchPerson }) => {
  return (
    <div>
      <>
        filter shown with{' '}
        <input
          value={newSearchPerson}
          onChange={handleSearchPerson}
        />
      </>
    </div>
  )
}
const Persons = ({ searchedPerson }) => {
  return (
    <div>
      <ul>
        {searchedPerson.map((note) => (
          <li key={note.name}>
            {note.name}&nbsp;{note.number}
          </li>
        ))}
      </ul>
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchPerson, setSearchPerson] = useState('')
  const [searchedPerson, setSearched] = useState(persons)
  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled')
      setPersons(response.data)
      setSearched(response.data)
    })
  }, [])
  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
    }

    let pos = persons.find((n) => n.name === `${newName}`)
    if (pos === undefined) {
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
      let a = persons.concat(noteObject)

      let result = a.filter((w) =>
        w.name.toLowerCase().includes(newSearchPerson.toLowerCase())
      )
      setSearched(result)
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handelNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchPerson = (event) => {
    setSearchPerson(event.target.value)
    let result = persons.filter((w) =>
      w.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearched(result)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newSearchPerson={newSearchPerson}
        handleSearchPerson={handleSearchPerson}
      />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handelNumberChange={handelNumberChange}
        handlePersonChange={handlePersonChange}
      />
      <h3>Numbers</h3>
      <Persons searchedPerson={searchedPerson} />
    </div>
  )
}

export default App
