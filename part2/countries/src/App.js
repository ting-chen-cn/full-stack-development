import React, { useState, useEffect } from 'react'
import axios from 'axios'

const OneCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital&nbsp;{country.capital}</p>
      <p>population&nbsp;{country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((note) => (
          <li key={note.name}>{note.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt='' width={200} />
    </div>
  )
}

const ManyCountries = ({ country, setSearchCountries }) => {
  return (
    <>
      <li>{country.name}</li>
      <button onClick={() => setSearchCountries([country])}>
        show
      </button>
    </>
  )
}
const Filter = ({ searchCountries, setSearchCountries }) => {
  return searchCountries.length > 10 ? (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
  ) : searchCountries.length === 1 ? (
    <OneCountry country={searchCountries[0]} />
  ) : (
    <div>
      <ul>
        {searchCountries.map((note) => (
          <ManyCountries
            key={note.name}
            country={note}
            setSearchCountries={setSearchCountries}
          />
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
      <Filter
        searchCountries={searchCountries}
        setSearchCountries={setSearchCountries}
      />
    </div>
  )
}

export default App
