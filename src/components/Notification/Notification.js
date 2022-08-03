import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Notification = (props) => {
  const portal = document.getElementById('portal')
  const [content, setContent] = useState()

  useEffect(() => {
    setContent(
      <>
        <div className='notification'>
          <div className='notification--text'>
            <p>{props.children}</p>
          </div>
        </div>
      </>
    )
    setTimeout(() => {
      setContent('')
    }, 3000)
  }, [])
  return ReactDOM.createPortal(content, portal)
}

export default Notification
