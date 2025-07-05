import httpInstance from "@/shared/services/http.instance.js";

class PropertyService {
    endpoint(ownerId) {
        const base = import.meta.env.VITE_API_BASE_URL;
        return `${base}/owners/${ownerId}/properties`;
    }

    /** GET /owners/{ownerId}/properties */
    async getAll(ownerId) {
        const { data } = await httpInstance.get(this.endpoint(ownerId));
        return data; // Devuelve solo el payload
    }

    /** POST /owners/{ownerId}/properties */
    async create(ownerId, propertyData) {
        const { data } = await httpInstance.post(this.endpoint(ownerId), propertyData);
        return data;
    }

    /** GET /owners/{ownerId}/properties/{propertyId} */
    async getById(ownerId, propertyId) {
        const { data } = await httpInstance.get(`${this.endpoint(ownerId)}/${propertyId}`);
        return data;
    }

    /** PUT /owners/{ownerId}/properties/{propertyId} */
    async update(ownerId, propertyId, propertyData) {
        const { data } = await httpInstance.put(`${this.endpoint(ownerId)}/${propertyId}`, propertyData);
        return data;
    }

    /** DELETE /owners/{ownerId}/properties/{propertyId} */
    async remove(ownerId, propertyId) {
        await httpInstance.delete(`${this.endpoint(ownerId)}/${propertyId}`);
    }
}

export const propertyService = new PropertyService();