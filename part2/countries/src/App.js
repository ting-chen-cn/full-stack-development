import React, { useState, useEffect } from 'react'
import axios from 'axios'

const OneCountry = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const baseURL = 'http://api.weatherstack.com/'
  const [weather, setWeather] = useState('')
  const url =
    baseURL +
    'current?access_key=' +
    api_key +
    '&query=' +
    country.capital
  useEffect(() => {
    console.log(url)
    axios.get(url).then((response) => {
      setWeather(response.data.current)
    })
  }, [url])
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
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.temperature}</p>
      <img src={weather.weather_icons} alt='' width={50} />
      <p>
        wind: {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  )
}

const ManyCountries = ({ country, setSearchCountries }) => {
  return (
    <div>
      {country.name}{' '}
      <button onClick={() => setSearchCountries([country])}>
        show
      </button>
    </div>
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
      {searchCountries.map((note) => (
        <ManyCountries
          key={note.name}
          country={note}
          setSearchCountries={setSearchCountries}
        />
      ))}
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
