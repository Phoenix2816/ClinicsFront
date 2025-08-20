// stores/clinicsStore.js
import { defineStore } from 'pinia'
import { ClinicService } from '@/services/clinicService'

export const useClinicsStore = defineStore('clinics', {
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
        async fetchClinics() {
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

            const data = await ClinicService.getClinics(params)
            // ожидаем { data, totalCount, page, pageSize }
            this.items = data.data || []
            this.totalCount = data.totalCount || 0
            this.query.page = data.page || this.query.page
            this.query.pageSize = data.pageSize || this.query.pageSize
        },

        async setPage(p) {
            this.query.page = p
            await this.fetchClinics()
        },

        async setPageSize(size) {
            this.query.pageSize = size
            this.query.page = 1
            await this.fetchClinics()
        },

        async sortBy(column) {
            this.query.sortDesc = this.query.sortBy === column ? !this.query.sortDesc : false
            this.query.sortBy = column
            this.query.page = 1
            await this.fetchClinics()
        },

        async setFilters({ id, name, address }) {
            this.query.id = id
            this.query.name = name
            this.query.address = address
            this.query.page = 1
            await this.fetchClinics()
        },

        async fetchDoctorsInClinic(id) {
            return await ClinicService.getDoctorsInClinic(id)
        },

        async fetchDeleteClinic(id) {
            await ClinicService.deleteClinic(id)
        },

        async fetchClinic(id) {
            const data = await ClinicService.getClinic(id)
            this.current = data || null
            return data
        },

        // 🔹 форма: создать
        async createClinic(payload) {
            const created = await ClinicService.createClinic(payload)
            return created
        },

        // 🔹 форма: обновить
        async updateClinic(id, payload) {
            const updated = await ClinicService.updateClinic(id, payload)
            // можно обновить current, если нужно
            this.current = updated || this.current
            return updated
        }
    }
})
