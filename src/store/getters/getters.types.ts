import { ClienteData, ReparacionData } from '@/entities'
import { AuthUser } from '@/plugins/firebase'
import { GetterTree, Store } from 'vuex'
import { RootState, State } from '../store.types'

export interface Getters extends GetterTree<State, RootState> {
  clientes(this: Store<State>, state: State): ClienteData[]
  clientesById(
    this: Store<State>,
    state: State
  ): (id: string) => ClienteData | undefined
  currentUser(this: Store<State>, state: State): AuthUser | null
  reparaciones(this: Store<State>, state: State): ReparacionData[]
  reparacionesById(
    this: Store<State>,
    state: State
  ): (id: string) => ReparacionData | undefined
}

export interface GettersMock extends Getters {
  clientes: jest.Mock<ClienteData[]>
  clientesById: jest.Mock<(id: string) => ClienteData | undefined>
  currentUser: jest.Mock<AuthUser>
  reparaciones: jest.Mock<ReparacionData[]>
  reparacionesById: jest.Mock<(id: string) => ReparacionData | undefined>
}
