import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch } from 'react-router-dom'
import { fetchAdminBooking } from '../../store/actions/bookingActions'
import BookingLists from '../MyBookings.js/BookingLists'
import CreateBusRoute from './CreateBusRoute'

const AdminDashBoard = (props) => {
  const { allBooking, isLoading } = props

  useEffect(() => {
    props.onFetchBooking()
  }, [])
  return (
    <div className='container'>
      <div className='admin-dashboard'>
        <section className='admin-dashboard--left-sidebar'>
          <div className='left-sidebar-nav'>
            <NavLink
              to={`${props.match.path}/all-bookings`}
              activeClassName='dasboard-activelink'
            >
              <div className='left-sidebar-nav--item'>Show Bookings</div>
            </NavLink>

            <NavLink
              to={`${props.match.path}/create-bus-route`}
              activeClassName='dasboard-activelink'
            >
              <div className='left-sidebar-nav--item'>Create Bus Route</div>
            </NavLink>
          </div>
        </section>
        <section className='admin-dashboard-right'>
          <Switch>
            <Route
              path='/admin/all-bookings'
              exact
              render={() => {
                return <BookingLists data={allBooking} />
              }}
            />
            <Route
              path='/admin/create-bus-route'
              exact
              component={CreateBusRoute}
            />
          </Switch>
        </section>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state?.user?.allBookingDetails?.loading,
    allBooking: state?.user?.allBookingDetails?.allBooking,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBooking: () => dispatch(fetchAdminBooking()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashBoard)
