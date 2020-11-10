import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCUy5MzaUTVHRp7-xdkfMDerchD96O18SI",
  authDomain: "updownpv.firebaseapp.com",
  databaseURL: "https://updownpv.firebaseio.com",
  projectId: "updownpv",
  storageBucket: "updownpv.appspot.com",
  messagingSenderId: "579913870267",
  appId: "1:579913870267:web:bd08d8065b9cc7e4beb29e",
  measurementId: "G-13KYD5F14Y"
};

// Get a Firestore instance
const firebaseInstance = firebase.initializeApp(firebaseConfig);
export const db = firebaseInstance.firestore();
export const auth = firebaseInstance.auth();
export const gAuth = firebase.auth.GoogleAuthProvider;

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
