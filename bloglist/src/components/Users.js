import { useEffect, useState } from "react"
import userService from "../services/users"

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const response = await userService.getAll()
      setUsers(response)
    }
    fetch()
  }, [])
  console.log("users: ", users)
  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th scope="col">
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((el) => (
            <tr key={el.id}>
              <th scope="row">{el.name || el.username}</th>
              <td>{el.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
