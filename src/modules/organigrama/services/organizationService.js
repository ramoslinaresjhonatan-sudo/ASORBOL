import apiClient from '../../../shared/api/apiClient'

const organizationService = {
  getTree: async () => {
    const response = await apiClient.get('/organization/grupos/tree/')
    return response.data
  },

  getUsuarios: async () => {
    const response = await apiClient.get('/users/')
    return response.data
  },


  getCargos: async () => {
    const response = await apiClient.get('/organization/cargos/')
    return response.data
  },

  getNiveles: async () => {
    const response = await apiClient.get('/organization/niveles/')
    return response.data
  },

  addMiembro: async (data) => {
    // data should contain { usuario, grupo, cargo }
    const response = await apiClient.post('/organization/organigrama/', data)
    return response.data
  },

  updateMiembro: async (id, data) => {
    const response = await apiClient.patch(`/organization/organigrama/${id}/`, data)
    return response.data
  },

  deleteMiembro: async (id) => {
    const response = await apiClient.delete(`/organization/organigrama/${id}/`)
    return response.data
  },

  // If we need to create groups
  createGrupo: async (data) => {
    const response = await apiClient.post('/organization/grupos/', data)
    return response.data
  },

  updateGrupo: async (id, data) => {
    const response = await apiClient.patch(`/organization/grupos/${id}/`, data)
    return response.data
  },

  deleteGrupo: async (id) => {
    const response = await apiClient.delete(`/organization/grupos/${id}/`)
    return response.data
  }
}

export default organizationService
