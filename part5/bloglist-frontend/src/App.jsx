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
      const logedUser = await userService.loginUser({ username, password })
      setUser(logedUser)
      setUsername('')
      setPassword('')
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
    </div>
  )

  return (
    <div>
      {
        user === null ? loginForm() : blogsList()
      }
      
    </div>
  )
}

export default App