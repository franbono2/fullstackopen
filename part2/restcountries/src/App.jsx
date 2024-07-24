import { useEffect, useState } from 'react'
import Countries from './services/Countries'
import CountriesList from './components/Countries'

const App = () => {
  const [countryNameFilter, setCountryNameFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleCountryChange = (e) => {
    setCountryNameFilter(e.target.value)
  }

  const countriesToShow = () => {
    const parsedCountry = countryNameFilter.trim().toLocaleLowerCase()
    if (parsedCountry === ''){
      return []
    }
    return countries.filter(country => {
      const nameLowerCase = country.name.common.toLocaleLowerCase()
      return nameLowerCase.includes(parsedCountry)
    })
  } 
  

  useEffect(() => {
    Countries.getAll()
    .then((countries) => {
      setCountries(countries)
    })
  }, [])

  return (
    <div>
      <h1>RestCountries</h1>
      <header>
        Find countries:
        <input 
          type="text"
          placeholder='country'
          value={countryNameFilter}
          onChange={handleCountryChange}   
        />
      </header>
      {
        countriesToShow().length > 10 && <p>Too many matches, specify another filter</p>
      }
      {
        (countriesToShow().length > 1 && countriesToShow().length <= 10) &&
        <CountriesList countries={countriesToShow()}/>
      }
    </div>
  )
}

export default App