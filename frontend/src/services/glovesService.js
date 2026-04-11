import api from '../api/axiosConfig';

export const glovesService = {
    getAll: async () => (await api.get('/gloves')).data,
    add: async (data) => api.post('/gloves', data),
    update: async (id, data) => api.put(`/gloves/${id}`, data),
    delete: async (id) => api.delete(`/gloves/${id}`)
};