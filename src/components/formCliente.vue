<template>
  <v-card>
    <v-card-title>
      <span>{{ $props.create ? 'Nuevo Cliente' : 'Editar Cliente' }}</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeForm" v-if="$props.modal"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-form ref="formCliente" lazy-validation v-model="validForm">
        <v-text-field
          v-model="cliente.nombre"
          label="Nombre"
          clearable
          hint="Obligatorio"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field>
        <v-text-field
          v-model="cliente.telefono"
          label="Teléfono"
          clearable
          hint="Obligatorio"
          persistent-hint
          :rules="[requiredRule]"
        ></v-text-field>
        <v-text-field
          v-model="cliente.correo"
          label="Correo"
          clearable
          persistent-hint
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        color="info"
        @click="submitForm"
        :disabled="!validForm"
        :loading="loadingBtn"
        >{{ $props.clienteId ? 'Actualizar' : 'Guardar' }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Cliente, ClienteData } from '@/entities'
import { vForm } from '@/types'
import Vue from 'vue'
import Component from 'vue-class-component'
import { requiredRule } from './mixins'
@Component<FormCliente>({
  name: 'FormCliente',
  props: {
    // If create is true, some fields will be removed (e.g. ReceiptDate)
    create: Boolean,
    // Shows the component as a modal
    modal: Boolean,
    // if id is given, then it'll update data
    clienteId: String,
    initName: {
      type: String,
      default: ''
    }
  },
  watch: {
    '$store.state.snackbar.isVisible'(snackResponse: boolean) {
      if (snackResponse) this.loadingBtn = false
    }
  },
  mounted() {
    if (this.$props.clienteId) {
      const clienteData = this.$store.getters['clientesById'](
        this.$props.clienteId
      ) as ClienteData
      if (clienteData) {
        this.cliente = new Cliente(clienteData)
      }
    }
  }
})
export default class FormCliente extends Vue {
  $refs!: Vue['$refs'] & { formCliente: vForm }
  $props!: Vue['$props'] & {
    create: boolean
    modal: boolean
    clienteId: string
    initName: string
  }

  cliente: Cliente = new Cliente({ nombre: this.$props.initName })

  validForm = false
  requiredRule = requiredRule

  closeForm() {
    this.$emit('close-form').$nextTick(() => {
      this.reset()
    })
  }

  set(cliente: Cliente): void {
    this.cliente = cliente
  }
  // vForm
  reset() {
    this.$refs.formCliente.reset()
  }
  validate() {
    return this.$refs.formCliente.validate()
  }

  submitForm() {
    if (this.validate() && this.cliente.valid()) {
      this.loadingBtn = true
      this.$emit('submit', Object.assign({}, this.cliente))
    }
  }

  loadingBtn = false
}
</script>
