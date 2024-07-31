import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const openWeatherIconUrl = 'https://openweathermap.org/img/wn' 
const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_KEY
const units = 'metric'


const getAll = async () => {
  try {
    const response = await axios.get(baseUrl + '/all')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const getWeather = async (city) => {
  try {
    const response = await axios.get(`${openWeatherUrl}q=${city}&units=${units}&appid=${openWeatherApiKey}`)
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
}

const getWeatherIcon = async (id) => {
  try {
    const response = await axios.get(`${openWeatherIconUrl}/${id}@2x.png`)
    return response
  } catch (error) {
    console.error('Error fetching weather icon data:', error)
  }
}

export default { 
  getAll,
  getWeather,
  getWeatherIcon
}