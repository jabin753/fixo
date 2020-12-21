import { SnackbarState } from './snackbar.types'

export const mockSnackbarState = (): SnackbarState => ({
  color: 'blue',
  isVisible: true,
  text: 'Snackbar showing this message.'
})
