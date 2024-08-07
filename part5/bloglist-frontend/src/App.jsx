import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  
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
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const loggedUser = await userService.loginUser({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      blogService.setToken(loggedUser.token)
    } catch (error) {
      console.error(error)
    }
  }

  const blogsList = () => (
    <div>
      <h2>Blogs</h2>
      <h3>Welcome: {user.name}</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <footer>
        <button onClick={handleLogout}>logout</button>
      </footer>
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      {
        user === null ? loginForm() : blogsList()
      }
      
    </div>
  )
}

export default App