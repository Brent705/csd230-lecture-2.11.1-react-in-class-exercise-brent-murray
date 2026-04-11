import api from '../api/axiosConfig';

export const bookService = {
    getAll: async () => (await api.get('/books')).data,
    add: async (data) => api.post('/books', data),
    update: async (id, data) => api.put(`/books/${id}`, data),
    delete: async (id) => api.delete(`/books/${id}`)
};