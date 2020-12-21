import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { prepareActions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { snackbarModule as snackbar } from './snackbar'
import { State } from './store.types'
import { Firestore } from '@/plugins/firebase'

Vue.use(Vuex)

export const makeStore = (db: Firestore): Store<State> =>
  new Vuex.Store<State>({
    state: {
      clientes: [],
      currentUser: null,
      reparaciones: [],
      snackbar: {
        color: '',
        isVisible: false,
        text: ''
      }
    },
    actions: prepareActions(db),
    mutations,
    getters,
    modules: {
      snackbar
    }
  })
