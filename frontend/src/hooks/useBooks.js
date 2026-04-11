import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookService } from '../services/bookService';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useBooks = () => {
    const qc = useQueryClient();

    const getBooks = useQuery({
        queryKey: [QUERY_KEYS.BOOKS],
        queryFn: bookService.getAll
    });

    const addBook = useMutation({
        mutationFn: bookService.add,
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] })
    });

    const updateBook = useMutation({
        mutationFn: ({ id, data }) => bookService.update(id, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] })
    });

    const deleteBook = useMutation({
        mutationFn: bookService.delete,
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] })
    });

    return { getBooks, addBook, updateBook, deleteBook };
};