<template>
  <ClinicForm @create-clinic="createClinic" />
</template>

<script>
import ClinicForm from "@/Views/Clinics/ClinicForm.vue"
import axios from "@/services/apiClient"

export default {
  components: { ClinicForm },
  methods: {
    async createClinic(clinicData) {
      try {
        await axios.post('/clinics', clinicData)
        // optionally show success message or navigate
      } catch (e) {
        console.error("Clinic creation error", e)
      }
    }
  }
}
</script>
