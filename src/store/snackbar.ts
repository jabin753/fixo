import { Module } from 'vuex'
export type stateSnackbar = {
  color: string
  text: string
  isVisible: boolean
}
export const snackbar: Module<stateSnackbar, {}> = {
  namespaced: true,
  state: {
    color: '',
    text: '',
    isVisible: false
  },
  mutations: {
    SET_SNACKBAR: (state, isVisible) => {
      state.isVisible = isVisible
      setTimeout(() => {
        if (!isVisible) {
          state.color = ''
          state.text = ''
        }
      }, 500)
    },
    MESSAGE: (state, payload: stateSnackbar) => {
      state.color = payload.color || 'blue'
      state.text = payload.text || ''
      state.isVisible = true
    }
  },
  /** getters[snackbar/**] */
  getters: {
    color: state => state.color,
    text: state => state.text,
    isVisible: state => state.isVisible
  }
}
