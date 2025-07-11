<template>
  <div class="flex flex-column align-items-center gap-3 p-3">
    <img src="https://stripe.com/img/v3/newsroom/social.png" alt="Stripe" width="200" />
    <Button
        label="Pagar con Stripe"
        icon="pi pi-credit-card"
        class="p-button-rounded p-button-success"
        @click="simulatePayment"
    />
    <p v-if="paid" class="text-green-600 mt-2">¡Pago simulado exitosamente!</p>
  </div>
</template>

<script>
import Button from 'primevue/button'; // 👈 AÑADE ESTA LÍNEA

export default {
  name: 'StripeFakeCheckout',
  components: {
    Button // 👈 REGISTRA EL COMPONENTE
  },
  data() {
    return {
      paid: false
    };
  },
  methods: {
    simulatePayment() {
      this.paid = true;
      this.$emit('success');
    }
  }
};
</script>
