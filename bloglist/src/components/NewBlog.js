import { useState } from "react"

const NewBlog = (props) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  })
  const { addBlog } = props

  const handleNewBlogSubmit = (e) => {
    e.preventDefault()
    addBlog(newBlog)
    setNewBlog({
      title: "",
      author: "",
      url: "",
    })
  }

  return (
    <form onSubmit={handleNewBlogSubmit}>
      <h3>Create new blog</h3>
      <div>
        title:{" "}
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </div>
      <div>
        author:{" "}
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>
      <div>
        url:{" "}
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlog
