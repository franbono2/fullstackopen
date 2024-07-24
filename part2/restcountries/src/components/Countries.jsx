const CountriesList = ({ countries }) => {

  console.log(countries)
  return (
    <div>
      {
        countries.map(country => 
          <p>{country.name.common}</p>
        )
      }
    </div>
  )
}

export default CountriesList