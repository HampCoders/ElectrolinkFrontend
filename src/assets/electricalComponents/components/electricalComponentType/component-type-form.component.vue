<script>
import { useComponentTypeStore } from '../../store/component-type.store.js';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Message from 'primevue/message';

export default {
  name: 'component-type-form',
  components: { Card, InputText, Textarea, Button, Message },
  data() {
    return {
      store: useComponentTypeStore(),
      form: {
        name: '',
        description: ''
      },
      submitted: false,
      errorMessage: null
    };
  },
  computed: {
    isLoading() {
      return this.store.isLoading;
    }
  },
  methods: {
    async onSubmit() {
      this.submitted = true;
      this.errorMessage = null;

      if (!this.form.name) {
        return;
      }

      try {
        await this.store.createType({ ...this.form });
        this.form.name = '';
        this.form.description = '';
        this.submitted = false;
        this.$emit('type-added');
      } catch (err) {
        this.errorMessage = err.message || 'Ocurrió un error desconocido.';
      }
    }
  }
};
</script>

<template>
  <Card>
    <template #title>Agregar Nuevo Tipo</template>
    <template #content>
      <form @submit.prevent="onSubmit" class="flex flex-column gap-3">
        <div class="field">
          <label for="name" class="font-bold block mb-2">Nombre del Tipo</label>
          <InputText id="name" v-model="form.name" placeholder="Ej: Resistencias" class="w-full" :class="{ 'p-invalid': submitted && !form.name }" />
          <small v-if="submitted && !form.name" class="p-error">El nombre es requerido.</small>
        </div>

        <div class="field">
          <label for="description" class="font-bold block mb-2">Descripción</label>
          <Textarea id="description" v-model="form.description" placeholder="Componentes pasivos de dos terminales" class="w-full" rows="3" />
        </div>

        <Message v-if="errorMessage" severity="error" :closable="false">{{ errorMessage }}</Message>

        <div class="flex justify-content-end gap-2">
          <router-link to="/electrical-component-registration" custom v-slot="{ navigate }">
            <Button label="Ir a Componentes" severity="secondary" @click="navigate" type="button" />
          </router-link>
          <Button type="submit" label="Agregar Tipo" :loading="isLoading" />
        </div>
      </form>
    </template>
  </Card>
</template>


