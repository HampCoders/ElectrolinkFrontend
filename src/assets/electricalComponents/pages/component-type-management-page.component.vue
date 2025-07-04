<script>
import { useComponentTypeStore } from '../store/componentTypeStore.js'; // Ajusta la ruta a tu store
import ComponentTypeForm from '../components/electricalComponentType/component-type-form.component.vue'; // Ajusta la ruta
import ComponentTypeList from '../components/electricalComponentType/component-type-list.component.vue'; // Ajusta la ruta

export default {
  name: 'component-type-management-page',
  components: {
    ComponentTypeForm,
    ComponentTypeList
  },
  data() {
    return {
      // El estado se obtiene del store de Pinia
      store: useComponentTypeStore(),
      componentKey: 0 // Clave para forzar la actualización del componente hijo si es necesario
    };
  },
  computed: {
    // Mapeamos el estado del store a propiedades computadas del componente
    types() {
      return this.store.types;
    },
    isLoading() {
      return this.store.isLoading;
    },
    error() {
      return this.store.error;
    }
  },
  methods: {
    // Cuando el formulario emite 'typeAdded', llamamos a la acción del store
    handleTypeAdded() {
      console.log('Refrescando la lista de tipos...');
      this.store.fetchAllTypes();
      // Forzamos una actualización del componente de lista cambiando su clave
      this.componentKey += 1;
    }
  },
  // El hook `created` se ejecuta cuando la instancia del componente es creada
  created() {
    // Llamamos a la acción del store para cargar los datos iniciales
    this.store.fetchAllTypes();
  }
};
</script>

<template>
  <div class="p-4">
    <div class="grid">
      <div class="col-12 md:col-6">
        <!-- El formulario emite un evento 'type-added' que esta página escucha -->
        <ComponentTypeForm @type-added="handleTypeAdded" />
      </div>
      <div class="col-12 md:col-6">
        <!-- Pasamos los datos de tipos al componente de lista como una prop -->
        <!-- Usamos una clave :key para forzar el re-renderizado cuando sea necesario -->
        <ComponentTypeList :types="types" :is-loading="isLoading" :error="error" :key="componentKey" />
      </div>
    </div>
  </div>
</template>

