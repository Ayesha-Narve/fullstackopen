import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'

test('calls createBlog with correct details when a new blog is created', async () => {
  const createBlog = vi.fn()

  const user = userEvent.setup()

  render(
    <BlogForm createBlog={createBlog} />
  )

  const inputs = screen.getAllByRole('textbox')

  await user.type(inputs[0], 'React Testing')
  await user.type(inputs[1], 'Ayesha')
  await user.type(inputs[2], 'https://react.dev')

  const button = screen.getByText('create')

  await user.click(button)

  expect(createBlog).toHaveBeenCalledTimes(1)

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'React Testing',
    author: 'Ayesha',
    url: 'https://react.dev'
  })
})