import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/logins"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Logout from "./components/Logout"
import NewBlog from "./components/NewBlog"
import Toggleable from "./components/Toggleable"
import { setNotification } from "./reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import {
  createBlog,
  deleteBlogAction,
  initializeBlogs,
  likeBlogAction,
} from "./reducers/blogReducer"

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const ref = useRef()
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginService.login({ username, password })
      setUser(response)
      window.localStorage.setItem("loggedUser", JSON.stringify(response))
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(
        setNotification({ error: true, message: "Invalid credentials!" })
      )
      setTimeout(() => {
        dispatch(setNotification({ error: false, message: null }))
      }, 3000)
      setUsername("")
      setPassword("")
    }
  }

  const likeBlog = async (blog) => {
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

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in</h2>
        <Toggleable label="log in">
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLoginSubmit={handleLoginSubmit}
          />
        </Toggleable>
      </div>
    )
  }
  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <Logout user={user} setUser={setUser} />
      <Toggleable label="add" ref={ref}>
        <NewBlog refs={ref} />
      </Toggleable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            username={user.username}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  )
}

export default App
