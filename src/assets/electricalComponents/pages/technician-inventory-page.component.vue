<template>
  <div class="p-4">
    <h1>Inventario del Técnico</h1>

    <!-- Sólo cuando existe id -->
    <div v-if="technicianId">
      <p>ID del Técnico: <strong>{{ technicianId }}</strong></p>

      <div class="grid mt-4">
        <div class="col-12 md:col-5">
          <InventoryForm
              :technician-id="technicianId"
              @item-added="handleItemAdded" />
        </div>

        <div class="col-12 md:col-7">
          <Message v-if="error" severity="error">{{ error }}</Message>

          <InventoryList
              :inventory-items="inventory?.stockItems ?? []"
              :is-loading="isLoading"
              @update-quantity="handleUpdateQuantity"
              @update-item="handleUpdateItem"
              @remove-item="handleRemoveItem"
              :key="componentKey" />
        </div>
      </div>
    </div>

    <!-- Mensajes mientras no hay ID -->
    <div v-else>
      <Message v-if="!error" severity="info">
        Cargando datos del técnico...
      </Message>
      <Message v-if="error" severity="error">{{ error }}</Message>
    </div>
  </div>
</template>

<script>
import { useTechnicianInventoryStore }
  from '../store/technician-inventory.store.js';
import InventoryForm from
      '../components/technicianInventory/inventory-form.component.vue';
import InventoryList from
      '../components/technicianInventory/inventory-list.component.vue';
import Message from 'primevue/message';

export default {
  name: 'technician-inventory-page',
  components: { InventoryForm, InventoryList, Message },

  data() {
    return {
      store: useTechnicianInventoryStore(),
      technicianId: null,
      componentKey: 0        // para forzar refresco tras añadir ítem
    };
  },

  computed: {
    inventory() { return this.store.inventory; },
    isLoading() { return this.store.isLoading; },
    error()     { return this.store.error; }
  },

  /** ──────────────────────────────  MÉTODOS  ─────────────────────────── */
  methods: {
    /* después de añadir un ítem */
    handleItemAdded() { this.componentKey += 1; },

    /* + / –  cantidad  */
    handleUpdateQuantity({ componentId, newQuantity }) {
      this.store.updateStock(
          this.technicianId,
          componentId,
          { newQuantity }                     // 👈 nombre que espera la API
      );
    },

    /* ✏️  lápiz → cantidad y umbral */
    handleUpdateItem({ componentId, quantityAvailable, alertThreshold }) {
      this.store.updateStock(
          this.technicianId,
          componentId,
          {                                    // 👈 ambos con su prefijo “new…”
            newQuantity:        quantityAvailable,
            newAlertThreshold:  alertThreshold
          }
      );
    },

    /* borrado: ya confirmado en el hijo */
    handleRemoveItem(componentId) {
      this.store.removeStock(this.technicianId, componentId);
    }
  },

  /** ─────────────────────────────  CICLO VIDA  ───────────────────────── */
  created() {
    const idFromRoute = this.$route.params.id;
    if (idFromRoute) {
      this.technicianId = idFromRoute;
      this.store.fetchInventory(this.technicianId);
    } else {
      this.store.$patch({ error: 'ID de técnico no especificado en la URL.' });
    }
  }
};
</script>
