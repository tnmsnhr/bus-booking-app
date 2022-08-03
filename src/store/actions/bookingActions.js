import firebase from 'firebase'
import * as actionTypes from '../actions/actionTypes'
import { projectFirestore } from '../../firebase/config'
import { randomNumGenerator } from '../../util/randomNumGenerator'

export const fetchBusStart = () => {
  return {
    type: actionTypes.FETCH_BUS_START,
  }
}
export const fetchBusFailed = (error) => {
  return {
    type: actionTypes.FETCH_BUS_FAILED,
    payload: error,
  }
}

export const fetchBusSuccess = (bus) => {
  return {
    type: actionTypes.FETCH_BUS_SUCCESS,
    busDetails: bus,
  }
}

export const bookingStart = () => {
  return {
    type: actionTypes.BOOKING_START,
  }
}
export const bookingFailed = () => {
  return {
    type: actionTypes.BOOKING_FAILED,
  }
}

export const bookingSuccess = (bus) => {
  return {
    type: actionTypes.BOOKING_SUCCESS,
    payload: bus,
  }
}

export const fetchBusResult = (from, to) => {
  return async (dispatch, getState) => {
    dispatch(fetchBusStart())
    const cityDetails = getState()?.cities?.cityDetails
    const isCityPresent = cityDetails.filter((el) => {
      return (
        el.cityName?.toLowerCase() === from.toLowerCase() ||
        el.cityName?.toLowerCase() === to.toLowerCase()
      )
    })
    if (isCityPresent?.length > 1) {
      const busRef = projectFirestore.collection('bus')
      const snap = await busRef
        .where('from', '==', from)
        .where('to', '==', to)
        .onSnapshot((snapShot) => {
          if (snapShot.docs?.length > 0) {
            const busDetailsArray = []
            snapShot?.forEach((doc) => {
              busDetailsArray.push({ ...doc.data(), id: doc.id })
            })
            dispatch(fetchBusSuccess(busDetailsArray))
          } else if (from !== '' && to !== '') {
            busRef.add({
              to,
              from,
              amenities: {
                food: true,
                tv: true,
                washroom: true,
                wifi: true,
              },
              availableCategory: {
                economy: randomNumGenerator(500, 650),
                luxury: randomNumGenerator(800, 1100),
                premium: randomNumGenerator(1200, 1500),
              },
              bookingDetails: [],
              brandName: 'Volvo',
              driverName: 'Tanmoy Roy',
              duration: '10:30',
              seatBooked: 1,
              seatCapacity: 30,
              totalStopped: '3',
              busNumber: 'MH1485-0000',
              departure: '11:20 AM',
            })

            dispatch(fetchBusSuccess())
          } else {
            dispatch(fetchBusFailed('Please enter From,To field'))
          }
        })
    } else {
      dispatch(fetchBusFailed('Please enter a valid From,To field'))
    }

    // .onSnapshot((snap) => {
    //   const busDetailsArray = []
    //   snap?.forEach((doc) => {
    //     console.log(doc)
    //     busDetailsArray.push({ ...doc.data(), id: doc.id })
    //   })
    //   dispatch(fetchBusSuccess(busDetailsArray))
    // })
  }

  //   .catch((err) => dispatch(fetchBusFailed()))
}

export const bookBus = (busData) => {
  return async (dispatch, getState) => {
    const { name, uid } = getState().user?.userDetails
    dispatch(bookingStart())
    const bookingRef = projectFirestore.collection('bookingDetails')
    const userRef = projectFirestore.collection('users')
    const busRef = projectFirestore.collection('bus')

    const bookingData = await bookingRef.add({
      ...busData,
      passangerName: name,
      passangerId: uid,
    })

    const busRefData = await busRef.doc(busData?.busId).update({
      bookingDetails: firebase.firestore.FieldValue.arrayUnion(bookingData.id),
      seatBooked: firebase.firestore.FieldValue.increment(1),
    })

    let userRefId = ''

    const userRefData = await userRef.where('uid', '==', uid).get()
    userRefData.forEach((snap) => {
      userRefId = snap.id
    })

    // await busRef.doc(busData?.busId).update({
    //   seatBooked: firebase.firestore.FieldValue.length,
    // })

    await userRef.doc(userRefId).update({
      bookingId: firebase.firestore.FieldValue.arrayUnion(bookingData.id),
    })
    dispatch(
      bookingSuccess({
        ...busData,
        passangerName: name,
        passangerId: uid,
        id: bookingData.id,
      })
    )
  }
}

//my booking list page actions

export const fetchMyBookingStart = () => {
  return {
    type: actionTypes.FETCH_MY_BOOKINGLIST_START,
  }
}

export const fetchMyBookingFailed = () => {
  return {
    type: actionTypes.FETCH_MY_BOOKINGLIST_FAILED,
  }
}

export const fetchMyBookingSuccess = (data) => {
  return {
    type: actionTypes.FETCH_MY_BOOKINGLIST_SUCCESS,
    payload: data,
  }
}

export const fetchMyBooking = (uid) => {
  return async (dispatch, getState) => {
    // const { name, uid } = getState().user?.userDetails
    if (!uid) return
    dispatch(fetchMyBookingStart())
    const bookingRef = projectFirestore.collection('bookingDetails')

    const bookingRefData = await bookingRef
      .where('passangerId', '==', uid)
      .get()
    const bookingData = []
    bookingRefData.forEach((doc) => {
      bookingData.push({ ...doc.data(), id: doc.id })
    })
    dispatch(fetchMyBookingSuccess(bookingData))
  }
}

//admin booking

export const fetchAdminBookingStart = () => {
  return {
    type: actionTypes.FETCH_ADMIN_BOOKINGLIST_START,
  }
}

export const fetchAdminBookingFailed = (error) => {
  return {
    type: actionTypes.FETCH_ADMIN_BOOKINGLIST_FAILED,
    payload: error,
  }
}

export const fetchAdminBookingSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ADMIN_BOOKINGLIST_SUCCESS,
    payload: data,
  }
}

export const fetchAdminBooking = () => {
  return async (dispatch) => {
    dispatch(fetchAdminBookingStart())
    try {
      const bookingRef = projectFirestore.collection('bookingDetails')
      const bookingRefData = await bookingRef.orderBy('date').get()

      const allBookingData = []
      bookingRefData.forEach((snap) => {
        allBookingData.push({ ...snap.data(), id: snap.id })
      })
      dispatch(fetchAdminBookingSuccess(allBookingData))
    } catch (err) {
      dispatch(fetchAdminBookingFailed(err.message))
    }
  }
}
