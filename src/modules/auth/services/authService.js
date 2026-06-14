import axios from 'axios'
import { API_URL } from '../../../app/config/constants'

const authApi = axios.create({ baseURL: API_URL })

export const loginService = async (correo, password) => {
  const { data } = await authApi.post('/users/login/', { correo, password })
  return data // { access, refresh, user }
}

export const registerService = async (userData) => {
  const { data } = await authApi.post('/users/', userData)
  return data
}
