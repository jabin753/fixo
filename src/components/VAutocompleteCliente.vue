<template>
  <v-autocomplete
    label="Cliente"
    v-model="clienteId"
    :items="items"
    item-text="nombre"
    item-value="id"
    clearable
    :rules="$props.rules"
    :disabled="$props.disabled"
    @update:search-input="inputField = $event"
  >
    <template #prepend-item>
      <div class="d-flex align-center mx-1">
        Seleccione un cliente
        <v-spacer></v-spacer>
        <v-dialog
          max-width="300"
          v-model="addClienteDialog"
          :fullscreen="$vuetify.breakpoint.mdAndDown ? true : false"
          transition="dialog-bottom-transition"
        >
          <template #activator="{on,attrs}">
            <v-btn text v-on="on" v-bind="attrs">
              <v-icon>mdi-plus</v-icon> Nuevo
            </v-btn>
          </template>
          <form-cliente
            :create="true"
            :modal="true"
            ref="form"
            @close-form="addClienteDialog = false"
            @submit="addCliente"
            :initName="inputField"
          ></form-cliente>
        </v-dialog>
      </div>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { ClienteData } from '@/entities'
import { vForm } from '@/types'
import Component, { mixins } from 'vue-class-component'
import FormCliente from './formCliente.vue'
import { VSnackbarMixin } from './mixins'
const Vue = mixins(VSnackbarMixin)
@Component<VAutocompleteCliente>({
  name: 'v-autocomplete-cliente',
  created() {
    if (this.items.length == 0) {
      this.$store.dispatch('bindClientesRef')
    }
  },
  mixins: [VSnackbarMixin],
  props: {
    rules: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'clienteId',
    event: 'change'
  },
  components: {
    FormCliente
  }
})
export default class VAutocompleteCliente extends Vue {
  $refs!: Vue['$refs'] & { form: vForm }

  get items(): ClienteData[] {
    return this.$store.getters['clientes']
  }

  // v-model
  get clienteId() {
    return this.$attrs.clienteId
  }
  set clienteId(clienteId: string) {
    this.$emit('change', clienteId)
  }

  addClienteDialog = false

  inputField = ''

  // Add cliente to array
  addCliente(e: ClienteData): void {
    this.$store.dispatch('saveCliente', e).then(newCliente => {
      this.$toast('cliente agregado')
      this.clienteId = newCliente.id
      this.addClienteDialog = false
    })
  }
}
</script>
