// Services/patientService.js
import axios from '@/services/apiClient'

export const PatientService = {

    async getPatients(params) {
        const { data } = await axios.get('/patients', { params })
        return data
    },

    async deletePatient(id) {
        await axios.delete(`/patients/${id}`)
    },

    async getPatient(id) {
        const { data } = await axios.get(`/patients/${id}`)
        return data
    },

    async createPatient(payload) {
        const { data } = await axios.post('/patients', payload)
        return data
    },

    async updatePatient(id, payload) {
        const { data } = await axios.put(`/patients/${id}`, payload)
        return data
    }
}
