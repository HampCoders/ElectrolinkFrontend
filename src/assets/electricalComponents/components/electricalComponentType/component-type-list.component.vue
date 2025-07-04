<script>
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import Divider from 'primevue/divider';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';

export default {
  name: 'component-type-list',
  components: { Card, DataView, Divider, ProgressSpinner, Message },
  // Las props definen los datos que este componente recibe de su padre
  props: {
    types: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  }
};
</script>

<template>
  <Card>
    <template #title>Tipos Existentes</template>
    <template #content>
      <!-- Estado de Carga -->
      <div v-if="isLoading && !types.length" class="text-center p-4">
        <ProgressSpinner />
        <p>Cargando tipos...</p>
      </div>

      <!-- Mensaje de Error -->
      <div v-else-if="error" class="p-4">
        <Message severity="error">{{ error }}</Message>
      </div>

      <!-- Lista de Tipos con DataView -->
      <DataView v-else-if="types.length > 0" :value="types" layout="list">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="item.id" class="col-12">
              <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3">
                <div class="md:w-4rem text-center md:text-left flex-shrink-0">
                  <i class="pi pi-tag text-2xl text-primary"></i>
                </div>
                <div class="flex-1">
                  <div class="font-bold text-lg">{{ item.name }}</div>
                  <div class="text-color-secondary">{{ item.description }}</div>
                </div>
              </div>
              <Divider v-if="index < slotProps.items.length - 1" />
            </div>
          </div>
        </template>
      </DataView>

      <!-- Mensaje de Lista Vacía -->
      <div v-else class="text-center p-4 border-1 surface-border border-round">
        <p>Aún no hay tipos creados.</p>
      </div>
    </template>
  </Card>
</template>

