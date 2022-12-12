import { Link } from "react-router-dom"
import Logout from "./Logout"

const Nav = ({ user }) => {
  return (
    <div>
      <Link style={{ padding: 5, paddingLeft: 0 }} to="/">
        home
      </Link>
      <Link style={{ padding: 5 }} to="/users">
        users
      </Link>
      <Logout user={user} />
    </div>
  )
}

export default Nav
