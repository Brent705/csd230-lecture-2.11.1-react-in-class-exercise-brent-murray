import api from '../api/axiosConfig';

export const shoesService = {
    getAll: async () => (await api.get('/shoes')).data,
    add: async (data) => api.post('/shoes', data),
    update: async (id, data) => api.put(`/shoes/${id}`, data),
    delete: async (id) => api.delete(`/shoes/${id}`)
};