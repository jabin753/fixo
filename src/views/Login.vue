<template>
  <v-app>
    <v-container
      style="position: relative;top: 13%;"
      class="d-flex justify-center align-content-center"
    >
      <v-card flat width="400">
        <v-card-title primary-title>
          <h4>Iniciar sesión</h4>
        </v-card-title>
        <v-form @submit.prevent="authUser">
          <v-text-field
            prepend-icon="mdi-account"
            name="user"
            label="Correo electrónico"
            v-model="user"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-lock"
            name="pass"
            label="Contraseña"
            type="password"
            v-model="pass"
          ></v-text-field>
          <v-card-actions>
            <v-btn primary large type="submit">Ingresar</v-btn>
            <v-spacer></v-spacer>
            <v-btn primary large @click="authG" color="info">
              <v-icon>mdi-google</v-icon>
              Ingresar con google</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { auth, gAuth } from '@/plugins/firebase'

@Component<LoginPage>({
  name: 'LoginPage',
  beforeCreate() {
    setTimeout(() => {
      const user = this.$store.getters['currentUser']
      if (user) {
        this.$router.push('/app')
      }
    }, 500)
  }
})
export default class LoginPage extends Vue {
  user = ''
  pass = ''
  authUser() {
    auth
      .signInWithEmailAndPassword(this.user, this.pass)
      .catch(err => {
        console.error(err)
      })
      .then(user => {
        if (user) {
          this.$router.push('/app')
        }
      })
  }
  async authG() {
    const googleUserAutenticated = await auth
      .signInWithPopup(new gAuth())
      .catch(err => {
        console.error(err)
      })
    if (googleUserAutenticated) this.$router.push('/app')
  }
}
</script>
