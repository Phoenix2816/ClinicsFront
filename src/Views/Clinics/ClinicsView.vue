<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-4">Список клиник</h1>
      <RouterLink to="/clinics/create" class="btn btn-primary">Add</RouterLink>
    </div>

    <!-- Loader shown while loading -->

    <FilterBar @apply="setFilters">
            <template #default="{ apply }">
                <div class="col-12 col-sm-4">
                    <input type="text" class="form-control" placeholder="Поиск по названию"
                        v-model.trim="localFilters.name" @input="apply({ ...localFilters })" />
                </div>
            </template>
        </FilterBar>
    <div v-if="loading" class="loader mx-auto"></div>

    <!-- Table shown after data has loaded -->
    <table v-else class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th role="button" @click="sortBy('name')">
              Название <i class="bi ms-1" :class="arrow('name')"></i>
          </th>
          <th role="button" @click="sortBy('address')">
              Адрес <i class="bi ms-1" :class="arrow('address')"></i>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="clinic in items" :key="clinic.id">
          <td>{{ clinic.name }}</td>
          <td>{{ clinic.address }}</td>
          <td class="d-flex flex-row">
          <button class="btn btn-sm btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#listComponent" @click="openDoctors(clinic)">
            <i class="bi bi-eye-fill"></i>
          </button>
          <RouterLink :to="`/clinics/${clinic.id}/update`" class="btn btn-sm btn-outline-primary me-2">
            <i class="bi bi-pencil-square"></i>
          </RouterLink>
          <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteComponent" @click="openDeleteModal(clinic.id)">
              <i class="bi bi-trash-fill"></i>
          </button>
          </td>
        </tr>
      </tbody>
    </table>

  <PaginationBar :query="query" :totalCount="totalCount" @change-page="setPage" @change-page-size="setPageSize" />

  <DeleteComponent @confirm="deleteClinic"/>

  <ListComponent title="Doctors of clinic:" :items="doctorsInClinic" primary-field="name" secondary-field="surname" third-field="position"/>
  
  <div v-if="alertMessage" class="alert position-fixed top-0 start-50 translate-middle-x mt-3" style="z-index:999;" :class="`alert-${alertType}`" role="alert">
      {{ alertMessage }}
  </div>
  </div>
</template>

<script>
import DeleteComponent from '@/components/modals/DeleteComponent.vue';
import ListComponent from '@/components/modals/ListComponent.vue';
import FilterBar from '@/components/list/FilterBar.vue'
import PaginationBar from '@/components/list/PaginationBar.vue'
import { mapActions, mapState } from 'pinia';
import { useClinicsStore } from '@/stores/clinicsStore'


export default {
  components: {DeleteComponent, ListComponent, FilterBar, PaginationBar},
  data() {
    return {
      localFilters: {name: '' },
      loading: true, // Controls loader visibility
      selectedClinicId: null,
      alertMessage:"",
      alertType:"success",
      hideTimer: null,
      doctorsInClinic: []
    };
  },
  computed: {
      ...mapState(useClinicsStore, ['items', 'totalCount', 'query']),
  },
  mounted: async function() {
    this.loading = true;
    try {
      await this.fetchClinics();
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
    this.loading = false;
  },
  beforeUnmount(){
    if(this.hideTimer) clearTimeout(this.hideTimer)
  },
  methods: {
    ...mapActions(useClinicsStore, [
            'fetchClinics',
            'setPage',
            'setPageSize',
            'sortBy',
            'setFilters',
            'fetchDeleteClinic',
            'fetchDoctorsInClinic'
        ]),
        arrow(col) {
            if (this.query.sortBy !== col) return 'bi-caret-up'
            return this.query.sortDesc ? 'bi-caret-down-fill' : 'bi-caret-up-fill'
        },
    async openDoctors(clinic){
      this.doctorsInClinic = []
      try {
        const data = await this.fetchDoctorsInClinic(clinic.id)
        this.doctorsInClinic = data?.doctors ?? []
      } catch (error) {
        console.error(error)
      }
    },
    openDeleteModal(id) {
        this.selectedClinicId = id; // сохраняем ID клиники
    },
    showAlert(message, type= "success"){
      this.alertType=type
      this.alertMessage=message
      if(this.hideTimer) clearTimeout(this.hideTimer)
      this.hideTimer = setTimeout(() => {
        this.alertMessage = ""
      }, 3000)
    },
    async deleteClinic() {
        const id = this.selectedClinicId;
        try {
          await this.fetchDeleteClinic(id);
          await this.fetchClinics();
          this.selectedClinicId = null;
          this.showAlert("Clinics succesfully deleted", "success")
        } catch (error) {
            this.showAlert("Clinic delete error", "danger")
            console.error(error)
        }
    }
  }
};
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
