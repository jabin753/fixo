import { mockClientesData, mockReparacionesData } from '@/entities'
import { mockActions } from './actions'
import { mockGetters } from './getters'
import { mockMutations } from './mutations'
import { mockSnackbarState } from './snackbar'
import { RootState, State, StoreMock } from './store.types'

export const mockRootState = (): RootState => ({
  clientes: mockClientesData(),
  currentUser: null,
  reparaciones: mockReparacionesData()
})

export const mockState = (): State => ({
  ...mockRootState(),
  snackbar: mockSnackbarState()
})

export const mockStore = (): StoreMock => ({
  state: mockState(),
  actions: mockActions(),
  mutations: mockMutations(),
  getters: mockGetters(),
  replaceState: jest.fn(),
  dispatch: jest.fn(),
  commit: jest.fn(),
  subscribe: jest.fn(),
  subscribeAction: jest.fn(),
  watch: jest.fn(),
  registerModule: jest.fn(),
  unregisterModule: jest.fn(),
  hotUpdate: jest.fn(),
  hasModule: jest.fn()
})
