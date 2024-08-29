import axios from "axios";
const loginUrl = "/api/login";
const userUrl = "/api/users";

const loginUser = async (user) => {
  const loggedUser = await axios.post(loginUrl, user);
  return loggedUser.data;
};

const getAll = async () => {
  const response = await axios.get(userUrl);
  return response.data;
};

export default { loginUser, getAll };
