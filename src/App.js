import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        username, password
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        text: `${user.name} logged in`,
        type: 'notification',
      })
      setTimeout(() => {
        setMessage({})
      }, 5000)
    } catch (exception) {
      setMessage({
        text: 'wrong username or password',
        type: 'error'
      })
      setTimeout(() => {
        setMessage({})
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setMessage({
      text: `${user.name} logged out`,
      type: 'notification',
    })
    setTimeout(() => {
      setMessage({})
    }, 5000)
    setUser(null)
  }

  const addNew = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }

      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')

      setMessage({
        text: `A new blog ${response.title} by ${response.author} was added`,
        type: 'notification'
      })
      setTimeout(() => {
        setMessage({})
      }, 5000)

    } catch (exception) {
      setMessage({
        text: 'error when adding a new blog',
        type: 'error'
      })
      setTimeout(() => {
        setMessage({})
      }, 5000)
    }
  }

  return (
    <div>
      <br></br>
      <Notification message={message}/>

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={(event) => handleLogin(event)}
        /> :
        <Blogs 
          user={user.name}
          handleLogout={(event) => handleLogout(event)}
          blogs={blogs}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          addNew={(event) => addNew(event)}
        />
      }

    </div>
  )
}

export default App