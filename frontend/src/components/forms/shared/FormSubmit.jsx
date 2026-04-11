import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import { formItemVariants } from '../../../constants/animations.js';

export default function FormSubmit({ isPending, text, themeMain, themeSecondary, textDark = false }) {
    return (
        <motion.button
            variants={formItemVariants}
            type="submit"
            disabled={isPending}
            className={`w-full mt-2 py-3.5 px-4 font-mono font-bold text-[11px] tracking-[0.22em] uppercase rounded-sm transition-all duration-150 hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0710] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 ${textDark ? 'text-black' : 'text-white'}`}
            style={{ 
                background: `linear-gradient(to right, ${themeMain}, ${themeSecondary})`,
                '--tw-ring-color': `${themeMain}99`
            }}
        >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isPending ? 'Uploading…' : text}
        </motion.button>
    );
}