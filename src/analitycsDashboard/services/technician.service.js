import httpInstance from "../../shared/services/http.instance.js";

export class TechnicianService {
    resourceEndpoint = import.meta.env.VITE_TECHNICIANS_ENDPOINT_PATH

    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }

    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    create(technician) {
        return httpInstance.post(this.resourceEndpoint, technician);
    }

    update(id, technician) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, technician);
    }

    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    getWorksByTechnicianId(technicianId) {
        return httpInstance.get(`${this.resourceEndpoint}/${technicianId}/works`);
    }

}