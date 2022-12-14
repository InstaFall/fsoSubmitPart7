import { Button } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteBlogAction, likeBlogAction } from "../../reducers/blogReducer"
import { setNotification } from "../../reducers/notificationReducer"
import blogService from "../../services/blogs"

const Blog = ({ username, blog }) => {
  const [view, setView] = useState(false)
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  //console.log("prop bloggggg", blog)
  const toggleView = () => {
    setView(!view)
  }

  const likeBlog = (blog) => {
    dispatch(likeBlogAction(blog))
  }

  const deleteBlog = async (blogObject) => {
    if (
      window.confirm(
        `Blog ${blogObject.title} by ${blogObject.author} will be removed. Do you wish to continue?`
      )
    ) {
      const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
      blogService.setToken(loggedUser.token)
      try {
        dispatch(deleteBlogAction(blogObject.id))
        dispatch(
          setNotification({
            ...notification,
            message: `Blog ${blogObject.title} by ${blogObject.author} is deleted!`,
          })
        )
        setTimeout(() => {
          dispatch(setNotification({ ...notification, message: null }))
        }, 3000)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  return view ? (
    <ul className="fullview">
      <li>
        Title: {blog.title} <button onClick={toggleView}>hide</button>
      </li>
      <li>Author: {blog.author}</li>
      <li id="blogUrl">Url: {blog.url}</li>
      <li id="blogLikes">
        Likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button>
      </li>
      <li>id: {blog.id}</li>
      <li>User: {blog.user.username}</li>
      {username === blog.user.username && (
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => deleteBlog(blog)}
        >
          delete
        </Button>
      )}
    </ul>
  ) : (
    <div className="simpleview">
      <Link to={`/blogs/${blog.id}`}>
        <b>{blog.title}</b>
      </Link>{" "}
      by {blog.author}{" "}
      <Button variant="text" color="primary" onClick={toggleView}>
        view
      </Button>
    </div>
  )
}

export default Blog
