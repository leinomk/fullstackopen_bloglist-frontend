import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = () => {
    setShowMore(!showMore)
  }

  const fullView = (
    <div>
      <div>
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
          <button>
            like
          </button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    </div>
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
    <div style={blogStyle}>
      {showMore
        ? <div>{fullView}</div>
        : <div>{simpleView}</div>
      }
    </div>
  )
}

export default Blog
