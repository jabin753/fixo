<template>
  <v-container>
    <v-row justify="center" no-gutters v-if="cliente">
      <v-col cols="12" lg="6">
        <v-row no-gutters>
          <v-col cols="12">
            <v-toolbar color="white" elevation="0">
              <v-icon @click="$router.go(-1)" left>mdi-arrow-left</v-icon>
              <v-toolbar-title>{{ cliente.nombre }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="deleteConfirm" max-width="380">
                <template #activator="{on, attrs}">
                  <v-btn icon v-on="on" v-bind="attrs">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>¿Eliminar este cliente?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      @click="deleteConfirm = false"
                      class="blue--text"
                      >Cancelar</v-btn
                    >
                    <v-btn text @click="deleteCliente" class="red--text"
                      >Eliminar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </v-col>
        </v-row>
        <form-cliente
          :clienteId="id"
          :create="false"
          :modal="false"
          @submit="updateCliente"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import FormCliente from '@/components/formCliente.vue'
import { Cliente, ClienteData } from '@/entities'
import { db } from '@/plugins/firebase'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component<ClienteDetails>({
  name: 'ClienteDetails',
  mounted() {
    if (!this.cliente) {
      this.$store.dispatch('bindClientesRef')
    }
  },
  components: {
    FormCliente
  }
})
export default class ClienteDetails extends Vue {
  get id(): string {
    return this.$route.params.id
  }
  get cliente(): Cliente | undefined {
    const clienteData = this.$store.getters['clientesById'](
      this.id
    ) as ClienteData
    if (clienteData) return new Cliente(clienteData)
    else return undefined
  }
  updateCliente(e: ClienteData) {
    console.log('submit', e)
    this.$store.dispatch(
      'updateCliente',
      Object.assign({}, e, { updatedAt: new Date() })
    )
  }

  deleteConfirm = false
  deleteCliente() {
    db.collection('clientes')
      .doc(this.id)
      .delete()
    this.$router.go(-1)
  }
}
</script>
