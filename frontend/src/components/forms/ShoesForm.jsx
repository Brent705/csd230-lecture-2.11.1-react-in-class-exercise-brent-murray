import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { GiRunningShoe } from 'react-icons/gi';
import { toast } from 'sonner';

import { shoesSchema } from '../../lib/schemas';
import { useShoes } from '../../hooks/useShoes';
import { formContainerVariants } from '../../constants/animations';

import FormLayout from './shared/FormLayout.jsx';
import FormInput from './shared/FormInput.jsx';
import FormToggle from './shared/FormToggle.jsx';
import FormSubmit from './shared/FormSubmit.jsx';

const THEME = { main: '#b026ff', secondary: '#ff00a0' };

export default function ShoesForm() {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: zodResolver(shoesSchema),
        defaultValues: { brand: '', size: '', price: 0, highTop: false },
    });

    const { addShoes } = useShoes();

    const onSubmit = (data) => {
        addShoes.mutate(data, {
            onSuccess: () => {
                toast.success('SYSTEM UPDATE', { description: 'Footwear entry recorded.', style: { background: '#0a0710', color: THEME.main, border: `1px solid ${THEME.main}` }});
                reset();
            },
            onError: () => toast.error('TRANSMISSION FAILED', { description: 'Footwear data lost.', style: { background: '#0a0710', color: '#ff00a0', border: '1px solid #ff00a0' }})
        });
    };

    return (
        <FormLayout 
            title="New Shoes" subtitle="Footwear Database" icon={GiRunningShoe} 
            themeMain={THEME.main} themeSecondary={THEME.secondary}
            bgPattern={{
                backgroundImage: `repeating-linear-gradient(90deg, ${THEME.main}26 0px, ${THEME.main}26 1px, transparent 1px, transparent 32px)`,
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)'
            }}
        >
            <motion.form variants={formContainerVariants} initial="hidden" animate="show" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormInput label="Brand" placeholder="Nike Hyperko 2" registration={register('brand')} error={errors.brand} themeMain={THEME.main} />
                
                <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Size" placeholder="10.5" registration={register('size')} error={errors.size} themeMain={THEME.main} />
                    <FormInput type="number" step="0.01" label="Price ($)" placeholder="89.99" registration={register('price')} error={errors.price} themeMain={THEME.main} />
                </div>

                <FormToggle label="High-Top Variant" name="highTop" control={control} themeMain={THEME.main} />
                
                <FormSubmit isPending={addShoes.isPending} text="Save Footwear" themeMain={THEME.main} themeSecondary={THEME.secondary} />
            </motion.form>
        </FormLayout>
    );
}