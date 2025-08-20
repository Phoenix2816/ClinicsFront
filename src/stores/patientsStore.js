// stores/patientsStore.js
import { defineStore } from 'pinia'
import { PatientService } from '@/services/patientService'

export const usePatientsStore = defineStore('patients', {
    state: () => ({
        items: [],
        totalCount: 0,
        current: null,
        query: {
            sortBy: 'name',
            sortDesc: false,
            page: 1,
            pageSize: 10,
            id: undefined,
            name: '',
            address: ''
        }
    }),

    actions: {
        async fetchPatients() {
            const params = {
                // сервер ожидает PascalCase — оставляем так
                SortBy: this.query.sortBy,
                SortDesc: this.query.sortDesc,
                Page: this.query.page,
                PageSize: this.query.pageSize,
                Id: this.query.id,
                Name: this.query.name,
                Address: this.query.address
            }

            const data = await PatientService.getPatients(params)
            // ожидаем { data, totalCount, page, pageSize }
            this.items = data.data || []
            this.totalCount = data.totalCount || 0
            this.query.page = data.page || this.query.page
            this.query.pageSize = data.pageSize || this.query.pageSize
        },

        async setPage(p) {
            this.query.page = p
            await this.fetchPatients()
        },

        async setPageSize(size) {
            this.query.pageSize = size
            this.query.page = 1
            await this.fetchPatients()
        },

        async sortBy(column) {
            this.query.sortDesc = this.query.sortBy === column ? !this.query.sortDesc : false
            this.query.sortBy = column
            this.query.page = 1
            await this.fetchPatients()
        },

        async setFilters({ id, name, address }) {
            this.query.id = id
            this.query.name = name
            this.query.address = address
            this.query.page = 1
            await this.fetchPatients()
        },

        async fetchDeletePatient(id) {
            await PatientService.deletePatient(id)
        },

        async fetchPatient(id) {
            const data = await PatientService.getPatient(id)
            this.current = data || null
            return data
        },

        // 🔹 форма: создать
        async createPatient(payload) {
            const created = await PatientService.createPatient(payload)
            return created
        },

        // 🔹 форма: обновить
        async updatePatient(id, payload) {
            const updated = await PatientService.updatePatient(id, payload)
            // можно обновить current, если нужно
            this.current = updated || this.current
            return updated
        }
    }
})
