<template>
  <div class="p-4">
    <h1>Inventario del Técnico</h1>
    <p>ID del Técnico: <strong>{{ technicianId }}</strong></p>

    <div class="grid mt-4">
      <div class="col-12 md:col-5">
        <InventoryForm :technician-id="technicianId" @item-added="handleItemAdded" />
      </div>
      <div class="col-12 md:col-7">
        <Message v-if="error" severity="error">{{ error }}</Message>
        <InventoryList
            :inventory-items="inventory ? inventory.stockItems : []"
            :is-loading="isLoading"
            @update-quantity="handleUpdateQuantity"
            @remove-item="handleRemoveItem"
            :key="componentKey" />
      </div>
    </div>
  </div>
</template>

<script>
import { useTechnicianInventoryStore } from '../store/technician-inventory.store.js';
import InventoryForm from '../components/technicianInventory/inventory-form.component.vue';
import InventoryList from '../components/technicianInventory/inventory-list.component.vue';
import Message from 'primevue/message';

export default {
  name: 'technician-inventory-page',
  components: { InventoryForm, InventoryList, Message },
  data() {
    return {
      store: useTechnicianInventoryStore(),
      technicianId: '1f4cdaa7-b9ea-45c6-acb6-d6cf49edb181',
      componentKey: 0
    };
  },
  computed: {
    inventory() {
      return this.store.inventory;
    },
    isLoading() {
      return this.store.isLoading;
    },
    error() {
      return this.store.error;
    }
  },
  methods: {
    handleItemAdded() {
      this.componentKey += 1;
    },
    handleUpdateQuantity(event) {
      const { componentId, newQuantity } = event;
      const itemToUpdate = this.inventory.stockItems.find(i => i.id === componentId);
      if (!itemToUpdate) return;

      const updateData = {
        newQuantity: newQuantity,
        newAlertThreshold: itemToUpdate.alertThreshold
      };
      this.store.updateStock(this.technicianId, componentId, updateData);
    },
    handleRemoveItem(componentId) {
      if (!confirm('¿Estás seguro de que deseas eliminar este ítem?')) return;
      this.store.removeStock(this.technicianId, componentId);
    }
  },
  created() {
    this.store.fetchInventory(this.technicianId);
  }
};
</script>
