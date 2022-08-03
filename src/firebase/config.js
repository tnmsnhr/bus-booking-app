// Import the functions you need from the SDKs you need
import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBu_d40EIaQyP0Glbjp2sRhpJugsgdgBCo',
  authDomain: 'bus-booking-1812d.firebaseapp.com',
  projectId: 'bus-booking-1812d',
  storageBucket: 'bus-booking-1812d.appspot.com',
  messagingSenderId: '322880875729',
  appId: '1:322880875729:web:6c3dfb2be03985066169f0',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const auth = firebase.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const timeStamp = firebase.firestore.FieldValue.serverTimestamp

export { projectStorage, projectFirestore, timeStamp, auth, googleAuthProvider }
