import { firebaseAuth, firebaseDB } from "../firebase"

// ACTION TYPES
const USER_AUTH = 'user/USER_AUTH'
const USER_AUTH_LOGOUT = 'user/USER_AUTH_LOGOUT'
const USER_AUTH_DEFAULT = 'user/USER_AUTH_DEFAULT'
const initialState = {}

// REDUCERS
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        user: action.payload
      };
    case USER_AUTH_LOGOUT:
      return {
        ...state,
        user: undefined
      };
    case USER_AUTH_DEFAULT:
      return state
    default:
      return state
  }
}

// ACTIONS
export function signUp(email, pwd) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pwd)
    .then(saveUser)
    .catch(error => console.log('Firebase error when authenticating', error))
}


export function login(email, pwd) {
  return firebaseAuth.signInWithEmailAndPassword(email, pwd)
}

export function checkUserAuth() {
  return (dispatch) => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: USER_AUTH,
          payload: user
        });
      }
    });
  };
}

export function saveUser(user) {
  return (dispatch) => {
    firebaseDB.ref(`users/${user.uid}`)
      .update({
        displayName: user.displayName,
        email: user.email,
        providerData: user.providerData
      })
      .then(() => {
        dispatch({
          type: USER_AUTH_DEFAULT
        });
      });
  };
}

export function logout(user) {
  return (dispatch) => {
    // this is fix for logout functions as it doesn't unregister user from firebase (closing tab, browser, does it automatically)
    firebaseDB.ref(`users/${user.uid}/connections`).remove()
    firebaseDB.ref(`users/${user.uid}/lastOnline`).set(new Date().toISOString())

    firebaseAuth.signOut().then(() => {
      dispatch({
        type: USER_AUTH_LOGOUT
      });
    });
  };
}

export function logUserPresence(user) {
  // https://firebase.google.com/docs/database/web/offline-capabilities

  // since I can connect from multiple devices or browser tabs, we store each connection instance separately
// any time that connectionsRef's value is null (i.e. has no children) I am offline
  const myConnectionsRef = firebaseDB.ref(`users/${user.uid}/connections`)

// stores the timestamp of my last disconnect (the last time I was seen online)

  const lastOnlineRef = firebaseDB.ref(`users/${user.uid}/lastOnline`)
  const connectedRef = firebaseDB.ref(`.info/connected`)
  connectedRef.on('value', function (snap) {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

        // add this device to my connections list
        // this value could contain info about the device or a timestamp too
        const con = myConnectionsRef.push(true);

        // when I disconnect, remove this device
        con.onDisconnect().remove();

        // when I disconnect, update the last time I was seen online
        lastOnlineRef.onDisconnect().set(new Date().toISOString())
      }
    },
  );

  return {
    type: USER_AUTH_DEFAULT
  };
}
