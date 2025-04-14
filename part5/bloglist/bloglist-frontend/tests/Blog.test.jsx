import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

describe('<Blog />', () => {
  let blog, updateBlog, deleteBlog, dummyUser

  beforeEach(() => {
    blog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 5,
      user: { username: 'tester', name: 'Test User' },
      id: '123456'
    }
    updateBlog = vi.fn()
    deleteBlog = vi.fn()
    dummyUser = { username: 'tester', name: 'Test User' }
  })

  test('renders title and author, but not url or likes by default', () => {
    render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={dummyUser}
      />
    )

    expect(screen.getByText(/Test Title/)).toBeDefined()
    expect(screen.getByText(/Test Author/)).toBeDefined()

    expect(screen.queryByText('http://example.com')).toBeNull()
    expect(screen.queryByText(/likes/)).toBeNull()
  })

  test('shows url and likes when view button is clicked', async () => {
    render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={dummyUser}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('http://example.com')).toBeDefined()
    expect(screen.getByText(/likes 5/)).toBeDefined()
  })

  test('calls updateBlog twice if like button is clicked twice', async () => {
    render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={dummyUser}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog).toHaveBeenCalledTimes(2)
  })
})
