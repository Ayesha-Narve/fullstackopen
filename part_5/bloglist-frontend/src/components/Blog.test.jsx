import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('shows url and likes when view button is clicked', async () => {
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

  const user = userEvent.setup()

  render(
    <Blog
      blog={blog}
      updateLikes={() => {}}
      deleteBlog={() => {}}
      user={blog.user}
    />
  )

  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('https://react.dev')).toBeInTheDocument()
  expect(screen.getByText(/likes 10/i)).toBeInTheDocument()
})