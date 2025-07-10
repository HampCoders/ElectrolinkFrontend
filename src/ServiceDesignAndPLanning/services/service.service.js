import axios from 'axios'
import { Service } from '../model/service.entity.js'

export class ServiceService {
    constructor() {
        this.apiUrl = 'http://localhost:5055/api/v1/services'
    }

    async getById(serviceId) {
        const response = await axios.get(`${this.apiUrl}/${serviceId}`)
        return new Service(response.data)
    }

    async create(serviceData) {
        const response = await axios.post(this.apiUrl, serviceData)
        return new Service(response.data)
    }

    async update(serviceId, serviceData) {
        const response = await axios.put(`${this.apiUrl}/${serviceId}`, serviceData)
        return new Service(response.data)
    }

    async delete(serviceId) {
        await axios.delete(`${this.apiUrl}/${serviceId}`)
    }
}
