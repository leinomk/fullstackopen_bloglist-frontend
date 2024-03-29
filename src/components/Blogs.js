import React from 'react'
import Blog from './Blog'

const Blogs = ({
  user,
  blogs,
  handleLogout,
  updateBlog,
  removeBlog
}) => (
  <div>
    <br></br>

    <div>
      {user.name} is logged in
      <button id="logoutbutton" onClick={handleLogout}>log out</button>
    </div>

    <h2>Blogs</h2>
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} handleLikeButton={updateBlog}
          loggedInUser={user} removeBlog={removeBlog}/>
      )}

  </div>
)

export default Blogs