<template>
  <Card>
    <template #title>Stock Actual</template>
    <template #content>
      <div v-if="isLoading" class="text-center p-4">
        <ProgressSpinner />
      </div>
      <DataTable v-else :value="inventoryItems" responsiveLayout="scroll">
        <Column field="componentName" header="Componente">
          <template #body="slotProps">
            <div>{{ slotProps.data.componentName }}</div>
            <small class="text-color-secondary">{{ slotProps.data.componentId }}</small>
          </template>
        </Column>
        <Column field="quantityAvailable" header="Cantidad"></Column>
        <Column field="alertThreshold" header="Umbral Alerta"></Column>
        <Column header="Última Actualización">
          <template #body="slotProps">
            {{ new Date(slotProps.data.lastUpdated).toLocaleString() }}
          </template>
        </Column>
        <Column header="Acciones">
          <template #body="slotProps">
            <Button icon="pi pi-plus" class="p-button-rounded p-button-text p-button-success" @click="onUpdateQuantity(slotProps.data, slotProps.data.quantityAvailable + 1)" />
            <Button icon="pi pi-minus" class="p-button-rounded p-button-text p-button-info" @click="onUpdateQuantity(slotProps.data, slotProps.data.quantityAvailable - 1)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="onRemoveItem(slotProps.data.componentId)" />
          </template>
        </Column>
        <template #empty>
          <div class="text-center p-4">No se encontró inventario para este técnico o está vacío.</div>
        </template>
      </DataTable>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  name: 'inventory-list',
  components: { Card, DataTable, Column, Button, ProgressSpinner },
  props: {
    inventoryItems: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onUpdateQuantity(item, newQuantity) {
      if (newQuantity < 0) return;
      this.$emit('update-quantity', { componentId: item.id, newQuantity });
    },
    onRemoveItem(componentId) {
      this.$emit('remove-item', componentId);
    }
  }
};
</script>
