const Blog = require('../models/blog')
//const User = require('../models/user')
const blogRouter = require('express').Router()
//const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req,res) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
  console.log(result)
  res.json(result)
})

blogRouter.get('/:id', async (req,res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

/* const getToken = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.slice(7)
  }
  return null
} */
blogRouter.post('/', async (req,res) => {
  const body = req.body
  if(!req.token) {
    return res.status(401).json({ error: 'authorization failed: no token' })
  }
  if(!req.user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = req.user
  const newBlog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await (await newBlog.save()).populate('user',{ username:1,name:1 })
  user.blogs.push(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req,res) => {
  if(!req.token) {
    return res.status(401).json({ error: 'authorization failed' })
  }
  if(!req.user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = req.user
  console.log(user)
  const blogToDelete = await Blog.findById(req.params.id)
  if(blogToDelete.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'authorization failed' })
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req,res) => {
  const body = req.body
  const updatedBlog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }
  const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true, runValidators: true, context: 'query' }).populate('user', { username: 1, name: 1 })
  res.json(result)
})

blogRouter.post('/:id/comments', async (req,res) => {
  const comment = req.body.comment
  const blog = await Blog.findById(req.params.id)
  blog.comments.push(comment)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogRouter