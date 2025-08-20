<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-4">Список докторов</h1>
      <RouterLink to="/doctors/create" class="btn btn-primary">Add</RouterLink>
    </div>

    <!-- Loader shown while loading -->

    <FilterBar @apply="setFilters">
      <template #default="{ apply }">
        <div class="col-12 col-sm-4">
          <input
            type="text"
            class="form-control"
            placeholder="Поиск по имени"
            v-model.trim="localFilters.name"
            @input="apply({ ...localFilters })"
          />
        </div>
      </template>
    </FilterBar>
    
    <div v-if="loading" class="loader mx-auto"></div>

    <!-- Table shown after data has loaded -->
    <table v-else class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th role="button" @click="sortBy('name')">
            Name <i class="bi ms-1" :class="arrow('name')"></i>
          </th>
          <th role="button" @click="sortBy('surname')">
            Surname <i class="bi ms-1" :class="arrow('surname')"></i>
          </th>
          <th role="button" @click="sortBy('position')">
            Position <i class="bi ms-1" :class="arrow('position')"></i>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doctor in items" :key="doctor.id">
          <td>{{ doctor.name }}</td>
          <td>{{ doctor.surname }}</td>
          <td>{{ doctor.position }}</td>
          <td class="d-flex flex-row">
            <button class="btn btn-sm btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#listComponent" @click="openPatients(doctor)">
              <i class="bi bi-eye-fill"></i>
            </button>
            <RouterLink :to="`/doctors/${doctor.id}/update`" class="btn btn-sm btn-outline-primary me-2">
              <i class="bi bi-pencil-square"></i>
            </RouterLink>
            <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteComponent" @click="openDeleteModal(doctor.id)">
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <PaginationBar :query="query" :totalCount="totalCount" @change-page="setPage" @change-page-size="setPageSize" />

    <DeleteComponent @confirm="deleteDoctor" />

    <ListComponent title="Patients of doctor:" :items="patientsInDoctor" primary-field="name" secondary-field="surname" third-field="diagnos" />

    <div
      v-if="alertMessage"
      class="alert position-fixed top-0 start-50 translate-middle-x mt-3"
      :class="`alert-${alertType}`"
      role="alert"
      style="z-index:999;"
    >
      {{ alertMessage }}
    </div>

  </div>
</template>

<script>
import DeleteComponent from '@/components/modals/DeleteComponent.vue'
import ListComponent from '@/components/modals/ListComponent.vue'
import FilterBar from '@/components/list/FilterBar.vue'
import PaginationBar from '@/components/list/PaginationBar.vue'
import { mapActions, mapState } from 'pinia'
import { useDoctorsStore } from '@/stores/doctorsStore'

export default {
  components: { DeleteComponent, ListComponent, FilterBar, PaginationBar },
  data() {
    return {
      localFilters: { name: '' },
      loading: true,
      selectedDoctorId: null,
      alertMessage: '',
      alertType: 'success',
      hideTimer: null,
      patientsInDoctor: []
    }
  },
  computed: {
    ...mapState(useDoctorsStore, ['items', 'totalCount', 'query'])
  },
  mounted: async function () {
    this.loading = true
    try {
      await this.fetchDoctors()
    } catch (error) {
      console.error('Error fetching doctors:', error)
    }
    this.loading = false
  },
  beforeUnmount() {
    if (this.hideTimer) clearTimeout(this.hideTimer)
  },
  methods: {
    ...mapActions(useDoctorsStore, [
      'fetchDoctors',
      'setPage',
      'setPageSize',
      'sortBy',
      'setFilters',
      'fetchDeleteDoctor',
      'getPatientsInDoctor'
    ]),
    arrow(col) {
      if (this.query.sortBy !== col) return 'bi-caret-up'
      return this.query.sortDesc ? 'bi-caret-down-fill' : 'bi-caret-up-fill'
    },
    async openPatients(doctor) {
      this.patientsInDoctor = []
      try {
        const data = await this.getPatientsInDoctor(doctor.id)
        this.patientsInDoctor = data?.patients ?? []
      } catch (error) {
        console.error(error)
      }
    },
    openDeleteModal(id) {
      this.selectedDoctorId = id
    },
    showAlert(message, type = 'success') {
      this.alertType = type
      this.alertMessage = message
      if (this.hideTimer) clearTimeout(this.hideTimer)
      this.hideTimer = setTimeout(() => {
        this.alertMessage = ''
      }, 3000)
    },
    async deleteDoctor() {
      const id = this.selectedDoctorId
      try {
        await this.fetchDeleteDoctor(id)
        await this.fetchDoctors()
        this.selectedDoctorId = null
        this.showAlert('Doctor successfully deleted', 'success')
      } catch (error) {
        this.showAlert('Doctor delete error', 'danger')
        console.error(error)
      }
    }
  }
}
</script>

<style>
.loader {
  width: 65px;
  aspect-ratio: 1;
  position: relative;
  scale: 2;
  margin-top: 100px;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  border-radius: 50px;
  box-shadow: 0 0 0 3px inset #000;
  animation: l4 2.5s infinite;
}
.loader:after {
  animation-delay: -1.25s;
}
@keyframes l4 {
  0% {
    inset: 0 35px 35px 0;
  }
  12.5% {
    inset: 0 35px 0 0;
  }
  25% {
    inset: 35px 35px 0 0;
  }
  37.5% {
    inset: 35px 0 0 0;
  }
  50% {
    inset: 35px 0 0 35px;
  }
  62.5% {
    inset: 0 0 0 35px;
  }
  75% {
    inset: 0 0 35px 35px;
  }
  87.5% {
    inset: 0 0 35px 0;
  }
  100% {
    inset: 0 35px 35px 0;
  }
}
</style>
