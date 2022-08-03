import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { bookBus } from '../../store/actions/bookingActions'
import SearchResult from './SearchResult'
import Spinner from '../Spinner/Spinner'
import Notification from '../Notification/Notification'

const SearchResultContainer = (props) => {
  const { busDetails, onBusBook, busDataLoaded, isBookingInProgress } = props

  return (
    <div className='search_result-container'>
      <h2 className='search_result-container--heading'>Search result:</h2>
      {isBookingInProgress && (
        <div className='booking-spinner'>
          <Spinner />
        </div>
      )}
      <div>
        {busDataLoaded &&
          busDetails?.map((data) => (
            <SearchResult
              onBusBook={onBusBook}
              busDetails={data}
              key={data.id}
            />
          ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state?.bus?.loading,
    busDetails: state?.bus?.busDetails,
    bookingDetails: state?.user?.bookingDetails?.bookings,
    isBookingInProgress: state?.user?.bookingDetails?.loading,
    busDataLoaded: state?.bus?.busDataLoaded,
    bookings: state?.user?.userDetails?.bookingId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBusBook: (busData, passangerData) =>
      dispatch(bookBus(busData, passangerData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultContainer)
