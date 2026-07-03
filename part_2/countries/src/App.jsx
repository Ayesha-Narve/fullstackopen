import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Search from './components/Search'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

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

  // Reset selected country when search changes
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  // Decide which country to display
  const country =
    filteredCountries.length === 1
      ? filteredCountries[0]
      : selectedCountry

  return (
    <div>
      <Search
        value={filter}
        onChange={handleFilterChange}
      />

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries.length > 1 &&
        filteredCountries.length <= 10 &&
        filteredCountries.map(country => (
          <p key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => setSelectedCountry(country)}>
              show
            </button>
          </p>
        ))}

      {country && (
        <div>
          <h1>{country.name.common}</h1>

          <p>
            <strong>Capital:</strong> {country.capital?.[0]}
          </p>

          <p>
            <strong>Area:</strong> {country.area}
          </p>

          <h2>Languages</h2>

          <ul>
            {Object.values(country.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>

          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            width="200"
          />
          <Weather capital={country.capital[0]} />
        </div>
      )}
    </div>
  )
}

export default App