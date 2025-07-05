import httpInstance from "../../../shared/services/http.instance.js";
import { ComponentType } from '../model/component-type.entity.js';

class ComponentTypeService {
    constructor() {
        this.baseEndpoint = '/component-types';
    }

    async getAll() {
        const response = await httpInstance.get(this.baseEndpoint);
        return response.data.map(typeData => new ComponentType(typeData));
    }

    async getById(typeId) {
        const response = await httpInstance.get(`${this.baseEndpoint}/${typeId}`);
        return new ComponentType(response.data);
    }

    async create(typeData) {
        const response = await httpInstance.post(this.baseEndpoint, typeData);
        return new ComponentType(response.data);
    }

    async update(typeId, typeData) {
        const response = await httpInstance.put(`${this.baseEndpoint}/${typeId}`, typeData);
        return new ComponentType(response.data);
    }

    async delete(typeId) {
        await httpInstance.delete(`${this.baseEndpoint}/${typeId}`);
    }
}

export const componentTypeService = new ComponentTypeService();
