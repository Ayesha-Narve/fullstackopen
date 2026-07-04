const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  await api.post('/api/users').send({
    username: 'root',
    name: 'Superuser',
    password: 'secret'
  })
})

test('creation fails with duplicate username', async () => {
  const newUser = {
    username: 'root',
    name: 'Another',
    password: 'secret'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const users = await User.find({})

  assert.strictEqual(users.length, 1)
})

test('creation fails if password is too short', async () => {
  const newUser = {
    username: 'john',
    name: 'John',
    password: 'ab'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

test('creation fails if username is too short', async () => {
  const newUser = {
    username: 'ab',
    name: 'John',
    password: 'secret'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

after(async () => {
  const mongoose = require('mongoose')
  await mongoose.connection.close()
})