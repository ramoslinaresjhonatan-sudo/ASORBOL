import axios from 'axios'
import apiClient from '../api/apiClient'

/**
 * Sube un archivo de imagen a ImgBB y registra el objeto imagen en el backend.
 * Usado por biblioteca, cronogramas e iglesias.
 */
export const uploadImage = async (file) => {
  const form = new FormData()
  form.append('image', file)

  const { data: imgbb } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    form
  )

  if (!imgbb.success) throw new Error('ImgBB upload failed')

  const { data } = await apiClient.post('/shared/imagenes/', {
    url:       imgbb.data.url,
    nombre:    file.name,
    tipo:      file.type,
    extension: file.name.split('.').pop(),
    tamano_mb: (file.size / (1024 * 1024)).toFixed(2)
  })
  return data
}
