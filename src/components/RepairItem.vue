<template>
  <v-card ripple :to="{ path: `repair/${this.$props.item.id}` }">
    <v-card-title class="subheading font-weight-bold blue--text">
      {{ reparacion.cliente.nombre }} - {{ reparacion.deviceType }}
    </v-card-title>

    <v-list dense>
      <v-list-item>
        <v-list-item-content>Recepción:</v-list-item-content>
        <v-list-item-content>
          {{ reparacion.dayReceipt() }}
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>Entrega:</v-list-item-content>
        <v-list-item-content>
          {{ reparacion.dayDelivered() }}
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>Detalles:</v-list-item-content>
        <v-list-item-content>
          {{ reparacion.details }}
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>Teléfono:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{ reparacion.cliente.telefono }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { ReparacionData, Reparacion } from '@/entities'
@Component<RepairItem>({
  name: 'RepairItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
})
export default class RepairItem extends Vue {
  $props!: { item: ReparacionData }
  get reparacion(): Reparacion {
    return new Reparacion(this.$props.item)
  }
}
</script>
