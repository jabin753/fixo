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
  bindReparacionesRef: firestoreAction(({ bindFirestoreRef, getters }) => {
    const reparacionesRef = db
      .collection('users')
      .doc(getters['currentUser'].uid)
      .collection('reparaciones')
      .orderBy('receiptDate', 'desc')
    return bindFirestoreRef('reparaciones', reparacionesRef)
  }),
  fetchReparacionById: firestoreAction(({ bindFirestoreRef, getters }, id) => {
    return bindFirestoreRef(
      'reparaciones',
      db
        .collection('users')
        .doc(getters['currentUser'].uid)
        .collection('reparaciones')
        .doc(id)
    )
  }),
  saveReparacion: async ({ getters }, payload: ReparacionData) => {
    const newReparacion = await db
      .collection('users')
      .doc(getters['currentUser'].uid)
      .collection('reparaciones')
      .add({
        ...payload,
        cliente: db
          .collection('users')
          .doc(getters['currentUser'].uid)
          .collection('clientes')
          .doc(payload.cliente as string)
      })
    await db
      .collection('users')
      .doc(getters['currentUser'].uid)
      .collection('clientes')
      .doc(payload.cliente as string)
      .update({
        reparaciones: FieldValue.arrayUnion(
          db
            .collection('users')
            .doc(getters['currentUser'].uid)
            .collection('reparaciones')
            .doc(newReparacion.id)
        )
      })
  },
  updateReparacion: ({ getters }, payload: ReparacionData) => {
    const cliente = payload.cliente as ClienteData
    return db
      .collection('users')
      .doc(getters['currentUser'].uid)
      .collection('reparaciones')
      .doc(payload.id)
      .update({
        ...payload,
        cliente: db
          .collection('users')
          .doc(getters['currentUser'].uid)
          .collection('clientes')
          .doc(cliente.id)
      })
  },

  bindClientesRef: firestoreAction(({ bindFirestoreRef, getters }) => {
    return bindFirestoreRef(
      'clientes',
      db
        .collection('users')
        .doc(getters['currentUser'].uid)
        .collection('clientes')
    )
  }),
  fetchClientesById: firestoreAction(({ bindFirestoreRef, getters }, id) => {
    return bindFirestoreRef(
      'clientes',
      db
        .collection('users')
        .doc(getters['currentUser'].uid)
        .collection('reparaciones')
        .doc(id)
    )
  }),
  saveCliente: ({ getters }, payload) => {
    return db
      .collection('users')
      .doc(getters['currentUser'].uid)
      .collection('clientes')
      .add(payload)
  },
  updateCliente: ({ getters }, payload: ClienteData) => {
    const reparaciones = payload.reparaciones
    return db
      .collection('users')
      .doc(getters['currentUser'].uid)
      .collection('clientes')
      .doc(payload.id)
      .update({
        ...payload,
        reparaciones: reparaciones?.map(rep =>
          db
            .collection('users')
            .doc(getters['currentUser'].uid)
            .collection('reparaciones')
            .doc(rep.id)
        )
      })
  }
})
