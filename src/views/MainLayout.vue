<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat elevation="2">
      <v-img
        max-height="50"
        max-width="50"
        :src="require('@/assets/logo.svg')"
        :lazy-src="require('@/assets/logo.svg')"
      />
      <v-btn
        class="ml-5"
        text
        @click="$router.go(-1)"
        v-if="$route.name && $route.name.includes('Details')"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
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
  </v-app>
</template>

<script lang="ts">
import { auth, AuthUser } from '@/plugins/firebase'
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'MainLayout'
})
export default class MainLayout extends Vue {
  get currentUserProfilePic() {
    const currentUser = this.$store.getters['currentUser'] as AuthUser
    return currentUser.photoURL
  }
  links = [
    { name: 'Reparaciones', to: '/app/repair' },
    { name: 'Chat', to: '/app/chat' },
    { name: 'Configuración', to: '/app/config' }
  ]
  logout(): void {
    auth.signOut()
  }
}
</script>
