import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shoesService } from '../services/shoesService';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useShoes = () => {
    const qc = useQueryClient();

    const getShoes = useQuery({ queryKey: [QUERY_KEYS.SHOES], queryFn: shoesService.getAll });
    
    const addShoes = useMutation({ mutationFn: shoesService.add, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.SHOES] }) });
    const updateShoes = useMutation({ mutationFn: ({ id, data }) => shoesService.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.SHOES] }) });
    const deleteShoes = useMutation({ mutationFn: shoesService.delete, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.SHOES] }) });

    return { getShoes, addShoes, updateShoes, deleteShoes };
};