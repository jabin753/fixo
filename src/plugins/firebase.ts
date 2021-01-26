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
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: process.env.VUE_APP_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_DATABASE_URL,
      projectId: process.env.VUE_APP_PROJECT_ID,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_APP_ID,
      measurementId: process.env.VUE_APP_MEASUREMENT_ID
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
