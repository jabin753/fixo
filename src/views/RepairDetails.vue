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
      <v-col :cols="$vuetify.breakpoint.lgAndUp ? 9 : 12"
        ><v-overlay :value="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-sheet rounded="lg">
          <p class="text-h3 pa-2">
            {{ reparacion.name }}
          </p>
          <v-spacer></v-spacer>
          <p class="text-right pr-5 headline">
            Recepción: {{ reparacion.receiptDate.split('T')[0] }}
          </p>
          <p class="body-1 mx-5">{{ reparacion.details }}</p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { db } from '@/plugins/firebase'
import { Reparacion } from '@/types'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component<RepairItem>({
  name: 'RepairDetails',
  async mounted() {
    this.reparacion = (
      await db
        .collection('reparaciones')
        .doc(this.$route.params.id)
        .get()
    ).data() as Reparacion
  },
  watch: {
    reparacion(el) {
      if (el != {}) this.loading = false
    }
  }
})
export default class RepairItem extends Vue {
  loading = true
  reparacion: Partial<Reparacion> = {}
}
</script>
