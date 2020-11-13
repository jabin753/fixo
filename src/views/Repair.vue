<template>
  <v-container>
    <v-row>
      <v-slide-x-transition>
        <v-col cols="2" v-if="$vuetify.breakpoint.lgAndUp" class="red--text">
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <v-list-item v-for="n in 5" :key="n" link>
                <v-list-item-content>
                  <v-list-item-title> List Item {{ n }} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item link color="grey lighten-4">
                <v-list-item-content>
                  <v-list-item-title>
                    Refresh
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-slide-x-transition>

      <v-slide-x-transition>
        <v-col>
          <v-sheet min-height="70vh" rounded="lg">
            <!-- INICIO -->
            <v-container fluid>
              <div class="d-flex my-1">
                <v-spacer></v-spacer>
              </div>
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
                      <v-btn text small class="pl-4" @click="addReparacion">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                  </v-toolbar>
                </template>

                <template v-slot:default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.id" cols="12">
                      <repair-item :item="item" @click="clickItem(item)" />
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-container>
            <!-- /INICIO -->
          </v-sheet>
        </v-col>
      </v-slide-x-transition>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { db, CollectionReference } from '@/plugins/firebase'
import RepairItem from '@/components/RepairItem.vue'
import { Reparacion } from '@/types'
import { DataTableHeader } from 'vuetify'
import faker from 'faker'
@Component<MainLayout>({
  name: 'RepairPage',
  firestore: {
    reparaciones: db
      .collection('reparaciones')
      .orderBy('receiptDate', 'desc')
      .limit(10)
  },
  components: {
    RepairItem
  },
  watch: {
    reparaciones(el) {
      if (el.length > 1) this.loading = false
    }
  }
})
export default class MainLayout extends Vue {
  $firestoreRefs!: {
    reparaciones: CollectionReference<Partial<Reparacion>>
  }
  reparaciones: Reparacion[] = []

  //Data iterator
  clickItem(item: Reparacion) {
    console.log(item.name, item.deviceType)
  }
  loading = true
  search = ''
  reparacionesPerPage = 5
  page = 1
  sortBy = 'receiptDate'
  keys = [
    'name',
    'deviceType',
    'phone',
    'details',
    'deliveredDate',
    'isReviewed',
    'tags',
    'receiptDate'
  ]
  options = {}
  sortDesc = false
  nextPage(): void {
    this.page = this.page + 1
  }
  prePage(): void {
    this.page = this.page - 1
  }
  dataTableHeader: DataTableHeader[] = this.keys.map(key => ({
    text: key,
    value: key
  }))

  // Add reparación to array
  addReparacion(): void {
    const rep: Reparacion = {
      name: `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
      phone: faker.phone.phoneNumber(),
      deviceType: faker.commerce.productName(),
      details: faker.lorem.words(faker.random.number(50)),
      isReviewed: faker.random.boolean(),
      tags: faker.lorem.words(faker.random.number(7)).split(' '),
      receiptDate: faker.date.recent().toISOString(),
      deliveredDate: faker.date.soon().toISOString()
    }
    this.$firestoreRefs.reparaciones.add(rep)
  }
}
</script>
