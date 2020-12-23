<template>
  <v-card class="d-print-table-row">
    <v-card-title>
      <span>{{ $props.create ? 'Nueva Reparación' : '' }}</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeForm" v-if="$props.modal"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-form ref="formReparacion" lazy-validation v-model="validForm">
        <v-autocomplete-cliente
          :disabled="!$props.create"
          v-model="reparacion.cliente"
          :rules="[requiredRule]"
        />
        <!-- <v-text-field
          class="mt-5"
          v-model="reparacion.deviceType"
          :items="deviceTypeList"
          label="Tipo de Dispositivo"
          clearable
          hint="Obligatorio (Celular, tablet, etc)"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field> -->
        <v-autocomplete-device-type
          v-model="reparacion.deviceType"
          :rules="[requiredRule]"
        ></v-autocomplete-device-type>
        <v-textarea
          flat
          auto-grow
          v-model="reparacion.details"
          label="Detalles del problema"
          :rules="[requiredRule]"
        ></v-textarea>

        <v-expansion-panels class="mt-5" flat v-model="panels" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header
              ><span
                ><v-icon class="mr-1">mdi-cellphone-link</v-icon> Información
                del dispositivo</span
              ></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-col cols="12" md="6">
                  <!-- <v-text-field
                    label="Marca"
                    v-model="reparacion.deviceBrand"
                  ></v-text-field> -->
                  <v-autocomplete-device-brand
                    v-model="reparacion.deviceBrand"
                  ></v-autocomplete-device-brand>
                </v-col>
                <v-col cols="12" md="6">
                  <!-- <v-text-field
                    label="Modelo"
                    v-model="reparacion.deviceModel"
                  ></v-text-field> -->
                  <v-autocomplete-device-model
                    v-if="reparacion.deviceBrand"
                    v-model="reparacion.deviceModel"
                    :brand="reparacion.deviceBrand"
                  ></v-autocomplete-device-model>
                </v-col>
                <v-col cols="8" md="6">
                  <v-text-field
                    label="NS"
                    v-model="reparacion.deviceSN"
                    append-outer-icon="mdi-plus"
                    @click:append-outer.prevent="randomSN"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Accesorios"
                    v-model="reparacion.deviceAttach"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel v-if="$props.reparacionId">
            <v-expansion-panel-header
              ><span
                ><v-icon class="mr-2">mdi-calendar-multiple</v-icon>Fecha</span
              ></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-date-time-picker
                    v-model="reparacion.receiptDate"
                    label="Fecha de recepción"
                  ></v-date-time-picker>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                  <v-date-time-picker
                    v-model="reparacion.repairedDate"
                    label="Fecha de reparación"
                  ></v-date-time-picker>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                  <v-date-time-picker
                    v-model="reparacion.deliveredDate"
                    label="Fecha de Entrega"
                  ></v-date-time-picker>
                </v-col>
              </v-row>
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
                v-model="reparacion.cotizacionAdelanto"
              ></v-text-field>
              <v-select
                :items="tipoPiezasList"
                label="Tipo de Pieza a conseguir"
                clearable
                v-model="reparacion.cotizacionPieza"
              ></v-select>
              <v-text-field
                label="Costo"
                type="number"
                class="ml-3"
                prepend-icon="mdi-currency-usd"
                v-if="reparacion.cotizacionPieza != null"
                v-model="reparacion.cotizacionPiezaCosto"
              ></v-text-field>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        color="info"
        @click="submitForm"
        :disabled="!validForm"
        :loading="loadingBtn"
        class="d-print-none"
        >{{ $props.reparacionId ? 'Actualizar' : 'Guardar' }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vForm } from '@/types'
import { requiredRule } from '@/components/mixins'
import { Reparacion, ReparacionData } from '@/entities'
const VDateTimePicker = () => import('./DateTimePicker.vue')
const VAutocompleteCliente = () => import('./VAutocompleteCliente.vue')
const VAutocompleteDeviceType = () => import('./VAutocompleteDeviceType.vue')
const VAutocompleteDeviceBrand = () => import('./VAutocompleteDeviceBrand.vue')
const VAutocompleteDeviceModel = () => import('./VAutocompleteDeviceModel.vue')

@Component<FormReparacion>({
  name: 'FormReparacion',
  props: {
    // If create is true, some fields will be removed (e.g. ReceiptDate)
    create: Boolean,
    // Shows the component as a modal
    modal: Boolean,
    // if id is given, then it'll update data
    reparacionId: String
  },
  watch: {
    '$store.state.snackbar.isVisible'(snackResponse: boolean) {
      if (snackResponse) this.loadingBtn = false
    }
  },
  created() {
    if (this.$props.reparacionId) {
      const reparacionData = this.$store.getters['reparacionesById'](
        this.$route.params.id
      ) as ReparacionData
      if (reparacionData) {
        this.reparacion = new Reparacion(reparacionData)
      }
    }
  },
  components: {
    VAutocompleteCliente,
    VAutocompleteDeviceBrand,
    VAutocompleteDeviceModel,
    VAutocompleteDeviceType,
    VDateTimePicker
  }
})
export default class FormReparacion extends Vue {
  $refs!: Vue['$refs'] & { formReparacion: vForm }
  $props!: Vue['$props'] & {
    create: boolean
    modal: boolean
    reparacionId: string
  }

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
  reparacion: Reparacion = new Reparacion()

  panels = []
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
    this.panels = []
  }
  validate() {
    return this.$refs.formReparacion.validate()
  }

  submitForm() {
    if (this.validate() && this.reparacion.valid()) {
      this.loadingBtn = true
      this.$emit('submit', Object.assign({}, this.reparacion))
    }
  }
  loadingBtn = false

  randomSN(): void {
    this.reparacion.deviceSN = Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()
  }
}
</script>
