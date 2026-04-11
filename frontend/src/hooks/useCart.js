import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosConfig';
import { QUERY_KEYS } from '../constants/queryKeys';
import { toast } from 'sonner';

export const useCart = () => {
    const qc = useQueryClient();

    const cartQuery = useQuery({
        queryKey: [QUERY_KEYS.CART],
        queryFn: async () => (await api.get('/cart')).data
    });

    const addToCart = useMutation({
        mutationFn: (productId) => api.post(`/cart/add/${productId}`),
        onSuccess: () => {
            toast.success("CART UPDATED", {
                description: "Item successfully added to the cart.",
                style: { background: '#0a0710', color: '#00f0ff', border: '1px solid #00f0ff' }
            });
            qc.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
        }
    });

    const removeFromCart = useMutation({
        mutationFn: (productId) => api.delete(`/cart/remove/${productId}`),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.CART] })
    });

    return { ...cartQuery, addToCart, removeFromCart };
};