import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';

import { headgearSchema } from '../../lib/schemas'; 
import { useHeadgear } from '../../hooks/useHeadgear'; 
import { formContainerVariants } from '../../constants/animations';

import FormLayout from './shared/FormLayout.jsx';
import FormInput from './shared/FormInput.jsx';
import FormSubmit from './shared/FormSubmit.jsx';

const THEME = { main: '#ff5500', secondary: '#ffea00' };

export default function HeadgearForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(headgearSchema),
        defaultValues: { 
            brand: '', 
            size: '', 
            price: '', 
            type: '' 
        },
    });

    const { addHeadgear } = useHeadgear();

    const onSubmit = (data) => {
        addHeadgear.mutate(data, {
            onSuccess: () => {
                toast.success('SYSTEM UPDATE', { 
                    description: 'Headgear recorded.', 
                    style: { background: '#0a0710', color: THEME.main, border: `1px solid ${THEME.main}` }
                });
                reset();
            },
            onError: (err) => {
                console.error("Save Error:", err.response?.data || err.message);
                toast.error('TRANSMISSION FAILED', { 
                    description: 'Failed to upload headgear data.', 
                    style: { background: '#0a0710', color: '#ff00a0', border: '1px solid #ff00a0' }
                });
            }
        });
    };

    return (
        <FormLayout 
            title="New Headgear" subtitle="Armor Database" icon={Shield} 
            themeMain={THEME.main} themeSecondary={THEME.secondary}
            bgPattern={{
                backgroundImage: `linear-gradient(45deg, ${THEME.main}0a 25%, transparent 25%, transparent 50%, ${THEME.main}0a 50%, ${THEME.main}0a 75%, transparent 75%, transparent)`,
                backgroundSize: '20px 20px',
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)'
            }}
        >
            <motion.form variants={formContainerVariants} initial="hidden" animate="show" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Full Width: Brand */}
                <FormInput 
                    label="Manufacturer (Brand)" 
                    placeholder="Winning" 
                    registration={register('brand')} 
                    error={errors.brand} 
                    themeMain={THEME.main} 
                />

                {/* Full Width: Type */}
                <FormInput 
                    label="Protection Type" 
                    placeholder="Face Saver, Open Face..." 
                    registration={register('type')} 
                    error={errors.type} 
                    themeMain={THEME.main} 
                />
                
                {/* Half Width Grid: Price & Size */}
                <div className="grid grid-cols-2 gap-4">
                    <FormInput 
                        type="number" 
                        step="0.01" 
                        label="Price ($)" 
                        placeholder="350.00" 
                        registration={register('price')} 
                        error={errors.price} 
                        themeMain={THEME.main} 
                    />
                    <FormInput 
                        label="Size" 
                        placeholder="M, L, XL" 
                        registration={register('size')} 
                        error={errors.size} 
                        themeMain={THEME.main} 
                    />
                </div>
                
                <FormSubmit 
                    isPending={addHeadgear.isPending} 
                    text="Save Headgear" 
                    themeMain={THEME.main} 
                    themeSecondary={THEME.secondary} 
                    textDark 
                />
            </motion.form>
        </FormLayout>
    );
}