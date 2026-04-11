import api from '../api/axiosConfig';

export const headgearService = {
    getAll: async () => (await api.get('/headgear')).data,
    add: async (data) => api.post('/headgear', data),
    update: async (id, data) => api.put(`/headgear/${id}`, data),
    delete: async (id) => api.delete(`/headgear/${id}`)
};