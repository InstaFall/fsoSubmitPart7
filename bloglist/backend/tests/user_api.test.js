const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('../tests/test_helper')
const api = supertest(app)

describe('when there is one user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const pwHash = await bcrypt.hash('zottirizort', 10)
    const newUser = new User({
      username: 'root',
      passwordHash: pwHash
    })
    await newUser.save()
  })

  test('Post request to /api/users returns 201 Created! with valid user', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'instafall',
        password: 'abcdef123',
        name: 'Can Doe'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})

describe('users post requests', () => {
  test('fails when username length is less than 3', async () => {
    const faultyUsername = {
      username: 'ab',
      name: 'Faulty Username',
      password: 'superstrongpw'
    }
    const response = await api
      .post('/api/users')
      .send(faultyUsername)
      .expect(400)
    expect(response.body.error).toContain('minimum length is 3')
  })

  test('fails when password length is less than 3', async () => {
    const faultyPassword = {
      username: 'myUsername',
      name: 'Faulty Password',
      password: 'ch'
    }
    const response = await api
      .post('/api/users')
      .send(faultyPassword)
      .expect(400)
    expect(response.body.error).toContain('minimum length is 3')
  })

  test('fails when username is missing', async () => {
    const missingUsername = {
      name: 'Missing Username',
      password: 'cantcrackthis'
    }
    const response = await api
      .post('/api/users')
      .send(missingUsername)
      .expect(400)
    expect(response.body.error).toContain('missing data')
  })

  test('fails when password is missing', async () => {
    const missingPassword = {
      name: 'Missing Password',
      password: 'cantcrackthis'
    }
    const response = await api
      .post('/api/users')
      .send(missingPassword)
      .expect(400)
    expect(response.body.error).toContain('missing data')
  })
})

describe('new user', () => {
  test('can be added when valid', async () => {
    const newUser = {
      name: 'Third User',
      username: 'phenomenal',
      password: 'uncrackable'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})