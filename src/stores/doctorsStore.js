import { loadList } from '@/services/loadList.mjs'
// stores/doctorsStore.js
import { defineStore } from 'pinia'
import { DoctorService } from '@/services/doctorService'

export const useDoctorsStore = defineStore('doctors', {
    state: () => ({
        items: [],
        listLoading: false,
        loadError: '',
        requestVersion: 0,
        totalCount: 0,
        current: null,
        query: {
            sortBy: 'name',
            sortDesc: false,
            page: 1,
            pageSize: 10,
            id: undefined,
            name: '',
            surname: '',
            position: ''
        }
    }),

    actions: {
        async fetchDoctors() {
            const params = {
                // сервер ожидает PascalCase — оставляем так
                SortBy: this.query.sortBy,
                SortDesc: this.query.sortDesc,
                Page: this.query.page,
                PageSize: this.query.pageSize,
                Id: this.query.id,
                Name: this.query.name,
                Surname: this.query.surname,
                Position: this.query.position
            }

            await loadList(this, () => DoctorService.getDoctors(params))
        },

        async setPage(p) {
            this.query.page = p
            await this.fetchDoctors()
        },

        async setPageSize(size) {
            this.query.pageSize = size
            this.query.page = 1
            await this.fetchDoctors()
        },

        async sortBy(column) {
            this.query.sortDesc = this.query.sortBy === column ? !this.query.sortDesc : false
            this.query.sortBy = column
            this.query.page = 1
            await this.fetchDoctors()
        },

        async setFilters({ id, name, address }) {
            this.query.id = id
            this.query.name = name
            this.query.address = address
            this.query.page = 1
            await this.fetchDoctors()
        },

        async getPatientsInDoctor(id) {
            return await DoctorService.getPatientsInDoctor(id)
        },

        async fetchDeleteDoctor(id) {
            await DoctorService.deleteDoctor(id)
        },

        async fetchDoctor(id) {
            const data = await DoctorService.getDoctor(id)
            this.current = data || null
            return data
        },

        // 🔹 форма: создать
        async createDoctor(payload) {
            const created = await DoctorService.createDoctor(payload)
            return created
        },

        // 🔹 форма: обновить
        async updateDoctor(id, payload) {
            const updated = await DoctorService.updateDoctor(id, payload)
            // можно обновить current, если нужно
            this.current = updated || this.current
            return updated
        }
    }
})
