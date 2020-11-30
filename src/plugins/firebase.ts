import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import store from '@/store'
import router from '@/router'
const firebaseConfig = {
  apiKey: 'AIzaSyCUy5MzaUTVHRp7-xdkfMDerchD96O18SI',
  authDomain: 'updownpv.firebaseapp.com',
  databaseURL: 'https://updownpv.firebaseio.com',
  projectId: 'updownpv',
  storageBucket: 'updownpv.appspot.com',
  messagingSenderId: '579913870267',
  appId: '1:579913870267:web:bd08d8065b9cc7e4beb29e',
  measurementId: 'G-13KYD5F14Y'
}

// Get a Firestore instance
const firebaseInstance = firebase.initializeApp(firebaseConfig)
export const db = firebaseInstance.firestore()
export const auth = firebaseInstance.auth()
export type CollectionReference<T> = firebase.firestore.CollectionReference<T>
export const gAuth = firebase.auth.GoogleAuthProvider

export type Timestamp = firebase.firestore.Timestamp
export type AuthUser = firebase.User

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    await store.dispatch('FIREBASE_AUTH', user)
  } else if (!user) {
    await store.dispatch('FIREBASE_LOGOUT')
    router.push({ name: 'LoginPage' })
  }
})
