const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)

  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  const emptyList = []

  const oneBlog = [
    {
      title: 'React',
      author: 'Facebook',
      likes: 7
    }
  ]

  const manyBlogs = [
    {
      title: 'React',
      author: 'Facebook',
      likes: 7
    },
    {
      title: 'Node',
      author: 'Ryan',
      likes: 5
    },
    {
      title: 'JavaScript',
      author: 'Brendan',
      likes: 10
    }
  ]

  describe('favorite blog', () => {
  const blogs = [
    {
      title: 'React',
      author: 'Facebook',
      likes: 7
    },
    {
      title: 'Node',
      author: 'Ryan',
      likes: 15
    },
    {
      title: 'JavaScript',
      author: 'Brendan',
      likes: 10
    }
  ]

  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[1])
  })
})

  test('of empty list is zero', () => {

    assert.strictEqual(
      listHelper.totalLikes(emptyList),
      0
    )

  })

  test('when list has one blog equals its likes', () => {

    assert.strictEqual(
      listHelper.totalLikes(oneBlog),
      7
    )

  })

  test('of bigger list is calculated correctly', () => {

    assert.strictEqual(
      listHelper.totalLikes(manyBlogs),
      22
    )

  })

})