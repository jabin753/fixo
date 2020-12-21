import { GettersMock } from './getters.types'

export const mockGetters = (): GettersMock => ({
  clientes: jest.fn(),
  clientesById: jest.fn(),
  currentUser: jest.fn(),
  reparaciones: jest.fn(),
  reparacionesById: jest.fn()
})
