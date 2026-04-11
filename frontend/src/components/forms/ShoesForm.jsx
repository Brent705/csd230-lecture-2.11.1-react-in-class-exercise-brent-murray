import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shoesSchema } from '../../lib/schemas';
import { ShoesApi } from '../../hooks/useInventory';
import { useAuth } from '../../provider/AuthProvider';

export default function ShoesForm() {
    const { isAdmin } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(shoesSchema),
        defaultValues: { brand: '', size: '', price: 0, highTop: false }
    });

    const { mutate: addShoes, isPending } = ShoesApi.useAdd();

    if (!isAdmin) {
        return <h2 style={{ color: "#ff4444", textAlign: "center" }}>Access Denied: Admins Only</h2>;
    }

    const onSubmit = (data) => {
        addShoes(data, {
            onSuccess: () => {
                alert("Shoes Saved!");
                reset();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-style" style={{ border: '2px solid #28a745' }}>
            <h3>Add New Shoes</h3>

            <input type="text" placeholder="Brand" {...register('brand')} />
            {errors.brand && <span className="error-text">{errors.brand.message}</span>}

            <input type="text" placeholder="Size" {...register('size')} />
            {errors.size && <span className="error-text">{errors.size.message}</span>}

            <input type="number" step="0.01" placeholder="Price" {...register('price')} />
            {errors.price && <span className="error-text">{errors.price.message}</span>}

            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" {...register('highTop')} />
                Is High-Top?
            </label>

            <button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Shoes'}</button>
        </form>
    );
}