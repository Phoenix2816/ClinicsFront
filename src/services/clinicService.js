// Services/clinicService.js
import axios from '@/services/apiClient'

export const ClinicService = {
    // Ожидаем, что бэкенд вернёт: { data, totalCount, page, pageSize }
    async getClinics(params) {
        const { data } = await axios.get('/clinics', { params })
        return data
    },

    async getDoctorsInClinic(id) {
        const { data } = await axios.get(`/clinics/MultipleMapping/${id}`)
        return data
    },
    async deleteClinic(id) {
        await axios.delete(`/clinics/${id}`)
    },
    async getClinic(id) {
        const { data } = await axios.get(`/clinics/${id}`)
        return data
    },

    // 🔹 создать клинику (POST /clinics)
    async createClinic(payload) {
        const { data } = await axios.post('/clinics', payload)
        return data
    },
    // 🔹 обновить клинику (PUT /clinics/{id})
    async updateClinic(id, payload) {
        const { data } = await axios.put(`/clinics/${id}`, payload)
        return data
    }
}
