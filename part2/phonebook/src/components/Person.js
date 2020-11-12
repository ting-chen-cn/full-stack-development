import React from 'react'
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

export default Persons
