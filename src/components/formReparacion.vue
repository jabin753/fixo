<template>
  <v-card>
    <v-card-title>
      <span>Nueva Reparación</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeForm"><v-icon>mdi-close</v-icon></v-btn>
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
          class="mb-5"
          v-model="phone"
          label="Teléfono"
          clearable
          hint="Obligatorio"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field>

        <span class="subheader">Dispositivo</span>
        <v-text-field
          class="mt-5"
          v-model="deviceType"
          :items="deviceTypeList"
          label="Tipo de Dispositivo"
          clearable
          hint="Obligatorio (Celular, tablet, etc)"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field>
        <v-textarea
          flat
          auto-grow
          v-model="details"
          label="Detalles del problema"
          :rules="[requiredRule]"
        ></v-textarea>

        <v-expansion-panels class="mt-5" flat v-model="panels">
          <v-expansion-panel>
            <v-expansion-panel-header
              ><span
                ><v-icon class="mr-1">mdi-cellphone-link</v-icon> Datos del
                dispositivo</span
              ></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Marca"
                    v-model="deviceBrand"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Modelo"
                    v-model="deviceModel"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Accesorios"
                    v-model="deviceAttach"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header
              ><span
                ><v-icon class="mr-2">mdi-calendar-multiple</v-icon>Fecha</span
              ></v-expansion-panel-header
            >
            <v-expansion-panel-content>
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
                  <v-btn
                    text
                    color="primary"
                    @click="menuPickerReceipt = false"
                  >
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
                  <v-btn
                    text
                    color="primary"
                    @click="menuPickerDelivered = false"
                  >
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
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header
              ><span
                ><v-icon class="mr-2">mdi-cash-multiple</v-icon>Cotización y
                presupuesto</span
              ></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-text-field
                label="Adelanto"
                prepend-icon="mdi-currency-usd"
                type="number"
                v-model="cotizacionAdelanto"
              ></v-text-field>
              <v-select
                :items="tipoPiezasList"
                label="Tipo de Pieza a conseguir"
                clearable
                v-model="cotizacionPieza"
              ></v-select>
              <v-text-field
                label="Costo"
                type="number"
                class="ml-3"
                prepend-icon="mdi-currency-usd"
                v-if="cotizacionPieza != null"
                v-model="cotizacionPiezaCosto"
              ></v-text-field>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- <v-checkbox v-model="isReviewed" label="Checado"></v-checkbox> -->
        <!-- <v-select
          :items="tags"
          v-model="tags"
          multiple
          chips
          hint="Categorías disponibles"
          persistent-hint
        ></v-select> -->
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="info" @click="submitForm" :disabled="!validForm"
        >Enviar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Reparacion, vForm } from '@/types'
import { requiredRule } from '@/components/mixins'

@Component({
  name: 'FormReparacion',
  props: {
    // If create is true, some fields will be removed (e.g. ReceiptDate)
    create: {
      type: Boolean,
      required: false,
      default: false
    },
    // Shows the component as a modal
    modal: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})
export default class FormReparacion extends Vue {
  $refs!: Vue['$refs'] & { formReparacion: vForm }
  $props!: Vue['$props'] & { create: boolean }
  deviceTypeList = [
    { text: 'Teléfono', value: 'Phone' },
    { text: 'Consola', value: 'console' },
    { text: 'Otro dispositivo', value: 'other' }
  ]
  tipoPiezasList = [
    'Flexor',
    'Pantalla',
    'Centro de Carga',
    'Consola de Videojuego',
    'Otro'
  ]
  menuPickerReceipt = false
  menuPickerDelivered = false

  name = ''
  phone = ''
  deviceType = ''
  deviceBrand = ''
  deviceModel = ''
  deviceAttach = ''
  details = ''
  isReviewed = false
  tags = []
  receiptDate = ''
  deliveredDate = ''
  cotizacionAdelanto = null
  cotizacionPieza = ''
  cotizacionPiezaUrl = ''
  cotizacionPiezaCosto = null

  panels = -1
  validForm = false
  requiredRule = requiredRule

  closeForm() {
    this.$emit('close-form').$nextTick(() => {
      this.reset()
    })
  }

  // vForm
  reset() {
    this.$refs.formReparacion.reset()
    this.panels = -1
  }
  validate() {
    return this.$refs.formReparacion.validate()
  }

  submitForm() {
    if (this.validate()) {
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
