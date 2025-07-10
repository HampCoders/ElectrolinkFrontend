<template>
  <Card class="mb-3">
    <template #title>
      <div class="flex justify-content-between align-items-center">
        <span class="font-bold text-lg">#{{ service.serviceId }}</span>
        <div class="flex gap-2">
          <Button icon="pi pi-pencil" severity="info" @click="editMode = !editMode" />
          <Button icon="pi pi-trash" severity="danger" @click="deleteService" />
        </div>
      </div>
    </template>

    <template #content>
      <div v-if="!editMode">
        <p><strong>{{ $t('service.name') }}:</strong> {{ service.name }}</p>
        <p><strong>{{ $t('service.description') }}:</strong> {{ service.description }}</p>
        <p><strong>{{ $t('service.basePrice') }}:</strong> ${{ service.basePrice }}</p>
        <p><strong>{{ $t('service.estimatedTime') }}:</strong> {{ service.estimatedTime }}</p>
        <p><strong>{{ $t('service.category') }}:</strong> {{ service.category }}</p>
        <p><strong>{{ $t('service.isVisible') }}:</strong> {{ service.isVisible ? 'Yes' : 'No' }}</p>
      </div>

      <div v-else>
        <InputText v-model="editable.name" class="mb-2" />
        <Textarea v-model="editable.description" class="mb-2" autoResize rows="2" />
        <InputNumber v-model="editable.basePrice" class="mb-2" mode="currency" currency="USD" locale="en-US" />
        <InputText v-model="editable.estimatedTime" class="mb-2" />
        <InputText v-model="editable.category" class="mb-2" />
        <InputSwitch v-model="editable.isVisible" class="mb-2" />

        <Button label="Guardar" icon="pi pi-check" class="mt-2" @click="updateService" />
      </div>
    </template>
  </Card>
</template>

<script>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import { ServiceService } from '@/ServiceDesignAndPlanning/services/service.service'

export default {
  name: 'ServiceCard',
  props: {
    service: Object
  },
  components: {
    Card,
    Button,
    InputText,
    Textarea,
    InputNumber,
    InputSwitch
  },
  setup(props, { emit }) {
    const editMode = ref(false)
    const serviceService = new ServiceService()

    const editable = ref({
      name: props.service.name,
      description: props.service.description,
      basePrice: props.service.basePrice,
      estimatedTime: props.service.estimatedTime,
      category: props.service.category,
      isVisible: props.service.isVisible
    })

    const updateService = async () => {
      try {
        const updated = {
          ...props.service,
          ...editable.value
        }
        await serviceService.update(props.service.serviceId, updated)
        emit('updated', updated)
        editMode.value = false
      } catch (error) {
        console.error('Error updating service', error)
      }
    }

    const deleteService = async () => {
      try {
        await serviceService.delete(props.service.serviceId)
        emit('deleted', props.service.serviceId)
      } catch (error) {
        console.error('Error deleting service', error)
      }
    }

    return {
      editMode,
      editable,
      updateService,
      deleteService
    }
  }
}
</script>
