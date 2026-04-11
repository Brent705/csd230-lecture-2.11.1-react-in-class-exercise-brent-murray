import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { toast } from 'sonner';

import { magazineSchema } from '../../lib/schemas'; 
import { useMagazines } from '../../hooks/useMagazines'; 
import { formContainerVariants } from '../../constants/animations';

import FormLayout from './shared/FormLayout.jsx';
import FormInput from './shared/FormInput.jsx';
import FormSubmit from './shared/FormSubmit.jsx';

const THEME = { main: '#00f0ff', secondary: '#b026ff' };

export default function MagazineForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(magazineSchema),
        defaultValues: { 
            title: '', 
            price: '', 
            copies: 10, 
            orderQty: 100, 
            currentIssue: '' 
        },
    });

    const { addMagazine } = useMagazines();

    const onSubmit = (data) => {
        let formattedDate = data.currentIssue;
        if (formattedDate && formattedDate.length === 16) {
            formattedDate += ":00";
        }

        const payload = {
            ...data,
            currentIssue: formattedDate
        };

        addMagazine.mutate(payload, {
            onSuccess: () => {
                toast.success('SYSTEM UPDATE', { 
                    description: 'Periodical entry recorded.', 
                    style: { background: '#0a0710', color: THEME.main, border: `1px solid ${THEME.main}` }
                });
                reset();
            },
            onError: (err) => {
                console.error("Save Error:", err.response?.data || err.message);
                toast.error('TRANSMISSION FAILED', { 
                    description: 'Failed to upload magazine data.', 
                    style: { background: '#0a0710', color: '#ff00a0', border: '1px solid #ff00a0' }
                });
            }
        });
    };

    return (
        <FormLayout 
            title="New Magazine" subtitle="Periodicals Database" icon={Newspaper} 
            themeMain={THEME.main} themeSecondary={THEME.secondary}
            bgPattern={{
                backgroundImage: `linear-gradient(45deg, ${THEME.main}0a 25%, transparent 25%, transparent 50%, ${THEME.main}0a 50%, ${THEME.main}0a 75%, transparent 75%, transparent)`,
                backgroundSize: '20px 20px',
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)'
            }}
        >
            <motion.form variants={formContainerVariants} initial="hidden" animate="show" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Full Width: Title */}
                <FormInput 
                    label="Magazine Title" 
                    placeholder="Ring Magazine" 
                    registration={register('title')} 
                    error={errors.title} 
                    themeMain={THEME.main} 
                />
                
                {/* Half Width Grid: Price & Issue Date */}
                <div className="grid grid-cols-2 gap-4">
                    <FormInput 
                        type="number" 
                        step="0.01" 
                        label="Price ($)" 
                        placeholder="9.99" 
                        registration={register('price')} 
                        error={errors.price} 
                        themeMain={THEME.main} 
                    />
                    <FormInput 
                        type="datetime-local" 
                        label="Issue Date" 
                        registration={register('currentIssue')} 
                        error={errors.currentIssue} 
                        themeMain={THEME.main} 
                    />
                </div>

                {/* Half Width Grid: Copies & Order Qty */}
                <div className="grid grid-cols-2 gap-4">
                    <FormInput 
                        type="number" 
                        label="Copies" 
                        placeholder="10" 
                        registration={register('copies')} 
                        error={errors.copies} 
                        themeMain={THEME.main} 
                    />
                    <FormInput 
                        type="number" 
                        label="Order Qty" 
                        placeholder="100" 
                        registration={register('orderQty')} 
                        error={errors.orderQty} 
                        themeMain={THEME.main} 
                    />
                </div>
                
                <FormSubmit 
                    isPending={addMagazine.isPending} 
                    text="Save Magazine" 
                    themeMain={THEME.main} 
                    themeSecondary={THEME.secondary} 
                    textDark 
                />

            </motion.form>
        </FormLayout>
    );
}