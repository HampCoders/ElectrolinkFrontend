<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

onMounted(async () => {
  const planId = localStorage.getItem('selectedPlanId');
  const userId =
      localStorage.getItem('userId') ??
      JSON.parse(localStorage.getItem('currentUser') || '{}').id;

  if (!planId || !userId) {
    console.warn('Faltan planId o userId: no se creó suscripción.');
    return;
  }

  // ✅ 👇 Aquí lo pones
  console.log('userId:', userId, '✅ (int)');
  console.log('planId:', planId, '✅ (Guid)');

  try {
    await axios.post('http://localhost:5055/api/v1/subscriptions', {
      userId: Number(userId),   // ✅ enterito
      planId: planId            // ✅ string en formato de Guid
    });

    console.log('✅ Suscripción creada en backend');
    localStorage.removeItem('selectedPlanId'); // limpia si quieres
  } catch (err) {
    console.error('❌ Error al registrar la suscripción:', err);
    alert('Se pagó correctamente, pero no se pudo registrar la suscripción.');
  }
});


function goToSubscriptions() {
    router.push('/homeTechnician');
}
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center gap-3 p-5 text-center">
    <h2 class="text-2xl text-green-600 font-bold">✅ ¡Pago exitoso!</h2>
    <p class="text-lg mb-4">
      Gracias por suscribirte. Tu suscripción está activa.
    </p>

    <!-- Usa el nombre de componente que registraste globalmente: pv-button -->
    <pv-button
        label="Ir a Mis Suscripciones"
        icon="pi pi-arrow-right"
        class="p-button-success"
        @click="goToSubscriptions"
    />
  </div>
</template>
