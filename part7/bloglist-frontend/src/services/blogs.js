import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (newblog) => {
  const response = await axios.post(baseUrl, newblog, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const updateBlog = async (updatedblog) => {
  const response = await axios.put(
    `${baseUrl}/${updatedblog.id}`,
    updatedblog,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export default {
  getAll,
  setToken,
  addBlog,
  updateBlog,
  deleteBlog,
};
