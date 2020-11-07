<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-sheet rounded="lg">
          <v-list color="transparent">
            <v-list-item v-for="n in 5" :key="n" link>
              <v-list-item-content>
                <v-list-item-title> List Item {{ n }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item link color="grey lighten-4">
              <v-list-item-content>
                <v-list-item-title>
                  Refresh
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet min-height="70vh" rounded="lg">
          <!-- INICIO -->
          <v-container fluid>
            <v-data-iterator :items="reparaciones" hide-default-footer>
              <template v-slot:header>
                <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
                  <v-toolbar-title>This is a header</v-toolbar-title>
                </v-toolbar>
              </template>

              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="item in props.items"
                    :key="item.name"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                    <v-card>
                      <v-card-title class="subheading font-weight-bold">
                        {{ item.id }}
                      </v-card-title>

                      <v-divider></v-divider>

                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content>Nombre:</v-list-item-content>
                          <v-list-item-content class="align-end">
                            {{ item.nombre }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </template>

              <template v-slot:footer>
                <v-toolbar class="mt-2" color="indigo" dark flat>
                  <v-toolbar-title class="subheading">
                    This is a footer
                  </v-toolbar-title>
                </v-toolbar>
              </template>
            </v-data-iterator>
          </v-container>
          <!-- /INICIO -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { db } from "@/plugins/firebase";
@Component({
  name: "RepairPage",
  firestore: {
    reparaciones: db.collection("reparaciones")
  }
})
export default class MainLayout extends Vue {
  reparaciones = [];
}
</script>
