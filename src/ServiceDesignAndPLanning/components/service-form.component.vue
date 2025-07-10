<template>
  <Card class="mb-4">
    <template #title>{{ $t('service.formTitle') }}</template>
    <template #content>
      <form @submit.prevent="submitForm" class="grid formgrid p-fluid">

        <!-- Datos principales -->
        <div class="col-12 md:col-6">
          <label for="name">{{ $t('service.name') }}</label>
          <InputText id="name" v-model="form.name" required />
        </div>

        <div class="col-12 md:col-6">
          <label for="category">{{ $t('service.category') }}</label>
          <InputText id="category" v-model="form.category" required />
        </div>

        <div class="col-12">
          <label for="description">{{ $t('service.description') }}</label>
          <Textarea id="description" v-model="form.description" rows="3" autoResize />
        </div>

        <div class="col-6">
          <label for="basePrice">{{ $t('service.basePrice') }}</label>
          <InputNumber id="basePrice" v-model="form.basePrice" mode="currency" currency="USD" locale="en-US" />
        </div>

        <div class="col-6">
          <label for="estimatedTime">{{ $t('service.estimatedTime') }}</label>
          <InputText id="estimatedTime" v-model="form.estimatedTime" />
        </div>

        <div class="col-12 md:col-6">
          <label for="createdBy">{{ $t('service.createdBy') }}</label>
          <InputText id="createdBy" v-model="form.createdBy" />
        </div>

        <div class="col-12 md:col-6">
          <label for="isVisible">{{ $t('service.isVisible') }}</label>
          <InputSwitch v-model="form.isVisible" />
        </div>

        <!-- Policy -->
        <div class="col-12">
          <h4>Policy</h4>
          <div class="grid">
            <div class="col-6">
              <label for="cancellationPolicy">{{ $t('service.cancellationPolicy') }}</label>
              <InputText id="cancellationPolicy" v-model="form.policy.cancellationPolicy" />
            </div>
            <div class="col-6">
              <label for="terms">{{ $t('service.termsAndConditions') }}</label>
              <InputText id="terms" v-model="form.policy.termsAndConditions" />
            </div>
          </div>
        </div>

        <!-- Restriction -->
        <div class="col-12">
          <h4>Restriction</h4>
          <div class="grid">
            <div class="col-6">
              <label>{{ $t('service.unavailableDistricts') }}</label>
              <Chips v-model="form.restriction.unavailableDistricts" />
            </div>
            <div class="col-6">
              <label>{{ $t('service.forbiddenDays') }}</label>
              <Chips v-model="form.restriction.forbiddenDays" />
            </div>
            <div class="col-12 mt-2">
              <label>{{ $t('service.requiresSpecialCertification') }}</label>
              <InputSwitch v-model="form.restriction.requiresSpecialCertification" />
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="col-12">
          <label>{{ $t('service.tags') }}</label>
          <Chips v-model="tags" />
        </div>

        <!-- Components -->
        <div class="col-12">
          <label>{{ $t('service.components') }}</label>
          <div v-for="(component, index) in components" :key="index" class="grid mb-2">
            <div class="col-6">
              <InputText v-model="component.componentId" placeholder="Component ID" />
            </div>
            <div class="col-4">
              <InputNumber v-model="component.quantity" placeholder="Quantity" />
            </div>
            <div class="col-2">
              <Button icon="pi pi-times" class="p-button-danger" @click="removeComponent(index)" />
            </div>
          </div>
          <Button icon="pi pi-plus" label="Add Component" @click="addComponent" />
        </div>

        <!-- Submit -->
        <div class="col-12 mt-4">
          <Button type="submit" :label="$t('service.submit')" icon="pi pi-check" />
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
import { ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import Chips from 'primevue/chips'
import Button from 'primevue/button'
import { ServiceService } from '@/ServiceDesignAndPlanning/services/service.service'

export default {
  name: 'ServiceForm',
  components: {
    Card,
    InputText,
    Textarea,
    InputNumber,
    InputSwitch,
    Chips,
    Button
  },
  setup(_, { emit }) {
    const form = ref({
      name: '',
      description: '',
      basePrice: 0,
      estimatedTime: '',
      category: '',
      isVisible: true,
      createdBy: '',
      policy: {
        cancellationPolicy: '',
        termsAndConditions: ''
      },
      restriction: {
        unavailableDistricts: [],
        forbiddenDays: [],
        requiresSpecialCertification: false
      }
    })

    const tags = ref([])
    const components = ref([])

    const service = new ServiceService()

    const addComponent = () => {
      components.value.push({ componentId: '', quantity: 1 })
    }

    const removeComponent = (index) => {
      components.value.splice(index, 1)
    }

    const submitForm = async () => {
      try {
        const payload = {
          ...form.value,
          tags: tags.value.map(tag => ({ name: tag })),
          components: components.value
        }

        await service.create(payload)
        emit('created')
        alert('Service created!')
        resetForm()
      } catch (error) {
        console.error('Error submitting service', error)
        alert('Error creating service')
      }
    }

    const resetForm = () => {
      form.value = {
        name: '',
        description: '',
        basePrice: 0,
        estimatedTime: '',
        category: '',
        isVisible: true,
        createdBy: '',
        policy: {
          cancellationPolicy: '',
          termsAndConditions: ''
        },
        restriction: {
          unavailableDistricts: [],
          forbiddenDays: [],
          requiresSpecialCertification: false
        }
      }
      tags.value = []
      components.value = []
    }

    return {
      form,
      tags,
      components,
      submitForm,
      addComponent,
      removeComponent
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

input,
textarea,
.p-inputtext {
  width: 100%;
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid #555;
  background-color: #1e1e1e;
  color: #f0f0f0;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus,
.p-inputtext:focus {
  border-color: #42a5f5;
  outline: none;
}

.field {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 2rem 1rem 1rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 2rem;
  row-gap: 1.5rem;
  padding: 0 1rem;
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
