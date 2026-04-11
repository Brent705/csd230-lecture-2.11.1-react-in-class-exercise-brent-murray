import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { headgearService } from '../services/headgearService';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useHeadgear = () => {
    const qc = useQueryClient();
    const getHeadgear = useQuery({ queryKey: [QUERY_KEYS.HEADGEAR], queryFn: headgearService.getAll });
    const addHeadgear = useMutation({ mutationFn: headgearService.add, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.HEADGEAR] }) });
    const updateHeadgear = useMutation({ mutationFn: ({ id, data }) => headgearService.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.HEADGEAR] }) });
    const deleteHeadgear = useMutation({ mutationFn: headgearService.delete, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.HEADGEAR] }) });
    return { getHeadgear, addHeadgear, updateHeadgear, deleteHeadgear };
};