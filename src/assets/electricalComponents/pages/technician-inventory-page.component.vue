<template>
  <div class="p-4">
    <h1>Inventario del Técnico</h1>

    <!-- Contenedor principal con v-if -->
    <!-- Solo se mostrará este bloque cuando technicianId tenga un valor (no sea null) -->
    <div v-if="technicianId">
      <p>ID del Técnico: <strong>{{ technicianId }}</strong></p>

      <div class="grid mt-4">
        <div class="col-12 md:col-5">
          <!-- Ahora garantizamos que technicianId es un String cuando este componente se renderiza -->
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

    <!-- Opcional: Muestra un mensaje de carga o de error mientras no haya ID -->
    <div v-else>
      <Message v-if="!error" severity="info">Cargando datos del técnico...</Message>
      <Message v-if="error" severity="error">{{ error }}</Message>
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
      technicianId: null,
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
      const itemToUpdate = this.inventory.stockItems.find(i => i.componentId === componentId);
      if (!itemToUpdate) return;

      const updateData = {
        newQuantity: newQuantity,
        newAlertThreshold: itemToUpdate.alertThreshold
      };
      this.store.updateStock(this.technicianId, componentId, updateData);
    },
    handleRemoveItem(componentId) {
      // Usar un modal de PrimeVue en lugar de confirm() es una mejor práctica,
      // pero confirm() funciona para pruebas.
      if (!confirm('¿Estás seguro de que deseas eliminar este ítem?')) return;
      this.store.removeStock(this.technicianId, componentId);
    },
  },
  created() {
    // Obtener el id desde la ruta
    const idFromRoute = this.$route.params.id;
    if (idFromRoute) {
      this.technicianId = idFromRoute;
      this.store.fetchInventory(this.technicianId);  // Llamas al método para obtener el inventario
    } else {
      console.error("No se encontró el ID del técnico en la ruta.");
      this.store.$patch({ error: 'ID de técnico no especificado en la URL.' });
    }
  }
};
</script>
