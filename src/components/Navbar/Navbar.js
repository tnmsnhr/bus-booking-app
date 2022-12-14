import React, { useState } from 'react'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeUserRole, logout } from '../../store/actions/authActions'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'

const Navbar = (props) => {
  const [showClass, setShowClass] = useState('')

  const handleToggle = (e) => {
    if (!showClass) {
      setShowClass('toggle_navbar')
    } else {
      setShowClass('')
    }
  }
  return (
    <div className='container'>
      <div className='navbar_container'>
        <section className='navbar_brand'>
          <h3>
            bus<span>drop</span>
          </h3>
        </section>
        <section className='navbar_right'>
          <section className='navbar_toggle'>
            <input type='checkbox' id='toggle_input' onChange={handleToggle} />
            <label htmlFor='toggle_input'>
              <span className='navbar_toggle-switch'> </span>
              <span className='navbar_toggle-switch'> </span>
              <span className='navbar_toggle-switch'> </span>
            </label>
          </section>
          <ul className={`navbar_links ${showClass}`}>
            {props?.isLoggedIn && (
              <li
                className=' admin_switch'
                onClick={() => {
                  props?.onChangeUserRole()
                }}
              >
                {/* {!props?.isAdmin ? 'Admin' : 'User'} */}
                <div>
                  <ToggleSwitch text={props?.isAdmin ? 'admin' : 'user'} />
                </div>
              </li>
            )}
            <li className='navbar_link'>
              <NavLink
                to='/'
                className={(isActive) => (isActive ? 'navbar_active' : '')}
              >
                Home
              </NavLink>
            </li>
            {props?.isLoggedIn && !props?.isAdmin && (
              <li className='navbar_link'>
                <NavLink to='/my-bookings'>My Bookings</NavLink>
              </li>
            )}

            {props?.isAdmin && (
              <li className='navbar_link'>
                <NavLink to='/admin'>Admin Dashboard</NavLink>s
              </li>
            )}
            <li className='navbar_link navbar_button auth_button'>
              {props?.isLoggedIn ? (
                <>
                  <div className='name_field'>
                    <span>
                      <BsFillEmojiLaughingFill />
                    </span>
                    {props?.name}
                  </div>
                  <div>
                    <NavLink to='/'>
                      <button
                        className='logout_btn'
                        onClick={() => props?.onLogout()}
                      >
                        Log out{' '}
                        <span className='logout_icon'>
                          <RiLogoutCircleRLine />
                        </span>
                      </button>
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <NavLink to='/login'>
                      <button className='btn btn-default'>Login</button>
                    </NavLink>
                  </div>
                  <div className='navbar_link navbar_button'>
                    <NavLink to='/signup'>
                      <button className='btn btn-dark'>Sign Up</button>
                    </NavLink>
                  </div>
                </>
              )}
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    name: state?.user?.userDetails?.name,
    isLoggedIn: state?.user?.userLoggedIn,
    isAdmin: state?.user?.userDetails?.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout())
    },
    onChangeUserRole: () => {
      dispatch(changeUserRole())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
