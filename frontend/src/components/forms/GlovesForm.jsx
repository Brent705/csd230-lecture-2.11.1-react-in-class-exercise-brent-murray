import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { GiBoxingGlove } from 'react-icons/gi';
import { toast } from 'sonner';

import { glovesSchema } from '../../lib/schemas';
import { useGloves } from '../../hooks/useGloves';
import { formContainerVariants } from '../../constants/animations';

import FormLayout from './shared/FormLayout.jsx';
import FormInput from './shared/FormInput.jsx';
import FormSubmit from './shared/FormSubmit.jsx';

const THEME = { main: '#ff00a0', secondary: '#ffea00' };

export default function GlovesForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(glovesSchema),
        defaultValues: { brand: '', size: '', price: 0, weightOz: 12 },
    });

    const { addGloves } = useGloves();

    const onSubmit = (data) => {
        addGloves.mutate(data, {
            onSuccess: () => {
                toast.success('SYSTEM UPDATE', { description: 'Combat equipment registered.', style: { background: '#0a0710', color: THEME.main, border: `1px solid ${THEME.main}` }});
                reset();
            },
            onError: () => toast.error('TRANSMISSION FAILED', { description: 'Equipment entry rejected.', style: { background: '#0a0710', color: THEME.secondary, border: `1px solid ${THEME.secondary}` }})
        });
    };

    return (
        <FormLayout 
            title="New Gloves" subtitle="Combat Gear Log" icon={GiBoxingGlove} 
            themeMain={THEME.main} themeSecondary={THEME.secondary}
            bgPattern={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${THEME.main}12 0%, transparent 70%)` }}
        >
            <motion.form variants={formContainerVariants} initial="hidden" animate="show" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormInput label="Brand" placeholder="Cleto Reyes" registration={register('brand')} error={errors.brand} themeMain={THEME.main} />
                <FormInput label="Size" placeholder="S / M / L / XL" registration={register('size')} error={errors.size} themeMain={THEME.main} />
                
                <div className="grid grid-cols-2 gap-4">
                    <FormInput type="number" step="0.01" label="Price ($)" placeholder="49.99" registration={register('price')} error={errors.price} themeMain={THEME.main} />
                    <FormInput type="number" label="Weight (oz)" placeholder="14" registration={register('weightOz')} error={errors.weightOz} themeMain={THEME.main} />
                </div>
                
                <FormSubmit isPending={addGloves.isPending} text="Save Gloves" themeMain={THEME.main} themeSecondary={THEME.secondary} textDark />
            </motion.form>
        </FormLayout>
    );
}