import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  userDetails: {},
  userLoggedIn: false,
  bookingDetails: { loading: false, bookings: [] },
  allBookingDetails: {
    loading: false,
    allBooking: [],
  },
  error: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true }

    case actionTypes.LOGIN_FAILED:
      return { ...state, loading: false, error: action?.error }

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        userDetails: action?.payload,
        userLoggedIn: true,
      }

    case actionTypes.SIGNUP_FAILED:
      return { ...state, loading: false, error: action?.error.message }

    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        userDetails: action?.payload,
        userLoggedIn: true,
      }

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        error: '',
        userDetails: {},
        userLoggedIn: false,
      }
    case actionTypes.BOOKING_START:
      const newBookingData = { ...state }
      newBookingData.bookingDetails.loading = true
      return { ...newBookingData }

    case actionTypes.BOOKING_FAILED:
      const updatedBookingData = { ...state }
      updatedBookingData.bookingDetails.loading = false
      return { ...updatedBookingData, error: action.payload }
    case actionTypes.BOOKING_SUCCESS:
      const updatedData = { ...state }
      updatedData.bookingDetails.loading = false
      updatedData.bookingDetails.bookings.push(action.payload)
      return { ...updatedData, error: '' }

    case actionTypes.FETCH_MY_BOOKINGLIST_START:
      return {
        ...state,
        error: '',
      }

    case actionTypes.FETCH_MY_BOOKINGLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: 'error',
      }

    case actionTypes.FETCH_MY_BOOKINGLIST_SUCCESS:
      const updatedBookingState = { ...state }
      const data = action.payload
      data.sort((a, b) => {
        if (Date.parse(a.date) > Date.parse(b.date)) return -1
      })
      updatedBookingState.bookingDetails.bookings = data
      updatedBookingState.bookingDetails.loading = false
      return {
        ...updatedBookingState,
        error: '',
      }

    case actionTypes.FETCH_ADMIN_BOOKINGLIST_START:
      const newState = { ...state }
      newState.allBookingDetails.loading = true
      return newState

    case actionTypes.FETCH_ADMIN_BOOKINGLIST_FAILED:
      const newStateCopy = { ...state }
      newStateCopy.allBookingDetails.loading = false
      newStateCopy.error = action.payload
      return newStateCopy

    case actionTypes.FETCH_ADMIN_BOOKINGLIST_SUCCESS:
      const updatedState = { ...state }
      updatedState.allBookingDetails.loading = false
      updatedState.error = ''
      updatedState.allBookingDetails.allBooking = action.payload
      return updatedState

    default:
      return state
  }
}

export default reducer
