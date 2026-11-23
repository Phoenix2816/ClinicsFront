import axios from 'axios'

export default axios.create({
  baseURL: `${(process.env.VUE_APP_API_URL || 'https://clinics-7.onrender.com').replace(/\/$/, '')}/api`,
  timeout: 45000
})
