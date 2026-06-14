import axios from 'axios'
import { API_URL } from '../../app/config/constants'
import useAuthStore from '../../app/store/useAuthStore'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const { logout, refreshToken: storedRefreshToken, setAuth } = useAuthStore.getState()

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const { data } = await axios.post(`${API_URL}/users/token/refresh/`, {
          refresh: storedRefreshToken,
        })
        
        // Update store
        const user = useAuthStore.getState().user
        setAuth(user, data.access, storedRefreshToken)
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${data.access}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        logout()
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
