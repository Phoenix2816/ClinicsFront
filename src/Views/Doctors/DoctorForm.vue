<template>
  <div class="container mt-4" style="max-width: 720px;">
    <h1 class="mb-4">
      {{ isEdit ? 'Edit doctor' : 'Add doctor' }}
    </h1>

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" v-model.trim="localForm.name" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Surname</label>
        <input type="text" class="form-control" v-model.trim="localForm.surname" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Position</label>
        <input type="text" class="form-control" v-model.trim="localForm.position" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Clinic</label>
        <select class="form-select" v-model.number="localForm.clinic_id" required>
          <option disabled value="">Choose a clinic</option>
          <option v-for="clinic in clinics" :key="clinic.id" :value="clinic.id">{{ clinic.name }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
      <RouterLink to="/doctors" class="btn btn-link ms-2">Cancel</RouterLink>
    </form>

    <div v-if="alertMessage" class="alert mt-4" :class="`alert-${alertType}`" role="alert">
      {{ alertMessage }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useDoctorsStore } from '@/stores/doctorsStore'; // Adjust your actual path
export default {
  name: 'DoctorForm',
  props: {
    isEdit: Boolean,
    form: Object,
    clinics: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localForm: {
        name: '',
        surname: '',
        position: '',
        clinic_id: null
      },
      alertMessage: '',
      alertType: 'success',
      hideTimer: null
    };
  },
watch: {
  form: {
    handler(newVal) {
      this.localForm = { 
        name: newVal?.name || '',
        surname: newVal?.surname || '',
        position: newVal?.position || '',
        clinic_id: newVal?.clinic_id ?? null
      }
    },
    immediate: true,
    deep: true
  }
},
  computed: {
    doctorId() {
      return this.$route.params.id;
    },
    ...mapState(useDoctorsStore, ['current'])
  },
  async created() {
    if (this.isEdit) {
      await this.loadDoctor();
    }
  },
  methods: {
    ...mapActions(useDoctorsStore, ['fetchDoctor', 'createDoctor', 'updateDoctor']),
    async loadDoctor() {
      try {
        const { data } = await this.fetchDoctor(this.doctorId);
        this.localForm = {
          name: data.name || '',
          surname: data.surname || '',
          position: data.position || '',
          clinic_id: data.clinic_id ?? null
        };
      } catch (error) {
        console.error('error:', error);
      }
    },
    showAlert(message, type = 'success') {
      this.alertType = type;
      this.alertMessage = message;
      if (this.hideTimer) clearTimeout(this.hideTimer);
      this.hideTimer = setTimeout(() => {
        this.alertMessage = '';
      }, 3000);
    },
    async submit() {
      if (this.isEdit) {
        try {
          await this.updateDoctor(this.doctorId, this.localForm);
          this.showAlert('Doctor successfully updated', 'success');
        } catch (error) {
          this.showAlert('Doctor update error', 'danger');
          console.error(error);
        }
      } else {
        try {
          await this.createDoctor(this.localForm);
          this.showAlert('Doctor successfully added', 'success');
        } catch (error) {
          this.showAlert('Doctor creation error', 'danger');
          console.error(error);
        }
      }
      setTimeout(() => {
        this.$router.push('/doctors');
      }, 2000);
    }
  },
  beforeUnmount() {
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }
};
</script>
