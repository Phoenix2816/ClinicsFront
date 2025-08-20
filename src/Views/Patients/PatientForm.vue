<template>
  <div class="container mt-4" style="max-width: 720px;">
    <h1 class="mb-4">{{ isEdit ? 'Edit patient' : 'Add patient' }}</h1>
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
        <label class="form-label">Diagnos</label>
        <input type="text" class="form-control" v-model.trim="localForm.diagnos" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Doctor</label>
        <select class="form-select" v-model.number="localForm.doctor_id" required>
          <option disabled value="">Choose a doctor</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }} {{ doctor.surname || '' }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
      <RouterLink to="/patients" class="btn btn-link ms-2">Cancel</RouterLink>
    </form>

    <div v-if="alertMessage" class="alert mt-4" :class="`alert-${alertType}`" role="alert">
      {{ alertMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientForm',
  props: {
    isEdit: Boolean,
    form: Object,
    doctors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localForm: {
        name: '',
        surname: '',
        diagnos: '',
        doctor_id: null
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
          diagnos: newVal?.diagnos || '',
          doctor_id: newVal?.doctor_id ?? null
        };
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    submit() {
      this.$emit('save', this.localForm);
    },
    showAlert(message, type = 'success') {
      this.alertType = type;
      this.alertMessage = message;
      if (this.hideTimer) clearTimeout(this.hideTimer);
      this.hideTimer = setTimeout(() => {
        this.alertMessage = '';
      }, 3000);
    }
  },
  beforeUnmount() {
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }
};
</script>
