<template>
  <div class="property-page-container">
    <div class="map-panel">
      <PropertyMap :properties="properties" @property-selected="onPropertySelected" />
    </div>

    <div class="list-details-panel">
      <div class="list-section">
        <div class="list-header">
          <h2>Propiedades</h2>
          <Button icon="pi pi-plus" severity="contrast" rounded @click="openCreateDialog" aria-label="Agregar Propiedad" v-tooltip.left="'Agregar Propiedad'"/>
        </div>
        <PropertyList :properties="properties" :selected-property-id="selectedPropertyId" @property-selected="onPropertySelected" />
      </div>

      <Divider layout="vertical" />

      <div class="details-section">
        <h2>Detalles</h2>
        <PropertyDetail
            :property="selectedProperty"
            @edit="openEditDialog"
        />
      </div>
    </div>
  </div>

  <PropertyDialog
      :visible="isDialogVisible"
      :mode="dialogMode"
      :initial="editingProp"
      @close="isDialogVisible=false" />
</template>

<script>
import { usePropertyStore } from '../store/property.store.js';
import PropertyMap from '../components/property/property-map.component.vue';
import PropertyList from '../components/property/property-list.component.vue';
import PropertyDetail from '../components/property/property-detail.component.vue';
import PropertyCreateDialog from '../components/property/property-create-dialog.component.vue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Tooltip from 'primevue/tooltip';
import PropertyDialog from '../components/property/property-form-dialog.component.vue'

export default {
  name: 'property-management-page',
  components: { PropertyMap, PropertyList, PropertyDetail, PropertyCreateDialog, Button, Divider ,PropertyDialog},
  directives: { Tooltip },
  data() {
    return {
      store: usePropertyStore(),
      isDialogVisible: false,
      dialogMode  : 'create',
      editingProp : null
    };
  },
  computed: {
    properties() {
      return this.store.properties;
    },
    selectedProperty() {
      return this.store.selectedProperty;
    },
    selectedPropertyId() {
      return this.store.selectedPropertyId;
    }
  },
  methods: {
    onPropertySelected(propertyId) {
      this.store.selectPropertyById(propertyId);
    },
    openCreateDialog () {
      this.dialogMode  = 'create'
      this.editingProp = null
      this.isDialogVisible = true
    },
    openEditDialog (prop) {
      this.dialogMode  = 'edit'
      this.editingProp = prop
      this.isDialogVisible = true
    }
  },
  created() {
    this.store.fetchAllProperties();
  }
};
</script>

<style scoped>
.property-page-container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 80px);
  padding: 1rem;
  gap: 1rem;
}
.map-panel {
  flex: 1;
  min-width: 40%;
}
.list-details-panel {
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: var(--surface-a);
  border: 1px solid var(--surface-d);
  border-radius: 8px;
  overflow: hidden;
  min-width: 60%;
}
.list-section {
  flex: 0 0 40%;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.details-section {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--surface-d);
  margin-bottom: 1rem;
}
.list-header h2 {
  margin: 0;
}

@media (max-width: 1024px) {
  .property-page-container, .list-details-panel {
    flex-direction: column;
    height: auto;
  }
}
</style>
