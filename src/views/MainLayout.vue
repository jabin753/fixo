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
    { name: "Reparaciones", to: "/app/repair" },
    { name: "Chat", to: "/app/chat" },
    { name: "Configuración", to: "/app/config" }
  ];
}
</script>
