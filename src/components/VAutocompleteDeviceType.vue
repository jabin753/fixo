<template>
  <v-autocomplete
    v-model="deviceType"
    label="Tipo de Dispositivo"
    :items="deviceTypes"
    item-text="tipo"
    item-value="tipo"
    clearable
    hint="Obligatorio (Celular, tablet, etc)"
    persistent-hint
    :rules="rules"
    :loading="loading"
    @update:search-input="inputField = $event"
  >
    <template #no-data v-if="inputField">
      <div class="d-flex justify-end">
        <v-btn text @click="newDeviceType">Nuevo dispositivo</v-btn>
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
    prop: 'deviceType',
    event: 'change'
  },
  firestore() {
    return {
      deviceTypes: db
        .collection('users')
        .doc(this.$store.getters['currentUser'].uid)
        .collection('tipoDispositivo')
    }
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
  deviceTypes = []

  // v-model
  get deviceType() {
    return this.$attrs.deviceType
  }
  set deviceType(deviceType: string) {
    this.$emit('change', deviceType)
  }

  newDeviceType() {
    this.loading = true

    db.collection('users')
      .doc(this.$store.getters['currentUser'].uid)
      .collection('tipoDispositivo')
      .add({ tipo: this.inputField })
      .then(() => {
        this.loading = false
        this.deviceType = this.inputField
      })
  }
}
</script>
