import * as actionTypes from '../actions/actionTypes'

const initialState = {
  cityDetails: [],
  loading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_CITY_START:
      return { ...state, loading: true }
    case actionTypes.FETCH_ALL_CITY_FAILED:
      return { ...state, loading: false }
    case actionTypes.FETCH_ALL_CITY_SUCCESS:
      return { ...state, cityDetails: action.cityDetails, loading: false }

    default:
      return state
  }
}

export default reducer
