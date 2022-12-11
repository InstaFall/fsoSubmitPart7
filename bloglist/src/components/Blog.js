import { useState } from "react"

const Blog = ({ username, blog, likeBlog, deleteBlog }) => {
  const [view, setView] = useState(false)
  const toggleView = () => {
    setView(!view)
  }

  return view ? (
    <ul className="fullview">
      <li>
        Title: {blog.title} <button onClick={toggleView}>hide</button>
      </li>
      <li>Author: {blog.author}</li>
      <li id="blogUrl">Url: {blog.url}</li>
      <li id="blogLikes">
        Likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button>
      </li>
      <li>id: {blog.id}</li>
      <li>User: {blog.user.username}</li>
      {username === blog.user.username && (
        <button onClick={() => deleteBlog(blog)}>delete</button>
      )}
    </ul>
  ) : (
    <div className="simpleview">
      <b>{blog.title}</b> by {blog.author}{" "}
      <button onClick={toggleView}>view</button>
    </div>
  )
}

export default Blog
