import api from '../api/axiosConfig';

export const discMagService = {
    getAll: async () => (await api.get('/discmags')).data,
    add: async (data) => api.post('/discmags', data),
    update: async (id, data) => api.put(`/discmags/${id}`, data),
    delete: async (id) => api.delete(`/discmags/${id}`)
};