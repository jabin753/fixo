import { ClienteData, ReparacionData } from '@/entities'
import { AuthUser } from '@/plugins/firebase'
import { Action, ActionContext, ActionTree, Store } from 'vuex'
import { RootState, State } from '../store.types'

export type Context = ActionContext<State, RootState>

export interface Actions extends ActionTree<State, State> {
  bindReparacionesRef: Action<State, RootState>
  fetchReparacionById: Action<State, RootState>
  updateReparacion(
    this: Store<State>,
    context: Context,
    payload: Partial<ReparacionData>
  ): void
  saveReparacion(
    this: Store<State>,
    context: Context,
    payload: ReparacionData
  ): void
  bindClientesRef: Action<State, RootState>
  fetchClientesById: Action<State, RootState>
  saveCliente(this: Store<State>, context: Context, payload: ClienteData): void
  updateCliente(
    this: Store<State>,
    context: Context,
    payload: Partial<ClienteData>
  ): void
  FIREBASE_AUTH(this: Store<State>, context: Context, payload: AuthUser): void
  FIREBASE_LOGOUT(this: Store<State>, context: Context): void
}

export interface ActionsMock extends Actions {
  bindReparacionesRef: jest.Mock<void>
  fetchReparacionById: jest.Mock<void>
  updateReparacion: jest.Mock<void>
  saveReparacion: jest.Mock<void>
  bindClientesRef: jest.Mock<void>
  fetchClientesById: jest.Mock<void>
  saveCliente: jest.Mock<void>
  updateCliente: jest.Mock<void>
  FIREBASE_AUTH: jest.Mock<void>
  FIREBASE_LOGOUT: jest.Mock<void>
}
