<template>
  <Card class="mb-4">
    <template #title>{{ $t('schedule.formTitle') }}</template>
    <template #content>
      <form @submit.prevent="submitForm" class="grid formgrid p-fluid">
        <div class="col-12 md:col-6">
          <label for="technicianId">{{ $t('schedule.technicianId') }}</label>
          <InputText id="technicianId" v-model="form.technicianId" required />
        </div>

        <div class="col-12 md:col-6">
          <label for="day">{{ $t('schedule.day') }}</label>
          <InputText id="day" v-model="form.day" required />
        </div>

        <div class="col-12 md:col-6">
          <label for="startTime">{{ $t('schedule.startTime') }}</label>
          <InputText id="startTime" v-model="form.startTime" placeholder="HH:MM" required />
        </div>

        <div class="col-12 md:col-6">
          <label for="endTime">{{ $t('schedule.endTime') }}</label>
          <InputText id="endTime" v-model="form.endTime" placeholder="HH:MM" required />
        </div>

        <div class="col-12 mt-3">
          <Button type="submit" :label="$t('schedule.submit')" icon="pi pi-check" />
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
import { ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ScheduleService } from '@/ServiceDesignAndPlanning/services/schedule.service.js'

export default {
  name: 'ScheduleForm',
  components: {
    Card,
    InputText,
    Button
  },
  setup(_, { emit }) {
    const form = ref({
      technicianId: '',
      day: '',
      startTime: '',
      endTime: ''
    })

    const service = new ScheduleService()

    const submitForm = async () => {
      try {
        await service.create(form.value)
        emit('created') // notifica a la vista padre
        alert('Schedule submitted!')
        resetForm()
      } catch (error) {
        console.error('Error submitting schedule', error)
        alert('Error submitting schedule')
      }
    }

    const resetForm = () => {
      form.value = {
        technicianId: '',
        day: '',
        startTime: '',
        endTime: ''
      }
    }

    return {
      form,
      submitForm
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
