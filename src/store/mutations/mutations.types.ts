import { AuthUser } from '@/plugins/firebase'
import { MutationTree, Store } from 'vuex'
import { State } from '../store.types'

export interface Mutations extends MutationTree<State> {
  AUTH_SUCCESS(this: Store<State>, state: State, payload: AuthUser): void
  LOGOUT_USER(this: Store<State>, state: State): void
}

export interface MutationsMock extends Mutations {
  AUTH_SUCCESS: jest.Mock<void>
  LOGOUT_USER: jest.Mock<void>
}
