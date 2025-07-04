<template>
  <div v-if="property">
    <Card>
      <template #title>{{ property.fullAddress || 'Dirección no disponible' }}</template>
      <template #subtitle>{{ property.district }}, {{ property.region }}</template>
      <template #content>
        <p><strong>Propietario ID:</strong> {{ property.ownerId || 'No disponible' }}</p>
        <p><strong>Coordenadas:</strong></p>
        <ul class="list-none p-0 m-0">
          <li>Latitud: {{ property.latitude || 'No disponible' }}</li>
          <li>Longitud: {{ property.longitude || 'No disponible' }}</li>
        </ul>
      </template>
      <template #footer>
        <Button icon="pi pi-pencil" label="Editar" class="p-button-text" />
        <Button icon="pi pi-trash" label="Eliminar" class="p-button-text p-button-danger" />
      </template>
    </Card>
  </div>
  <div v-else class="flex flex-column align-items-center justify-content-center h-full text-center p-4">
    <i class="pi pi-info-circle text-4xl text-color-secondary mb-3"></i>
    <p class="text-color-secondary">Selecciona una propiedad para ver sus detalles.</p>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
export default {
  name: 'property-detail',
  components: { Card, Button },
  props: ['property']
};
</script>
