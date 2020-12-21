import { ClienteData, ReparacionData } from '@/entities'
import { AuthUser } from '@/plugins/firebase'
import { Store as VuexStore } from 'vuex'
import { Actions } from './actions'
import { Getters } from './getters'
import { Mutations } from './mutations'
import { SnackbarState } from './snackbar'
export interface RootState {
  reparaciones: ReparacionData[]
  currentUser: AuthUser | null
  clientes: ClienteData[]
}

export interface State extends RootState {
  snackbar?: SnackbarState
}

export type Store = VuexStore<State>

export interface StoreMock extends Store {
  //$storage: any
  state: State
  actions: Actions
  mutations: Mutations
  getters: Getters
}
