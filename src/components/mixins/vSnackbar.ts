import Vue from 'vue'
import Component from 'vue-class-component'
import { SnackbarState } from '@/store'

@Component
export class VSnackbarMixin extends Vue {
  $toast(message: SnackbarState['text'], options: Partial<SnackbarState> = {}) {
    this.$store.commit('snackbar/MESSAGE', { ...options, text: message })
  }
}
