<script setup>
import { onMounted, ref } from "vue";
import ServiceOperationCard from "../components/ServiceOperationCard.vue";
import { serviceOperationService } from "../services/service-operations.service.js";

const operations = ref([]);

const loadOperations = async () => {
  const technicianId = localStorage.getItem("userId");
  if (!technicianId) {
    console.warn("No hay técnico logueado");
    return;
  }
  operations.value = await serviceOperationService.getByTechnician(technicianId);

  // opcional: trae reports y rating en paralelo
  for (const op of operations.value) {
    op.reports = await serviceOperationService.getReports(op.requestId);
    op.rating = await serviceOperationService.getRating(op.requestId);
  }
};

onMounted(loadOperations);

const onRated = (requestId) => {
  console.log("✅ Calificación registrada para request", requestId);
};
</script>
