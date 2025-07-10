<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">{{ $t('service.createTitle') }}</h2>

    <pv-card>
      <ServiceForm @created="handleCreated" />
      <div class="mt-4 flex gap-2 justify-content-end">
        <pv-button
            severity="secondary"
            label="Cancelar"
            icon="pi pi-times"
            @click="$router.push('/homeContracting')" />
      </div>
    </pv-card>
  </div>
</template>

<script>
import ServiceForm from '@/ServiceDesignAndPlanning/components/service-form.component.vue'

export default {
  name: 'ServiceCreate',
  components: {
    ServiceForm
  },
  methods: {
    handleCreated() {
      this.$toast.add({ severity: 'success', summary: this.$t('service.created'), life: 3000 })
      this.$router.push('/homeContracting')
    }
  }
}
</script>

<style scoped>
label {
  font-weight: 500;
}
</style>
