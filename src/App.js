import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Blogs from './components/Blogs'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    blogService.setToken(null)
    setMessage({
      text: `${user.name} logged out`,
      type: 'notification',
    })
    setTimeout(() => {
      setMessage({})
    }, 5000)
    setUser(null)
  }

  const addNew = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))

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

  const likeBlog = async (updatedBlog, id) => {
    await blogService.update(updatedBlog, id)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const deleteBlog = async ( blog ) => {
    try {
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)

      setMessage({
        text: `A blog '${blog.title}' by ${blog.author} was deleted`,
        type: 'notification'
      })
      setTimeout(() => {
        setMessage({})
      }, 5000)
    } catch (exception) {
      setMessage({
        text: 'Error when deleting a blog',
        type: 'error'
      })
      setTimeout(() => {
        setMessage({})
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='add new blog' ref={blogFormRef}>
      <BlogForm createBlog={addNew}/>
    </Togglable>
  )

  return (
    <div>
      <br></br>
      <Notification message={message}/>

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={setUsername}
          handlePasswordChange={setPassword}
          handleSubmit={(event) => handleLogin(event)}
        /> :
        <div>
          <Blogs 
            user={user}
            handleLogout={(event) => handleLogout(event)}
            blogs={blogs}
            updateBlog={likeBlog}
            removeBlog={deleteBlog}
          />
          <br></br>
          {blogForm()}
        </div>
      }

    </div>
  )
}

export default App