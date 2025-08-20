<template>
  <div class="container mt-4" style="max-width: 720px;">
    <h1 class="mb-4">
      {{ isEdit ? 'Edit clinic' : "Add clinic" }}
    </h1>

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" v-model.trim="localForm.name" />
      </div>

      <div class="mb-3">
        <label class="form-label">Address</label>
        <textarea class="form-control" rows="2" v-model.trim="localForm.address"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
      <RouterLink to="/clinics" class="btn btn-link ms-2">Cancel</RouterLink>
    </form>

    <div v-if="alertMessage" class="alert mt-4" :class="`alert-${alertType}`" role="alert">
      {{ alertMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClinicForm',
  props: {
    isEdit: Boolean,
    form: Object
  },
  data() {
    return {
      localForm: { name: '', address: '' },
      alertMessage: '',
      alertType: 'success'
    }
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.localForm = { ...newVal }
      }
    }
  },
  methods: {
    async submit() {
      try {
        if (this.isEdit) {
          await this.$emit('update-clinic', this.localForm)
          this.alertMessage = "Clinic successfully updated"
          this.alertType = "success"
        } else {
          await this.$emit('create-clinic', this.localForm)
          this.alertMessage = "Clinic successfully added"
          this.alertType = "success"
        }
      } catch (error) {
        this.alertMessage = this.isEdit ? "Clinic update error" : "Clinic creation error"
        this.alertType = "danger"
        console.error(error)
      }
      setTimeout(() => {
        this.$router.push('/clinics')
      }, 2000)
    }
  }
}
</script>
