// Services/patientService.js
import axios from 'axios'

export const PatientService = {

    async getPatients(params) {
        const { data } = await axios.get('/api/patients', { params })
        return data
    },

    async deletePatient(id) {
        await axios.delete(`/api/patients/${id}`)
    },

    async getPatient(id) {
        const { data } = await axios.get(`/api/patients/${id}`)
        return data
    },

    async createPatient(payload) {
        const { data } = await axios.post('/api/patients', payload)
        return data
    },

    async updatePatient(id, payload) {
        const { data } = await axios.put(`/api/patients/${id}`, payload)
        return data
    }
}
