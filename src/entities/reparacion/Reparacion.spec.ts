import { Reparacion } from './Reparacion'
import { single } from './Reparacion.mock'
describe('Instancia', () => {
  test('Con argumento', () => {
    const reparacion = new Reparacion(single)
    expect(reparacion.id).toBe(single.id)
  })

  test('Sin argumento', () => {
    const reparacion = new Reparacion()
    expect(reparacion.id).toBeUndefined()
    expect(reparacion.cliente).toBe('')
    expect(reparacion.valid()).toBeFalsy()
  })
  // TODO: funciones pendientes
})
