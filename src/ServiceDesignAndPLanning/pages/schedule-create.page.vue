<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">{{ $t('schedule.createTitle') }}</h2>

    <pv-card>
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-6">
          <label for="technicianId">{{ $t('schedule.technicianId') }}</label>
          <pv-input-text v-model="form.technicianId" id="technicianId" required />
        </div>

        <div class="field col-12 md:col-6">
          <label for="day">{{ $t('schedule.day') }}</label>
          <pv-input-text v-model="form.day" id="day" required />
        </div>

        <div class="field col-12 md:col-6">
          <label for="startTime">{{ $t('schedule.startTime') }}</label>
          <pv-input-text v-model="form.startTime" id="startTime" placeholder="HH:MM" required />
        </div>

        <div class="field col-12 md:col-6">
          <label for="endTime">{{ $t('schedule.endTime') }}</label>
          <pv-input-text v-model="form.endTime" id="endTime" placeholder="HH:MM" required />
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
import { ScheduleService } from '@/ServiceDesignAndPlanning/services/schedule.service.js'

export default {
  name: 'ScheduleCreate',
  data() {
    return {
      form: {
        technicianId: '',
        day: '',
        startTime: '',
        endTime: ''
      },
      scheduleService: new ScheduleService()
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.scheduleService.create(this.form)
        this.$toast.add({ severity: 'success', summary: this.$t('schedule.created'), life: 3000 })
        this.$router.push('/homeContracting')
      } catch (e) {
        console.error('Error creating schedule', e)
        this.$toast.add({
          severity: 'error',
          summary: this.$t('error'),
          detail: this.$t('schedule.createError'),
          life: 3000
        })
      }
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
