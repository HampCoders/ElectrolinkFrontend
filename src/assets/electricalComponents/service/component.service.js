// src/services/componentService.js
import axios from 'axios';
import { Component } from '../model/electricalComponent.entity.js';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/catalog',
});

export const componentService = {

    // --- Mapeo de QUERY Handlers ---

    /**
     * Llama al endpoint que ejecuta 'GetAllComponentsQuery'
     * @returns {Promise<Component[]>}
     */
    async getAllComponents() {
        const response = await apiClient.get('/components');
        return response.data.map(c => new Component(c));
    },

    /**
     * Llama al endpoint que ejecuta 'GetComponentByIdQuery'
     * @param {string} id
     * @returns {Promise<Component>}
     */
    async getById(id) {
        const response = await apiClient.get(`/components/${id}`);
        return new Component(response.data);
    },

    /**
     * Llama al endpoint que ejecuta 'GetComponentsByTypeIdQuery'
     * @param {number} typeId
     * @returns {Promise<Component[]>}
     */
    async getByTypeId(typeId) {
        const response = await apiClient.get('/components', { params: { typeId } });
        return response.data.map(c => new Component(c));
    },

    /**
     * Llama al endpoint que ejecuta 'GetComponentsByIdsQuery'
     * @param {string[]} idsArray - Un array de IDs
     * @returns {Promise<Component[]>}
     */
    async getByIds(idsArray) {
        const idsString = idsArray.join(','); // Convertimos el array a "id1,id2,id3"
        const response = await apiClient.get('/components', { params: { ids: idsString } });
        return response.data.map(c => new Component(c));
    },

    // --- Mapeo de COMMAND Handlers ---

    /**
     * Llama al endpoint que ejecuta 'CreateComponentCommand'
     * @param {{ name: string, description: string, componentTypeId: number }} componentData
     * @returns {Promise<Component>}
     */
    async create(componentData) {
        // El payload debe coincidir con las propiedades de tu CreateComponentCommand
        const response = await apiClient.post('/components', componentData);
        return new Component(response.data);
    },

    /**
     * Llama al endpoint que ejecuta 'UpdateComponentCommand'
     * @param {string} id
     * @param {{ name: string, description: string }} componentData
     * @returns {Promise<Component>}
     */
    async update(id, componentData) {
        // El payload debe coincidir con las propiedades que se pueden actualizar en tu UpdateComponentCommand
        const response = await apiClient.put(`/components/${id}`, componentData);
        return new Component(response.data);
    },

    /**
     * Llama al endpoint que ejecuta 'DeleteComponentCommand' (que desactiva)
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    async deactivate(id) {
        const response = await apiClient.delete(`/components/${id}`);
        // Tu handler devuelve un booleano, así que lo retornamos.
        return response.data;
    }
};