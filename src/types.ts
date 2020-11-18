export interface Reparacion {
  id?: string
  name: string
  phone: string
  deviceType: string
  details: string
  isReviewed: boolean
  tags: string[]
  receiptDate: string
  deliveredDate?: string
}

export type vForm = {
  /**
   * 	Resets the state of all registered inputs (inside the form) to {} for arrays and null for all other values. Resets errors bag when using the lazy-validation prop.
   */
  reset(): void

  /**
   * Resets validation of all registered inputs without modifying their state
   */
  resetValidation(): void

  /**
   * 	Validates all registered inputs. Returns true if successful and false if not
   */
  validate(): boolean
}
