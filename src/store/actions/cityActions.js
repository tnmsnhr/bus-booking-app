import * as actionTypes from '../actions/actionTypes'
import { projectFirestore } from '../../firebase/config'

export const fetchCityStart = () => {
  return {
    type: actionTypes.FETCH_ALL_CITY_START,
  }
}
export const fetchCityFailed = () => {
  return {
    type: actionTypes.FETCH_ALL_CITY_FAILED,
  }
}

export const fetchCitySuccess = (cities) => {
  return {
    type: actionTypes.FETCH_ALL_CITY_SUCCESS,
    cityDetails: cities,
  }
}

export const fetchAllCity = () => {
  return (dispatch) => {
    dispatch(fetchCityStart())
    const cityRef = projectFirestore.collection('cities')
    cityRef.get().then((snap) => {
      snap.forEach((doc) => {
        dispatch(fetchCitySuccess(doc.data()?.citiDetails))
      })
    })
  }
}
