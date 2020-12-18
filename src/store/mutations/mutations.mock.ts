import { MutationsMock } from './mutations.types'

export const mockMutations = (): MutationsMock => ({
  AUTH_SUCCESS: jest.fn(),
  LOGOUT_USER: jest.fn()
})
