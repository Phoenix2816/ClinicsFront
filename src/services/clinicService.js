// Services/clinicService.js
import axios from 'axios'

export const ClinicService = {
    // Ожидаем, что бэкенд вернёт: { data, totalCount, page, pageSize }
    async getClinics(params) {
        const { data } = await axios.get('https://clinics-7.onrender.com/api/clinics', { params })
        return data
    },

    async getDoctorsInClinic(id) {
        const { data } = await axios.get(`https://clinics-7.onrender.com/api/clinics/MultipleMapping/${id}`)
        return data
    },
    async deleteClinic(id) {
        await axios.delete(`https://clinics-7.onrender.com/api/clinics/${id}`)
    },
    async getClinic(id) {
        const { data } = await axios.get(`https://clinics-7.onrender.com/api/clinics/${id}`)
        return data
    },

    // 🔹 создать клинику (POST https://clinics-7.onrender.com/api/clinics)
    async createClinic(payload) {
        const { data } = await axios.post('https://clinics-7.onrender.com/api/clinics', payload)
        return data
    },
    // 🔹 обновить клинику (PUT https://clinics-7.onrender.com/api/clinics/{id})
    async updateClinic(id, payload) {
        const { data } = await axios.put(`https://clinics-7.onrender.com/api/clinics/${id}`, payload)
        return data
    }
}
