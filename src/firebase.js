import firebase from 'firebase'
import firebaseui from 'firebaseui'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCwz62-vr_JDn2ded-tXPkU1Qlis1SlYT4",
  authDomain: "time2sell-e2178.firebaseapp.com",
  databaseURL: "https://time2sell-e2178.firebaseio.com",
  storageBucket: "time2sell-e2178.appspot.com",
  messagingSenderId: "911938513703"
}

const FIREBASE_UI_CONFIG = {
  signInSuccessUrl: '/auth',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/tos'
}

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG)
export const firebaseDB = firebaseApp.database()
export const firebaseAuth = firebaseApp.auth()
export const firebaseAuthUI = new firebaseui.auth.AuthUI(firebaseAuth)
export const firebaseUIConfig = FIREBASE_UI_CONFIG
