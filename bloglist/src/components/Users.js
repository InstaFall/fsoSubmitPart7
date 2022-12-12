import { Link } from "react-router-dom"

const Users = ({ users }) => {
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
              <th scope="row">
                <Link to={`/users/${el.id}`}>{el.name || el.username}</Link>
              </th>
              <td>{el.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
