import { motion } from 'framer-motion';

const LoginVisualPanel = () => {
    return (
        <aside className="hidden lg:flex lg:w-[55%] relative flex-col justify-center items-center p-12 z-10 overflow-hidden bg-gradient-to-b from-[#0a0710] to-[#1f0535]">
            
            {/* Miami Vice Synthwave Sun – now pulses slowly for that retro VHS energy */}
            <motion.div 
                aria-hidden="true"
                className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-b from-[#ffea00] via-[#ff00a0] to-[#2e023f] shadow-[0_0_120px_rgba(255,0,160,0.6)] z-0"
                style={{
                    maskImage: 'repeating-linear-gradient(to bottom, black 0%, black 10px, transparent 10px, transparent 14px)',
                    WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0%, black 10px, transparent 10px, transparent 14px)'
                }}
                animate={{
                    scale: [1, 1.04, 1],
                    opacity: [0.92, 1, 0.92]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Cyan/Pink Fog Overlays – subtle breathing effect */}
            <motion.div 
                aria-hidden="true" 
                className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 via-transparent to-[#ff00a0]/10 pointer-events-none z-0"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Typography – staggered entrance for extra drama */}
            <motion.div 
                initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative z-10 text-center mt-32"
            >
                <motion.h1 
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-7xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff00a0] drop-shadow-[0_0_20px_rgba(255,0,160,0.8)] mb-2"
                >
                    BRENT'S
                </motion.h1>
                
                <motion.h2 
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-4xl md:text-5xl font-bold tracking-[0.3em] text-white uppercase [text-shadow:3px_3px_0px_#00f0ff,-3px_-3px_0px_#ff00a0]"
                >
                    Bookstore
                </motion.h2>
                
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="mt-8 text-[#00f0ff] text-lg font-mono tracking-widest uppercase drop-shadow-[0_0_5px_#00f0ff]"
                >
                    &gt; Books, Magazines, and More
                </motion.p>
            </motion.div>

            {/* Footer Status Indicators – live pulsing dot + slight hover lift */}
            <motion.div 
                aria-label="System Status"
                className="absolute bottom-6 left-12 right-12 flex justify-between text-[10px] font-mono text-[#ff00a0] uppercase tracking-widest border-t border-[#ff00a0]/30 pt-4 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
            >
                <span className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
                     Synth<span className="text-[#00f0ff]">Wave</span>
                </span>
            </motion.div>
        </aside>
    );
};

export default LoginVisualPanel;