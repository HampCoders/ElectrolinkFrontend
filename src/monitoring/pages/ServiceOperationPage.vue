<script setup>
import { ref, onMounted } from 'vue';
import ServiceOperationCard from '../components/ServiceOperationCard.vue';
import { monitoringService } from '../services/MonitoringService.js';
import { serviceOperationService } from '../services/service-operations.service.js';

import { ServiceOperation } from '../models/ServiceOperation.js';
import { Report } from '../models/Report.js';
import Rating from 'primevue/rating';
import { Rating as RatingModel } from '../models/Rating.js';

import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const operations = ref([]);
const showReportDialog = ref(false);
const selectedOperation = ref(null);
const reportDescription = ref('');
const reportFile = ref(null);

const showRatingDialog = ref(false);
const ratingStars = ref(0);
const ratingComment = ref('');

const loadOperations = async () => {
  try {
    const rawOps = await monitoringService.getAllServiceOperations();
    operations.value = await Promise.all(
        rawOps.map(async (op) => {
          const operation = new ServiceOperation(op);
          const [reportsRaw, ratingRaw] = await Promise.all([
            monitoringService.getReportsByRequestId(operation.requestId),
            monitoringService.getRatingByRequestId(operation.requestId)
          ]);
          operation.reports = Array.isArray(reportsRaw)
              ? reportsRaw.map(r => new Report(r))
              : reportsRaw ? [new Report(reportsRaw)] : [];
          if (ratingRaw) operation.rating = new RatingModel(ratingRaw);
          return operation;
        })
    );
  } catch (err) {
    console.error('❌ Error cargando operaciones:', err);
  }
};

function openReportDialog(op) {
  selectedOperation.value = op;
  reportDescription.value = '';
  reportFile.value = null;
  showReportDialog.value = true;
}

function onFile(e) {
  reportFile.value = e.target.files?.[0] ?? null;
}

async function saveReport() {
  try {
    const report = await monitoringService.addReport(
        selectedOperation.value.requestId,
        { description: reportDescription.value }
    );
    if (reportFile.value) {
      await monitoringService.addReportPhoto(report.reportId, reportFile.value);
    }
    selectedOperation.value.reports.push(new Report(report));
    showReportDialog.value = false;
  } catch (err) {
    console.error('❌ Error guardando reporte:', err);
  }
}

function onRated(op) {
  selectedOperation.value = op;
  ratingStars.value = 0;
  ratingComment.value = '';
  showRatingDialog.value = true;
}

async function submitRating() {
  try {
    await monitoringService.createRating(selectedOperation.value.requestId, {
      score: ratingStars.value,
      comment: ratingComment.value,
      raterId: "pepe",
      technicianId: 1
    });

    await loadOperations();
    showRatingDialog.value = false;
  } catch (err) {
    console.error('❌ Error guardando calificación:', err);
  }
}

async function markCompleted(op) {
  try {
    await serviceOperationService.updateStatus(op.requestId, 'Completed');
    op.currentStatus = 'Completed';
  } catch (err) {
    console.error('❌ Error actualizando estado:', err);
  }
}

onMounted(loadOperations);
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-5">Mis Operaciones de Servicio</h2>

    <p v-if="operations.length === 0" class="text-center text-gray-500">
      No tienes operaciones registradas.
    </p>

    <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ServiceOperationCard
          v-for="op in operations"
          :key="op.requestId"
          :operation="op"
          @rated="onRated"
          @report-added="openReportDialog"
          @mark-completed="markCompleted"
      />
    </div>

    <!-- Dialogo de nuevo reporte -->
    <Dialog v-model:visible="showReportDialog" header="Nuevo reporte" :style="{ width:'450px' }">
      <div class="p-fluid space-y-3">
        <Textarea v-model="reportDescription" rows="3" placeholder="Descripción" />
        <input type="file" @change="onFile" />
        <Button label="Guardar" icon="pi pi-check" class="w-full" @click="saveReport" />
      </div>
    </Dialog>

    <!-- Dialogo de calificación -->
    <Dialog v-model:visible="showRatingDialog" header="Agregar calificación" :style="{ width:'450px' }">
      <div class="p-fluid space-y-3">
        <label>Puntaje</label>
        <Rating v-model="ratingStars" :cancel="false" />
        <label>Comentario</label>
        <Textarea v-model="ratingComment" rows="3" placeholder="Escribe tu opinión" />
        <Button label="Enviar" icon="pi pi-check" class="w-full" @click="submitRating" />
      </div>
    </Dialog>
  </div>
</template>