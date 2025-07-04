import axios from 'axios';
import { Component } from '../model/electricalComponent.entity.js';
import { ComponentType } from '../model/componentType.entity.js';

const apiClient = axios.create({
    baseURL: 'http://localhost:5055/api/v1/catalog',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const catalogService = {
    /**
     * Llama a POST /types
     * @param {{ name: string, description: string }} typeData
     * @returns {Promise<ComponentType>}
     */
    async createComponentType(typeData) {
        const response = await apiClient.post('/types', typeData);
        return new ComponentType(response.data);
    },

    /**
     * Llama a GET /types/{typeId}
     * @param {number} typeId
     * @returns {Promise<ComponentType>}
     */
    async getComponentTypeById(typeId) {
        const response = await apiClient.get(`/types/${typeId}`);
        return new ComponentType(response.data);
    },

    /**
     * Llama a PUT /types/{typeId}
     * @param {number} typeId
     * @param {{ name: string, description: string }} typeData
     * @returns {Promise<ComponentType>}
     */
    async updateComponentType(typeId, typeData) {
        const response = await apiClient.put(`/types/${typeId}`, typeData);
        return new ComponentType(response.data);
    },

    /**
     * Llama a DELETE /types/{typeId}
     * @param {number} typeId
     * @returns {Promise<void>}
     */
    async deleteComponentType(typeId) {
        await apiClient.delete(`/types/${typeId}`);
    },


    async getAllComponentTypes() {
        const response = await apiClient.get('/types');

        return response.data.map(apiObject => {
            return new ComponentType({
                id: apiObject.id,
                name: apiObject.name,
                description: apiObject.description
            });
        });
    },

    /**
     * Llama a POST /components
     * @param {{ name: string, description: string, componentTypeId: number }} componentData
     * @returns {Promise<Component>}
     */
    async createComponent(componentData) {
        const response = await apiClient.post('/components', componentData);
        return new Component(response.data);
    },

    /**
     * Llama a PUT /components/{componentId}
     * @param {string} componentId
     * @param {{ name: string, description: string }} componentData
     * @returns {Promise<Component>}
     */
    async updateComponent(componentId, componentData) {
        const response = await apiClient.put(`/components/${componentId}`, componentData);
        return new Component(response.data);
    },

    /**
     * Llama a DELETE /components/{componentId} (que en el backend desactiva)
     * @param {string} componentId
     * @returns {Promise<void>}
     */
    async deleteComponent(componentId) {
        await apiClient.delete(`/components/${componentId}`);
    },

};