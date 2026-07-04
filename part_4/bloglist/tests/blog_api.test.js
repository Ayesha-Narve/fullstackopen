const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)

  const user = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash
  })

  await user.save()

  for (const blog of helper.initialBlogs) {
    await new Blog({
      ...blog,
      user: user._id
    }).save()
  }
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 2)
})

test('blog identifier is named id', async () => {

  const response = await api.get('/api/blogs')

  assert(response.body[0].id)

})

test('a valid blog can be added', async () => {
    const loginResponse = await api
  .post('/api/login')
  .send({
    username: 'root',
    password: 'secret'
  })

const token = loginResponse.body.token

  const newBlog = {
    title: 'Learning Full Stack',
    author: 'Ayesha',
    url: 'https://fullstackopen.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 3)

  const titles = response.body.map(blog => blog.title)

  assert(titles.includes('Learning Full Stack'))
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Ayesha',
    url: 'https://example.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Ayesha',
    url: 'https://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Missing URL',
    author: 'Ayesha',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')

  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  assert.strictEqual(
    blogsAtEnd.body.length,
    blogsAtStart.body.length - 1
  )
})

test('a blog likes can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')

  const blogToUpdate = blogsAtStart.body[0]

  const updatedBlog = {
    ...blogToUpdate,
    likes: 100
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  assert.strictEqual(response.body.likes, 100)
})

test('blog cannot be added without token', async () => {
  const newBlog = {
    title: 'Unauthorized Blog',
    author: 'Ayesha',
    url: 'https://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

after(async () => {
  const mongoose = require('mongoose')
  await mongoose.connection.close()
})