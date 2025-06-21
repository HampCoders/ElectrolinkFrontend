import { defineStore } from 'pinia';
import { ref } from 'vue';
import { catalogService } from '../service/catalog.service.js';

export const useComponentTypeStore = defineStore('componentTypes', () => {
    // --- STATE ---
    const types = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    // --- ACTIONS ---
    async function fetchAllTypes() {
        isLoading.value = true;
        error.value = null;
        try {
            // El servicio ya nos devuelve los datos limpios y transformados.
            types.value = await catalogService.getAllComponentTypes();
        } catch (e) {
            console.error('Error al cargar los tipos:', e);
            error.value = 'Error al cargar los tipos de componente.';
        } finally {
            isLoading.value = false;
        }
    }

    async function createType(typeData) {
        isLoading.value = true;
        try {
            const newType = await catalogService.createComponentType(typeData);
            types.value.push(newType);
            return newType;
        } catch (e) {
            error.value = 'Error al crear el tipo de componente.';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function updateType(typeId, typeData) {
        isLoading.value = true;
        try {
            const updatedType = await catalogService.updateComponentType(typeId, typeData);
            const index = types.value.findIndex(t => t.id === typeId);
            if (index !== -1) {
                types.value[index] = updatedType;
            }
            return updatedType;
        } catch (e) {
            error.value = 'Error al actualizar el tipo de componente.';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function deleteType(typeId) {
        isLoading.value = true;
        try {
            await catalogService.deleteComponentType(typeId);
            types.value = types.value.filter(t => t.id !== typeId);
        } catch (e) {
            error.value = 'Error al eliminar el tipo de componente.';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        types,
        isLoading,
        error,
        fetchAllTypes,
        createType,
        updateType,
        deleteType
    };
});
