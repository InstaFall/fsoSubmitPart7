const maxBy = require('lodash/maxBy')
/*  eslint-disable no-unused-vars */

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  //if (blogs.length > 0) {
  let sum = 0
  for (const blog of blogs){
    sum += blog.likes
  }
  return sum
  //} else return 0
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev,curr) => prev.likes > curr.likes ? prev : curr)
}

const mostBlogs = (list) => {
  const most = maxBy(list,'blogs')
  return { author: most.author, blogs: most.blogs }
}

const mostLikes = (list) => {
  const most = maxBy(list,'likes')
  return { author: most.author, likes: most.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}