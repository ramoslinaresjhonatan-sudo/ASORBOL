import apiClient from '../../../shared/api/apiClient'
export { uploadImage } from '../../../shared/services/imageService'

/* ─── Eventos del Cronograma ─────────────────────────────────────────────── */
export const getEventos = async () => {
  const { data } = await apiClient.get('/events/cronogramas/')
  return data
}

export const createEvento = async (eventoData) => {
  const { data } = await apiClient.post('/events/cronogramas/', eventoData)
  return data
}

export const updateEvento = async (id, eventoData) => {
  const { data } = await apiClient.patch(`/events/cronogramas/${id}/`, eventoData)
  return data
}

export const deleteEvento = async (id) => {
  await apiClient.delete(`/events/cronogramas/${id}/`)
}

export const toggleEventoStatus = async (id, currentActivo) => {
  const { data } = await apiClient.patch(`/events/cronogramas/${id}/`, { activo: !currentActivo })
  return data
}

/* ─── Categorías ─────────────────────────────────────────────────────────── */
export const getCategorias = async () => {
  const { data } = await apiClient.get('/events/categorias/')
  return data
}

export const createCategoria = async (categoriaData) => {
  const { data } = await apiClient.post('/events/categorias/', categoriaData)
  return data
}

export const updateCategoria = async (id, categoriaData) => {
  const { data } = await apiClient.patch(`/events/categorias/${id}/`, categoriaData)
  return data
}

export const deleteCategoria = async (id) => {
  await apiClient.delete(`/events/categorias/${id}/`)
}

/* ─── Dirigido a ─────────────────────────────────────────────────────────── */
export const getDirigidos = async () => {
  const { data } = await apiClient.get('/events/dirigido/')
  return data
}

export const createDirigido = async (dirigidoData) => {
  const { data } = await apiClient.post('/events/dirigido/', dirigidoData)
  return data
}

export const updateDirigido = async (id, dirigidoData) => {
  const { data } = await apiClient.patch(`/events/dirigido/${id}/`, dirigidoData)
  return data
}

export const deleteDirigido = async (id) => {
  await apiClient.delete(`/events/dirigido/${id}/`)
}

/* ─── Usuarios (para campo "encargado") ──────────────────────────────────── */
export const getUsuarios = async () => {
  const { data } = await apiClient.get('/users/')
  return data
}


