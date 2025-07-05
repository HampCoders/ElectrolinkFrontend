<template>
  <div class="p-4">
    <div class="grid">
      <div class="col-12 md:col-5">
        <ComponentForm @component-created="handleComponentCreated" />
      </div>
      <div class="col-12 md:col-7">
        <ComponentList :components="components" :is-loading="isLoading" :error="error" :key="componentKey" />
      </div>
    </div>
  </div>
</template>

<script>
import { useComponentStore } from '../store/component.store.js'; // Ajusta la ruta
import ComponentForm from '../components/electricalComponent/component-form.component.vue'; // Ajusta la ruta
import ComponentList from '../components/electricalComponent/component-list.component.vue'; // Ajusta la ruta

export default {
  name: 'component-management-page',
  components: {
    ComponentForm,
    ComponentList
  },
  data() {
    return {
      store: useComponentStore(),
      componentKey: 0,
    };
  },
  computed: {
    components() {
      return this.store.components;
    },
    isLoading() {
      return this.store.isLoading;
    },
    error() {
      return this.store.error;
    }
  },
  methods: {
    handleComponentCreated() {
      console.log(this.store.fetchAllComponents());
      this.store.fetchAllComponents();
      this.componentKey += 1;
    }
  },
  created() {
    this.store.fetchAllComponents();
  }
};
</script>
