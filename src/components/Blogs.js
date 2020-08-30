import React from 'react'
import Blog from './Blog'

const Blogs = ({
  user,
  blogs,
  handleLogout,
}) => (
  <div>  
    <br></br>

    <div>
      {user} is logged in 
      <button onClick={handleLogout}>log out</button>
    </div>

    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}

  </div>
)

export default Blogs