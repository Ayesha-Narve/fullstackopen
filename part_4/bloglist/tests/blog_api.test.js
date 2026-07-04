const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany([
    {
      title: 'First blog',
      author: 'Ayesha',
      url: 'www.test.com',
      likes: 5
    },
    {
      title: 'Second blog',
      author: 'John',
      url: 'www.node.com',
      likes: 8
    }
  ])
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
  const newBlog = {
    title: 'Learning Full Stack',
    author: 'Ayesha',
    url: 'https://fullstackopen.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
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


after(async () => {
  const mongoose = require('mongoose')
  await mongoose.connection.close()
})