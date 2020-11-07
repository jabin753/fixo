<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" size="55">
          <v-img alt="Fixo" :src="require('@/assets/logo.svg')" />
        </v-avatar>

        <v-btn v-for="(link, index) in links" :key="index" text :to="link.to">
          {{ link.name }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  name: "MainLayout"
})
export default class MainLayout extends Vue {
  links = [
    { name: "Reparaciones", to: "/repair" },
    { name: "Chat", to: "/chat" },
    { name: "Configuración", to: "config" }
  ];
}
</script>
