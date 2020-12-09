<template>
  <v-container>
    <v-snackbar
      :timeout="-1"
      :value="snackNotification"
      color="success darken-2"
      dark
    >
    </v-snackbar>
    <v-row justify="center">
      <v-slide-x-transition>
        <v-col cols="2" v-if="$vuetify.breakpoint.lgAndUp" class="red--text">
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Activos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Todos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>No activos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-slide-x-transition>

      <v-slide-x-transition>
        <v-col cols="12" lg="7">
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
                :items="clientes"
                :page="page"
                :items-per-page.sync="clientesPerPage"
                :search="search"
                :sort-by="sortBy"
                :sort-desc="sortDesc"
                :options.sync="options"
              >
                <template v-slot:header>
                  <v-toolbar dark color="green lighten-2" class="mb-1">
                    <v-text-field
                      v-model="search"
                      clearable
                      flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Buscar Cliente"
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
                        <v-btn large depressed color="green" :value="false">
                          <v-icon>mdi-arrow-up</v-icon>
                        </v-btn>
                        <v-btn large depressed color="green" :value="true">
                          <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </template>
                    <v-dialog
                      max-width="500"
                      eager
                      v-model="addClienteDialog"
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
                      <form-cliente
                        :create="true"
                        :modal="true"
                        ref="form"
                        @close-form="addClienteDialog = false"
                        @submit="addCliente"
                      ></form-cliente>
                    </v-dialog>
                  </v-toolbar>
                </template>

                <template v-slot:default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.id" cols="12">
                      <cliente-item :item="item" />
                    </v-col>
                  </v-row>
                </template>

                <template #no-data>
                  <div class="d-flex align-center justify-center ma-5">
                    <v-btn
                      color="green lighten-2"
                      dark
                      @click="addClienteDialog = true"
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
      color="green lighten-2"
      fab
      fixed
      rel="noopener"
      right
      dark
      @click="addClienteDialog = true"
    >
      <v-icon>mdi-account-multiple-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Cliente, ClienteData } from '@/entities'
import { vForm } from '@/types'
import Vue from 'vue'
import ClienteItem from '@/components/ClienteItem.vue'
import FormCliente from '@/components/formCliente.vue'
import Component from 'vue-class-component'
@Component<ClientesLayout>({
  name: 'ClientePage',
  components: {
    ClienteItem,
    FormCliente
  },
  mounted() {
    if (this.clientes.length == 0) {
      this.$store.dispatch('bindClientesRef').then(() => {
        this.loading = false
      })
    }
  }
})
export default class ClientesLayout extends Vue {
  $refs!: Vue['$refs'] & { form: vForm }
  get clientes(): Cliente[] {
    const clienteData = this.$store.getters['clientes'] as ClienteData[]
    return clienteData.map(c => new Cliente(c))
  }
  loading = this.clientes.length == 0 ? true : false
  search = ''
  clientesPerPage = 5
  page = 1
  sortBy = 'name'
  keys = [{ text: 'Nombre de cliente', value: 'nombre' }]
  options = {}
  sortDesc = true

  addClienteDialog = false

  snackNotification = false

  // Add cliente to array
  addCliente(e: ClienteData): void {
    this.$store.dispatch('saveCliente', e).then(() => {
      this.snackNotification = true
      this.addClienteDialog = false
      this.$nextTick(() => this.$refs.form.reset())
    })
  }
}
</script>
