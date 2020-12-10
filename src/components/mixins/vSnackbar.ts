import Vue from 'vue'
import Component from 'vue-class-component'
import { stateSnackbar } from '@/store/snackbar'

@Component
export class VSnackbarMixin extends Vue {
  $toast(message: stateSnackbar['text'], options: Partial<stateSnackbar> = {}) {
    this.$store.commit('snackbar/MESSAGE', { ...options, text: message })
  }
}
