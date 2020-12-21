import { Getters } from './getters.types'

export const getters: Getters = {
  clientes: state => state.clientes,
  clientesById: state => (id: string) =>
    state.clientes.find(cliente => cliente.id === id),
  currentUser: state => state.currentUser,
  reparaciones: state => state.reparaciones,
  reparacionesById: state => (id: string) =>
    state.reparaciones.find(rep => rep.id === id)
}
