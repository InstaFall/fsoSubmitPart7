import { AppBar, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
import Logout from "./Logout"

const Nav = ({ user }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Button variant="text">
        <Link style={{ padding: 5, paddingLeft: 0 }} to="/">
          home
        </Link>
      </Button>
      <Button variant="text">
        <Link style={{ padding: 5 }} to="/users">
          users
        </Link>
      </Button>
      <Logout user={user} />
    </div>
  )
}

export default Nav
