import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async (user) => {
  const logedUser = await axios.post(baseUrl, user)
  return logedUser.data
}

export default { loginUser }