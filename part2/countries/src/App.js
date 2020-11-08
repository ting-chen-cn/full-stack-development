import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchCountries }) => {
  return searchCountries.length > 10 ? (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
  ) : searchCountries.length === 1 ? (
    <div>
      <h1>{searchCountries[0].name}</h1>
      <p>capital&nbsp;{searchCountries[0].capital}</p>
      <p>population&nbsp;{searchCountries[0].population}</p>
      <h2>languages</h2>
      <ul>
        {searchCountries[0].languages.map((note) => (
          <li key={note.name}>{note.name}</li>
        ))}
      </ul>
      <img src={searchCountries[0].flag} alt='' width={200} />
    </div>
  ) : (
    <div>
      <ul>
        {searchCountries.map((note) => (
          <li key={note.name}>{note.name}</li>
        ))}
      </ul>
    </div>
  )
}
function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [searchCountries, setSearchCountries] = useState([])
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    const isNull = event.target.value === ''

    const result = isNull
      ? []
      : countries.filter((w) =>
          w.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
    setSearchCountries(result)
  }

  return (
    <div>
      <>
        find <input value={search} onChange={handleSearch} />
      </>
      <Filter searchCountries={searchCountries} />
    </div>
  )
}

export default App
