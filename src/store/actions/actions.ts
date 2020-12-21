import { Firestore, FieldValue } from '@/plugins/firebase'
import { ClienteData, ReparacionData } from '@/entities'
import { firestoreAction } from 'vuexfire'
import { Actions } from './actions.types'

export const prepareActions = (db: Firestore): Actions => ({
  FIREBASE_AUTH: ({ commit }, payload) => {
    commit('AUTH_SUCCESS', payload)
  },
  FIREBASE_LOGOUT: ({ commit }) => {
    commit('LOGOUT_USER')
  },
  bindReparacionesRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef(
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
  updateReparacion: (context, payload: ReparacionData) => {
    const cliente = payload.cliente as ClienteData
    return db
      .collection('reparaciones')
      .doc(payload.id)
      .update({
        ...payload,
        cliente: db.collection('clientes').doc(cliente.id)
      })
  },

  bindClientesRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('clientes', db.collection('clientes'))
  }),
  fetchClientesById: firestoreAction((context, id) => {
    return context.bindFirestoreRef(
      'clientes',
      db.collection('reparaciones').doc(id)
    )
  }),
  saveCliente: (context, payload) => {
    return db.collection('clientes').add(payload)
  },
  updateCliente: (context, payload: ClienteData) => {
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
  }
})
