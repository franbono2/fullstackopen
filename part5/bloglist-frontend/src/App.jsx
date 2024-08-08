import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import userService from './services/users'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null) 
  const [message, setMessage] = useState('') 

  const BlogFormRef = useRef()
  
  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm logUser={logUser}/>
    </Togglable>
  )

  const logUser = async (user) => {
    try {
      const loggedUser = await userService.loginUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    } catch (error) {
      console.error(error)
      showMessage('wrong username or password')
    }
  }

  const blogsApp = () => (
    <div>
      <header>
        <h3>Welcome: {user.name}</h3>
      </header>
      <Togglable buttonLabel='new Blog' ref={BlogFormRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <br />
      <footer>
        <button onClick={handleLogout}>logout</button>
      </footer>
    </div>
  )

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.addBlog(blog)
      BlogFormRef.current.toggleVisibility()
      showMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setBlogs([...blogs, newBlog])
    } catch (error) {
      console.error(error)
      showMessage('An error has occurred')
    }
  }

  const showMessage = message => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      {
        user === null ? loginForm() : blogsApp()
      }
    </div>
  )
}

export default App