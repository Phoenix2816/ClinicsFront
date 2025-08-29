<template>
  <ClinicForm :isEdit="true" :form="form" @update-clinic="updateClinic" />
</template>

<script>
import axios from 'axios'
import ClinicForm from "@/Views/Clinics/ClinicForm.vue"

export default {
  name: 'ClinicUpdate',
  components: { ClinicForm },
  data() {
    return {
      form: { name: '', address: '' },
      alertMessage: '',
      alertType: ''
    }
  },
  computed: {
    clinicId() {
      return this.$route.params.id
    }
  },
  async created() {
    await this.loadClinic()
  },
  methods: {
    async loadClinic() {
      try {
        const { data } = await axios.get(`https://clinics-7.onrender.com/api/clinics/${this.clinicId}`)
        this.form = { name: data.name || '', address: data.address || '' }
      } catch (error) {
        this.handleError(error, 'loading clinic')
      }
    },
    async updateClinic(updatedForm) {
      try {
        await axios.put(`https://clinics-7.onrender.com/api/clinics/${this.clinicId}`, updatedForm)
        this.alertMessage = 'Clinic successfully updated'
        this.alertType = 'success'
        setTimeout(() => {
          this.$router.push('/clinics')
        }, 2000)
      } catch (error) {
        this.handleError(error, 'updating clinic')
      }
    },
    handleError(error, context) {
      if (error.response) {
        if (error.response.status === 404) {
          this.alertMessage = "Clinic not found."
        } else if (error.response.status === 500) {
          this.alertMessage = `Server error while ${context}.`
        } else {
          this.alertMessage = `Error: ${error.response.status}`
        }
      } else {
        this.alertMessage = "Network or unknown error."
      }
      this.alertType = 'danger'
      console.error(`Error ${context}:`, error)
    }
  }
}
</script>
