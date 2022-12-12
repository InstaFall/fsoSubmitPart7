import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import { Link } from "react-router-dom"

const Users = ({ users }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th"></TableCell>
              <TableCell component="th" scope="col">
                <b>blogs created</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((el) => (
              <TableRow key={el.id}>
                <TableCell scope="row">
                  <Link to={`/users/${el.id}`}>{el.name || el.username}</Link>
                </TableCell>
                <TableCell>{el.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
