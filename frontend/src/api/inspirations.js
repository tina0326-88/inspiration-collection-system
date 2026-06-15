import api from './axios'

export const getInspirations = (params) => api.get('/inspirations/', { params })
export const getInspiration = (id) => api.get(`/inspirations/${id}/`)
export const createInspiration = (data) => api.post('/inspirations/', data)
export const updateInspiration = (id, data) => api.put(`/inspirations/${id}/`, data)
export const deleteInspiration = (id) => api.delete(`/inspirations/${id}/`)
