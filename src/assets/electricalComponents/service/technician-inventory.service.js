import httpInstance from "../../../shared/services/http.instance.js";

class TechnicianInventoryService {
    endpoint(technicianId) {
        const base = import.meta.env.VITE_API_BASE_URL;
        return `${base}/technicians/${technicianId}/inventory`;
    }

    async getInventory(technicianId) {
        const { data } = await httpInstance.get(`/${technicianId}/inventory`);
        return data;
    }

    async createInventory(technicianId) {
        const { data } = await httpInstance.post(`/${technicianId}/inventory`);

        return data;
    }

    async addStockItem(technicianId, stockData) {
        const { data } = await httpInstance.post(`/${technicianId}/inventory/stock-items`, stockData);
        return data;
    }

    async updateStockItem(technicianId, componentId, updateData) {
        const { data } = await httpInstance.put(`/${technicianId}/inventory/${componentId}`, updateData);
        return data;
    }

    async removeStockItem(technicianId, componentId) {
        await httpInstance.delete(`/${technicianId}/inventory/${componentId}`);
    }
}

export const technicianInventoryService = new TechnicianInventoryService();