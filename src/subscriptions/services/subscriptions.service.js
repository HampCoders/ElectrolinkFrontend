import httpInstance from "../../../src/shared/services/http.instance.js";

class SubscriptionService {
    endpoint() {
        const base = import.meta.env.VITE_API_BASE_URL;
        return `${base}/subscriptions`;
    }

    async getAll() {
        const { data } = await httpInstance.get(this.endpoint());
        return data;
    }

    async getById(subscriptionId) {
        const { data } = await httpInstance.get(`${this.endpoint()}/${subscriptionId}`);
        return data;
    }

    async create(userId, planId) {
        const { data } = await httpInstance.post(this.endpoint(), { userId, planId });
        return data;
    }

    async cancel(subscriptionId) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${subscriptionId}/cancel`);
        return data;
    }

    async resume(subscriptionId) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${subscriptionId}/resume`);
        return data;
    }

    async pause(subscriptionId) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${subscriptionId}/pause`);
        return data;
    }

    async grantPremium(subscriptionId) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${subscriptionId}/grant-premium`);
        return data;
    }

    async verifyCertification(subscriptionId, now = new Date().toISOString()) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${subscriptionId}/verify-certification`, null, {
            params: { now }
        });
        return data;
    }

    async activateBoost(subscriptionId, now = new Date().toISOString()) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${subscriptionId}/activate-boost`, null, {
            params: { now }
        });
        return data;
    }
}

export const subscriptionService = new SubscriptionService();
