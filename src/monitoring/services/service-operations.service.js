// monitoring/services/service-operation.service.js
import httpInstance from "@/shared/services/http.instance.js";

export class ServiceOperationService {
    // -- operaciones ---------------------------------
    async getByTechnician(technicianId) {
        const { data } = await httpInstance.get(
            `/service-operations/technician/${technicianId}/history`
        );
        return data;
    }


    async updateStatus(requestId, newStatus) {
        const { data } = await httpInstance.put(
            `/service-operations/${requestId}/status`,
            { newStatus }
        );
        return data;
    }

    // -- reports -------------------------------------
    async getReports(requestId) {
        const { data } = await httpInstance.get("/reports");
        return data.filter(r => r.requestId === requestId);
    }

    // -- ratings -------------------------------------
    async getRating(requestId) {
        try {
            const { data } = await httpInstance.get(`/ratings/${requestId}`);
            return data;
        } catch {
            return null;
        }
    }

    async addRating(requestId, payload) {
        const { data } = await httpInstance.post(
            `/ratings/${requestId}/rating`,
            payload
        );
        return data;
    }
}

export const serviceOperationService = new ServiceOperationService();
