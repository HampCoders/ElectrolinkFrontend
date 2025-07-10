<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">{{ $t('schedule.title') }}</h2>

    <div class="flex gap-3 mb-4">
      <Button label="Crear Horario" icon="pi pi-plus" @click="showForm = !showForm" />
      <Button label="Buscar por Técnico" icon="pi pi-search" @click="toggleSearch" />
    </div>

    <div v-if="showForm">
      <ScheduleForm @created="handleScheduleCreated" />
    </div>

    <div v-if="searchByTechnician">
      <div class="mb-3">
        <InputText v-model="technicianId" placeholder="Technician ID" />
        <Button label="Buscar" @click="searchSchedules" class="ml-2" />
      </div>
    </div>

    <div v-if="schedules.length > 0">
      <div v-for="sch in schedules" :key="sch.scheduleId" class="mb-4">
        <ScheduleCard
            :schedule="sch"
            @deleted="removeSchedule(sch.scheduleId)"
            @updated="refreshSchedule"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ScheduleForm from '@/ServiceDesignAndPlanning/components/schedule-form.component.vue'
import ScheduleCard from '@/ServiceDesignAndPlanning/components/schedule-card.component.vue'
import { ScheduleService } from '@/ServiceDesignAndPlanning/services/schedule.service.js'

export default {
  name: 'ScheduleView',
  components: {
    Button,
    InputText,
    ScheduleForm,
    ScheduleCard
  },
  data() {
    return {
      showForm: false,
      searchByTechnician: false,
      technicianId: '',
      schedules: [],
      service: new ScheduleService()
    }
  },
  methods: {
    toggleSearch() {
      this.searchByTechnician = !this.searchByTechnician
      this.schedules = []
    },
    async searchSchedules() {
      try {
        const data = await this.service.getByTechnicianId(this.technicianId)
        this.schedules = data
      } catch (error) {
        console.error('Error getting schedules', error)
      }
    },
    handleScheduleCreated() {
      this.showForm = false
      this.schedules = []
      this.$toast.add({ severity: 'success', summary: 'Horario creado', life: 3000 })
    },
    removeSchedule(id) {
      this.schedules = this.schedules.filter(sch => sch.scheduleId !== id)
    },
    refreshSchedule(updated) {
      const index = this.schedules.findIndex(s => s.scheduleId === updated.scheduleId)
      if (index !== -1) {
        this.schedules[index] = updated
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
