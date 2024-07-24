import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl + '/all')
    return response.data
  } catch (error) {
    console.error('Error updating data:', error)
  }
}

export default { 
  getAll
}