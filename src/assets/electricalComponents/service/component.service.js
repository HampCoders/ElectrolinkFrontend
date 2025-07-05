import httpInstance from "../../../shared/services/http.instance.js"; // Asumiendo la ruta a tu http instance
import { Component } from '../model/electrical-component.entity.js';

class ComponentService {
    constructor() {
        this.baseEndpoint = '/components';
    }
    async getAll() {
        const response = await httpInstance.get(this.baseEndpoint);
        return response.data.map(c => new Component(c));
    }

    async getById(id) {
        const response = await httpInstance.get(`${this.baseEndpoint}/${id}`);
        return new Component(response.data);
    }

    async getByTypeId(typeId) {
        const response = await httpInstance.get(this.baseEndpoint, { params: { typeId } });
        return response.data.map(c => new Component(c));
    }

    async getByIds(idsArray) {
        const idsString = idsArray.join(',');
        const response = await httpInstance.get(this.baseEndpoint, { params: { ids: idsString } });
        return response.data.map(c => new Component(c));
    }

    async create(componentData) {
        const response = await httpInstance.post(this.baseEndpoint, componentData);
        return new Component(response.data);
    }

    async update(id, componentData) {
        const response = await httpInstance.put(`${this.baseEndpoint}/${id}`, componentData);
        return new Component(response.data);
    }

    async delete(id) {
        await httpInstance.delete(`${this.baseEndpoint}/${id}`);
    }
}

export const componentService = new ComponentService();
