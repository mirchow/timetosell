import firebase from "firebase";
import firebaseui from "firebaseui";


const firebaseConfig = {
  apiKey: "AIzaSyCwz62-vr_JDn2ded-tXPkU1Qlis1SlYT4",
  authDomain: "time2sell-e2178.firebaseapp.com",
  databaseURL: "https://time2sell-e2178.firebaseio.com",
  storageBucket: "time2sell-e2178.appspot.com",
  messagingSenderId: "911938513703"
};


const uiConfig = {
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseAuthUI = new firebaseui.auth.AuthUI(firebaseAuth);
export const firebaseUIConfig = uiConfig;
export const firebaseDb = firebaseApp.database();