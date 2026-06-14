import apiClient from '../../../shared/api/apiClient'

export const getIglesias = async () => {
  const { data } = await apiClient.get('/locations/iglesias/')
  return data
}

export const getDepartamentos = async () => {
  const { data } = await apiClient.get('/locations/departamentos/')
  return data
}

export const createIglesia = async (iglesiaData) => {
  const { data } = await apiClient.post('/locations/iglesias/', iglesiaData)
  return data
}

export const updateIglesia = async (id, iglesiaData) => {
  const { data } = await apiClient.put(`/locations/iglesias/${id}/`, iglesiaData)
  return data
}

export const deleteIglesia = async (id) => {
  await apiClient.delete(`/locations/iglesias/${id}/`)
}

export const toggleIglesiaStatus = async (id, currentStatus) => {
  const { data } = await apiClient.patch(`/locations/iglesias/${id}/`, { estado: !currentStatus })
  return data
}
