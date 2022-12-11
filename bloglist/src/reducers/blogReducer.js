import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

const sortBlogsByLikes = (blogArray) => {
  return [...blogArray].sort((a, b) => b.likes - a.likes)
}

export const { addBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll()
    dispatch(setBlogs(sortBlogsByLikes(response)))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await blogService.createBlog(newBlog)
    dispatch(addBlog(response))
  }
}
export default blogSlice.reducer
