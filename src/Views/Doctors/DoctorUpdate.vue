<template>
  <DoctorForm :isEdit="true" :form="form" :clinics="clinics" @save="submit" />
</template>

<script>
import axios from 'axios'
import DoctorForm from '@/Views/Doctors/DoctorForm.vue'

export default {
  name: 'DoctorUpdate',
  components: { DoctorForm },
  data() {
  return {
    form: { name: '', surname: '', position: '', clinic_id: null },
    clinics: []
  }
},
async created() {
  await Promise.all([this.loadDoctor(), this.fetchClinics()])
},
methods: {
  async loadDoctor() {
    try {
      const { data } = await axios.get(`https://clinics-7.onrender.com/api/doctors/${this.$route.params.id}`)
      this.form = {
        name: data.name || '',
        surname: data.surname || '',
        position: data.position || '',
        clinic_id: data.clinic_id ?? null
      }
    } catch (error) {
      console.error('Error loading doctor:', error)
    }
  },
  async fetchClinics() {
    try {
      const { data } = await axios.get('https://clinics-7.onrender.com/api/clinics')
      this.clinics = data.data || data
    } catch (error) {
      console.error('Error fetching clinics:', error)
    }
  }
}

}
</script>
