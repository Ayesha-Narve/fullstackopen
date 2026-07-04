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

describe('most blogs', () => {

  const blogs = [
    {
      title: 'Blog 1',
      author: 'Robert C. Martin',
      likes: 5
    },
    {
      title: 'Blog 2',
      author: 'Robert C. Martin',
      likes: 8
    },
    {
      title: 'Blog 3',
      author: 'Robert C. Martin',
      likes: 2
    },
    {
      title: 'Blog 4',
      author: 'Edsger W. Dijkstra',
      likes: 10
    },
    {
      title: 'Blog 5',
      author: 'Edsger W. Dijkstra',
      likes: 7
    }
  ]

  test('returns the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)

    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

})

describe('most likes', () => {

  const blogs = [
    {
      title: 'Blog 1',
      author: 'Robert C. Martin',
      likes: 5
    },
    {
      title: 'Blog 2',
      author: 'Robert C. Martin',
      likes: 8
    },
    {
      title: 'Blog 3',
      author: 'Robert C. Martin',
      likes: 2
    },
    {
      title: 'Blog 4',
      author: 'Edsger W. Dijkstra',
      likes: 10
    },
    {
      title: 'Blog 5',
      author: 'Edsger W. Dijkstra',
      likes: 7
    }
  ]

  test('returns the author with the most likes', () => {
    const result = listHelper.mostLikes(blogs)

    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      likes: 15
    })
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