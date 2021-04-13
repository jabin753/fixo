<template>
  <v-autocomplete
    v-model="deviceModel"
    label="Modelo"
    :items="deviceModels"
    item-text="modelo"
    item-value="modelo"
    clearable
    :rules="rules"
    :loading="loading"
    @update:search-input="inputField = $event"
  >
    <template #no-data v-if="inputField">
      <div class="d-flex justify-end">
        <v-btn text @click="newDeviceModel">Nuevo modelo</v-btn>
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
    prop: 'deviceModel',
    event: 'change'
  },
  firestore() {
    return {
      deviceModels: db
        .collection('users')
        .doc(this.$store.getters['currentUser'].uid)
        .collection('modeloDispositivo')
    }
  },
  props: {
    brand: {
      type: String
    },
    rules: {
      type: Array
    }
  },
  watch: {
    brand: {
      handler(brand: string) {
        this.loading = true
        this.$bind(
          'deviceModels',
          db
            .collection('users')
            .doc(this.$store.getters['currentUser'].uid)
            .collection('modeloDispositivo')
            .where('marca', '==', brand)
        ).then(() => (this.loading = false))
      },
      immediate: true
    }
  }
})
export default class VAutocompleteDeviceType extends Vue {
  loading = false
  inputField = ''
  deviceModels = []

  // v-model
  get deviceModel() {
    return this.$attrs.deviceModel
  }
  set deviceModel(deviceModel: string) {
    this.$emit('change', deviceModel)
  }

  newDeviceModel() {
    this.loading = true

    db.collection('users')
      .doc(this.$store.getters['currentUser'].uid)
      .collection('modeloDispositivo')
      .add({ modelo: this.inputField, marca: this.$props.brand })
      .then(() => {
        this.loading = false
        this.deviceModel = this.inputField
      })
  }
}
</script>
