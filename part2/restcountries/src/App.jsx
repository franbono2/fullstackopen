import { useEffect, useState } from 'react'
import Countries from './services/Countries'
import CountriesList from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countryNameFilter, setCountryNameFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)

  const handleCountryChange = (e) => {
    setCountryNameFilter(e.target.value)
    setCountry(null)
  }

  const handleOnShow = (country) => {
    setCountry(country)
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
        <CountriesList countries={countriesToShow()} onShow={handleOnShow}/>
      }
      {
        (countriesToShow().length > 1 && countriesToShow().length <= 10 && country !== null) &&
        <Country country={country} />
      }
      {
        (countriesToShow().length === 1) &&
        <Country country={countriesToShow()[0]}/>
      }
    </div>
  )
}

export default App