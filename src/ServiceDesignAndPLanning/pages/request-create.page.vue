<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">{{ $t('request.createTitle') }}</h2>

    <pv-card>
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-6">
          <label for="clientId">{{ $t('request.clientId') }}</label>
          <pv-input-text v-model="form.clientId" id="clientId" required />
        </div>
        <div class="field col-12 md:col-6">
          <label for="technicianId">{{ $t('request.technicianId') }}</label>
          <pv-input-text v-model="form.technicianId" id="technicianId" required />
        </div>
        <div class="field col-12 md:col-6">
          <label for="propertyId">{{ $t('request.propertyId') }}</label>
          <pv-input-text v-model="form.propertyId" id="propertyId" required />
        </div>
        <div class="field col-12 md:col-6">
          <label for="serviceId">{{ $t('request.serviceId') }}</label>
          <pv-input-text v-model="form.serviceId" id="serviceId" required />
        </div>

        <div class="field col-12">
          <label for="problemDescription">{{ $t('request.description') }}</label>
          <pv-textarea v-model="form.problemDescription" id="problemDescription" rows="3" autoResize />
        </div>

        <div class="field col-12 md:col-6">
          <label for="scheduledDate">{{ $t('request.scheduledDate') }}</label>
          <pv-calendar v-model="form.scheduledDate" id="scheduledDate" showTime hourFormat="24" />
        </div>

        <div class="col-12">
          <h4>{{ $t('request.billInfo') }}</h4>
          <div class="formgrid grid">
            <div class="field col-12 md:col-3">
              <label for="billingPeriod">{{ $t('request.billingPeriod') }}</label>
              <pv-input-text v-model="form.bill.billingPeriod" id="billingPeriod" />
            </div>
            <div class="field col-12 md:col-3">
              <label for="energyConsumed">{{ $t('request.energyConsumed') }}</label>
              <pv-input-text v-model.number="form.bill.energyConsumed" id="energyConsumed" />
            </div>
            <div class="field col-12 md:col-3">
              <label for="amountPaid">{{ $t('request.amountPaid') }}</label>
              <pv-input-text v-model.number="form.bill.amountPaid" id="amountPaid" />
            </div>
            <div class="field col-12 md:col-3">
              <label for="billImageUrl">{{ $t('request.billImageUrl') }}</label>
              <pv-input-text v-model="form.bill.billImageUrl" id="billImageUrl" />
            </div>
          </div>
        </div>

        <div class="field col-12">
          <label for="photos">{{ $t('request.photos') }}</label>
          <input type="file" multiple @change="handlePhotosUpload" />
        </div>
      </div>

      <div class="mt-4">
        <pv-button label="Submit" icon="pi pi-check" @click="submitForm" />
        <pv-button class="ml-2" severity="secondary" label="Cancel" icon="pi pi-times" @click="$router.push('/homeContracting')" />
      </div>
    </pv-card>
  </div>
</template>

<script>
import { RequestService } from '@/ServiceDesignAndPlanning/services/request.service.js'

export default {
  name: 'RequestCreate',
  data() {
    return {
      form: {
        clientId: '',
        technicianId: '',
        propertyId: '',
        serviceId: '',
        scheduledDate: '',
        problemDescription: '',
        bill: {
          billingPeriod: '',
          energyConsumed: 0,
          amountPaid: 0,
          billImageUrl: ''
        },
        photos: []
      },
      requestService: new RequestService()
    }
  },
  methods: {
    async submitForm() {
      try {
        const payload = {
          ...this.form,
          scheduledDate: new Date(this.form.scheduledDate).toISOString(),
          photos: this.form.photos.map((url, i) => ({
            photoId: `photo-${i}-${Date.now()}`,
            url
          }))
        }

        await this.requestService.create(payload)
        this.$toast.add({ severity: 'success', summary: this.$t('request.created'), life: 3000 })
        this.$router.push('/homeContracting')
      } catch (e) {
        console.error('Error creating request', e)
        this.$toast.add({ severity: 'error', summary: this.$t('error'), detail: this.$t('request.createError'), life: 3000 })
      }
    },

    async handlePhotosUpload(event) {
      const files = Array.from(event.target.files)
      const base64Photos = await Promise.all(files.map(this.toBase64))
      this.form.photos = base64Photos
    },

    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
      })
    }
  }
}
</script>

<style scoped>
label {
  font-weight: 500;
}
</style>
