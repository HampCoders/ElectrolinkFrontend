<template>
  <Card>
    <template #title>Lista de Componentes</template>
    <template #content>
      <div v-if="isLoading && !components.length" class="text-center p-4">
        <ProgressSpinner />
        <p>Cargando componentes...</p>
      </div>

      <div v-else-if="error" class="p-4">
        <Message severity="error">{{ error }}</Message>
      </div>

      <DataTable v-else :value="components" responsiveLayout="scroll">
        <Column field="name" header="Nombre"></Column>
        <Column field="description" header="Descripción">
          <template #body="slotProps">
            {{ slotProps.data.description || 'Sin descripción' }}
          </template>
        </Column>
        <Column header="Estado">
          <template #body="slotProps">
            <Tag :value="slotProps.data.isActive ? 'Activo' : 'Inactivo'" :severity="slotProps.data.isActive ? 'success' : 'danger'" />
          </template>
        </Column>
        <Column header="Acciones">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="onEdit(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="onDelete(slotProps.data)" />
          </template>
        </Column>
        <template #empty>
          No hay componentes registrados.
        </template>
      </DataTable>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';

export default {
  name: 'component-list',
  components: { Card, DataTable, Column, Tag, Button, ProgressSpinner, Message },
  props: {
    components: {
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
  },
  methods: {
    onEdit(component) {
      console.log('Editar componente:', component);
    },
    onDelete(component) {
      console.log('Eliminar componente:', component);
    }
  }
};
</script>
