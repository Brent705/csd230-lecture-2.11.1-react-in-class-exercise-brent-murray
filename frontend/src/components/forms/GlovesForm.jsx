import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { glovesSchema } from '../../lib/schemas';
import { GlovesApi } from '../../hooks/useInventory';
import { useAuth } from '../../provider/AuthProvider';

export default function GlovesForm() {
    const { isAdmin } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(glovesSchema),
        defaultValues: { brand: '', size: '', price: 0, weightOz: 12 }
    });

    const { mutate: addGloves, isPending } = GlovesApi.useAdd();

    if (!isAdmin) {
        return <h2 style={{ color: "#ff4444", textAlign: "center" }}>Access Denied: Admins Only</h2>;
    }

    const onSubmit = (data) => {
        addGloves(data, {
            onSuccess: () => {
                alert("Gloves Saved!");
                reset();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-style" style={{ border: '2px solid #ff4444' }}>
            <h3>Add New Gloves</h3>

            <input type="text" placeholder="Brand" {...register('brand')} />
            {errors.brand && <span className="error-text">{errors.brand.message}</span>}

            <input type="text" placeholder="Size (S, M, L, XL)" {...register('size')} />
            {errors.size && <span className="error-text">{errors.size.message}</span>}

            <input type="number" step="0.01" placeholder="Price" {...register('price')} />
            {errors.price && <span className="error-text">{errors.price.message}</span>}

            <input type="number" placeholder="Weight (oz)" {...register('weightOz')} />
            {errors.weightOz && <span className="error-text">{errors.weightOz.message}</span>}

            <button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Gloves'}</button>
        </form>
    );
}