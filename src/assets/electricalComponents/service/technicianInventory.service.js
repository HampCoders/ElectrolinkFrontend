import axios from 'axios';
import { TechnicianInventory } from '../model/technicianInventory.entity.js';

const apiClient = axios.create({
    baseURL: 'http://localhost:5055/api/v1/technicians', // ¡IMPORTANTE! Ajusta esta URL
});

export const technicianInventoryService = {

    /** Llama a GET /{technicianId}/inventory */
    async getInventory(technicianId) {
        const response = await apiClient.get(`/${technicianId}/inventory`);
        // El backend ya enriquece los datos, así que podemos crear la entidad directamente.
        return new TechnicianInventory(response.data);
    },

    /** Llama a POST /{technicianId}/inventory */
    async createInventory(technicianId) {
        // No esperamos contenido en la respuesta, solo un status 201.
        await apiClient.post(`/${technicianId}/inventory`);
    },

    /** Llama a POST /{technicianId}/inventory/stock-items */
    async addStockItem(technicianId, stockData) {
        // stockData debe ser un objeto como { componentId, quantity, alertThreshold }
        await apiClient.post(`/${technicianId}/inventory/stock-items`, stockData);
    },

    /** Llama a PUT /{technicianId}/inventory/{componentId} */
    async updateStockItem(technicianId, componentId, updateData) {
        // updateData debe ser un objeto como { newQuantity, newAlertThreshold }
        const response = await apiClient.put(`/${technicianId}/inventory/${componentId}`, updateData);
        // Este endpoint devuelve el inventario actualizado, ¡lo usamos!
        return new TechnicianInventory(response.data);
    },

    /** Llama a DELETE /{technicianId}/inventory/{componentId} */
    async removeStockItem(technicianId, componentId) {
        await apiClient.delete(`/${technicianId}/inventory/${componentId}`);
    }
};
