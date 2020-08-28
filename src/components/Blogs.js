import React from 'react'
import Blog from './Blog'

const blogForm = ({ user, blogs }) => (
  <div>  
    <br></br>
    <div>
      {user} is logged in
    </div>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default blogForm