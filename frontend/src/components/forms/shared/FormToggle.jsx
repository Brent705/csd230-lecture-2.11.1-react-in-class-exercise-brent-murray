import { Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { formItemVariants } from '../../../constants/animations.js';

export default function FormToggle({ label, name, control, themeMain }) {
    return (
        <motion.div variants={formItemVariants}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="flex items-center justify-between px-4 py-3 border rounded-sm" style={{ borderColor: `${themeMain}33`, backgroundColor: `${themeMain}0a` }}>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em]" style={{ color: `${themeMain}b3` }}>
                            {label}
                        </span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={field.value}
                            onClick={() => field.onChange(!field.value)}
                            className="relative inline-flex w-10 h-5 rounded-full border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0710]"
                            style={{
                                backgroundColor: field.value ? `${themeMain}4d` : 'rgba(255,255,255,0.04)',
                                borderColor: field.value ? `${themeMain}99` : 'rgba(255,255,255,0.15)',
                                '--tw-ring-color': `${themeMain}99`
                            }}
                        >
                            <span
                                className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200"
                                style={{
                                    left: field.value ? 'calc(100% - 18px)' : '2px',
                                    backgroundColor: field.value ? themeMain : 'rgba(255,255,255,0.3)'
                                }}
                            />
                        </button>
                    </div>
                )}
            />
        </motion.div>
    );
}