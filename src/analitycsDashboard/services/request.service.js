import httpInstance from '@/shared/services/http.instance.js'
import { Request } from '@/ServiceDesignAndPLanning/model/request.entity.js'

export class RequestService {
    async getByTechnicianId(technicianId) {
        const { data } = await httpInstance.get(`${import.meta.env.VITE_API_BASE_URL}/clients/${technicianId}/requests`)
        return Array.isArray(data) ? data.map(r => new Request(r)) : []
    }
}

