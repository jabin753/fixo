<template>
  <v-card>
    <v-card-title>
      <span>Nueva Reparación</span>
      <v-spacer></v-spacer>
      <v-btn @click="fake">Cargar datos fake</v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="formReparacion" @submit.prevent="$emit('submit', { name })">
        <v-text-field v-model="name" label="Nombre" clearable></v-text-field>
        <v-text-field v-model="phone" label="Teléfono" clearable></v-text-field>
        <v-select v-model="deviceType" :items="deviceTypeList" label="Seleccione" clearable ></v-select>
        <v-textarea v-model="details" label="Detalles del problema" clearable></v-textarea>
        <v-checkbox v-model="isReviewed" label="Checado" ></v-checkbox>
        <v-select :items="tags" v-model="tags" multiple chips hint="Categorías disponibles" persistent-hint></v-select>
        
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
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
        <v-date-picker
          v-model="receiptDate"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>

      </v-menu>

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
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
        <v-date-picker
          v-model="deliveredDate"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>

      </v-menu>

      </v-form>
    </v-card-text>
    <v-card-actions>
        <v-btn type="submit" block color="success">Enviar</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import faker from 'faker'

@Component({})
export default class formReparacion extends Vue {
    deviceTypeList = [{text:"Teléfono", value:"Phone"},
    {text: "Consola", value:"console",}
    ,{text: "Otro dispositivo", value:"other"}
    ]
    menuPicker = false

  name = ''
  phone = ''
  deviceType = ''
  details = ''
  isReviewed = false
  tags = []
  receiptDate = ''
  deliveredDate = ''

  fake(): void {
    this.name = `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`
    this.phone = faker.phone.phoneNumber()
    this.deviceType = faker.commerce.productName()
    this.details = faker.lorem.words(faker.random.number(50))
    this.isReviewed = faker.random.boolean()
    this.tags = faker.lorem.words(faker.random.number(7)).split(' ') as []
    this.receiptDate = faker.date.recent().toISOString()
    this.deliveredDate = faker.date.soon().toISOString()
  }
}
</script>
