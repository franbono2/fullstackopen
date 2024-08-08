import { useState } from 'react'

const LoginForm = ({ logUser }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  
  const handleLogin = (e) => {
    e.preventDefault()
    logUser({
      username,
      password
    })
    setUsername('')
    setPassword('')
  }

  return (
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
}

export default LoginForm