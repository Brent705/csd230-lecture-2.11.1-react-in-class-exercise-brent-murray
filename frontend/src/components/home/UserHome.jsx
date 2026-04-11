import { motion } from 'framer-motion';
import { USER_CATEGORIES, homeContainerVariants } from '../../constants/home';
import SynthwaveBackground from './SynthwaveBackground.jsx';
import ActionCard from './ActionCard.jsx';

export default function UserHome() {
    return (
        <main className="relative min-h-[calc(100vh-80px)] w-full bg-[#0b0c10] text-gray-200 font-sans selection:bg-[#ff00a0] selection:text-white overflow-hidden flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            
            <SynthwaveBackground 
                gridColorRgba="rgba(0,240,255,0.12)"
                vignetteGradient="from-[#ff00a0]/10 via-[#0b0c10]/50 to-[#0b0c10]"
                scanlineColorRgba="rgba(0, 240, 255, 0.18)"
            />

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
                <motion.header 
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="inline-flex items-center gap-2 mb-3 px-6 py-1.5 bg-[#0a0710]/80 backdrop-blur-md border border-[#00f0ff]/30 rounded-full text-[#00f0ff] text-sm font-mono tracking-widest"
                    >
                        <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
                        WELCOME BACK
                    </motion.div>

                    <h1 id="user-heading" className="text-5xl sm:text-7xl font-black italic tracking-[-3px] text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff00a0] to-[#00f0ff] drop-shadow-[0_0_30px_rgba(255,0,160,0.6)] mb-3 uppercase">
                        Brent&apos;s Bookstore
                    </h1>
                    <p className="text-[#00f0ff]/70 font-mono text-lg tracking-[2px] uppercase drop-shadow-[0_0_15px_currentColor]">
                        DIGITAL VAULT
                    </p>
                </motion.header>

                <motion.section 
                    aria-labelledby="user-heading"
                    variants={homeContainerVariants}
                    initial="hidden" animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl"
                >
                    {USER_CATEGORIES.map((category) => (
                        <ActionCard key={category.name} item={category} />
                    ))}
                </motion.section>

                <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-16 text-xs font-mono text-[#00f0ff]/40 tracking-widest flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-[#00f0ff]/30" />
                    Pick one of the options above to start
                    <span className="h-px w-8 bg-[#00f0ff]/30" />
                </motion.p>
            </div>
        </main>
    );
}