import { createRouter, createWebHistory} from "vue-router"
import ClinicsView from "@/Views/Clinics/ClinicsView.vue"
import ClinicCreate from "@/Views/Clinics/ClinicCreate.vue"
import ClinicUpdate from "@/Views/Clinics/ClinicUpdate.vue"
import DoctorsView from "@/Views/Doctors/DoctorsView.vue"
import DoctorCreate from "@/Views/Doctors/DoctorCreate.vue"
import DoctorUpdate from "@/Views/Doctors/DoctorUpdate.vue"
import PatientsView from "@/Views/Patients/PatientsView.vue"
import PatientCreate from "@/Views/Patients/PatientCreate.vue"
import PatientUpdate from "@/Views/Patients/PatientUpdate.vue"

const routes = [
    // {path: "/", redirect: "/clinics"},
    {path: "/clinics", name: "clinics", component: ClinicsView},
    {path: "/clinics/create", name: "clinicCreate", component: ClinicCreate},
    {path: "/clinics/:id/update", name: "clinicUpdate", component: ClinicUpdate},
    {path: "/doctors", name: "doctors", component: DoctorsView},
    {path: "/doctors/create", name: "doctorCreate", component: DoctorCreate},
    {path: "/doctors/:id/update", name: "doctorUpdate", component: DoctorUpdate},
    {path: "/patients", name: "patients", component: PatientsView},
    {path: "/patients/create", name: "patientCreate", component: PatientCreate},
    {path: "/patients/:id/update", name: "patientUpdate", component: PatientUpdate}
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router