import { firebaseRef, firebaseAuth } from '../firebase'

// ACTION TYPES
const USER_AUTH = 'user/USER_AUTH'
const initialState = {}

// REDUCERS
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}

// ACTIONS
export function signUp (email, pwd) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pwd)
    .then(saveUser)
    .catch(error => console.log('Firebase error when authenticating', error))
}

export function logout () {
  return firebaseAuth.signOut()
}

export function login (email, pwd) {
  return firebaseAuth.signInWithEmailAndPassword(email, pwd)
}

export function checkUserAuth () {
  return dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: USER_AUTH,
          payload: user
        })
      }
    })
  }
}
export function saveUser (user) {
  return firebaseRef.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}