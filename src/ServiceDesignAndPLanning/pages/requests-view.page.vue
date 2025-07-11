<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">{{ $t('request.title') }}</h2>

    <div class="flex gap-3 mb-4">
      <Button :label="$t('request.create')" icon="pi pi-plus" @click="showForm = !showForm" />
      <Button :label="$t('request.searchByClient')" icon="pi pi-user" @click="toggleSearchClient" />
      <Button :label="$t('request.searchById')" icon="pi pi-search" @click="toggleSearchId" />
    </div>

    <div v-if="showForm">
      <RequestForm @created="handleRequestCreated" />
    </div>

    <div v-if="searchByClient">
      <div class="mb-3">
        <InputText v-model="clientId" placeholder="Client ID" />
        <Button label="Buscar" @click="searchRequestsByClient" class="ml-2" />
      </div>
    </div>

    <div v-if="searchById">
      <div class="mb-3">
        <InputText v-model="requestId" placeholder="Request ID" />
        <Button label="Buscar" @click="searchRequestById" class="ml-2" />
      </div>
    </div>

    <div v-if="requests.length > 0">
      <div v-for="req in requests" :key="req.requestId" class="mb-4">
        <RequestCard
            :request="req"
            @deleted="removeRequest(req.requestId)"
            @updated="refreshRequest"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import RequestForm from '@/ServiceDesignAndPlanning/components/request-form.component.vue'
import RequestCard from '@/ServiceDesignAndPlanning/components/request-card.component.vue'
import { RequestService } from '@/ServiceDesignAndPlanning/services/request.service'

export default {
  name: 'RequestsView',
  components: {
    Button,
    InputText,
    RequestForm,
    RequestCard
  },
  data() {
    return {
      showForm: false,
      searchByClient: false,
      searchById: false,
      clientId: '',
      requestId: '',
      requests: [],
      service: new RequestService()
    }
  },
  methods: {
    refreshRequest(updated) {
      const index = this.requests.findIndex(r => r.requestId === updated.requestId)
      if (index !== -1) {
        this.requests[index] = updated
      }
    },
    toggleSearchClient() {
      this.searchByClient = !this.searchByClient
      this.searchById = false
      this.requests = []
    },
    toggleSearchId() {
      this.searchById = !this.searchById
      this.searchByClient = false
      this.requests = []
    },
    async searchRequestsByClient() {
      try {
        const data = await this.service.getByClientId(this.clientId)
        this.requests = data
      } catch (error) {
        console.error('Error getting requests by client', error)
      }
    },

    async searchRequestById() {
      try {
        const data = await this.service.getById(this.requestId)
        this.requests = [data]
      } catch (error) {
        console.error('Error getting request by ID', error)
      }

    },
    handleRequestCreated() {
      this.showForm = false
      this.requests = []
      this.$toast.add({ severity: 'success', summary: 'Petición creada', life: 3000 })
    },
    removeRequest(id) {
      this.requests = this.requests.filter(req => req.requestId !== id)
    }
  }
}
</script>

<style scoped>
input {
  margin-right: 0.5rem;
}
</style>
