<script>
import { useComponentTypeStore } from '../store/component-type.store.js';
import ComponentTypeForm from '../components/electricalComponentType/component-type-form.component.vue';
import ComponentTypeList from '../components/electricalComponentType/component-type-list.component.vue';

export default {
  name: 'component-type-management-page',
  components: {
    ComponentTypeForm,
    ComponentTypeList
  },
  data() {
    return {
      store: useComponentTypeStore(),
      componentKey: 0
    };
  },
  computed: {
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
    handleTypeAdded() {
      console.log('Refrescando la lista de tipos...');
      this.store.fetchAllTypes();
      this.componentKey += 1;
    }
  },
  created() {
    this.store.fetchAllTypes();
  }
};
</script>

<template>
  <div class="p-4">
    <div class="grid">
      <div class="col-12 md:col-6">
        <ComponentTypeForm @type-added="handleTypeAdded" />
      </div>
      <div class="col-12 md:col-6">
        <ComponentTypeList :types="types" :is-loading="isLoading" :error="error" :key="componentKey" />
      </div>
    </div>
  </div>
</template>

