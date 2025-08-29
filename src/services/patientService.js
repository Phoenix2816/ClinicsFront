// Services/patientService.js
import axios from 'axios'

export const PatientService = {

    async getPatients(params) {
        const { data } = await axios.get('https://clinics-7.onrender.com/api/patients', { params })
        return data
    },

    async deletePatient(id) {
        await axios.delete(`https://clinics-7.onrender.com/api/patients/${id}`)
    },

    async getPatient(id) {
        const { data } = await axios.get(`https://clinics-7.onrender.com/api/patients/${id}`)
        return data
    },

    async createPatient(payload) {
        const { data } = await axios.post('https://clinics-7.onrender.com/api/patients', payload)
        return data
    },

    async updatePatient(id, payload) {
        const { data } = await axios.put(`https://clinics-7.onrender.com/api/patients/${id}`, payload)
        return data
    }
}
