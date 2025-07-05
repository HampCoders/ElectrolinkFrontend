import { defineStore } from 'pinia';
import { ref } from 'vue';
import { componentTypeService } from '../service/component-type.service.js';

export const useComponentTypeStore = defineStore('componentTypes', () => {
    const types = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchAllTypes () {
        isLoading.value = true;
        error.value = null;
        try {
            // ✅ Simplemente asigna el resultado. El servicio ya hizo la transformación.
            types.value = await componentTypeService.getAll();
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
            const newType = await componentTypeService.create(typeData);
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
            const updatedType = await componentTypeService.update(typeId, typeData);
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
            await componentTypeService.delete(typeId);
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
