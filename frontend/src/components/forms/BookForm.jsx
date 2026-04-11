import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema } from '../../lib/schemas';
import { BookApi } from '../../hooks/useInventory';

export default function BookForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(bookSchema),
        defaultValues: { title: '', author: '', price: 0 }
    });

    const { mutate: addBook, isPending } = BookApi.useAdd();

    const onSubmit = (data) => {
        addBook({ ...data, copies: 10 }, {
            onSuccess: () => {
                alert("Book Saved!");
                reset();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-style">
            <h3>Add New Book</h3>

            <input type="text" placeholder="Title" {...register('title')} />
            {errors.title && <small style={{color: 'red'}}>{errors.title.message}</small>}

            <input type="text" placeholder="Author" {...register('author')} />
            {errors.author && <small style={{color: 'red'}}>{errors.author.message}</small>}

            <input type="number" step="0.01" placeholder="Price" {...register('price')} />
            {errors.price && <small style={{color: 'red'}}>{errors.price.message}</small>}

            <button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Book'}
            </button>
        </form>
    );
}