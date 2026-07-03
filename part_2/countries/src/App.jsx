import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Search from './components/Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(filter.toLowerCase())
  )

  return (
    <div>
      <Search
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map(country => (
          <p key={country.cca3}>
            {country.name.common}
          </p>
        ))}

      {filteredCountries.length === 1 && (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>

          <p>
            Capital: {filteredCountries[0].capital}
          </p>

          <p>
            Area: {filteredCountries[0].area}
          </p>

          <h2>Languages</h2>

          <ul>
            {Object.values(filteredCountries[0].languages).map(language => (
              <li key={language}>
                {language}
              </li>
            ))}
          </ul>

          <img
            src={filteredCountries[0].flags.png}
            alt={filteredCountries[0].flags.alt}
            width="200"
          />
        </div>
      )}
    </div>
  )
}

export default App