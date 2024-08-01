import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    //console.error('Error updating data:', error)
  }
}

const create = async newObject => {
  try {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  } catch (error) {
    //console.error('Error updating data:', error)
  }
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  } catch (error) {
    //console.error('Error updating data:', error)
  }
}

const deletePerson = async id => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    //console.error('Error updating data:', error)
  }
}

export default { 
  getAll, 
  create, 
  update,
  deletePerson
}