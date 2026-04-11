import { motion } from 'framer-motion';
import { formItemVariants } from '../../../constants/animations.js';

export default function FormInput({ label, type = "text", placeholder, error, registration, themeMain, step }) {
    const hasError = !!error;
    const activeColor = hasError ? '#ff00a0' : themeMain;

    return (
        <motion.div variants={formItemVariants}>
            <label className="block text-[9px] font-mono mb-2 uppercase tracking-[0.2em]" style={{ color: `${themeMain}b3` }}>
                {label}
            </label>
            <input
                type={type}
                step={step}
                placeholder={placeholder}
                {...registration}
                className="w-full px-4 py-3 bg-white/[0.03] text-white placeholder-white/20 font-mono text-sm border-b-2 rounded-t-sm transition-colors duration-150 focus:outline-none"
                style={{
                    borderColor: hasError ? '#ff00a0' : 'rgba(255,255,255,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = activeColor;
                    e.target.style.backgroundColor = `${activeColor}0a`; // 0a is ~4% opacity
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = hasError ? '#ff00a0' : 'rgba(255,255,255,0.1)';
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.03)';
                }}
            />
            {hasError && (
                <span className="block mt-1.5 text-[#ff00a0] text-[9px] font-mono uppercase tracking-wider">
                    {error.message}
                </span>
            )}
        </motion.div>
    );
}