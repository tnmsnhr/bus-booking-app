import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  busDetails: [],
  busDataLoaded: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BUS_START:
      return { ...state, loading: true, busDataLoaded: false }
    case actionTypes.FETCH_BUS_FAILED:
      return { ...state, loading: false, busDataLoaded: false }
    case actionTypes.FETCH_BUS_SUCCESS:
      return {
        ...state,
        busDetails: action?.busDetails,
        loading: false,
        busDataLoaded: true,
      }

    default:
      return state
  }
}

export default reducer
