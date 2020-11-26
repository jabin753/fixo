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
                Reparación:
                <span>{{ reparacion.dayRepaired() }}</span>
              </p>
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
          <v-row>
            <v-col cols="12">
              <form-reparacion
                :create="false"
                :modal="false"
                :reparacionId="reparacion.id"
                @submit="updateReparacion"
              ></form-reparacion>
            </v-col>
          </v-row>
          <p class="body-1 mx-5">Detalles {{ reparacion.details }}</p>
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
