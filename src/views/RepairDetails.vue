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
          <p class="text-h3 pa-2">
            {{ reparacion.name }}
          </p>
          <v-spacer></v-spacer>
          <v-row dense no-gutters>
            <v-col cols="6" offset="6" class="pr-5 headline-2">
              <p>Recepción: {{ reparacion.dayReceipt() }}</p>
              <p>
                Entrega:
                <span
                  :class="
                    reparacion.deliveredDate ? 'success--text' : 'warning--text'
                  "
                  >{{ reparacion.dayDelivered() }}</span
                >
              </p>
              <p
                v-if="reparacion.deliveredDate"
                class="text-right mr-5 info--text"
              >
                {{ reparacion.deliveredDate }}
              </p>
            </v-col>
          </v-row>
          <p class="body-1 mx-5">Detalles {{ reparacion.details }}</p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Reparacion, IReparacion } from '@/entities'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component<RepairItem>({
  name: 'RepairDetails',
  mounted() {
    if (!this.reparacion) {
      this.$store.dispatch('bindReparacionesRef')
    }
  }
})
export default class RepairItem extends Vue {
  get reparacion(): IReparacion {
    return new Reparacion({...this.$store.getters['reparacionesById'](this.$route.params.id),id:this.$route.params.id})
  }
}
</script>
