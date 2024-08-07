import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async (user) => {
  const loggedUser = await axios.post(baseUrl, user)
  return loggedUser.data
}

export default { loginUser }