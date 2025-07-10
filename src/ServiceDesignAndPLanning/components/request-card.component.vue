<template>
  <Card class="mb-3">
    <template #title>
      <div class="flex justify-content-between align-items-center">
        <span class="font-bold text-lg">#{{ request.requestId }}</span>
        <div class="flex gap-2">
          <Button icon="pi pi-pencil" severity="info" @click="editMode = !editMode" />
          <Button icon="pi pi-trash" severity="danger" @click="deleteRequest" />
        </div>
      </div>
    </template>
    <template #content>
      <div v-if="!editMode">
        <p><strong>{{ $t('request.clientId') }}:</strong> {{ request.clientId }}</p>
        <p><strong>{{ $t('request.technicianId') }}:</strong> {{ request.technicianId }}</p>
        <p><strong>{{ $t('request.propertyId') }}:</strong> {{ request.propertyId }}</p>
        <p><strong>{{ $t('request.serviceId') }}:</strong> {{ request.serviceId }}</p>
        <p><strong>{{ $t('request.problemDescription') }}:</strong> {{ request.problemDescription }}</p>
        <p><strong>{{ $t('request.scheduledDate') }}:</strong> {{ formatDate(request.scheduledDate) }}</p>
      </div>

      <div v-else class="grid formgrid p-fluid p-3">
        <div class="col-12 md:col-6">
          <label for="clientId">Client ID</label>
          <InputText id="clientId" v-model="editable.clientId" />
        </div>
        <div class="col-12 md:col-6">
          <label for="technicianId">Technician ID</label>
          <InputText id="technicianId" v-model="editable.technicianId" />
        </div>
        <div class="col-12 md:col-6">
          <label for="propertyId">Property ID</label>
          <InputText id="propertyId" v-model="editable.propertyId" />
        </div>
        <div class="col-12 md:col-6">
          <label for="serviceId">Service ID</label>
          <InputText id="serviceId" v-model="editable.serviceId" />
        </div>
        <div class="col-12">
          <label for="problemDescription">Description</label>
          <InputText id="problemDescription" v-model="editable.problemDescription" />
        </div>
        <div class="col-12 md:col-6">
          <label for="scheduledDate">Scheduled Date</label>
          <Calendar id="scheduledDate" v-model="editable.scheduledDate" showTime hourFormat="24" />
        </div>
        <div class="col-12 mt-3">
          <Button label="Guardar" icon="pi pi-check" class="pv-button" @click="updateRequest" />
        </div>
      </div>

    </template>
  </Card>
</template>

<script>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import { RequestService } from '@/ServiceDesignAndPlanning/services/request.service'

export default {
  name: 'RequestCard',
  props: {
    request: Object
  },
  components: {
    Card,
    Button,
    InputText,
    Calendar
  },
  setup(props, { emit }) {
    const editMode = ref(false)
    const service = new RequestService()

    const editable = ref({
      clientId: props.request.clientId,
      technicianId: props.request.technicianId,
      propertyId: props.request.propertyId,
      serviceId: props.request.serviceId,
      problemDescription: props.request.problemDescription,
      scheduledDate: props.request.scheduledDate,
      bill: props.request.bill ?? {
        billingPeriod: '',
        energyConsumed: 0,
        amountPaid: 0,
        billImageUrl: ''
      },
      photos: props.request.photos ?? []
    })

    const formatDate = (date) => {
      if (!date) return '—'
      return new Date(date).toLocaleString()
    }

    const updateRequest = async () => {
      try {
        const updated = {
          ...props.request,
          clientId: editable.value.clientId,
          technicianId: editable.value.technicianId,
          propertyId: editable.value.propertyId,
          serviceId: editable.value.serviceId,
          scheduledDate: new Date(editable.value.scheduledDate).toISOString().split('T')[0],
          problemDescription: editable.value.problemDescription,
          bill: editable.value.bill ?? {
            billingPeriod: '',
            energyConsumed: 0,
            amountPaid: 0,
            billImageUrl: ''
          },
          photos: editable.value.photos ?? []
        }
        console.log('Payload enviado al PUT:', updated)
        await service.update(props.request.requestId, updated)
        emit('updated', updated)
        editMode.value = false
      } catch (error) {
        console.error('Error updating request', error)
      }
    }

    const deleteRequest = async () => {
      try {
        await service.delete(props.request.requestId)
        emit('deleted', props.request.requestId)
      } catch (error) {
        console.error('Error deleting request', error)
      }
    }

    return {
      editMode,
      editable,
      formatDate,
      updateRequest,
      deleteRequest
    }
  }
}
</script>

<style scoped>
label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
  color: #f0f0f0;
}

input, .p-inputtext {
  width: 100%;
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid #555;
  background-color: #1e1e1e;
  color: #f0f0f0;
  transition: border-color 0.3s;
}

input:focus, .p-inputtext:focus {
  border-color: #42a5f5;
  outline: none;
}

.pv-button {
  min-width: 130px;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  border-radius: 8px;
}
</style>
