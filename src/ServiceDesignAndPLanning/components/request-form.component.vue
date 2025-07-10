<template>
  <Card class="mb-4">
    <template #title>{{ $t('request.formTitle') }}</template>
    <template #content>
      <form @submit.prevent="submitForm" class="grid formgrid p-fluid">
        <div class="col-12 md:col-6">
          <label for="clientId">{{ $t('request.clientId') }}</label>
          <InputText id="clientId" v-model="form.clientId" required />
        </div>

        <div class="col-12 md:col-6">
          <label for="technicianId">{{ $t('request.technicianId') }}</label>
          <InputText id="technicianId" v-model="form.technicianId" required />
        </div>

        <div class="col-12 md:col-6">
          <label for="propertyId">{{ $t('request.propertyId') }}</label>
          <InputText id="propertyId" v-model="form.propertyId" required />
        </div>

        <div class="col-12 md:col-6">
          <label for="serviceId">{{ $t('request.serviceId') }}</label>
          <InputText id="serviceId" v-model="form.serviceId" required />
        </div>

        <div class="col-12">
          <label for="problemDescription">{{ $t('request.description') }}</label>
          <Textarea id="problemDescription" v-model="form.problemDescription" rows="3" autoResize />
        </div>

        <div class="col-12 md:col-6">
          <label for="scheduledDate">{{ $t('request.scheduledDate') }}</label>
          <Calendar id="scheduledDate" v-model="form.scheduledDate" showTime hourFormat="24" />
        </div>

        <div class="col-12">
          <h4>{{ $t('request.billInfo') }}</h4>
          <div class="grid">
            <div class="col-12 md:col-3">
              <label for="billingPeriod">{{ $t('request.billingPeriod') }}</label>
              <InputText id="billingPeriod" v-model="form.bill.billingPeriod" />
            </div>
            <div class="col-12 md:col-3">
              <label for="energyConsumed">{{ $t('request.energyConsumed') }}</label>
              <InputText id="energyConsumed" v-model.number="form.bill.energyConsumed" />
            </div>
            <div class="col-12 md:col-3">
              <label for="amountPaid">{{ $t('request.amountPaid') }}</label>
              <InputText id="amountPaid" v-model.number="form.bill.amountPaid" />
            </div>
            <div class="col-12 md:col-3">
              <label for="billImageUrl">{{ $t('request.billImageUrl') }}</label>
              <InputText id="billImageUrl" v-model="form.bill.billImageUrl" />
            </div>
          </div>
        </div>

        <div class="col-12">
          <label>{{ $t('request.photos') }}</label>
          <input type="file" multiple @change="handlePhotosUpload" />
        </div>

        <div class="col-12 mt-3">
          <Button type="submit" :label="$t('request.submit')" icon="pi pi-check" />
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
import { ref } from 'vue'
import { RequestService } from '../services/request.service.js'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'

export default {
  name: 'RequestForm',
  components: {
    Card,
    InputText,
    Textarea,
    Calendar,
    Button
  },
  setup(props, { emit }) {
    const form = ref({
      clientId: '',
      technicianId: '',
      propertyId: '',
      serviceId: '',
      problemDescription: '',
      scheduledDate: '',
      bill: {
        billingPeriod: '',
        energyConsumed: 0,
        amountPaid: 0,
        billImageUrl: ''
      },
      photos: []
    })

    const service = new RequestService()

    const submitForm = async () => {
      try {
        const payload = {
          ...form.value,
          scheduledDate: new Date(form.value.scheduledDate).toISOString().split('T')[0],
          photos: form.value.photos.map((url, i) => ({
            photoId: `photo-${i}-${Date.now()}`,
            url
          }))
        }

        await service.create(payload)
        emit('created') // notifica a la vista padre
        alert('Request submitted!')
        resetForm()
      } catch (error) {
        console.error(error)
        alert('Error submitting request')
      }
    }

    const handlePhotosUpload = async (event) => {
      const files = Array.from(event.target.files)
      const base64Photos = await Promise.all(files.map(toBase64))
      form.value.photos = base64Photos
    }

    const toBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
      })
    }

    const resetForm = () => {
      form.value = {
        clientId: '',
        technicianId: '',
        propertyId: '',
        serviceId: '',
        problemDescription: '',
        scheduledDate: '',
        bill: {
          billingPeriod: '',
          energyConsumed: 0,
          amountPaid: 0,
          billImageUrl: ''
        },
        photos: []
      }
    }

    return {
      form,
      submitForm,
      handlePhotosUpload
    }
  }
}
</script>

<style scoped>
label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.4rem;
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

.field {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.pv-card {
  padding: 2rem;
  background-color: #212121;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

.mt-4 {
  margin-top: 2rem;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.pv-button {
  min-width: 130px;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  border-radius: 8px;
}
</style>
