import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { homeItemVariants } from '../../constants/home';

export default function ActionCard({ item, isAdmin = false }) {
    const { name, path, icon: Icon, colorClass, hexColor } = item;

    return (
        <motion.div variants={homeItemVariants} className="h-full">
            <Link 
                to={path}
                className="group relative flex flex-col items-center justify-center p-8 h-52 bg-[#0a0710]/80 backdrop-blur-xl border border-slate-800/70 rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0c10] hover:-translate-y-1"
                style={{ 
                    color: hexColor,
                    borderColor: 'var(--hover-border-color, rgba(30,41,59,0.7))',
                    boxShadow: 'var(--hover-shadow, none)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.setProperty('--hover-border-color', hexColor);
                    e.currentTarget.style.setProperty('--hover-shadow', `0 0 30px ${hexColor}`);
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.removeProperty('--hover-border-color');
                    e.currentTarget.style.removeProperty('--hover-shadow');
                }}
                aria-label={isAdmin ? `Add new ${name.toLowerCase()}` : `Browse ${name} collection`}
            >
                {/* Admin Plus Indicator */}
                {isAdmin && (
                    <div className="absolute top-4 right-4 text-[#ffea00] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all drop-shadow-[0_0_12px_currentColor]">
                        <PlusCircle className="w-6 h-6" aria-hidden="true" />
                    </div>
                )}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.08)_50%)] bg-[length:100%_4px] pointer-events-none transition-opacity rounded-2xl z-0" />
                
                <div className={`relative z-10 mb-5 transition-all duration-300 group-hover:-translate-y-3 group-hover:scale-110 ${colorClass}`}>
                    <Icon className="w-10 h-10" />
                </div>
                
                <span className="relative z-10 font-mono text-base uppercase tracking-[3px] text-slate-300 transition-colors duration-300 group-hover:text-white">
                    {name}
                </span>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-[3px] transition-all duration-300 group-hover:w-3/4 bg-current shadow-[0_0_12px_currentColor]" />
            </Link>
        </motion.div>
    );
}