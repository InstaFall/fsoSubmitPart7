import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import blogService from "../services/blogs"
import { createBlog } from "../reducers/blogReducer"

const NewBlog = (props) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  })
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const ref = props.refs
  const addBlog = async (blogObject) => {
    const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
    blogService.setToken(loggedUser.token)
    try {
      dispatch(createBlog(blogObject))
      dispatch(
        setNotification({
          ...notification,
          message: `a new blog, ${blogObject.title} by ${blogObject.author} is added!`,
        })
      )
      setTimeout(() => {
        dispatch(setNotification({ ...notification, message: null }))
      }, 5000)
      console.log("ref: ", ref)
      console.log("ref: ", ref.current.toggleVisible)
      ref.current.toggleVisible()
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleNewBlogSubmit = (e) => {
    e.preventDefault()
    addBlog(newBlog)
    setNewBlog({
      title: "",
      author: "",
      url: "",
    })
  }

  return (
    <form onSubmit={handleNewBlogSubmit}>
      <h3>Create new blog</h3>
      <div>
        title:{" "}
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </div>
      <div>
        author:{" "}
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>
      <div>
        url:{" "}
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlog
