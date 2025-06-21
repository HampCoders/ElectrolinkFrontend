import { defineStore } from 'pinia';
import { ref } from 'vue';
import { propertyService } from '../service/property.service.js';
import { Property } from '../model/property.entity.js';

export const usePropertyStore = defineStore('property', () => {
    // --- STATE ---

    /** @type {import('vue').Ref<Property[]>} */
    const properties = ref([]);

    /** @type {import('vue').Ref<Property | null>} */
    const currentProperty = ref(null);

    /** @type {import('vue').Ref<boolean>} */
    const isLoading = ref(false);

    /** @type {import('vue').Ref<string | null>} */
    const error = ref(null);

    // --- ACTIONS ---
    async function fetchFirstPropertyByOwnerId(ownerId) {
        isLoading.value = true;
        error.value = null;
        currentProperty.value = null;
        try {
            const property = await propertyService.getFirstPropertyByOwnerId(ownerId);

            if (property) {
                currentProperty.value = property;
            } else {
                error.value = "El propietario no tiene propiedades registradas.";
            }

        } catch (e) {
            console.error(e);
            error.value = "No se pudo cargar la propiedad.";
        } finally {
            isLoading.value = false;
        }
    }

    async function createNewProperty(propertyData) {
        isLoading.value = true;
        error.value = null;
        try {
            const newProperty = await propertyService.create(propertyData);
            properties.value.push(newProperty);
            currentProperty.value = newProperty;
        } catch (e) {
            console.error(e);
            error.value = "Error al crear la propiedad.";
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    return { properties, currentProperty, isLoading, error, fetchFirstPropertyByOwnerId, createNewProperty };
});
