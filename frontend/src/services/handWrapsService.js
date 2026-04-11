import api from '../api/axiosConfig';

export const handWrapsService = {
    getAll: async () => (await api.get('/handwraps')).data,
    add: async (data) => api.post('/handwraps', data),
    update: async (id, data) => api.put(`/handwraps/${id}`, data),
    delete: async (id) => api.delete(`/handwraps/${id}`)
};