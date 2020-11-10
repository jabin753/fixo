<template>
  <v-card>
    <v-card-title class="subheading font-weight-bold">
      {{ item.name }}
    </v-card-title>
    <v-divider></v-divider>

    <v-list dense>
      <v-list-item>
        <v-list-item-content>Detalles:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{ item.details }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Reparacion } from "@/types";
@Component<RepairItem>({
  name: "RepairItem",
  mounted() {
    console.log(this.$props.item);
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
})
export default class RepairItem extends Vue {
  $props!: { item: Reparacion };
}
</script>
