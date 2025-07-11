<template>
  <div class="pricing-card shadow-4" :style="{ borderTopColor: cardColor }">
    <div class="pricing-header" :style="{ backgroundColor: cardColor }">
      <h2 class="plan-name">{{ plan.name }}</h2>
      <p class="plan-desc">{{ plan.description }}</p>
    </div>

    <div class="pricing-body">
      <h1 class="price">{{ formattedPrice }}</h1>

      <ul class="feature-list">
        <li><span class="check">✅</span> Moneda: {{ plan.currency }}</li>
        <li><span class="check">✅</span> Monetización: {{ plan.monetizationType }}</li>
        <li><span class="check">✅</span> ¿Por defecto?: {{ plan.isDefault ? 'Sí' : 'No' }}</li>
      </ul>

      <button class="subscribe-button" @click="$emit('subscribe', plan)">
        Suscribirme
      </button>
    </div>
  </div>
</template>

<script>
const COLORS = ['#FF9800', '#03A9F4', '#4CAF50', '#E91E63', '#9C27B0'];

export default {
  name: 'PlanCard',
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedPrice() {
      const currency = ['USD', 'PEN', 'EUR'].includes(this.plan.currency)
          ? this.plan.currency
          : 'USD';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
      }).format(this.plan.price);
    },
    cardColor() {
      // Random color by ID (simple hash to index)
      const index = this.plan.id
          ? [...this.plan.id].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length
          : 0;
      return COLORS[index];
    }
  }
};
</script>

<style scoped>
.pricing-card {
  width: 100%;
  max-width: 280px;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  margin: 0 0.75rem 2rem;
  border-top: 6px solid;
  transition: transform 0.3s ease;
}
.pricing-card:hover {
  transform: translateY(-4px);
}

.pricing-header {
  color: white;
  padding: 1rem;
  text-align: center;
}
.plan-name {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
}
.plan-desc {
  margin-top: 0.3rem;
  font-size: 0.85rem;
}

.pricing-body {
  padding: 1.5rem;
}
.price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #222;
  text-align: center;
  margin-bottom: 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}
.feature-list li {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}
.check {
  margin-right: 0.5rem;
}

.subscribe-button {
  width: 100%;
  background-color: #10b981;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.7rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.subscribe-button:hover {
  background-color: #059669;
}
</style>
