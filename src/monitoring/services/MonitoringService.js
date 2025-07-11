import httpInstance from '../../shared/services/http.instance.js';

export class MonitoringService {
    async getAllServiceOperations() {
        const res = await httpInstance.get('/service-operations');
        return res.data;
    }

    async getReportsByRequestId(requestId) {
        try {
            const res = await httpInstance.get(`/reports/${requestId}`);
            return res.data;
        } catch (e) {
            if (e.response && e.response.status === 404) return []; // ← Sin reportes
            throw e;
        }
    }

    async getRatingByRequestId(requestId) {
        try {
            const res = await httpInstance.get(`/ratings/${requestId}`);
            return res.data;
        } catch (e) {
            if (e.response && e.response.status === 404) return null; // ← Sin rating
            throw e;
        }
    }

    async createRating(requestId, ratingData) {
        const res = await httpInstance.post(`/ratings/${requestId}/rating`, ratingData);
        return res.data;
    }

    // añade al final de la clase
    async addReport(requestId, payload) {
        const { data } = await httpInstance.post(`/reports/${requestId}/report`, payload);
        return data; // ← { reportId, ... }
    }

    async addReportPhoto(reportId, file) {
        const form = new FormData();
        form.append('file', file);
        await httpInstance.post(`/reports/${reportId}/photo`, form, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    async markAsCompleted(requestId) {
        return await httpInstance.put(`/api/v1/service-operations/${requestId}/status`, {
            newStatus: 'Completed'
        });
    }

}

export const monitoringService = new MonitoringService();
