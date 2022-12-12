import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/logins"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import NewBlog from "./components/NewBlog"
import Toggleable from "./components/Toggleable"
import { setNotification } from "./reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/loggedUserReducer"
import { Route, Routes, useMatch, useNavigate } from "react-router-dom"
import Nav from "./components/Nav"
import Users from "./components/Users"
import User from "./components/User"
import userService from "./services/users"
import BlogDetailed from "./components/BlogDetailed"

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const response = await userService.getAll()
      setUsers(response)
    }
    fetch()
  }, [])
  //const [user, setUser] = useState(null)
  const ref = useRef()
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.loggedUser)
  const blogs = useSelector((state) => state.blogs)
  const navigate = useNavigate()
  const matchUserId = useMatch("/users/:id")
  const matchBlogId = useMatch("/blogs/:id")
  const matchUser = matchUserId
    ? users.find((el) => el.id === matchUserId.params.id)
    : null
  const matchBlog = matchBlogId
    ? blogs.find((el) => el.id === matchBlogId.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      dispatch(setUser(parsedUser))
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginService.login({ username, password })
      dispatch(setUser(response))
      window.localStorage.setItem("loggedUser", JSON.stringify(response))
      setUsername("")
      setPassword("")
      navigate("/")
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
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Notification />
              <h2>blogs</h2>
              <Nav user={user} />
              <Toggleable label="add" ref={ref}>
                <NewBlog refs={ref} />
              </Toggleable>
              <div>
                {blogs.map((blog) => (
                  <Blog key={blog.id} username={user.username} blog={blog} />
                ))}
              </div>
            </div>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <Notification />
              <h2>blogs</h2>
              <Nav user={user} />
              <Users users={users} />
            </>
          }
        />
        <Route
          path="/users/:id"
          element={
            <>
              <Nav user={user} />
              <User user={matchUser} />
            </>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <>
              <Nav user={user} />
              <BlogDetailed blog={matchBlog} />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default App
