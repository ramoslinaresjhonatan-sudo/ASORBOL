import apiClient from '../../../shared/api/apiClient'
export { uploadImage } from '../../../shared/services/imageService'

// Libros
export const getLibros = async () => {
  const { data } = await apiClient.get('/inventory/libros/')
  return data
}

export const createLibro = async (libroData) => {
  const { data } = await apiClient.post('/inventory/libros/', libroData)
  return data
}

export const updateLibro = async (id, libroData) => {
  const { data } = await apiClient.patch(`/inventory/libros/${id}/`, libroData)
  return data
}

export const deleteLibro = async (id) => {
  await apiClient.delete(`/inventory/libros/${id}/`)
}

// Autores
export const getAutores = async () => {
  const { data } = await apiClient.get('/inventory/autores/')
  return data
}

export const createAutor = async (autorData) => {
  const { data } = await apiClient.post('/inventory/autores/', autorData)
  return data
}

export const updateAutor = async (id, autorData) => {
  const { data } = await apiClient.patch(`/inventory/autores/${id}/`, autorData)
  return data
}

export const deleteAutor = async (id) => {
  await apiClient.delete(`/inventory/autores/${id}/`)
}

// Categorías
export const getCategorias = async () => {
  const { data } = await apiClient.get('/inventory/categorias/')
  return data
}

export const createCategoria = async (categoriaData) => {
  const { data } = await apiClient.post('/inventory/categorias/', categoriaData)
  return data
}

export const updateCategoria = async (id, categoriaData) => {
  const { data } = await apiClient.patch(`/inventory/categorias/${id}/`, categoriaData)
  return data
}

export const deleteCategoria = async (id) => {
  await apiClient.delete(`/inventory/categorias/${id}/`)
}

