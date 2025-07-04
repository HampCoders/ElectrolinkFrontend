<template>
  <Card>
    <template #title>Crear Nuevo Componente</template>
    <template #subtitle>Completa los datos para registrar un nuevo componente.</template>
    <template #content>
      <form @submit.prevent="onSubmit" class="flex flex-column gap-4">
        <div class="field">
          <label for="name" class="font-bold block mb-2">Nombre del Componente</label>
          <InputText id="name" v-model="form.name" placeholder="Ej: Resistencia 10k Ohm" class="w-full" :class="{'p-invalid': submitted && !form.name}" />
          <small v-if="submitted && !form.name" class="p-error">El nombre es requerido.</small>
        </div>

        <div class="field">
          <label for="description" class="font-bold block mb-2">Descripción</label>
          <Textarea id="description" v-model="form.description" placeholder="Ej: Resistencia de carbón, 1/4W, 5% tolerancia" class="w-full" rows="3" />
        </div>

        <div class="field">
          <label for="componentTypeId" class="font-bold block mb-2">Tipo de Componente</label>
          <Dropdown id="componentTypeId" v-model="form.componentTypeId" :options="componentTypes" optionLabel="name" optionValue="id" placeholder="Selecciona un tipo" class="w-full" :loading="isLoadingTypes" :class="{'p-invalid': submitted && !form.componentTypeId}" />
          <small v-if="submitted && !form.componentTypeId" class="p-error">Debe seleccionar un tipo.</small>
        </div>

        <div class="field">
          <div class="flex align-items-center">
            <InputSwitch v-model="form.isActive" inputId="isActive" />
            <label for="isActive" class="ml-2">Componente Activo</label>
          </div>
        </div>

        <Message v-if="errorMessage" severity="error" :closable="false">{{ errorMessage }}</Message>

        <div class="flex justify-content-end gap-2">
          <router-link to="/electrical-component-type" custom v-slot="{ navigate }">
            <Button label="Ir a Tipos" severity="secondary" @click="navigate" type="button" />
          </router-link>
          <Button type="submit" label="Crear Componente" :loading="isLoading" />
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
import { useComponentStore } from '../../store/componentStore.js';
import { useComponentTypeStore } from '../../store/componentTypeStore.js';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';
import Message from 'primevue/message';

export default {
  name: 'component-form',
  components: { Card, InputText, Textarea, Dropdown, InputSwitch, Button, Message },
  data() {
    return {
      componentStore: useComponentStore(),
      typeStore: useComponentTypeStore(),
      form: {
        name: '',
        description: '',
        isActive: true,
        componentTypeId: null
      },
      submitted: false,
      errorMessage: null
    };
  },
  computed: {
    isLoading() {
      return this.componentStore.isLoading;
    },
    isLoadingTypes() {
      return this.typeStore.isLoading;
    },
    componentTypes() {
      return this.typeStore.types;
    }
  },
  methods: {
    async onSubmit() {
      this.submitted = true;
      this.errorMessage = null;

      if (!this.form.name || !this.form.componentTypeId) {
        return;
      }

      try {
        await this.componentStore.createComponent({ ...this.form });
        this.form = { name: '', description: '', isActive: true, componentTypeId: null };
        this.submitted = false;
        this.$emit('component-created');
      } catch (err) {
        this.errorMessage = err.message || 'Ocurrió un error desconocido.';
      }
    }
  },
  created() {
    // Cargamos los tipos de componente para el dropdown cuando se crea el formulario
    this.typeStore.fetchAllTypes();
  }
};
</script>
