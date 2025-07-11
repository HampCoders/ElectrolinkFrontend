<script>
import { ref, onMounted } from 'vue';
import { subscriptionService } from '../services/subscriptions.service.js';
import SubscriptionStatus from "@/subscriptions/components/SubscriptionStatus.vue";

// 🟢 Agrega estas dos líneas:
import Card from 'primevue/card';
import Button from 'primevue/button';

export default {
  name: 'MySubscriptionsPage',
  components: {
    SubscriptionStatus,
    Card,
    Button
  },
  setup() {
    const subscriptions = ref([]);
    const userId = 1; // ⚠️ Reemplaza esto con el ID real del usuario autenticado

    const loadSubscriptions = async () => {
      const all = await subscriptionService.getAll();
      subscriptions.value = all.filter(sub => sub.userId === userId);
    };

    onMounted(loadSubscriptions);

    async function cancel(id) {
      await subscriptionService.cancel(id);
      await loadSubscriptions();
    }

    async function resume(id) {
      await subscriptionService.resume(id);
      await loadSubscriptions();
    }

    async function pause(id) {
      await subscriptionService.pause(id);
      await loadSubscriptions();
    }

    async function boost(id) {
      await subscriptionService.activateBoost(id);
      await loadSubscriptions();
    }

    return {
      subscriptions,
      cancel,
      resume,
      pause,
      boost
    };
  }
};
</script>
