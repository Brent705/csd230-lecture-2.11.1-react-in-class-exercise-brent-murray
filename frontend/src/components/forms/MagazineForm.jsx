import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { magazineSchema } from '../../lib/schemas';
import { MagazineApi } from '../../hooks/useInventory';
import { formatIssueDateForBackend } from '../../utils/dateUtils';

export default function MagazineForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(magazineSchema),
        defaultValues: { title: '', price: 0, copies: 10, orderQty: 100, currentIssue: '' }
    });

    const { mutate: addMagazine, isPending } = MagazineApi.useAdd();

    const onSubmit = (data) => {
        // Format date to append :00 if needed for backend
        const formattedData = {
            ...data,
            currentIssue: formatIssueDateForBackend(data.currentIssue)
        };

        addMagazine(formattedData, {
            onSuccess: () => {
                alert("Magazine Saved!");
                reset();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-style" style={{ border: '2px solid purple' }}>
            <h3>Add New Magazine</h3>

            <input type="text" placeholder="Title" {...register('title')} />
            {errors.title && <span className="error-text">{errors.title.message}</span>}

            <input type="number" step="0.01" placeholder="Price" {...register('price')} />
            {errors.price && <span className="error-text">{errors.price.message}</span>}

            <div style={{ display: 'flex', gap: '10px' }}>
                <label>Copies: <input type="number" {...register('copies')} style={{width: '70px'}}/></label>
                <label>Order Qty: <input type="number" {...register('orderQty')} style={{width: '70px'}}/></label>
            </div>

            <label>Issue Date:
                <input type="datetime-local" {...register('currentIssue')} style={{ marginLeft: '10px' }} />
            </label>
            {errors.currentIssue && <span className="error-text">{errors.currentIssue.message}</span>}

            <button type="submit" disabled={isPending} style={{ backgroundColor: 'purple', color: 'white' }}>
                {isPending ? 'Saving...' : 'Save Magazine'}
            </button>
        </form>
    );
}