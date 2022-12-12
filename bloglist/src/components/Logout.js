import { useDispatch } from "react-redux"
import { setUser } from "../reducers/loggedUserReducer"

const Logout = (props) => {
  const { user } = props
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
  return (
    <div style={{ marginLeft: "3em", marginTop: 10 }}>
      <b>{user.username}</b> logged in{" "}
      <button onClick={handleLogout}>log out</button>
    </div>
  )
}

export default Logout
