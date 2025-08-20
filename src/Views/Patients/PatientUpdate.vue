<template>
  <PatientForm :isEdit="true" :form="form" :doctors="doctors" @save="submit" />
</template>

<script>
import axios from 'axios';
import PatientForm from '@/Views/Patients/PatientForm.vue';

export default {
  name: 'PatientUpdate',
  components: { PatientForm },
  data() {
    return {
      form: { name: '', surname: '', diagnos: '', doctor_id: null },
      doctors: []
    };
  },
  computed: {
    patientId() {
      return this.$route.params.id;
    }
  },
  async created() {
    await Promise.all([this.loadPatient(), this.fetchDoctors()]);
  },
  methods: {
    async loadPatient() {
      try {
        const { data } = await axios.get(`/api/patients/${this.patientId}`);
        this.form = {
          name: data.name || '',
          surname: data.surname || '',
          diagnos: data.diagnos || '',
          doctor_id: data.doctor_id ?? null,
        };
      } catch (error) {
        console.error('Error loading patient:', error);
      }
    },
    async fetchDoctors() {
      try {
        const { data } = await axios.get('/api/doctors');
        this.doctors = data;
      } catch (error) {
        console.error('Error loading doctors:', error);
      }
    },
    async submit(data) {
      try {
        await axios.put(`/api/patients/${this.patientId}`, data);
        this.$router.push('/patients');
      } catch (error) {
        console.error('Error updating patient:', error);
      }
    }
  }
};
</script>
