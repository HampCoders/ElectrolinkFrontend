<template>
  <Card>
    <template #title>Añadir Componente al Inventario</template>
    <template #content>
      <form @submit.prevent="onSubmit" class="flex flex-column gap-4">
        <div class="field">
          <label for="component" class="font-bold block mb-2">Buscar Componente</label>
          <AutoComplete v-model="form.component" :suggestions="filteredComponents" @complete="searchComponent" field="name" placeholder="ej: Resistencia 220 Ohm" :class="{'p-invalid': submitted && !form.component}" class="w-full">
            <template #item="slotProps">
              <div>{{ slotProps.item.name }}</div>
            </template>
          </AutoComplete>
          <small v-if="submitted && !form.component" class="p-error">Debe seleccionar un componente.</small>
        </div>

        <div class="field">
          <label for="quantity" class="font-bold block mb-2">Cantidad</label>
          <InputNumber id="quantity" v-model="form.quantity" mode="decimal" :min="0" class="w-full" :class="{'p-invalid': submitted && form.quantity === null}" />
          <small v-if="submitted && form.quantity === null" class="p-error">La cantidad es requerida.</small>
        </div>

        <div class="field">
          <label for="alertThreshold" class="font-bold block mb-2">Umbral de Alerta</label>
          <InputNumber id="alertThreshold" v-model="form.alertThreshold" mode="decimal" :min="0" class="w-full" :class="{'p-invalid': submitted && form.alertThreshold === null}" />
          <small v-if="submitted && form.alertThreshold === null" class="p-error">El umbral es requerido.</small>
        </div>

        <Message v-if="errorMessage" severity="error" :closable="false">{{ errorMessage }}</Message>

        <Button type="submit" label="Añadir Item" :loading="isLoading" class="mt-2" />
      </form>
    </template>
  </Card>
</template>

<script>
import { useTechnicianInventoryStore } from '../../store/technicianInventoryStore.js';
import { useComponentStore } from '../../store/componentStore.js';
import Card from 'primevue/card';
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Message from 'primevue/message';

export default {
  name: 'inventory-form',
  components: { Card, AutoComplete, InputNumber, Button, Message },
  props: {
    technicianId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      inventoryStore: useTechnicianInventoryStore(),
      componentStore: useComponentStore(),
      form: {
        component: null, // Guardará el objeto Componente completo
        quantity: null,
        alertThreshold: null
      },
      filteredComponents: [],
      submitted: false,
      errorMessage: null
    };
  },
  computed: {
    isLoading() {
      return this.inventoryStore.isLoading;
    },
    allComponents() {
      return this.componentStore.components;
    }
  },
  methods: {
    searchComponent(event) {
      if (!event.query.trim().length) {
        this.filteredComponents = [...this.allComponents];
      } else {
        this.filteredComponents = this.allComponents.filter((component) => {
          return component.name.toLowerCase().includes(event.query.toLowerCase());
        });
      }
    },
    async onSubmit() {
      this.submitted = true;
      this.errorMessage = null;

      if (!this.form.component || this.form.quantity === null || this.form.alertThreshold === null) {
        return;
      }

      const payload = {
        componentId: this.form.component.id,
        quantity: this.form.quantity,
        alertThreshold: this.form.alertThreshold
      };

      try {
        await this.inventoryStore.addStockToInventory(this.technicianId, payload);
        this.form = { component: null, quantity: null, alertThreshold: null };
        this.submitted = false;
        this.$emit('item-added');
      } catch (err) {
        this.errorMessage = err.message || 'Ocurrió un error desconocido.';
      }
    }
  },
  created() {
    // Cargamos todos los componentes para el autocompletado
    this.componentStore.fetchAllComponents();
  }
};
</script>
