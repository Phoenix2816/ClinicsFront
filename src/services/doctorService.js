// Services/doctorService.js
import axios from 'axios'

export const DoctorService = {
    async getDoctors(params) {
        const { data } = await axios.get('https://clinics-7.onrender.com/api/doctors', { params })
        return data
    },
    async getPatientsInDoctor(id) {
        const { data } = await axios.get(`https://clinics-7.onrender.com/api/doctors/MultipleMapping/${id}`)
        return data
    },
    async deleteDoctor(id) {
        await axios.delete(`https://clinics-7.onrender.com/api/doctors/${id}`)
    },
    async getDoctor(id) {
        const { data } = await axios.get(`https://clinics-7.onrender.com/api/doctors/${id}`)
        return data
    },
    async createDoctor(payload) {
        const { data } = await axios.post('https://clinics-7.onrender.com/api/doctors', payload)
        return data
    },
    async updateDoctor(id, payload) {
        const { data } = await axios.put(`https://clinics-7.onrender.com/api/doctors/${id}`, payload)
        return data
    }
}
