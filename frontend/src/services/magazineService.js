import api from '../api/axiosConfig';

export const magazineService = {
    getAll: async () => (await api.get('/magazines')).data,
    add: async (data) => api.post('/magazines', data),
    update: async (id, data) => api.put(`/magazines/${id}`, data),
    delete: async (id) => api.delete(`/magazines/${id}`)
};