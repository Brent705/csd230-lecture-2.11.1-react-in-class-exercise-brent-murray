import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { toast } from 'sonner';

import { handWrapsSchema } from '../../lib/schemas'; 
import { useHandWraps } from '../../hooks/useHandWraps'; 
import { formContainerVariants } from '../../constants/animations';

import FormLayout from './shared/FormLayout.jsx';
import FormInput from './shared/FormInput.jsx';
import FormSubmit from './shared/FormSubmit.jsx';
import FormToggle from './shared/FormToggle.jsx';

const THEME = { main: '#00ffcc', secondary: '#b026ff' };

export default function HandWrapsForm() {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: zodResolver(handWrapsSchema),
        defaultValues: { 
            brand: '', 
            size: '', 
            price: '',
            elastic: false 
        },
    });

    const { addHandWraps } = useHandWraps();

    const onSubmit = (data) => {
        addHandWraps.mutate(data, {
            onSuccess: () => {
                toast.success('SYSTEM UPDATE', { 
                    description: 'Support bindings recorded.', 
                    style: { background: '#0a0710', color: THEME.main, border: `1px solid ${THEME.main}` }
                });
                reset();
            },
            onError: (err) => {
                console.error("Save Error:", err.response?.data || err.message);
                toast.error('TRANSMISSION FAILED', { 
                    description: 'Failed to upload wrap data.', 
                    style: { background: '#0a0710', color: '#ff00a0', border: '1px solid #ff00a0' }
                });
            }
        });
    };

    return (
        <FormLayout 
            title="New Hand Wraps" subtitle="Support Database" icon={Activity} 
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
                    placeholder="Meister, Title..." 
                    registration={register('brand')} 
                    error={errors.brand} 
                    themeMain={THEME.main} 
                />

                {/* Half Width Grid: Price & Length */}
                <div className="grid grid-cols-2 gap-4">
                    <FormInput 
                        type="number" 
                        step="0.01" 
                        label="Price ($)" 
                        placeholder="12.99" 
                        registration={register('price')} 
                        error={errors.price} 
                        themeMain={THEME.main} 
                    />
                    <FormInput 
                        label="Length (Size)" 
                        placeholder="180in, 120in" 
                        registration={register('size')} 
                        error={errors.size} 
                        themeMain={THEME.main} 
                    />
                </div>

                {/* Boolean Toggle: Elastic / Mexican Style */}
                <FormToggle 
                    label="Mexican Style (Elastic Stretch)" 
                    name="elastic" 
                    control={control} 
                    themeMain={THEME.main} 
                />
                
                <FormSubmit 
                    isPending={addHandWraps.isPending} 
                    text="Save Wraps" 
                    themeMain={THEME.main} 
                    themeSecondary={THEME.secondary} 
                    textDark 
                />
            </motion.form>
        </FormLayout>
    );
}