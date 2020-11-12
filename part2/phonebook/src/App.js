import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'
import Filter from './components/Filter'
import noteService from './services/note'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchPerson, setSearchPerson] = useState('')
  const [searchedPerson, setSearched] = useState(persons)
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setPersons(initialNotes)
      setSearched(initialNotes)
    })
  }, [])
  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
    }

    let pos = persons.find((n) => n.name === `${newName}`)
    if (pos === undefined) {
      noteService.create(noteObject).then((changedNote) => {
        setPersons(persons.concat(changedNote))
        setNewName('')
        setNewNumber('')
        let a = persons.concat(changedNote)
        let result = a.filter((w) =>
          w.name.toLowerCase().includes(newSearchPerson.toLowerCase())
        )
        setSearched(result)
      })
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

  const handleDeleteOf = (id) => {
    const deletePerson = persons.find((n) => n.id === id)
    window.alert(`Delete '${deletePerson.name}' ?`)
    noteService.deleteOf(id).then(() => {
      setPersons(persons.filter((n) => n.id !== id))
      setSearched(persons.filter((n) => n.id !== id))
    })
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
      <Persons
        searchedPerson={searchedPerson}
        handelDelete={handleDeleteOf}
      />
    </div>
  )
}

export default App
