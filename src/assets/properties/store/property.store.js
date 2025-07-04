import { defineStore } from 'pinia';
import { propertyService } from '../service/property.service.js';

// En una app real, este ID vendría de un store de autenticación.
const CURRENT_OWNER_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

export const usePropertyStore = defineStore('properties', {
    state: () => ({
        properties: [],
        selectedPropertyId: null,
        isLoading: false,
        error: null,
    }),

    getters: {
        /**
         * Devuelve el objeto completo de la propiedad seleccionada.
         * @param {object} state - El estado actual del store.
         * @returns {Property|null}
         */
        selectedProperty(state) {
            if (!state.selectedPropertyId) {
                return null;
            }
            return state.properties.find(p => p.id === state.selectedPropertyId) || null;
        },

        /**
         * Devuelve el ID del propietario actual.
         * @returns {string}
         */
        currentOwnerId() {
            return CURRENT_OWNER_ID;
        }
    },

    // ACTIONS: Métodos para modificar el estado, usualmente asíncronos.
    actions: {
        /**
         * Carga todas las propiedades desde el servicio.
         */
        async fetchAllProperties() {
            this.isLoading = true;
            this.error = null;
            try {
                this.properties = await propertyService.getAll(CURRENT_OWNER_ID);
            } catch (err) {
                this.error = 'No se pudieron cargar las propiedades.';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Crea una nueva propiedad y refresca la lista.
         * @param {object} propertyData - Datos de la nueva propiedad.
         */
        async createProperty(propertyData) {
            this.isLoading = true;
            this.error = null;
            try {
                await propertyService.create(CURRENT_OWNER_ID,propertyData);
                await this.fetchAllProperties();
            } catch (err) {
                this.error = 'Error al crear la propiedad.';
                console.error(err);
                throw err;
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Establece la propiedad seleccionada por su ID.
         * @param {string} propertyId - El ID de la propiedad a seleccionar.
         */
        selectPropertyById(propertyId) {
            this.selectedPropertyId = propertyId;
        },

        /**
         * Deselecciona la propiedad actual.
         */
        clearSelection() {
            this.selectedPropertyId = null;
        }
    }
});
