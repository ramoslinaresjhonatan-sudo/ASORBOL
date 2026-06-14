import apiClient from '../../../shared/api/apiClient'

export const getUsuarios = async () => {
  const { data } = await apiClient.get('/users/')
  return data
}

export const createUsuario = async (usuarioData) => {
  const { data } = await apiClient.post('/users/', usuarioData)
  return data
}

export const updateUsuario = async (id, usuarioData) => {
  const { data } = await apiClient.put(`/users/${id}/`, usuarioData)
  return data
}

export const deleteUsuario = async (id) => {
  await apiClient.delete(`/users/${id}/`)
}
