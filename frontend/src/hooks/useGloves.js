import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { glovesService } from '../services/glovesService';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useGloves = () => {
    const qc = useQueryClient();

    const getGloves = useQuery({ queryKey: [QUERY_KEYS.GLOVES], queryFn: glovesService.getAll });
    
    const addGloves = useMutation({ mutationFn: glovesService.add, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.GLOVES] }) });
    const updateGloves = useMutation({ mutationFn: ({ id, data }) => glovesService.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.GLOVES] }) });
    const deleteGloves = useMutation({ mutationFn: glovesService.delete, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.GLOVES] }) });

    return { getGloves, addGloves, updateGloves, deleteGloves };
};