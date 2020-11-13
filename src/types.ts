export interface Reparacion {
  name: string
  phone: string
  deviceType: string
  details: string
  isReviewed: boolean
  tags: string[]
  receiptDate: string
  deliveredDate?: string
}
