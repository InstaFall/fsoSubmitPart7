import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
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

const commentBlog = async (id, comment) => {
  const data = { comment }
  const response = await axios.post(`${baseUrl}/${id}/comments`, data)
  return response.data
}

export default {
  getAll,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog,
  commentBlog,
}
