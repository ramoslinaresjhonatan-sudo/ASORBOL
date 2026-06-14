import apiClient from '../../../shared/api/apiClient'

export const getLibros = async () => {
  const { data } = await apiClient.get('/inventory/libros/')
  return data
}

export const getAutores = async () => {
  const { data } = await apiClient.get('/inventory/autores/')
  return data
}

export const getEditoriales = async () => {
  const { data } = await apiClient.get('/inventory/editoriales/')
  return data
}

export const getCategorias = async () => {
  const { data } = await apiClient.get('/inventory/categorias/')
  return data
}
