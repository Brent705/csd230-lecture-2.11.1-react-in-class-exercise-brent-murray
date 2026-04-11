import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { handWrapsService } from '../services/handWrapsService';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useHandWraps = () => {
    const qc = useQueryClient();
    const getHandWraps = useQuery({ queryKey: [QUERY_KEYS.HANDWRAPS], queryFn: handWrapsService.getAll });
    const addHandWraps = useMutation({ mutationFn: handWrapsService.add, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.HANDWRAPS] }) });
    const updateHandWraps = useMutation({ mutationFn: ({ id, data }) => handWrapsService.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.HANDWRAPS] }) });
    const deleteHandWraps = useMutation({ mutationFn: handWrapsService.delete, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.HANDWRAPS] }) });
    return { getHandWraps, addHandWraps, updateHandWraps, deleteHandWraps };
};