import axios from 'axios'
import { Schedule } from '../model/schedule.entity.js'

export class ScheduleService {
    constructor() {
        this.apiUrl = 'http://localhost:5055/api/v1/schedules'
    }

    async getByTechnicianId(technicianId) {
        const response = await axios.get(`http://localhost:5055/api/v1/technicians/${technicianId}/schedules`)
        return response.data.map(item => new Schedule(item))
    }

    async getById(scheduleId) {
        const response = await axios.get(`${this.apiUrl}/${scheduleId}`)
        return new Schedule(response.data)
    }

    async create(scheduleData) {
        const response = await axios.post(this.apiUrl, scheduleData)
        return new Schedule(response.data)
    }

    async update(scheduleId, scheduleData) {
        const response = await axios.put(`${this.apiUrl}/${scheduleId}`, scheduleData)
        return new Schedule(response.data)
    }

    async delete(scheduleId) {
        await axios.delete(`${this.apiUrl}/${scheduleId}`)
    }
}
