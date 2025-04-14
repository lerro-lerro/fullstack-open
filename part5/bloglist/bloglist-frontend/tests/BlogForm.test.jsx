import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'

test('<BlogForm /> calls createBlog with correct details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const titleInput = inputs[0]
  const authorInput = inputs[1]
  const urlInput = inputs[2]
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Testing Title')
  await user.type(authorInput, 'Testing Author')
  await user.type(urlInput, 'http://testurl.com')
  await user.click(createButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing Title',
    author: 'Testing Author',
    url: 'http://testurl.com',
    likes: 0,
  })
})
