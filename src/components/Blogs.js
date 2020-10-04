import React from 'react'
import Blog from './Blog'

const Blogs = ({
  user,
  blogs,
  handleLogout,
  updateBlog
}) => (
  <div>  
    <br></br>

    <div>
      {user} is logged in 
      <button onClick={handleLogout}>log out</button>
    </div>

    <h2>Blogs</h2>
    {blogs
      .sort((a, b) => a.likes - b.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} handleLikeButton={updateBlog}/>
    )}

  </div>
)

export default Blogs