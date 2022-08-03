import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Filter from '../Filter/Filter'
import BookingLists from './BookingLists'
import BookingCard from './BookingCard'
import { connect } from 'react-redux'
import { fetchMyBooking } from '../../store/actions/bookingActions'

const MyBookings = (props) => {
  useEffect(() => {
    props.onFetchMyBooking(props?.uid)
  }, [props?.uid])
  return (
    <div className='container'>
      <div className='my-booking-container'>
        <section className='my-booking-top-row'>
          <Link to='/'>
            <button className='btn btn-blue'>New Booking</button>
          </Link>
        </section>
        <div className='booking-list-section'>
          <section className='my-booking-mid-row'>
            <h4>Latest 4 booking</h4>
            <div className='latest-booking'>
              {props?.bookingDetails?.slice(0, 4)?.map((data) => (
                <BookingCard key={data.id} data={data} />
              ))}
            </div>
          </section>
          <section className='my-booking-bottom-row'>
            <div className='my-booking-list'>
              <BookingLists data={props?.bookingDetails} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state?.user?.loading,
    bookingDetails: state?.user?.bookingDetails?.bookings,
    uid: state?.user?.userDetails?.uid,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onBusFetch: (from, to) => dispatch(fetchBusResult(from, to)),
    // onAllCityFetch: () => dispatch(fetchAllCity()),
    onFetchMyBooking: (uid) => dispatch(fetchMyBooking(uid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookings)
