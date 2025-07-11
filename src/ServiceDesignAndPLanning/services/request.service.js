import httpInstance from "@/shared/services/http.instance.js";
import { Request } from "../model/request.entity.js";

export class RequestService {
    // URL base: .../requests
    endpoint() {
        const base = import.meta.env.VITE_API_BASE_URL;
        const path  = import.meta.env.VITE_REQUESTS_ENDPOINT_PATH; // 'requests'
        return `${base}/${path}`;
    }

    // URL base: .../clients/:id/requests
    endpointByClient(clientId) {
        const base = import.meta.env.VITE_API_BASE_URL;
        const path = import.meta.env.VITE_CLIENTS_ENDPOINT_PATH;   // 'clients'
        return `${base}/${path}/${clientId}/${import.meta.env.VITE_REQUESTS_ENDPOINT_PATH}`;
    }

    /* ────────────── CRUD standard ────────────── */

    async getAll() {
        const { data } = await httpInstance.get(this.endpoint());
        return data.map(item => new Request(item));
    }

    async getById(id) {
        const { data } = await httpInstance.get(`${this.endpoint()}/${id}`);
        return new Request(data);
    }

    async getByClientId(clientId) {
        const { data } = await httpInstance.get(this.endpointByClient(clientId));
        return data.map(item => new Request(item));
    }

    async create(requestData) {
        const { data } = await httpInstance.post(this.endpoint(), requestData);
        return new Request(data);
    }

    async update(id, requestData) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${id}`, requestData);
        return new Request(data);
    }

    async delete(id) {
        await httpInstance.delete(`${this.endpoint()}/${id}`);
    }
}

/* Exporta una instancia lista para usar */
export const requestService = new RequestService();
