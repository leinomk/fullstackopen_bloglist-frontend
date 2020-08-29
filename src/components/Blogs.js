import React from 'react'
import Blog from './Blog'

const blogForm = (props) => (
  <div>  
    <br></br>

    <div>
      {props.user} is logged in 
      <button onClick={props.handleLogout}>log out</button>
    </div>

    <h2>Blogs</h2>
    {props.blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}

    <h2>Create new</h2>

    <form onSubmit={props.addNew}>
      <div>
        title:
        <input
          type="text"
          value={props.title}
          name="Title"
          onChange={({ target }) => props.setTitle(target.value)}
        />
      </div>
      
      <div>
        author:
        <input
          type="text"
          value={props.author}
          name="Author"
          onChange={({ target }) => props.setAuthor(target.value)}
        />
      </div>

      <div>
        url:
        <input
          type="text"
          value={props.url}
          name="Url"
          onChange={({ target }) => props.setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>

  </div>
)

export default blogForm