<script>
import { ref } from 'vue';
import { useTechnicianInventoryStore } from '../store/technicianInventoryStore.js'; // Ajusta la ruta

export default {
  name: 'technician-inventory',
  data() {
    return {
      technicianId: '0a8237b1-fad7-400a-ad8d-22a2e64a9408', // Reemplaza con un ID de técnico real o selector
      newItem: {
        componentId: '',
        quantity: 0,
        alertThreshold: 0
      }
    };
  },
  computed: {
    inventoryStore() {
      return useTechnicianInventoryStore();
    }
  },
  methods: {
    async handleAddItem() {
      // 1. Limpia el ID para remover espacios o tabs al inicio o final.
      const trimmedComponentId = this.newItem.componentId.trim();

      if (!trimmedComponentId || !this.technicianId) return;

      // 2. Envía el ID ya limpio a la tienda Pinia.
      await this.inventoryStore.addStockToInventory(this.technicianId, {
        ...this.newItem,
        componentId: trimmedComponentId // <-- Usamos el ID corregido
      });

      this.newItem.componentId = ''; // Limpiar formulario
    },
    async handleUpdateQuantity(item, newQuantity) {
      if (newQuantity < 0) return; // No permitir stock negativo
      await this.inventoryStore.updateStock(this.technicianId, item.componentId, {
        newQuantity: newQuantity,
        newAlertThreshold: item.alertThreshold // Mantenemos el mismo umbral
      });
    }
  },
  mounted() {
    this.inventoryStore.fetchInventory(this.technicianId);
  }
};
</script>

<template>
  <div>
    <h1>Inventario del Técnico</h1>
    <p>ID del Técnico: <strong>{{ technicianId }}</strong></p>

    <!-- Formulario para añadir items -->
    <form @submit.prevent="handleAddItem">
      <h3>Añadir Componente al Inventario</h3>
      <input v-model="newItem.componentId" placeholder="ID del Componente (GUID)">
      <input v-model.number="newItem.quantity" type="number" placeholder="Cantidad">
      <input v-model.number="newItem.alertThreshold" type="number" placeholder="Umbral de Alerta">
      <button type="submit">Añadir</button>
    </form>
    <hr>

    <div v-if="inventoryStore.isLoading">Cargando inventario...</div>
    <div v-else-if="inventoryStore.error" style="color: red;">{{ inventoryStore.error }}</div>
    <div v-else-if="inventoryStore.inventory">
      <h2>Items en Stock ({{ inventoryStore.inventory.stockItems.length }})</h2>
      <table>
        <thead>
        <tr>
          <th>Componente</th>
          <th>Cantidad</th>
          <th>Umbral Alerta</th>
          <th>Última Actualización</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in inventoryStore.inventory.stockItems" :key="item.id" :style="{ color: item.isLowOnStock ? 'orange' : 'inherit' }">
          <td>{{ item.componentName }} <br> <small>{{ item.componentId }}</small></td>
          <td>{{ item.quantityAvailable }}</td>
          <td>{{ item.alertThreshold }}</td>
          <td>{{ item.formattedLastUpdated }}</td>
          <td>
            <button @click="handleUpdateQuantity(item, item.quantityAvailable + 1)">+</button>
            <button @click="handleUpdateQuantity(item, item.quantityAvailable - 1)">-</button>
            <button @click="inventoryStore.removeStock(technicianId, item.componentId)">Eliminar</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No se encontró inventario para este técnico.</p>
    </div>
  </div>
</template>

<style>
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #f2f2f2; }
button { margin: 0 4px; }
</style>