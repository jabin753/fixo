import { AuthUser, db } from '@/plugins/firebase'
import { Reparacion } from '@/types'
import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
Vue.use(Vuex)
type Store = {
  reparaciones: Reparacion[]
  currentUser: AuthUser | null
}
export default new Vuex.Store<Store>({
  state: {
    reparaciones: [],
    currentUser: null
  },
  mutations: {
    AUTH_SUCCESS: (state, payload: AuthUser) => {
      state.currentUser = payload
    },
    LOGOUT_USER: state => {
      state.currentUser = null
    },
    ...vuexfireMutations
  },
  actions: {
    FIREBASE_AUTH: ({ commit }, payload) => {
      commit('AUTH_SUCCESS', payload)
    },
    FIREBASE_LOGOUT: ({ commit }) => {
      commit('LOGOUT_USER')
    },
    bindReparacionesRef: firestoreAction(context => {
      return context.bindFirestoreRef(
        'reparaciones',
        db.collection('reparaciones').orderBy('receiptDate', 'desc')
      )
    }),
    fetchReparacionById: firestoreAction((context, id) => {
      return context.bindFirestoreRef(
        'reparaciones',
        db.collection('reparaciones').doc(id)
      )
    }),
    saveReparacion: firestoreAction((context, payload) => {
      return db.collection('reparaciones').add(payload)
    }),
    updateReparacion: firestoreAction((context, payload) => {
      return db
        .collection('reparaciones')
        .doc(payload.id)
        .update(payload)
    })
  },
  getters: {
    currentUser: state => state.currentUser,
    reparaciones: state => state.reparaciones,
    reparacionesById: state => (id: string) =>
      state.reparaciones.find(rep => rep.id === id)
  }
})
