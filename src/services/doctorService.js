// Services/doctorService.js
import axios from '@/services/apiClient'

export const DoctorService = {
    async getDoctors(params) {
        const { data } = await axios.get('/doctors', { params })
        return data
    },
    async getPatientsInDoctor(id) {
        const { data } = await axios.get(`/doctors/MultipleMapping/${id}`)
        return data
    },
    async deleteDoctor(id) {
        await axios.delete(`/doctors/${id}`)
    },
    async getDoctor(id) {
        const { data } = await axios.get(`/doctors/${id}`)
        return data
    },
    async createDoctor(payload) {
        const { data } = await axios.post('/doctors', payload)
        return data
    },
    async updateDoctor(id, payload) {
        const { data } = await axios.put(`/doctors/${id}`, payload)
        return data
    }
}
