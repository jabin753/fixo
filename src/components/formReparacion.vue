<template>
  <v-card>
    <v-card-title>
      <span>{{ $props.create ? 'Nueva Reparación' : '' }}</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeForm" v-if="$props.modal"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-form ref="formReparacion" lazy-validation v-model="validForm">
        <v-text-field
          v-model="reparacion.name"
          label="Nombre"
          clearable
          hint="Obligatorio"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field>
        <v-text-field
          class="mb-5"
          v-model="reparacion.phone"
          label="Teléfono"
          clearable
          hint="Obligatorio"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field>

        <span class="subheader">Dispositivo</span>
        <v-text-field
          class="mt-5"
          v-model="reparacion.deviceType"
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
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Marca"
                    v-model="reparacion.deviceBrand"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Modelo"
                    v-model="reparacion.deviceModel"
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
              <v-row no-gutters>
                <v-col cols="3">
                  <v-menu
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="ma-4"
                        v-model="reparacion.receiptDatePicker"
                        label="Fecha de recepción"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="reparacion.receiptDatePicker">
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3" class="mt-3 mr-0">
                  <v-menu
                    ref="receiptMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="reparacion.receiptDateTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="reparacion.receiptDateTime"
                        label="Hora"
                        append-outer-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="time"
                      full-width
                      @click:minute="$refs.receiptMenu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="3">
                  <v-menu
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="ma-4"
                        v-model="reparacion.repairedDatePicker"
                        label="Fecha de Reparación"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="reparacion.repairedDatePicker">
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3" class="mt-3 mr-0">
                  <v-menu
                    v-if="reparacion.repairedDatePicker"
                    ref="repairedMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="reparacion.repairedDateTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="reparacion.repairedDateTime"
                        label="Hora"
                        append-outer-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="reparacion.repairedDateTime"
                      full-width
                      @click:minute="$refs.repairedMenu.save(reparacion.repairedDateTime)"
                    ></v-time-picker>
                  </v-menu>
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
      <v-btn block color="info" @click="submitForm" :disabled="!validForm">{{
        $props.reparacionId ? 'Actualizar' : 'Guardar'
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vForm } from '@/types'
import { requiredRule } from '@/components/mixins'
import { Reparacion, ReparacionData } from '@/entities'
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
  created() {
    if (this.$props.reparacionId) {
      const reparacionData = this.$store.getters['reparacionesById'](
        this.$route.params.id
      ) as ReparacionData
      if (reparacionData) {
        this.reparacion = new Reparacion(reparacionData)
      }
    }
  }
})
export default class FormReparacion extends Vue {
  $refs!: Vue['$refs'] & { formReparacion: vForm }
  $props!: Vue['$props'] & {
    create: boolean
    modal: boolean
    reparacionId: string
  }

  createMode = !this.$props.reparacionId

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
  time = ''

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
      const formKeys = Object.keys(this.reparacion) as Array<
        keyof ReparacionData
      >
      formKeys.forEach(key => {
        // @ts-ignore if we set or unset vars, those tend to be undefined, but 'undefined' doesn´t save on firestore and throws Error
        if (this.reparacion[key] === undefined) this.reparacion[key] = null
      })
      this.$emit('submit', Object.assign({}, this.reparacion))
    }
  }
}
</script>
