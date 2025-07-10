import httpInstance from "../../../shared/services/http.instance.js";
class PropertyService {
    endpoint(ownerId) {
        const base = import.meta.env.VITE_API_BASE_URL;
        return `${base}/owners/${ownerId}/properties`;
    }

    async getAll(ownerId) {
        const { data } = await httpInstance.get(this.endpoint(ownerId));
        return data;
    }

    async create(ownerId, propertyData) {
        const { data } = await httpInstance.post(this.endpoint(ownerId), propertyData);
        return data;
    }

    async getById(ownerId, propertyId) {
        const { data } = await httpInstance.get(`${this.endpoint(ownerId)}/${propertyId}`);
        return data;
    }

    async update(ownerId, propertyId, propertyData) {
        const { data } = await httpInstance.put(`${this.endpoint(ownerId)}/${propertyId}`, propertyData);
        return data;
    }

    async remove(ownerId, propertyId) {
        await httpInstance.delete(`${this.endpoint(ownerId)}/${propertyId}`);
    }
}

export const propertyService = new PropertyService();