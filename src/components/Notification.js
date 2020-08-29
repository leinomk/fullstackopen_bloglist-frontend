import React from 'react'

const Notification = ({ message }) => {
  if (message.type === undefined) {
    return null
  } else if (message.type === 'notification') {
    return (
      <div className="notification">
        {message.text}
      </div>
    )
  }
  return (
    <div className="error">
      {message.text}
    </div>
  )
}

export default Notification