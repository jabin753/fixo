import { Module } from 'vuex'
import { RootState } from '../store.types'
import {
  SnackbarGetters,
  SnackbarMutations,
  SnackbarState
} from './snackbar.types'

export const snackbarState: SnackbarState = {
  color: '',
  text: '',
  isVisible: false
}

export const snackbarGetters: SnackbarGetters = {
  color: state => state.color,
  isVisible: state => state.isVisible,
  text: state => state.text
}

export const snackbarMutations: SnackbarMutations = {
  MESSAGE: (state, payload: SnackbarState) => {
    state.color = payload.color || 'blue'
    state.text = payload.text || ''
    state.isVisible = true
  },
  SET_SNACKBAR: (state, isVisible) => {
    state.isVisible = isVisible
    setTimeout(() => {
      if (!isVisible) {
        state.color = ''
        state.text = ''
      }
    }, 500)
  }
}

export const snackbarModule: Module<SnackbarState, RootState> = {
  state: snackbarState,
  getters: snackbarGetters,
  mutations: snackbarMutations,
  namespaced: true
}
