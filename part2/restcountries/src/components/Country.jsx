import { useEffect, useState } from 'react'
import Countries from '../services/Countries'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const languages = Object.values(country.languages)

  useEffect(() => {
    Countries.getWeather(country.capital)
    .then((current) => {
      setWeather(current)
    })
  }, [])

  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <p><strong>Languages:</strong></p>
      <ul>
        {
          languages.map(language => <li key={language}><strong>{language}</strong></li>)
        }
      </ul>
      <img 
        style={{aspectRatio: 1 / 1, objectFit: "fill", width: 256 + 'px'}}
        src={country.flags.svg} 
        alt={country.flags.alt} 
      />
      {
        weather !== null &&
        (
          <section>
            <h4>Weather in {country.capital}</h4>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather.description} 
            />
            <p>Wind: {weather.wind.speed} m/s</p>
          </section>
        )
      }
    </div>
  )
}

export default Country