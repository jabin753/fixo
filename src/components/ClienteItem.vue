<template>
  <v-card v-if="reparacion" :to="{ path: `cliente/${this.$props.item.id}` }">
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="2" lg="1">
          <v-avatar class="mr-5">
            <v-img :src="require('@/assets/user.svg')"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="10" lg="6" class="mt-2">
          <span class="title">{{ reparacion.nombre }}</span>
        </v-col>
        <v-col
          cols="12"
          lg="5"
          class="d-flex flex-column justify-center align-start align-end"
        >
          <span class="subtitle-1">{{ reparacion.telefono }}</span>
          <span class="subtitle-1">{{ reparacion.correo }}</span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { ClienteData, Cliente } from '@/entities'
@Component<ClienteItem>({
  name: 'ClienteItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
})
export default class ClienteItem extends Vue {
  $props!: { item: ClienteData }
  get reparacion(): Cliente {
    return new Cliente(this.$props.item)
  }
}
</script>
