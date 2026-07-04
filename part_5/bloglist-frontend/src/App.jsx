import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { useRef } from 'react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
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
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password')

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
  const returnedBlog = await blogService.create(blogObject)

  blogFormRef.current.toggleVisibility()

  setBlogs(blogs.concat(returnedBlog))

  setNotification(
    `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
  )

  setTimeout(() => {
    setNotification(null)
  }, 5000)
}

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />

      <p>
        {user.name} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>

      <h3>Create new</h3>

      <Togglable
        buttonLabel="create new blog"
        ref={blogFormRef}
      >
        <h3>Create new</h3>

        <BlogForm createBlog={addBlog} />

      </Togglable>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default App