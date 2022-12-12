const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
const api = supertest(app)


describe('when there is initial blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  },100000)

  test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the id property is returned as id not _id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    expect(blogs[0].id).toBeDefined()
  })

  test('the first blog\'s title is Example ', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.map((el) => el.title)).toContain('Example')
  })
})

describe('addition of a new blog', () => {
  test('succeeds with a valid new blog and token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Zort',
      author: 'CanDoe',
      url: 'http://example.org',
      likes: 32,
    }
    const userLogin = {
      username: 'phenomenal',
      password: 'uncrackable'
    }
    const login = await api
      .post('/api/login')
      .send(userLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const authorization = `bearer ${login.body.token}`

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authorization)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    const titles = blogsAtEnd.map((el) => el.title)
    expect(titles).toContain('Zort')
  })

  test('with missing likes defaults to 0', async () => {
    const userLogin = {
      username: 'phenomenal',
      password: 'uncrackable'
    }
    const login = await api
      .post('/api/login')
      .send(userLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const authorization = `bearer ${login.body.token}`

    const faultyBlog = {
      title: 'A Big Title',
      author: 'John Smith',
      url: 'http://example.org',
    }
    const response = await api
      .post('/api/blogs')
      .send(faultyBlog)
      .set('Authorization', authorization)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('fails when the title or url is missing', async () => {
    const userLogin = {
      username: 'phenomenal',
      password: 'uncrackable'
    }
    const login = await api
      .post('/api/login')
      .send(userLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const authorization = `bearer ${login.body.token}`

    const missingUrl = {
      title: 'Missing Url',
      author: 'Comte',
      likes: 4
    }
    const missingTitle = {
      author: 'MY G',
      likes: 4,
      url: 'http://example.org'
    }

    await api
      .post('/api/blogs')
      .send(missingTitle)
      .set('Authorization', authorization)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(missingUrl)
      .set('Authorization', authorization)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  },100000)

  test('fails when the token is missing', async () => {
    const newBlog = {
      title: 'Missing Token',
      author: 'The Man Himself',
      url: 'http://example.org',
      likes: 999
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with 404 if valid id is not in database', async () => {
    const validId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validId}`)
      .expect(404)
  })

  test('fails with 400 bad request if id is invalid', async () => {
    const invalidId = 'ab12489bz9242'
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('delete requests', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(el => el.title)
    expect(contents).not.toContain(blogToDelete.title)
  })

  test('return 204 if a valid id was already removed', async () => {
    const validId = await helper.nonExistingId()
    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${validId}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toEqual(blogsAtStart)
  })

  test('fails with 400 when request has invalid id', async () => {
    const invalidId = 'asdb214bzb142'
    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toEqual(blogsAtStart)
  })
})

describe('updating a blog', () => {
  test('with new value for likes succeeds', async () => {
    const blogs = await helper.blogsInDb()
    const toUpdateId = blogs[0].id
    const newLikes = Math.floor(Math.random()*500)
    const blogWithNewLikes = { ...blogs[0], likes: newLikes }
    await api
      .put(`/api/blogs/${toUpdateId}`)
      .send(blogWithNewLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(newLikes)
  })
})

describe('adding a blog with userId', () => {
  test('succeeds with third users id', async () => {
    const atStart = await helper.blogsInDb()

    const newBlog = {
      title: 'A Boring Blog',
      author: 'Ata Sereç Ersam',
      url: 'http://example.org',
      likes: 1500,
      userId: '6362e4c4593eeb9e89c22fcb'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const atEnd = await helper.blogsInDb()
    expect(atEnd).toHaveLength(atStart.length + 1)
  })
})
afterAll(() => {
  mongoose.connection.close()
})