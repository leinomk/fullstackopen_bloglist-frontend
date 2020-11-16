import React, { useState } from 'react'

const Blog = ({ blog, handleLikeButton, loggedInUser, removeBlog }) => {
  const [showMore, setShowMore] = useState(false)

  const toggleView = () => {
    setShowMore(!showMore)
  }

  const likeBlog = async () => {
    const updatedLikes = blog.likes + 1
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: updatedLikes,
      user: blog.user._id,
      url: blog.url,
    }

    handleLikeButton(updatedBlog, blog.id)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  const fullView = (
    <span>
      <div>
        {blog.title}, by {blog.author}
        <button onClick={toggleView}>
          hide
        </button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button id="likeButton" onClick={likeBlog}>
          like
        </button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        {loggedInUser.username === blog.user.username
          ? <button onClick={deleteBlog}>remove</button>
          : null
        }
      </div>
    </span>
  )

  const simpleView = (
    <div>
      {blog.title}, by {blog.author}
      <button onClick={toggleView}>
        show more
      </button>
    </div>
  )

  return (
    <div className="blogstyle">
      {showMore
        ? <div>{fullView}</div>
        : <div>{simpleView}</div>
      }
    </div>
  )
}

export default Blog
