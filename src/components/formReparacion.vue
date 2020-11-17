<template>
  <v-card>
    <v-card-title>
      <span>Nueva Reparación</span>
      <v-spacer></v-spacer>
      <v-btn @click="fake">Cargar datos fake</v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="formReparacion" lazy-validation v-model="validForm">
        <v-text-field
          v-model="name"
          label="Nombre"
          clearable
          hint="Obligatorio"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          label="Teléfono"
          clearable
          hint="Obligatorio"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field>
        <v-text-field
          class="mb-5"
          v-model="deviceType"
          :items="deviceTypeList"
          label="Tipo de Dispositivo"
          clearable
          hint="Obligatorio (Celular, tablet, etc)"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field>
        <v-textarea
          v-model="details"
          label="Detalles del problema"
          clearable
          hint="Oblligatorio"
          persistent-hint
          :rules="[requiredRule]"
        ></v-textarea>
        <v-checkbox v-model="isReviewed" label="Checado"></v-checkbox>
        <!-- <v-select
          :items="tags"
          v-model="tags"
          multiple
          chips
          hint="Categorías disponibles"
          persistent-hint
        ></v-select> -->

        <v-menu
          ref="menuPickerReceipt"
          v-model="menuPickerReceipt"
          :close-on-content-click="false"
          :return-value.sync="receiptDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="ma-4"
              v-model="receiptDate"
              label="Fecha de recepción"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker v-model="receiptDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menuPickerReceipt = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuPickerReceipt.save(receiptDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-menu
          ref="menuPickerDelivered"
          v-model="menuPickerDelivered"
          :close-on-content-click="false"
          :return-value.sync="deliveredDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="ma-4"
              v-model="deliveredDate"
              label="Fecha de Entrega (si aplica)"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker v-model="deliveredDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menuPickerDelivered = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuPickerDelivered.save(deliveredDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="info" @click="submitForm" :disabled="!validForm">Enviar</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import faker from 'faker'
import { Reparacion } from '@/types'
import { requiredRule } from "@/components/mixins";

@Component({
  name: 'FormReparacion'
})
export default class FormReparacion extends Vue {
  deviceTypeList = [
    { text: 'Teléfono', value: 'Phone' },
    { text: 'Consola', value: 'console' },
    { text: 'Otro dispositivo', value: 'other' }
  ]
  menuPickerReceipt = false
  menuPickerDelivered = false

  name = ''
  phone = ''
  deviceType = ''
  details = ''
  isReviewed = false
  tags = []
  receiptDate = ''
  deliveredDate = ''

  validForm=false
  requiredRule = requiredRule

  fake(): void {
    this.name = `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`
    this.phone = faker.phone.phoneNumber()
    this.deviceType = faker.commerce.productName()
    this.details = faker.lorem.words(faker.random.number(50))
    this.isReviewed = faker.random.boolean()
    this.tags = faker.lorem.words(faker.random.number(7)).split(' ') as []
    this.receiptDate = faker.date
      .recent()
      .toISOString()
      .split('T')[0]
    this.deliveredDate = faker.date
      .soon()
      .toISOString()
      .split('T')[0]
  }

  submitForm() {
    if(this.$refs.formReparacion.validate()){
      const formObject: Reparacion = {
      name: this.name,
      phone: this.phone,
      deviceType: this.deviceType,
      details: this.details,
      isReviewed: this.isReviewed,
      tags: this.tags,
      receiptDate: this.receiptDate,
      deliveredDate: this.deliveredDate ? this.deliveredDate : undefined
    }
    this.$emit('submit', formObject)
    }
  }
}
</script>
