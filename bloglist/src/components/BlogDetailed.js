import { useDispatch } from "react-redux"
import { likeBlogAction } from "../reducers/blogReducer"

const BlogDetailed = ({ blog }) => {
  const dispatch = useDispatch()
  return (
    <>
      <h3>
        {blog.title} by {blog.author}
      </h3>
      <div>
        <a href={`${blog.url}`} target="_blank">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => dispatch(likeBlogAction(blog))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </>
  )
}

export default BlogDetailed
