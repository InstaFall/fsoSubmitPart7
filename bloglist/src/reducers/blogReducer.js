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

export const { addBlog, setBlogs, like } = blogSlice.actions

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

export const likeBlogAction = (blog) => {
  return async (dispatch, getState) => {
    const state = getState().blogs
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.updateBlog(updatedBlog, updatedBlog.id)
    dispatch(
      setBlogs(
        sortBlogsByLikes(
          state.map((el) => (el.id === blog.id ? updatedBlog : el))
        )
      )
    )
  }
}

export const deleteBlogAction = (id) => {
  return async (dispatch, getState) => {
    const state = getState().blogs
    blogService.deleteBlog(id)
    dispatch(setBlogs(state.filter((el) => el.id !== id)))
  }
}

export const commentBlogAction = (blog, comment) => {
  return async (dispatch, getState) => {
    const state = getState().blogs
    const response = await blogService.commentBlog(blog.id, comment)
    dispatch(setBlogs(state.map((el) => (el.id === blog.id ? response : el))))
  }
}
export default blogSlice.reducer
