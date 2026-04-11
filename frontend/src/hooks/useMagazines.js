import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { magazineService } from '../services/magazineService';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useMagazines = () => {
    const qc = useQueryClient();

    const getMagazines = useQuery({ queryKey: [QUERY_KEYS.MAGAZINES], queryFn: magazineService.getAll });
    
    const addMagazine = useMutation({ mutationFn: magazineService.add, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.MAGAZINES] }) });
    const updateMagazine = useMutation({ mutationFn: ({ id, data }) => magazineService.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.MAGAZINES] }) });
    const deleteMagazine = useMutation({ mutationFn: magazineService.delete, onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.MAGAZINES] }) });

    return { getMagazines, addMagazine, updateMagazine, deleteMagazine };
};