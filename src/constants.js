import firebase from 'firebase'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCwz62-vr_JDn2ded-tXPkU1Qlis1SlYT4",
  authDomain: "time2sell-e2178.firebaseapp.com",
  databaseURL: "https://time2sell-e2178.firebaseio.com",
  storageBucket: "time2sell-e2178.appspot.com",
  messagingSenderId: "911938513703"
}

firebase.initializeApp(FIREBASE_CONFIG)

const LOGGING_ENABLED = true;
const firebaseRef = firebase.database.ref()
const firebaseAuth = firebase.auth

module.exports = {
  firebaseRef,
  firebaseAuth,
  LOGGING_ENABLED
}