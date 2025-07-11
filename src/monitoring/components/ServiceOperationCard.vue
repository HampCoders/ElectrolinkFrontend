<template>
  <Card class="shadow-4 border-round-2xl">
    <template #title>
      <div class="text-lg font-semibold">
        Operación del Request: {{ operation.requestId }}
      </div>
    </template>

    <template #content>
      <div class="text-sm text-gray-700 space-y-1">
        <p>
          <strong>Estado:</strong>
          <Tag :severity="getStatusSeverity(operation.currentStatus)" :value="operation.currentStatus" />
        </p>
        <p><strong>Inicio:</strong> {{ formatDate(operation.startedAt) }}</p>
      </div>

      <!-- ✅ Botón para marcar como completado -->
      <div v-if="operation.currentStatus !== 'Completed'" class="mt-3">
        <Button
            label="Marcar como completado"
            icon="pi pi-check"
            class="p-button-sm p-button-success"
            @click="emit('mark-completed', operation)"
        />
      </div>

      <Divider class="my-3">Reportes</Divider>

      <ul class="pl-3">
        <li v-for="report in operation.reports" :key="report.id" class="text-sm">
          {{ report.description }} <span class="text-xs text-gray-500">({{ formatDate(report.createdAt) }})</span>
        </li>
      </ul>

      <Button
          label="Agregar reporte"
          icon="pi pi-plus"
          class="p-button-text text-primary mt-2"
          @click="emit('report-added', operation)"
      />

      <Divider class="my-3" />

      <div v-if="operation.rating">
        <p class="text-sm text-green-700 mt-2">
          Ya calificaste con {{ operation.rating.score }} ⭐ — “{{ operation.rating.comment }}”
        </p>
      </div>
      <div v-else>
        <Button
            label="Agregar calificación"
            icon="pi pi-star"
            class="p-button-outlined p-button-sm p-button-success"
            @click="emit('rated', operation)"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

const props = defineProps({
  operation: Object
});

const emit = defineEmits(['rated', 'report-added', 'mark-completed']);

function formatDate(d) {
  return new Date(d).toLocaleString();
}

function getStatusSeverity(status) {
  return status === 2 ? 'success' : status === 1 ? 'warning' : 'info';
}
</script>
