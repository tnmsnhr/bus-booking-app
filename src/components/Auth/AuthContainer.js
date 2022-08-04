import React from 'react'
import { withRouter } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'

const AuthContainer = (props) => {
  return (
    <div className='auth_container container'>
      <section className='auth_container--left'>
        <div className='welcome_back'>
          <h1>
            Welcome to a<span>i</span>r
          </h1>
          <p>Welcome back! Please enter your details</p>
        </div>
        {props?.match?.path?.includes('login') ? <Login /> : <SignUp />}
      </section>
      <section className='auth_container--right'></section>
    </div>
  )
}

export default withRouter(AuthContainer)
