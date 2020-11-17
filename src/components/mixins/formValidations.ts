export const requiredRule = (v: string): boolean | string =>
  !!v || 'Dato requerido'
export const digitosRule = (v: string): boolean | string =>
  /^\d+$/.test(v) || 'Debe contener solo números'
export const decimalRule = (v: string): boolean | string =>
  /^\d+(\.\d{1,4})?$/.test(v) || 'Ingrese cantidad válida'
export const rfcRule = (v: string): boolean | string =>
  v.length <= 13 || 'Debe contener 13 dígitos'
export const correoRule = (v: string): boolean | string =>
  /.+@.+/.test(v) || 'E-mail no válido'
