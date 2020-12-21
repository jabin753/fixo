import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Store } from '@/store'
import VueRouter from 'vue-router'

// Singleton Pattern
let firebaseInstance: firebase.app.App | null = null

export const prepareFirebase = (): firebase.app.App => {
  if (!firebaseInstance) {
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
    firebaseInstance = firebase.initializeApp(firebaseConfig)

    if (location.hostname === 'localhost') {
      firebaseInstance.firestore().useEmulator('localhost', 8081)
      firebaseInstance.auth().useEmulator('http://localhost:9099')
    }
  }

  return firebaseInstance
}

export const onAuthStateChange = (
  auth: firebase.auth.Auth,
  store: Store,
  router: VueRouter
) => {
  auth.onAuthStateChanged(async user => {
    if (user) {
      await store.dispatch('FIREBASE_AUTH', user)
    } else if (!user) {
      await store.dispatch('FIREBASE_LOGOUT')
      router.push({ name: 'LoginPage' })
    }
  })
}

export const db = prepareFirebase().firestore()
export const auth = prepareFirebase().auth()

export type Firestore = firebase.firestore.Firestore
export const FieldValue = firebase.firestore.FieldValue
export type CollectionReference<T> = firebase.firestore.CollectionReference<T>
export type DocumentReference<T> = firebase.firestore.DocumentReference<T>
export const gAuth = firebase.auth.GoogleAuthProvider
export type Timestamp = firebase.firestore.Timestamp
export type AuthUser = firebase.User
