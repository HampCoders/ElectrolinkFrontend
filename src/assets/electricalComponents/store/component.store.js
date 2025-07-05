import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { catalogService } from '../service/component-type.service.js';
import {componentService} from '../service/component.service.js';

export const useComponentStore = defineStore('components', () => {
    // --- STATE ---
    const components = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    // --- GETTERS ---
    const activeComponents = computed(() => components.value.filter(c => c.isActive));

    // --- ACTIONS ---
    async function fetchAllComponents() {
        isLoading.value = true;
        error.value = null;
        try {
            components.value = await componentService.getAllComponents();
        } catch (e) {
            error.value = 'Error al cargar los componentes.';
        } finally {
            isLoading.value = false;
        }
    }

    async function createComponent(componentData) {
        isLoading.value = true;
        try {
            const newComponent = await catalogService.createComponent(componentData);
            components.value.push(newComponent);
            return newComponent;
        } catch (e) {
            error.value = 'Error al crear el componente.';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function updateComponent(componentId, componentData) {
        isLoading.value = true;
        try {
            const updatedComponent = await catalogService.updateComponent(componentId, componentData);
            const index = components.value.findIndex(c => c.id === componentId);
            if (index !== -1) {
                components.value[index] = updatedComponent;
            }
            return updatedComponent;
        } catch (e) {
            error.value = 'Error al actualizar el componente.';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function deleteComponent(componentId) {
        isLoading.value = true;
        try {
            await catalogService.deleteComponent(componentId);
            const component = components.value.find(c => c.id === componentId);
            if (component) {
                component.isActive = false;
            }
        } catch (e) {
            error.value = 'Error al eliminar (desactivar) el componente.';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        components,
        isLoading,
        error,
        activeComponents,
        fetchAllComponents,
        createComponent,
        updateComponent,
        deleteComponent
    };
});