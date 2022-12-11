import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  console.log("response.data from createBlog request", response.data)
  return response.data
}

const updateBlog = async (updatedBlog, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}
export default {
  getAll,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog,
}
