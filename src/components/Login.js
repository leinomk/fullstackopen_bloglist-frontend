import React from 'react'

const loginForm = ({ username, password, setUsername, setPassword, handleLogin }) => (
  <div>
    <h2>Log in to application</h2>

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
        <button type="submit">login</button>
      </div>
    </form>
  </div>
)

export default loginForm