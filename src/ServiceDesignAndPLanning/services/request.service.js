import axios from 'axios'
import { Request } from '../model/request.entity.js'

export class RequestService {
    constructor() {
        this.apiUrl = 'http://localhost:5055/api/v1/requests'
    }

    async getAll() {
        const response = await axios.get(this.apiUrl)
        return response.data.map(item => new Request(item))
    }

    async getById(id) {
        const response = await axios.get(`${this.apiUrl}/${id}`)
        return new Request(response.data)
    }

    async getByClientId(clientId) {
        const response = await axios.get(`http://localhost:5055/api/v1/clients/${clientId}/requests`)
        return response.data.map(item => new Request(item))
    }

    async create(requestData) {
        const response = await axios.post(this.apiUrl, requestData)
        return new Request(response.data)
    }
    async update(id, requestData) {
        const response = await axios.put(`${this.apiUrl}/${id}`, requestData)
        return new Request(response.data)
    }

    async delete(id) {
        await axios.delete(`${this.apiUrl}/${id}`)
    }
}
