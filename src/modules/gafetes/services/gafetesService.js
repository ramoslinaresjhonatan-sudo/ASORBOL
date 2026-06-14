import apiClient from '../../../shared/api/apiClient'

/**
 * Configuración global del diseño de gafetes (colores, símbolo, orientación…).
 * Se guarda en el servidor para que el diseño sea el mismo desde cualquier máquina.
 */
export const getGafeteConfig = async () => {
  const { data } = await apiClient.get('/shared/gafete-config/')
  return data?.data || {}
}

export const saveGafeteConfig = async (config) => {
  const { data } = await apiClient.put('/shared/gafete-config/', { data: config })
  return data?.data || {}
}
