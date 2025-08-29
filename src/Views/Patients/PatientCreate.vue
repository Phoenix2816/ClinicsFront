<template>
  <PatientForm :isEdit="false" :doctors="doctors" @save="submit" />
</template>

<script>
import axios from 'axios';
import PatientForm from '@/Views/Patients/PatientForm.vue';

export default {
  name: 'PatientCreate',
  components: { PatientForm },
  data() {
    return {
      doctors: []
    };
  },
  async created() {
    await this.fetchDoctors();
  },
  methods: {
    async fetchDoctors() {
      try {
        const { data } = await axios.get('https://clinics-7.onrender.com/api/doctors');
        this.doctors = data.data || data;  // Adjust if paginated API
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    },
    async submit(formData) {
      try {
        await axios.post('https://clinics-7.onrender.com/api/patients', formData);
        this.$router.push('/patients');
      } catch (error) {
        console.error('Error creating patient:', error);
      }
    }
  }
};
</script>
