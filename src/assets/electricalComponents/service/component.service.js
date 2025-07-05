import axios from 'axios';
import { Component } from '../model/electrical-component.entity.js';

const apiClient = axios.create({
    baseURL: 'http://localhost:5055/api/v1/catalog',
});

export const componentService = {

    async getAllComponents() {
        const response = await apiClient.get('/components');
        return response.data.map(c => new Component(c));
    },


    async getById(id) {
        const response = await apiClient.get(`/components/${id}`);
        return new Component(response.data);
    },


    async getByTypeId(typeId) {
        const response = await apiClient.get('/components', { params: { typeId } });
        return response.data.map(c => new Component(c));
    },

    async getByIds(idsArray) {
        const idsString = idsArray.join(','); // Convertimos el array a "id1,id2,id3"
        const response = await apiClient.get('/components', { params: { ids: idsString } });
        return response.data.map(c => new Component(c));
    },

    async create(componentData) {
        const response = await apiClient.post('/components', componentData);
        return new Component(response.data);
    },

    async update(id, componentData) {
        const response = await apiClient.put(`/components/${id}`, componentData);
        return new Component(response.data);
    },


    async deactivate(id) {
        const response = await apiClient.delete(`/components/${id}`);
        return response.data;
    }
};