<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">{{ $t('service.title') }}</h2>

    <div class="flex gap-3 mb-4">
      <Button label="Crear Servicio" icon="pi pi-plus" @click="showForm = !showForm" />
      <Button label="Buscar por ID" icon="pi pi-search" @click="toggleSearch" />
    </div>

    <div v-if="showForm">
      <ServiceForm @created="handleServiceCreated" />
    </div>

    <div v-if="searchById">
      <div class="mb-3">
        <InputText v-model="serviceId" placeholder="Service ID" />
        <Button label="Buscar" @click="searchServiceById" class="ml-2" />
      </div>
    </div>

    <div v-if="services.length > 0">
      <div v-for="srv in services" :key="srv.serviceId" class="mb-4">
        <ServiceCard
            :service="srv"
            @deleted="removeService(srv.serviceId)"
            @updated="refreshService"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ServiceForm from '@/ServiceDesignAndPlanning/components/service-form.component.vue'
import ServiceCard from '@/ServiceDesignAndPlanning/components/service-card.component.vue'
import { ServiceService } from '@/ServiceDesignAndPlanning/services/service.service'

export default {
  name: 'ServiceView',
  components: {
    Button,
    InputText,
    ServiceForm,
    ServiceCard
  },
  data() {
    return {
      showForm: false,
      searchById: false,
      serviceId: '',
      services: [],
      service: new ServiceService()
    }
  },
  methods: {
    toggleSearch() {
      this.searchById = !this.searchById
      this.services = []
    },
    async searchServiceById() {
      try {
        const data = await this.service.getById(this.serviceId)
        this.services = [data]
      } catch (error) {
        console.error('Error getting service by ID', error)
        this.$toast.add({ severity: 'error', summary: 'Servicio no encontrado', life: 3000 })
      }
    },
    handleServiceCreated() {
      this.showForm = false
      this.services = []
      this.$toast.add({ severity: 'success', summary: 'Servicio creado', life: 3000 })
    },
    removeService(id) {
      this.services = this.services.filter(s => s.serviceId !== id)
    },
    refreshService(updated) {
      const index = this.services.findIndex(s => s.serviceId === updated.serviceId)
      if (index !== -1) {
        this.services[index] = updated
      }
    }
  }
}
</script>

<style scoped>
input {
  margin-right: 0.5rem;
}
</style>
