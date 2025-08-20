// Services/clinicService.js
import axios from 'axios'

export const ClinicService = {
    // Ожидаем, что бэкенд вернёт: { data, totalCount, page, pageSize }
    async getClinics(params) {
        const { data } = await axios.get('/api/clinics', { params })
        return data
    },

    async getDoctorsInClinic(id) {
        const { data } = await axios.get(`/api/clinics/MultipleMapping/${id}`)
        return data
    },
    async deleteClinic(id) {
        await axios.delete(`/api/clinics/${id}`)
    },
    async getClinic(id) {
        const { data } = await axios.get(`/api/clinics/${id}`)
        return data
    },

    // 🔹 создать клинику (POST /api/clinics)
    async createClinic(payload) {
        const { data } = await axios.post('/api/clinics', payload)
        return data
    },
    // 🔹 обновить клинику (PUT /api/clinics/{id})
    async updateClinic(id, payload) {
        const { data } = await axios.put(`/api/clinics/${id}`, payload)
        return data
    }
}
