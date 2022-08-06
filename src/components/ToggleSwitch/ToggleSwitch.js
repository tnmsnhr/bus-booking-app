import React from 'react'

const ToggleSwitch = ({ text }) => {
  return (
    <div className='toggle_switch'>
      <input
        type='checkbox'
        id='switch'
        checked={text === 'user' ? false : true}
      />
      <label for='switch'>
        <p className={`${text}_text`}>{text}</p>
      </label>
    </div>
  )
}

export default ToggleSwitch
