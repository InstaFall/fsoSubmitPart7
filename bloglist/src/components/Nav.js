import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <div>
      <Link style={{ padding: 5, paddingLeft: 0 }} to="/">
        home
      </Link>
      <Link style={{ padding: 5 }} to="/users">
        users
      </Link>
    </div>
  )
}

export default Nav
