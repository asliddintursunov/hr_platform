import axios from "axios"

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

export const baseUrl = "http://192.168.5.150:1000"
// export const baseUrl = "http://146.190.136.129:1000"

