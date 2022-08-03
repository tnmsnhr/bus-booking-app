import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

const SignUp = ({ onSignUp }) => {
  const [loginData, setLoginData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSignUp(loginData)
  }

  const handleChange = (e) => {
    const loginCopy = { ...loginData }
    loginCopy[e.target.name] = e.target.value
    setLoginData(loginCopy)
  }

  return (
    <div className='login_container'>
      <form onSubmit={handleSubmit}>
        <div className='input_group input_group-transparent'>
          <label>Full Name</label>
          <input
            type='text'
            placeholder='Enter your name'
            name='name'
            onChange={handleChange}
            required
            minLength={4}
          />
        </div>
        <div className='input_group input_group-transparent'>
          <label>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            name='email'
            onChange={handleChange}
            required
            minLength={5}
          />
        </div>
        <div className='input_group input_group-transparent'>
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            name='password'
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <div className='input_group'>
          <button className='btn signin_button' type='submit'>
            Sign up
          </button>
        </div>
      </form>
      <div className='signup_text'>
        <p>
          Already have an account?{' '}
          <Link to='/login'>
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (data) => {
      dispatch(signUp(data))
    },
  }
}

export default connect(null, mapDispatchToProps)(SignUp)
