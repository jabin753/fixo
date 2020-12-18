import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { makeRouter } from './router'
import { makeStore } from './store'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import { prepareFirebase, onAuthStateChange } from '@/plugins/firebase'

Vue.use(firestorePlugin)
Vue.config.productionTip = false

const firebase = prepareFirebase()

const store = makeStore(firebase.firestore())

const router = makeRouter(store)

onAuthStateChange(firebase.auth(), store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
