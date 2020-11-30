<template>
  <v-container>
    <v-row>
      <v-col cols="3" v-if="$vuetify.breakpoint.lgAndUp">
        <v-sheet rounded="lg">
          <v-row justify="center">
            <v-date-picker></v-date-picker>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col :cols="$vuetify.breakpoint.lgAndUp ? 9 : 12">
        <v-sheet rounded="lg" v-if="reparacion">
          <v-app-bar
            color="white"
            elevation="0"
            outlined
            :app="$vuetify.breakpoint.mdAndDown ? true : false"
          >
            <v-icon @click="$router.go(-1)" left>mdi-arrow-left</v-icon>
            <v-app-bar-title class="pa-2">{{
              reparacion.name
            }}</v-app-bar-title>
          </v-app-bar>
          <form-reparacion
            :create="false"
            :modal="false"
            :reparacionId="reparacion.id"
            @submit="updateReparacion"
          ></form-reparacion>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Reparacion, ReparacionData } from '@/entities'
import Vue from 'vue'
import Component from 'vue-class-component'
import FormReparacion from '@/components/formReparacion.vue'

@Component<RepairItem>({
  name: 'RepairDetails',
  mounted() {
    if (!this.reparacion) {
      this.$store.dispatch('bindReparacionesRef')
    }
  },
  components: {
    FormReparacion
  }
})
export default class RepairItem extends Vue {
  get reparacion(): Reparacion | undefined {
    const reparacionData = this.$store.getters['reparacionesById'](
      this.$route.params.id
    ) as ReparacionData
    if (reparacionData) return new Reparacion(reparacionData)
    else return undefined
  }
  updateReparacion(e: ReparacionData): void {
    this.$store.dispatch(
      'updateReparacion',
      Object.assign({}, e, { updatedAt: new Date() })
    )
  }
}
</script>
