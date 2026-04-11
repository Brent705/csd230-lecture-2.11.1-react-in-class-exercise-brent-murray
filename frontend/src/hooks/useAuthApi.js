import { useMutation } from '@tanstack/react-query';
import api from '../api/axiosConfig';

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (credentials) => {
            const res = await api.post('/auth/login', credentials);
            return res.data;
        }
    });
};