<script>
import ElectricalComponentForm from '../components/electricalComponent/component-form.component.vue';
import ComponentTypeForm from '../components/electricalComponentType/component-type-form.component.vue';
import { onMounted } from 'vue';
import { useComponentStore } from '../store/component.store.js';

export default {
  name: "electrical-component-page",
  components: {
    ElectricalComponentForm,
    ComponentTypeForm
  },
  setup() {
    const componentStore = useComponentStore();

    onMounted(() => {
      componentStore.fetchAllComponents();
    });

    return {
      componentStore
    };
  }
};
</script>

<template>
  <div class="page-container">
    <div class="form-section">
      <h1>Registro de Componentes</h1>
      <electrical-component-form />
    </div>

    <div class="list-section">

      <h2>Crear Nuevo Tipo de Componente</h2>
      <component-type-form />

      <hr class="section-divider">


      <h2>Componentes Existentes</h2>

      <div v-if="componentStore.isLoading" class="loading-message">
        Cargando componentes...
      </div>

      <div v-else-if="componentStore.error" class="error-message">
        <p>Error: {{ componentStore.error }}</p>
      </div>

      <ul v-else-if="componentStore.components.length > 0" class="component-list">
        <li v-for="component in componentStore.components" :key="component.id" class="component-item">
          <strong>{{ component.name }}</strong> (ID Tipo: {{ component.typeId }})
          <p>{{ component.description }}</p>
          <small :class="component.isActive ? 'status-active' : 'status-inactive'">
            {{ component.isActive ? 'Activo' : 'Inactivo' }}
          </small>
        </li>
      </ul>

      <div v-else class="no-items-message">
        <p>No hay componentes para mostrar. ¡Crea el primero!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  font-family: sans-serif;
}

.form-section {
  flex: 1;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-section {
  flex: 2;
  min-width: 400px;
}

h1, h2 {
  color: #333;
}

.section-divider {
  margin: 1.5rem 0;
  border: 0;
  border-top: 1px solid #e0e0e0;
}

.loading-message, .error-message, .no-items-message {
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.loading-message {
  background-color: #eef;
}

.error-message {
  background-color: #fdd;
  color: #c00;
  border: 1px solid #c00;
}

.no-items-message {
  background-color: #f0f0f0;
}

.component-list {
  list-style: none;
  padding: 0;
}

.component-item {
  background-color: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.component-item p {
  margin: 0.5rem 0;
  color: #666;
}

.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: gray;
}
</style>
