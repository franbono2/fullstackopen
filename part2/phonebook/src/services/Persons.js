import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { 
  getAll, 
  create, 
  update,
  deletePerson
}