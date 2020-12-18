import { GetterTree, MutationTree, Store } from 'vuex'
import { RootState } from '../store.types'

export interface SnackbarState {
  color: string
  text: string
  isVisible: boolean
}

export interface SnackbarMutations extends MutationTree<SnackbarState> {
  MESSAGE(
    this: Store<SnackbarState>,
    state: SnackbarState,
    payload: SnackbarState
  ): void
  SET_SNACKBAR(
    this: Store<SnackbarState>,
    state: SnackbarState,
    payload: boolean
  ): void
}

export interface SnackbarGetters extends GetterTree<SnackbarState, RootState> {
  color(this: Store<SnackbarState>, state: SnackbarState): string
  text(this: Store<SnackbarState>, state: SnackbarState): string
  isVisible(this: Store<SnackbarState>, state: SnackbarState): boolean
}
