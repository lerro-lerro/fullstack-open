import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({ message: `Welcome ${user.name}`, type: 'success' })
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setNotification({ message: 'Logged out successfully', type: 'success' })
    setTimeout(() => setNotification(null), 5000)
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(
        blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes)
      )
      setNotification({
        message: `A new blog '${returnedBlog.title}' by ${returnedBlog.author} added`,
        type: 'success'
      })
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setNotification({ message: 'Failed to add blog', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(
        blogs
          .map(blog => (blog.id !== id ? blog : updatedBlog))
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (exception) {
      setNotification({ message: 'Failed to update blog', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotification({ message: 'Blog deleted', type: 'success' })
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setNotification({ message: 'Failed to delete blog', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              type="text"
              data-testid="username"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type="password"
              data-testid="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
