import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  busDetails: [],
  busDataLoaded: false,
  error: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BUS_START:
      return { ...state, loading: true, busDataLoaded: false, error: '' }
    case actionTypes.FETCH_BUS_FAILED:
      return {
        ...state,
        loading: false,
        busDataLoaded: false,
        error: action.payload,
      }
    case actionTypes.FETCH_BUS_SUCCESS:
      return {
        ...state,
        busDetails: action?.busDetails,
        loading: false,
        busDataLoaded: true,
        error: '',
      }

    default:
      return state
  }
}

export default reducer
