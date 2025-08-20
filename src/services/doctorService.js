// Services/doctorService.js
import axios from 'axios'

export const DoctorService = {
    async getDoctors(params) {
        const { data } = await axios.get('/api/doctors', { params })
        return data
    },
    async getPatientsInDoctor(id) {
        const { data } = await axios.get(`/api/doctors/MultipleMapping/${id}`)
        return data
    },
    async deleteDoctor(id) {
        await axios.delete(`/api/doctors/${id}`)
    },
    async getDoctor(id) {
        const { data } = await axios.get(`/api/doctors/${id}`)
        return data
    },
    async createDoctor(payload) {
        const { data } = await axios.post('/api/doctors', payload)
        return data
    },
    async updateDoctor(id, payload) {
        const { data } = await axios.put(`/api/doctors/${id}`, payload)
        return data
    }
}
