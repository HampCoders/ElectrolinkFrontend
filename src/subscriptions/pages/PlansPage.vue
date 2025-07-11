<template>
  <div class="grid justify-content-center gap-2 mt-5">
    <PlanCard
        v-for="plan in plans"
        :key="plan.id"
        :plan="plan"
        @subscribe="redirectToStripe(plan)"
        class="col-12 sm:col-6 md:col-3"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Plan } from '../models/plan.model.js';
import { planService } from '../services/plans.service.js';
import axios from 'axios';
import PlanCard from '../components/PlanCard.vue';

export default {
  name: 'PlansPage',
  components: { PlanCard },
  setup() {
    const plans = ref([]);

    /* ────────── carga de planes ────────── */
    const loadPlans = async () => {
      const rawPlans = await planService.getAll();
      plans.value = rawPlans.map(p => new Plan(p));
    };

    /* ────────── stripe checkout ────────── */
    const redirectToStripe = async (plan) => {
      try {
        // Guarda el ID del plan para usarlo luego en /checkout-success
        localStorage.setItem('selectedPlanId', plan.id);

        // Llama a tu backend para crear la sesión de Stripe
        const res = await axios.post(
            'http://localhost:8088/api/v1/subscriptions/session',
            { priceId: 'price_1RjXmlPOfORd3gqgBlMsuRlT' } // ← temporal
        );

        // Redirige al checkout oficial
        window.location.href = res.data.url;
      } catch (err) {
        console.error('Error redirigiendo a Stripe:', err);
        alert('No se pudo redirigir al pago.');
      }
    };

    onMounted(loadPlans);

    return { plans, redirectToStripe };
  }
};
</script>
