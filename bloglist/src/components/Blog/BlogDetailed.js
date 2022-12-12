import { Button, IconButton, TextField } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { commentBlogAction, likeBlogAction } from "../../reducers/blogReducer"

const CommentBox = ({ comment, setComment, commentHandler }) => {
  return (
    <div className="commentSection" style={{ marginTop: "1.5em" }}>
      <div>
        <form onSubmit={commentHandler}>
          <TextField
            label="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            placeholder="add a comment.."
          ></TextField>
          <div>
            <Button variant="contained" color="primary" type="submit">
              send
            </Button>
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
    setComment("")
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
        <Button
          variant="outlined"
          color="primary"
          onClick={() => dispatch(likeBlogAction(blog))}
          size="small"
        >
          like
        </Button>
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
