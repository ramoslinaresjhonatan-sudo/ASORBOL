import apiClient from '../../../shared/api/apiClient'

export const getLevels = async () => {
  const { data } = await apiClient.get('/organization/niveles/')
  return data
}

export const getGroups = async () => {
  const { data } = await apiClient.get('/organization/grupos/')
  return data
}

export const getPositions = async () => {
  const { data } = await apiClient.get('/organization/cargos/')
  return data
}
