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
import Vue from "vue";
import Component from "vue-class-component";
import { auth, gAuth } from "@/plugins/firebase";

@Component<LoginPage>({
  name: "LoginPage",
  mounted() {
    console.log(auth.currentUser);
  }
})
export default class LoginPage extends Vue {
  user = "";
  pass = "";
  async authUser() {
    const userAutenticated = await auth
      .signInWithEmailAndPassword(this.user, this.pass)
      .catch(err => {
        console.error(err);
      });
    console.log("Usuario autenticado:", userAutenticated);
    if (userAutenticated) this.$router.replace("/app");
  }
  async authG() {
    const googleUserAutenticated = auth
      .signInWithPopup(new gAuth())
      .catch(err => {
        console.error(err);
      });
    console.log("Bienvenido ", googleUserAutenticated);

    if (googleUserAutenticated) this.$router.replace("/app");
  }
}
</script>
