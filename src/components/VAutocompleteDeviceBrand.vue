<template>
  <v-autocomplete
    v-model="deviceBrand"
    label="Marca"
    :items="deviceBrands"
    item-text="marca"
    item-value="marca"
    clearable
    hint="Ejemplo: Sony, Apple"
    :rules="rules"
    :loading="loading"
    @update:search-input="inputField = $event"
  >
    <template #no-data v-if="inputField">
      <div class="d-flex justify-end">
        <v-btn text @click="newBrand">Nueva Marca</v-btn>
      </div>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { db } from '@/plugins/firebase'

@Component<VAutocompleteDeviceType>({
  name: 'v-autocomplete-device-type',
  model: {
    prop: 'deviceBrand',
    event: 'change'
  },
  firestore: {
    deviceBrands: db.collection('marcaDispositivo')
  },
  props: {
    rules: {
      type: Array
    }
  }
})
export default class VAutocompleteDeviceType extends Vue {
  loading = false
  inputField = ''
  deviceBrands = []

  // v-model
  get deviceBrand() {
    return this.$attrs.deviceBrand
  }
  set deviceBrand(deviceBrand: string) {
    this.$emit('change', deviceBrand)
  }

  newBrand() {
    this.loading = true

    db.collection('marcaDispositivo')
      .add({ marca: this.inputField })
      .then(() => {
        this.loading = false
        this.deviceBrand = this.inputField
      })
  }
}
</script>
