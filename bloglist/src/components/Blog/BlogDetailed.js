import { useState } from "react"
import { useDispatch } from "react-redux"
import { commentBlogAction, likeBlogAction } from "../../reducers/blogReducer"

const CommentBox = ({ comment, setComment, commentHandler }) => {
  return (
    <div className="commentSection" style={{ marginTop: "1.5em" }}>
      <div>
        <form onSubmit={commentHandler}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            placeholder="add a comment.."
          ></textarea>
          <div>
            <button className="button-4" type="submit">
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const BlogDetailed = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  const commentHandler = (e) => {
    e.preventDefault()
    dispatch(commentBlogAction(blog, comment))
  }
  if (!blog) {
    return null
  }
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
      <div>
        <h3>comments</h3>
        {blog.comments.map((el, i) => (
          <div key={i}>{el}</div>
        ))}
      </div>
      <CommentBox
        comment={comment}
        setComment={setComment}
        commentHandler={commentHandler}
      />
    </>
  )
}

export default BlogDetailed
