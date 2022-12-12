import { List, ListItem, ListItemText } from "@mui/material"

const User = ({ user }) => {
  if (!user) return null
  return (
    <>
      <div>
        <h2>{user.name}</h2>
      </div>
      <div>
        <h3>added blogs</h3>
        <List>
          {user.blogs
            ? user.blogs.map((el) => (
                <ListItemText key={el.id}>
                  <b>{el.title}</b> <em>by {el.author} </em>
                  <b> - {el.likes} liked</b>
                </ListItemText>
              ))
            : null}
        </List>
      </div>
    </>
  )
}

export default User
