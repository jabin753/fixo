<template>
  <v-app id="inspire">
    <v-app-bar app color="white" class="d-print-none">
      <v-img
        max-height="50"
        max-width="50"
        :src="require('@/assets/logo.svg')"
        :lazy-src="require('@/assets/logo.svg')"
      />
      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="link in links" :key="link.to" :to="link.to">
          {{ link.name }}
        </v-tab>
      </v-tabs>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar>
            <v-img
              v-bind="attrs"
              v-on="on"
              :src="currentUserProfilePic || require('@/assets/user.png')"
              class="hidden-sm-and-down"
              max-height="50"
              max-width="50"
            />
          </v-avatar>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view></router-view>
    </v-main>
    <v-snackbar v-model="vSnackbarModel" :color="vSnackbarColor" app>
      {{ vSnackbarText }}
      <template #action="{attrs}">
        <v-btn text @click="vSnackbarModel = false" v-bind="attrs"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { auth, AuthUser } from '@/plugins/firebase'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component<MainLayout>({
  name: 'MainLayout'
})
export default class MainLayout extends Vue {
  // v-snackbar
  get vSnackbarModel() {
    return this.$store.getters['snackbar/isVisible'] as boolean
  }
  set vSnackbarModel(isVisible: boolean) {
    this.$store.commit('snackbar/SET_SNACKBAR', isVisible)
  }
  get vSnackbarColor() {
    return this.$store.getters['snackbar/color'] as string
  }
  get vSnackbarText() {
    return this.$store.getters['snackbar/text']
  }

  get currentUserProfilePic() {
    const currentUser = this.$store.getters['currentUser'] as AuthUser
    return currentUser.photoURL
  }
  links = [
    { name: 'Reparaciones', to: '/app/repair' },
    { name: 'Clientes', to: '/app/cliente' },
    { name: 'Configuración', to: '/app/config' }
  ]
  logout(): void {
    auth.signOut()
  }
}
</script>
