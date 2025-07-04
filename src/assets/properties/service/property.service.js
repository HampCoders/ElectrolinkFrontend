import axios from 'axios';
import { Property } from '../model/property.entity.js';

const propertyApiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/properties',
});

// Se crea otra instancia para el recurso 'Owners' para mantener la lógica separada
const ownerApiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/owners',
});


export const propertyService = {
    /**
     * Obtiene las propiedades de un propietario y devuelve la primera de la lista.
     * Llama a GET /api/v1/owners/{ownerId}/properties
     * @param {string} ownerId
     * @returns {Promise<Property|null>}
     */
    async getFirstPropertyByOwnerId(ownerId) {
        const response = await ownerApiClient.get(`/${ownerId}/properties`);
        const propertiesData = response.data;

        if (Array.isArray(propertiesData) && propertiesData.length > 0) {
            return new Property(propertiesData[0]);
        }

        return null;
    },

    /**
     * Crea una nueva propiedad.
     * Llama a POST /api/v1/properties
     * @param {object} propertyData - El payload que coincide con 'CreatePropertyResource'
     * @returns {Promise<Property>}
     */
    async create(propertyData) {
        const response = await propertyApiClient.post('', propertyData);
        return new Property(response.data);
    }
};