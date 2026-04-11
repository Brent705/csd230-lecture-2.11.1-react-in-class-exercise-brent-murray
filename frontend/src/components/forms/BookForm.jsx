import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';

import { bookSchema } from '../../lib/schemas';
import { useBooks } from '../../hooks/useBooks';
import { formContainerVariants } from '../../constants/animations';

import FormLayout from './shared/FormLayout.jsx';
import FormInput from './shared/FormInput.jsx';
import FormSubmit from './shared/FormSubmit.jsx';

const THEME = { main: '#ffea00', secondary: '#ff00a0' };

export default function BookForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(bookSchema),
        defaultValues: { title: '', author: '', price: 0 },
    });

    const { addBook } = useBooks();

    const onSubmit = (data) => {
        addBook.mutate({ ...data, copies: 10 }, {
            onSuccess: () => {
                toast.success('SYSTEM UPDATE', { description: 'Book record added.', style: { background: '#0a0710', color: THEME.main, border: `1px solid ${THEME.main}` }});
                reset();
            },
            onError: () => toast.error('TRANSMISSION FAILED', { description: 'Upload failed.', style: { background: '#0a0710', color: '#ff00a0', border: `1px solid #ff00a0` }})
        });
    };

    return (
        <FormLayout 
            title="New Book" subtitle="Initialize Data Record" icon={BookOpen} 
            themeMain={THEME.main} themeSecondary={THEME.secondary}
            bgPattern={{
                backgroundImage: `linear-gradient(${THEME.main}0a 1px, transparent 1px), linear-gradient(90deg, ${THEME.main}0a 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)'
            }}
        >
            <motion.form variants={formContainerVariants} initial="hidden" animate="show" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormInput label="Title" placeholder="Berserk" registration={register('title')} error={errors.title} themeMain={THEME.main} />
                <FormInput label="Author" placeholder="Kentaro Miura" registration={register('author')} error={errors.author} themeMain={THEME.main} />
                <FormInput type="number" step="0.01" label="Price ($)" placeholder="19.99" registration={register('price')} error={errors.price} themeMain={THEME.main} />
                
                <FormSubmit isPending={addBook.isPending} text="Save Record" themeMain={THEME.main} themeSecondary="#ff8c00" textDark />
            </motion.form>
        </FormLayout>
    );
}