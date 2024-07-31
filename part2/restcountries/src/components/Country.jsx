const Country = ({ country }) => {

  const languages = Object.values(country.languages)

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
    </div>
  )
}

export default Country