<template>
  <Tag
      :value="label"
      :severity="severity"
      class="text-sm px-3 py-1"
  />
</template>

<script>
export default {
  name: 'SubscriptionStatus',
  props: {
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    label() {
      switch (this.status) {
        case 'ACTIVE':
          return 'Activa';
        case 'CANCELED':
          return 'Cancelada';
        case 'PAUSED':
          return 'Pausada';
        default:
          return this.status;
      }
    },
    severity() {
      switch (this.status) {
        case 'ACTIVE':
          return 'success';
        case 'CANCELED':
          return 'danger';
        case 'PAUSED':
          return 'warning';
        default:
          return 'info';
      }
    }
  }
};
</script>
