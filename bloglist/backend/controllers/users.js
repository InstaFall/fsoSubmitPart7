const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req,res) => {
  const users = await User.find({}).populate('blogs', { user: 0 })
  console.log('RESPONSE OF GET REQUEST TO /api/users')
  console.log(users)
  console.log('----')
  res.json(users)
})

userRouter.post('/', async (req,res) => {
  const { name, username, password } = req.body
  const salt = 10

  if (!password || !username) {
    return res.status(400).json({ error: 'missing data' })
  }

  const existing = await User.findOne({ username })

  if (existing) {
    console.log('user is already in the database')
    return res.status(400).json({ error: 'username must be unique' })
  }

  if(password.length < 3 || username.length < 3) {
    return res.status(400).json({ error: 'minimum length is 3' })
  }

  const passwordHash = await bcrypt.hash(password,salt)
  const newUser = new User({
    name,
    username,
    passwordHash
  })

  console.log(newUser)
  const saved = await newUser.save()
  res.status(201).json(saved)
})

module.exports = userRouter