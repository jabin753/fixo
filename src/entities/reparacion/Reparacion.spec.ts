import { Reparacion } from './Reparacion'
import { mockReparacionesData } from './Reparacion.mock'

const single = mockReparacionesData()[0]

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
