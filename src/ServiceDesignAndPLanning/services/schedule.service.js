import httpInstance from '@/shared/services/http.instance.js'
import { Schedule } from '../model/schedule.entity.js'

export class ScheduleService {
    endpoint() {
        const base = import.meta.env.VITE_API_BASE_URL;           // http://localhost:8088/api/v1
        const path = import.meta.env.VITE_SCHEDULES_ENDPOINT_PATH; // 'schedules'
        return `${base}/${path}`;                                 // …/schedules
    }

    endpointByTechnician(technicianId) {
        const base   = import.meta.env.VITE_API_BASE_URL;
        const tech   = import.meta.env.VITE_TECHNICIANS_ENDPOINT_PATH; // 'technicians'
        const path   = import.meta.env.VITE_SCHEDULES_ENDPOINT_PATH;   // 'schedules'
        return `${base}/${tech}/${technicianId}/${path}`;              // …/technicians/:id/schedules
    }

    async getByTechnicianId(technicianId) {
        const { data } = await httpInstance.get(this.endpointByTechnician(technicianId));
        return data.map(item => new Schedule(item));
    }

    async getById(id) {
        const { data } = await httpInstance.get(`${this.endpoint()}/${id}`);
        return new Schedule(data);
    }

    async create(scheduleData) {
        const { data } = await httpInstance.post(this.endpoint(), scheduleData);
        return new Schedule(data);
    }

    async update(id, scheduleData) {
        const { data } = await httpInstance.put(`${this.endpoint()}/${id}`, scheduleData);
        return new Schedule(data);
    }

    async delete(id) {
        await httpInstance.delete(`${this.endpoint()}/${id}`);
    }
}
