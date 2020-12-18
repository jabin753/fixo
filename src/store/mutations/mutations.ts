import { vuexfireMutations } from 'vuexfire'
import { Mutations } from './mutations.types'

export const mutations: Mutations = {
  AUTH_SUCCESS(state, payload): void {
    state.currentUser = payload
  },
  LOGOUT_USER(state): void {
    state.currentUser = null
  },
  ...vuexfireMutations
}
