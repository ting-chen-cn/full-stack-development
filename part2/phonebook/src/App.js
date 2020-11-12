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
    //   console.log('effect')
    //   axios.get('http://localhost:3001/persons').then((response) => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //     setSearched(response.data)
    //   })
    // }
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
      // setPersons(persons.concat(noteObject))
      // setNewName('')
      // setNewNumber('')
      // let a = persons.concat(noteObject)

      // let result = a.filter((w) =>
      //   w.name.toLowerCase().includes(newSearchPerson.toLowerCase())
      // )
      // setSearched(result)
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
