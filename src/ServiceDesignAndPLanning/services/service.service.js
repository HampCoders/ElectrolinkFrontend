import httpInstance from '@/shared/services/http.instance.js'
import { Service }  from "../model/service.entity.js";

export class ServiceService {
    endpoint() {
        const base = import.meta.env.VITE_API_BASE_URL;
        const path = import.meta.env.VITE_SERVICES_ENDPOINT_PATH; // 'services'
        return `${base}/${path}`;                                // …/services
    }

    async getById(id) {
        const { data } = await httpInstance.get(`${this.endpoint()}/${id}`);
        return new Service(data);
    }

    async create(serviceData) {
        const { data } = await httpInstance.post(this.endpoint(), serviceData);
        return new Service(data);
    }

    async update(id, serviceData) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${id}`, serviceData);
        return new Service(data);
    }

    async delete(id) {
        await httpInstance.delete(`${this.endpoint()}/${id}`);
    }
}
