<template>
  <v-card ripple :to="{ path: `repair/${this.$props.item.id}` }">
    <v-card-title class="subheading font-weight-bold blue--text">
      {{ item.name }} - {{ item.deviceType }}
    </v-card-title>

    <v-list dense>
      <v-list-item>
        <v-list-item-content>Recepción:</v-list-item-content>
        <v-list-item-content>
          {{ item.receiptDate | firebaseTimestamp }}
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>Detalles:</v-list-item-content>
        <v-list-item-content>
          {{ item.details }}
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>Teléfono:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{ item.phone }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Reparacion } from '@/types'
@Component<RepairItem>({
  name: 'RepairItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  filters: {
    firebaseTimestamp(fTimestamp: any) {
      return fTimestamp.toDate().toLocaleString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
})
export default class RepairItem extends Vue {
  $props!: { item: Reparacion }
}
</script>
