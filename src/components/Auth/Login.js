import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import GoogleLogo from '../../assets/google_logo.png'
import { googleSignIn, signIn } from '../../store/actions/authActions'

const Login = (props) => {
  const [loginData, setLoginData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    props?.onSignIn(loginData)
  }

  const handleChange = (e) => {
    const loginCopy = { ...loginData }
    loginCopy[e.target.name] = e.target.value
    setLoginData(loginCopy)
  }

  return (
    <>
      {!props?.isUserLoggedIn ? (
        <div className='login_container'>
          <form onSubmit={handleSubmit}>
            <div className='input_group input_group-transparent'>
              <label>Email</label>
              <input
                type='email'
                placeholder='Enter your email'
                name='email'
                onChange={handleChange}
                required
                minLength={3}
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
            <span className='login_error'>{props?.error}</span>
            <div className='input_group'>
              <button className='btn signin_button' type='submit'>
                Sign in
              </button>
            </div>
          </form>
          <div className='input_group'>
            <button
              className='btn google_signin'
              onClick={() => props?.onGoogleSignIn()}
            >
              <span>
                <img src={GoogleLogo} />
              </span>
              <span>Sign in with Google</span>
            </button>
          </div>
          <div className='signup_text'>
            <p>
              Don't have an account?{' '}
              <Link to='/signup'>
                <span>Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <Redirect to='/' />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state?.user?.userLoggedIn,
    isLoading: state?.user?.loading,
    error: state?.user?.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGoogleSignIn: () => {
      dispatch(googleSignIn())
    },
    onSignIn: (data) => {
      dispatch(signIn(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
