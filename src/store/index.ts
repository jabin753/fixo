import { db } from '@/plugins/firebase'
import { Reparacion } from '@/types'
import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
Vue.use(Vuex)
type Store = {
  reparaciones: Reparacion[]
}
export default new Vuex.Store<Store>({
  state: {
    reparaciones: []
  },
  mutations: vuexfireMutations,
  actions: {
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
    reparaciones: state => state.reparaciones,
    reparacionesById: state => (id: string) =>
      state.reparaciones.find(rep => rep.id === id)
  }
})
