import { AuthUser, db, FieldValue } from '@/plugins/firebase'
import { ReparacionData, ClienteData } from '@/entities'
import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
Vue.use(Vuex)
type Store = {
  reparaciones: ReparacionData[]
  currentUser: AuthUser | null
  clientes: ClienteData[]
}
export default new Vuex.Store<Store>({
  state: {
    reparaciones: [],
    currentUser: null,
    clientes: []
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
    saveReparacion: async (context, payload: ReparacionData) => {
      const newReparacion = await db.collection('reparaciones').add({
        ...payload,
        cliente: db.collection('clientes').doc(payload.cliente as string)
      })
      await db
        .collection('clientes')
        .doc(payload.cliente as string)
        .update({
          reparaciones: FieldValue.arrayUnion(
            db.collection('reparaciones').doc(newReparacion.id)
          )
        })
    },
    updateReparacion: firestoreAction((context, payload: ReparacionData) => {
      const cliente = payload.cliente as ClienteData
      return db
        .collection('reparaciones')
        .doc(payload.id)
        .update({
          ...payload,
          cliente: db.collection('clientes').doc(cliente.id)
        })
    }),

    bindClientesRef: firestoreAction(context => {
      return context.bindFirestoreRef('clientes', db.collection('clientes'))
    }),
    fetchClientesById: firestoreAction((context, id) => {
      return context.bindFirestoreRef(
        'clientes',
        db.collection('reparaciones').doc(id)
      )
    }),
    saveCliente: firestoreAction((context, payload) => {
      return db.collection('clientes').add(payload)
    }),
    updateCliente: firestoreAction((context, payload: ClienteData) => {
      const reparaciones = payload.reparaciones
      return db
        .collection('clientes')
        .doc(payload.id)
        .update({
          ...payload,
          reparaciones: reparaciones?.map(rep =>
            db.collection('reparaciones').doc(rep.id)
          )
        })
    })
  },
  getters: {
    currentUser: state => state.currentUser,
    reparaciones: state => state.reparaciones,
    reparacionesById: state => (id: string) =>
      state.reparaciones.find(rep => rep.id === id),
    clientes: state => state.clientes,
    clientesById: state => (id: string) =>
      state.clientes.find(cliente => cliente.id === id)
  }
})
