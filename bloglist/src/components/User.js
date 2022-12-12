const User = ({ user }) => {
  if (!user) return null
  return (
    <>
      <div>
        <h2>{user.name}</h2>
      </div>
      <div>
        <h3>added blogs</h3>
        <ul>
          {user.blogs
            ? user.blogs.map((el) => (
                <li key={el.id}>
                  <b>{el.title}</b> <em>by {el.author} </em>
                  <b> - {el.likes} liked</b>
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  )
}

export default User
