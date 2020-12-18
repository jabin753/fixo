import { ActionContext } from 'vuex'
import { mockGetters } from '../getters'
import { mockRootState, mockState } from '../store.mock'
import { RootState, State } from '../store.types'
import { ActionsMock } from './actions.types'

export const mockActionsContext = (): ActionContext<State, RootState> => ({
  commit: jest.fn(),
  dispatch: jest.fn(),
  state: mockState(),
  getters: mockGetters(),
  rootState: mockRootState(),
  rootGetters: {}
})

export const mockActions = (): ActionsMock => ({
  FIREBASE_AUTH: jest.fn(),
  FIREBASE_LOGOUT: jest.fn(),
  bindClientesRef: jest.fn(),
  bindReparacionesRef: jest.fn(),
  fetchClientesById: jest.fn(),
  fetchReparacionById: jest.fn(),
  saveCliente: jest.fn(),
  saveReparacion: jest.fn(),
  updateCliente: jest.fn(),
  updateReparacion: jest.fn()
})
