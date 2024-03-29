<template>
  <v-container>
    <v-row>
      <v-slide-x-transition>
        <v-col cols="2" v-if="$vuetify.breakpoint.lgAndUp" class="red--text">
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Más recientes</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Completados</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Pendientes</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title
                    >No reparados (feedback)
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item link color="grey lighten-4">
                <v-list-item-content>
                  <v-list-item-title>
                    Actualizar
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-slide-x-transition>

      <v-slide-x-transition>
        <v-col>
          <v-sheet rounded="lg">
            <!-- INICIO -->
            <v-container fluid>
              <v-overlay :value="loading">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </v-overlay>
              <v-data-iterator
                :items="reparaciones"
                :page="page"
                :items-per-page.sync="reparacionesPerPage"
                :search="search"
                :sort-by="sortBy"
                :sort-desc="sortDesc"
                :options.sync="options"
              >
                <template v-slot:header>
                  <v-toolbar dark color="blue lighten-2" class="mb-1">
                    <v-text-field
                      v-model="search"
                      clearable
                      flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Buscar Reparación"
                    />
                    <template v-if="$vuetify.breakpoint.mdAndUp">
                      <v-spacer></v-spacer>
                      <v-select
                        v-model="sortBy"
                        flat
                        solo-inverted
                        hide-details
                        :items="keys"
                        prepend-inner-icon="mdi-sort"
                        label="Ordenar por"
                      />
                      <v-spacer></v-spacer>
                      <v-btn-toggle v-model="sortDesc" mandatory>
                        <v-btn large depressed color="blue" :value="false">
                          <v-icon>mdi-arrow-up</v-icon>
                        </v-btn>
                        <v-btn large depressed color="blue" :value="true">
                          <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </template>
                    <v-dialog
                      max-width="500"
                      eager
                      v-model="addRepairDialog"
                      @click:outside.stop="$nextTick(() => $refs.form.reset())"
                    >
                      <template #activator="{on, attrs}">
                        <v-btn
                          text
                          class="pl-4"
                          v-on="on"
                          v-bind="attrs"
                          v-show="$vuetify.breakpoint.mdAndUp"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <form-reparacion
                        :create="true"
                        :modal="true"
                        ref="form"
                        @close-form="addRepairDialog = false"
                        @submit="addReparacion"
                      ></form-reparacion>
                    </v-dialog>
                  </v-toolbar>
                </template>

                <template v-slot:default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.id" cols="12">
                      <repair-item :item="item" />
                    </v-col>
                  </v-row>
                </template>

                <template #no-data>
                  <div class="d-flex align-center justify-center ma-5">
                    <v-btn
                      color="blue lighten-2"
                      dark
                      @click="addRepairDialog = true"
                    >
                      <v-icon>mdi-plus</v-icon>
                      Agregar orden de reparación
                    </v-btn>
                  </div>
                </template>
              </v-data-iterator>
            </v-container>
            <!-- /INICIO -->
          </v-sheet>
        </v-col>
      </v-slide-x-transition>
    </v-row>
    <v-btn
      class="hidden-md-and-up"
      bottom
      color="primary"
      fab
      fixed
      rel="noopener"
      right
      @click="addRepairDialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import RepairItem from '@/components/RepairItem.vue'
import FormReparacion from '@/components/formReparacion.vue'
import { vForm } from '@/types'
import { Reparacion, ReparacionData } from '@/entities'
import { VSnackbarMixin } from '@/components/mixins'
VSnackbarMixin
const Vue = mixins(VSnackbarMixin)
@Component<MainLayout>({
  name: 'RepairPage',
  components: {
    RepairItem,
    FormReparacion
  },
  mixins: [VSnackbarMixin],
  mounted() {
    if (this.reparaciones.length == 0) {
      this.$store.dispatch('bindReparacionesRef').then(() => {
        this.loading = false
      })
    }
  }
})
export default class MainLayout extends Vue {
  $refs!: Vue['$refs'] & { form: vForm }
  get reparaciones(): Reparacion[] {
    const reparacionData = this.$store.getters[
      'reparaciones'
    ] as ReparacionData[]
    return reparacionData.map(r => new Reparacion(r))
  }
  loading = this.reparaciones.length == 0 ? true : false
  search = ''
  reparacionesPerPage = 5
  page = 1
  sortBy = 'receiptDate'
  keys = [
    { text: 'Nombre de cliente', value: 'name' },
    { text: 'Tipo de dispositivo', value: 'deviceType' },
    { text: 'Fecha de Entrega', value: 'deliveredDate' },
    { text: 'Revisado', value: 'isReviewed' },
    { text: 'Fecha de Recepción', value: 'receiptDate' }
  ]
  options = {}
  sortDesc = true

  addRepairDialog = false

  // Add reparación to array
  addReparacion(e: ReparacionData): void {
    this.$store.dispatch('saveReparacion', e).then(() => {
      this.$toast('Reparación agregada')
      this.addRepairDialog = false
      this.$nextTick(() => this.$refs.form.reset())
    })
  }
}
</script>
