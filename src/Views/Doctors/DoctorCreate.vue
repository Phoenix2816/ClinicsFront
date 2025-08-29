<template>
  <DoctorForm :isEdit="false" :clinics="clinics" />
</template>

<script>
import axios from 'axios'
import DoctorForm from '@/Views/Doctors/DoctorForm.vue'

export default {
  name: 'DoctorCreate',
  components: { DoctorForm },
  data() {
    return {
      clinics: []
    } 
  },
  async created() {
    await this.fetchClinics()
  },
  methods: {
async fetchClinics() {
    try {
      const response = await axios.get('https://clinics-7.onrender.com/api/clinics');
      // If API response shape is { totalCount, page, pageSize, data: [...] }
      this.clinics = response.data.data || response.data; // ensure it's the array
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  }
  }
}
</script>
