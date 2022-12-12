const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Example',
    author: 'Author One',
    url: 'http://example.org',
    likes: 20,
    user: new mongoose.Types.ObjectId('6362e1e2bfa18cc0101bec55')
  },
  {
    title: 'First two blogs are Root',
    author: 'Author Two',
    url: 'http://example.org',
    likes: 302,
    user: new mongoose.Types.ObjectId('6362e1e2bfa18cc0101bec55')
  },
  {
    title: 'A Boring Blog',
    author: 'Ata Sereç Ersam',
    url: 'http://example.org',
    likes: 1500,
    user: new mongoose.Types.ObjectId('6362e1e3bfa18cc0101bec58')
  },
  {
    title: 'Malbora Olma Sanatı',
    author: 'Bora Balmumcu',
    url: 'http://example.org',
    likes: 1,
    user: new mongoose.Types.ObjectId('6362e1e3bfa18cc0101bec58')
  }
]

const nonExistingId = async () => {
  const dummyBlog = new Blog({ title:'blog will be removed', url:'lorem', author:'ipsum', likes:0 })

  await dummyBlog.save()
  await dummyBlog.remove()
  return dummyBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((el) => el.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((el) => el.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}