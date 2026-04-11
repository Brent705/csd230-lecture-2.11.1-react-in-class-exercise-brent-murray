import { motion } from 'framer-motion';

export default function FormLayout({ children, title, subtitle, icon: Icon, themeMain, themeSecondary, bgPattern }) {
    return (
        <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[#0b0c10] overflow-hidden">
            
            {/* Dynamic Background Pattern */}
            <div 
                aria-hidden="true" 
                className="absolute inset-0 pointer-events-none opacity-30"
                style={bgPattern}
            />
            
            {/* Universal Scanlines */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-25 z-0"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)' }}
            />

            <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="relative z-10 w-full max-w-md bg-[#0a0710]/95 backdrop-blur-xl rounded-sm p-8"
                style={{ 
                    border: `1px solid ${themeMain}40`, // 40 is hex for 25% opacity
                    boxShadow: `0 0 0 1px ${themeMain}10, 0 24px 48px rgba(0,0,0,0.6), inset 0 1px 0 ${themeMain}15` 
                }}
            >
                {/* Accent top bar */}
                <div 
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-sm opacity-60" 
                    style={{ background: `linear-gradient(to right, transparent, ${themeMain}, transparent)` }}
                />

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 pb-4" style={{ borderBottom: `1px solid ${themeMain}25` }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-sm" style={{ border: `1px solid ${themeMain}40`, backgroundColor: `${themeMain}10` }}>
                        <Icon className="w-5 h-5" style={{ color: themeMain }} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black italic tracking-wider uppercase text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${themeMain}, ${themeSecondary})` }}>
                            {title}
                        </h2>
                        <p className="font-mono text-[9px] tracking-[0.25em] uppercase mt-0.5" style={{ color: `${themeMain}80` }}>
                            {subtitle}
                        </p>
                    </div>
                </div>

                {/* The Form Itself */}
                {children}
            </motion.div>
        </div>
    );
}