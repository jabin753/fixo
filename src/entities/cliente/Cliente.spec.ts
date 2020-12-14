import { single } from './Cliente.mock'
import { Cliente } from './Cliente'

describe('Instancia de cliente', () => {
  test('Con argumentos', () => {
    const cliente = new Cliente(single)
    const { nombre, correo, id, telefono } = single

    expect(cliente.nombre).toBe(nombre)
    expect(cliente.correo).toBe(correo)
    expect(cliente.id).toBe(id)
    expect(cliente.telefono).toBe(telefono)
  })

  test('Sin argumentos', () => {
    const cliente = new Cliente()
    expect(cliente.nombre).toBe('')
  })
})

test('valid()', () => {
  const cliente1 = new Cliente(single)
  const cliente2 = new Cliente()

  expect(cliente1.valid()).toBeTruthy()
  expect(cliente2.valid()).toBeFalsy()
})
