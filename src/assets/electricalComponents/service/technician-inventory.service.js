import httpInstance from "../../../shared/services/http.instance.js";

class TechnicianInventoryService {

    async getInventory(technicianId) {
        const { data } = await httpInstance.get(`/technicians/${technicianId}/inventory`);
        return data;
    }

    async createInventory(technicianId) {
        const { data } = await httpInstance.post(`/technicians/${technicianId}/inventory`);
        return data;
    }

    async addStockItem(technicianId, stockData) {
        const { data } = await httpInstance.post(`/technicians/${technicianId}/inventory/stock-items`, stockData);
        return data;
    }

    async updateStockItem(technicianId, componentId, updateData) {
        const { data } = await httpInstance.put(`/technicians/${technicianId}/inventory/${componentId}`, updateData);
        return data;
    }

    async removeStockItem(technicianId, componentId) {
        await httpInstance.delete(`/technicians/${technicianId}/inventory/${componentId}`);
    }
}

export const technicianInventoryService = new TechnicianInventoryService();