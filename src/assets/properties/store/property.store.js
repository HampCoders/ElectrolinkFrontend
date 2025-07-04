import { defineStore } from 'pinia';
import { propertyService } from '../service/property.service.js';

const CURRENT_OWNER_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

export const usePropertyStore = defineStore('properties', {
    state: () => ({
        properties: [],
        selectedPropertyId: null,
        isLoading: false,
        error: null,
    }),

    getters: {
        selectedProperty(state) {
            if (!state.selectedPropertyId) {
                return null;
            }
            return state.properties.find(p => p.id === state.selectedPropertyId) || null;
        },

        currentOwnerId() {
            return CURRENT_OWNER_ID;
        }
    },

    actions: {

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


        selectPropertyById(propertyId) {
            this.selectedPropertyId = propertyId;
        },

        clearSelection() {
            this.selectedPropertyId = null;
        }
    }
});
