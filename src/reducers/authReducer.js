import { firebaseRef, firebaseAuth } from '../constants'

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

export function saveUser (user) {
  return firebaseRef.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}