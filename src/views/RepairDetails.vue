<template>
  <v-container>
    <v-row justify="center">
      <v-col :cols="$vuetify.breakpoint.lgAndUp ? 6 : 12">
        <v-sheet rounded="lg" v-if="reparacion">
          <v-toolbar color="white" elevation="0" class="d-print-none">
            <v-icon @click="$router.go(-1)" left>mdi-arrow-left</v-icon>
            <v-toolbar-title>{{ reparacion.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="
                () => {
                  window.open().print()
                }
              "
            >
              <v-icon>mdi-printer</v-icon>
            </v-btn>
            <v-dialog v-model="deleteConfirm" max-width="380">
              <template #activator="{on, attrs}">
                <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon color="error">mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title
                  >¿Eliminar la entrada de la bitácora?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="deleteConfirm = false" class="blue--text"
                    >Cancelar</v-btn
                  >
                  <v-btn text @click="deleteReparacion" class="red--text"
                    >Eliminar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <template v-slot:extension>
              <v-tabs fixed-tabs>
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#mobile-tabs-5-1" class="primary--text">
                  General
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
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
import { db } from '@/plugins/firebase'

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
  deleteReparacion(): void {
    db.collection('reparaciones')
      .doc(this.$route.params.id)
      .delete()
      .then(() => {
        this.$router.go(-1)
      })
  }

  deleteConfirm = false
}
</script>
