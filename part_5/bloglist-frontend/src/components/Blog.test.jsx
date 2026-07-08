import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

test('renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'React Testing',
    author: 'Ayesha',
    url: 'https://react.dev',
    likes: 10,
    user: {
      username: 'ayesha',
      name: 'Ayesha'
    }
  }

  render(
    <Blog
      blog={blog}
      updateLikes={() => {}}
      deleteBlog={() => {}}
      user={blog.user}
    />
  )

  expect(screen.getByText('React Testing Ayesha')).toBeInTheDocument()

  expect(screen.queryByText('https://react.dev')).toBeNull()

  expect(screen.queryByText(/likes/i)).toBeNull()
})