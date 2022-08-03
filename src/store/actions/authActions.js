import * as actionTypes from '../actions/actionTypes'
import { auth, googleAuthProvider } from '../../firebase/config'
import { projectFirestore } from '../../firebase/config'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const changeUserRoleStart = () => {
  return {
    type: actionTypes.CHANGE_USER_ROLE_START,
  }
}

export const changeUserRoleFailed = (err) => {
  return {
    type: actionTypes.CHANGE_USER_ROLE_FAILED,
    payload: err,
  }
}

export const changeUserRoleSuccess = (data) => {
  return {
    type: actionTypes.CHANGE_USER_ROLE_SUCCESS,
    payload: data,
  }
}

export const signUpSuccess = (userData) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload: userData,
  }
}

export const loginSuccess = (userDetails) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: userDetails,
  }
}

export const logInFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error: error,
  }
}

export const signUpFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    error: error,
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('uid')
  localStorage.removeItem('name')
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const changeUserRole = () => {
  return (dispatch, getState) => {
    const { isAdmin, uid } = getState().user?.userDetails
    dispatch(changeUserRoleStart())
    const userRef = projectFirestore.collection('users')
    userRef
      .where('uid', '==', uid)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          userRef
            .doc(doc?.id)
            .update({ isAdmin: !isAdmin })
            .then((data) => {
              dispatch(changeUserRoleSuccess(isAdmin))
            })
            .catch((err) => {
              dispatch(changeUserRoleFailed(err.message))
            })
        })
      })
      .catch((err) => {
        dispatch(changeUserRoleFailed(err.message))
      })
  }
}

export const signIn = (loginData) => {
  return (dispatch) => {
    dispatch(authStart())
    const userRef = projectFirestore.collection('users')
    userRef
      .where('email', '==', loginData.email)
      .where('password', '==', loginData.password)
      .get()
      .then((snapShot) => {
        if (snapShot.docs?.length > 0) {
          snapShot.forEach((doc) => {
            localStorage.setItem('name', doc.data().name)
            localStorage.setItem('uid', doc.data().uid)
            dispatch(loginSuccess(doc.data()))
          })
        } else {
          dispatch(logInFail('Invalid Email or Password'))
        }
      })
      .catch((err) => {
        dispatch(logInFail(err.message))
      })
  }
}

export const googleSignIn = () => {
  return (dispatch) => {
    dispatch(authStart())
    const userRef = projectFirestore.collection('users')
    auth.signInWithPopup(googleAuthProvider).then((result) => {
      const { displayName, email, uid, refreshToken } = result.user
      let isExistingUser = false
      let userData = {}
      userRef.where('uid', '==', uid).onSnapshot((doc) => {
        doc.forEach((snap) => {
          if (snap.exists) isExistingUser = true
          userData = snap.data()
        })
        if (!isExistingUser) {
          userRef
            .add({
              uid: uid,
              bookingId: [],
              name: displayName,
              isAdmin: false,
              email,
            })
            .then(() => {
              localStorage.setItem('uid', uid)
              localStorage.setItem('token', refreshToken)
              localStorage.setItem('name', displayName)
              dispatch(loginSuccess(userData))
            })
            .catch((err) => {
              dispatch(signUpFail(err.message))
            })
        } else {
          dispatch(loginSuccess(userData))
        }
      })
    })
  }
}

export const signUp = (signUpData) => {
  return (dispatch) => {
    dispatch(authStart())

    const collectionRef = projectFirestore.collection('users')

    auth
      .createUserWithEmailAndPassword(signUpData.email, signUpData.password)
      .then(({ user }) => {
        localStorage.setItem('uid', user.uid)
        localStorage.setItem('token', user.refreshToken)
        localStorage.setItem('name', signUpData.name)
        dispatch(
          signUpSuccess({
            name: signUpData.name,
            uid: user.uid,
            token: user.refreshToken,
          })
        )

        collectionRef.add({
          ...signUpData,
          uid: user.uid,
          bookingId: [],
          name: signUpData?.name,
          isAdmin: false,
        })
      })
      .catch((err) => {
        dispatch(signUpFail(err.message))
      })
  }
}

export const authCheckState = () => {
  return (dispatch) => {
    dispatch(authStart())
    const uid = localStorage.getItem('uid')

    projectFirestore
      .collection('users')
      .where('uid', '==', uid)
      .onSnapshot((snapShot) => {
        snapShot.forEach((doc) => {
          localStorage.setItem('name', doc.data().name)
          dispatch(loginSuccess(doc.data()))
          // dispatch(fetchUser(uid))
        })
      })

    if (!uid) {
      dispatch(logout())
    }
  }
}
