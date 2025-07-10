<template>
  <Card class="mb-3">
    <template #title>
      <div class="flex justify-content-between align-items-center">
        <span class="font-bold text-lg">#{{ schedule.scheduleId }}</span>
        <div class="flex gap-2">
          <Button icon="pi pi-pencil" severity="info" @click="editMode = !editMode" />
          <Button icon="pi pi-trash" severity="danger" @click="deleteSchedule" />
        </div>
      </div>
    </template>

    <template #content>
      <div v-if="!editMode">
        <p><strong>{{ $t('schedule.technicianId') }}:</strong> {{ schedule.technicianId }}</p>
        <p><strong>{{ $t('schedule.day') }}:</strong> {{ schedule.day }}</p>
        <p><strong>{{ $t('schedule.startTime') }}:</strong> {{ schedule.startTime }}</p>
        <p><strong>{{ $t('schedule.endTime') }}:</strong> {{ schedule.endTime }}</p>
      </div>

      <div v-else>
        <InputText v-model="editable.day" class="mb-2" />
        <InputText v-model="editable.startTime" class="mb-2" placeholder="HH:MM" />
        <InputText v-model="editable.endTime" class="mb-2" placeholder="HH:MM" />
        <Button label="Guardar" icon="pi pi-check" class="mt-2" @click="updateSchedule" />
      </div>
    </template>
  </Card>
</template>

<script>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ScheduleService } from '@/ServiceDesignAndPlanning/services/schedule.service'

export default {
  name: 'ScheduleCard',
  props: {
    schedule: Object
  },
  components: {
    Card,
    Button,
    InputText
  },
  setup(props, { emit }) {
    const editMode = ref(false)
    const service = new ScheduleService()

    const editable = ref({
      day: props.schedule.day,
      startTime: props.schedule.startTime,
      endTime: props.schedule.endTime
    })

    const updateSchedule = async () => {
      try {
        const updated = {
          ...props.schedule,
          ...editable.value
        }
        await service.update(props.schedule.scheduleId, updated)
        emit('updated', updated)
        editMode.value = false
      } catch (error) {
        console.error('Error updating schedule', error)
      }
    }

    const deleteSchedule = async () => {
      try {
        await service.delete(props.schedule.scheduleId)
        emit('deleted', props.schedule.scheduleId)
      } catch (error) {
        console.error('Error deleting schedule', error)
      }
    }

    return {
      editMode,
      editable,
      updateSchedule,
      deleteSchedule
    }
  }
}
</script>
