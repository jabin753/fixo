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
              <!-- <template v-slot:header>
                <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
                  <v-toolbar-title>This is a header</v-toolbar-title>
                </v-toolbar>
              </template> -->

              <template v-slot:default="props">
                <v-row>
                  <v-col v-for="item in props.items" :key="item.name" cols="12">
                    <repair-item :item="item" />
                  </v-col>
                </v-row>
              </template>

              <!-- <template v-slot:footer>
                <v-toolbar class="mt-2" color="indigo" dark flat>
                  <v-toolbar-title class="subheading">
                    This is a footer
                  </v-toolbar-title>
                </v-toolbar>
              </template> -->
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
import RepairItem from "@/components/RepairItem.vue";
@Component<MainLayout>({
  name: "RepairPage",
  // firestore: {
  //   reparaciones: db.collection("reparaciones")
  // },
  components: {
    RepairItem
  }
})
export default class MainLayout extends Vue {
  reparaciones = [
    {
      receiptDate: { seconds: 1604778300, nanoseconds: 0 },
      isReviewed: false,
      details: "Celular no prende",
      name: "Joseph Jabin",
      deviceType: "cellphone",
      phone: "7531314257",
      deliveredDate: { seconds: 1604948400, nanoseconds: 0 },
      tags: ["Cellphone", "shutdown"]
    }
  ];
}
</script>
