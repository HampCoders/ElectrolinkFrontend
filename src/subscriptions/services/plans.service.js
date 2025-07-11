import httpInstance from "../../../src/shared/services/http.instance.js";

class PlanService {
    endpoint() {
        const base = import.meta.env.VITE_API_BASE_URL;
        return `${base}/plans`;
    }

    async getAll() {
        const { data } = await httpInstance.get(this.endpoint());
        return data;
    }

    async getById(planId) {
        const { data } = await httpInstance.get(`${this.endpoint()}/${planId}`);
        return data;
    }

    async create(planData) {
        const { data } = await httpInstance.post(this.endpoint(), planData);
        return data;
    }

    async update(planId, planData) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${planId}`, planData);
        return data;
    }

    async remove(planId) {
        await httpInstance.delete(`${this.endpoint()}/${planId}`);
    }
}

export const planService = new PlanService();
