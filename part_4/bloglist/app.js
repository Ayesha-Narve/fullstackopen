const express = require('express')
const Blog = require('./models/blog')
const usersRouter = require('./controllers/users')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const middleware = require('./utils/middleware')


const app = express()

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/users', usersRouter)

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })

  response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
  const body = request.body

  const token = request.token

if (!token) {
  return response.status(401).json({
    error: 'token missing'
  })
}

  const decodedToken = jwt.verify(token, 'SECRET')

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title and url are required'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

app.delete('/api/blogs/:id', async (request, response) => {
  const token = request.token

  if (!token) {
    return response.status(401).json({
      error: 'token missing'
    })
  }

  const decodedToken = jwt.verify(token, 'SECRET')

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token invalid'
    })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({
      error: 'only the creator can delete a blog'
    })
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

app.put('/api/blogs/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  )

  response.json(updatedBlog)
})

app.post('/api/login', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(
    userForToken,
    'SECRET'
  )

  response.status(200).send({
    token,
    username: user.username,
    name: user.name
  })
})
module.exports = app