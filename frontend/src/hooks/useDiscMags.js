import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { discMagService } from '../services/discMagService';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useDiscMags = () => {
    const qc = useQueryClient();

    const getDiscMags = useQuery({ queryKey: [QUERY_KEYS.DISCMAGS], queryFn: discMagService.getAll });
    
    const addDiscMag = useMutation({ mutationFn: discMagService.add, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.DISCMAGS] }) });
    const updateDiscMag = useMutation({ mutationFn: ({ id, data }) => discMagService.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.DISCMAGS] }) });
    const deleteDiscMag = useMutation({ mutationFn: discMagService.delete, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.DISCMAGS] }) });

    return { getDiscMags, addDiscMag, updateDiscMag, deleteDiscMag };
};