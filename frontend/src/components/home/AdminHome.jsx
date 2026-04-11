import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { ADMIN_ACTIONS, homeContainerVariants } from '../../constants/home';
import SynthwaveBackground from './SynthwaveBackground.jsx';
import ActionCard from './ActionCard.jsx';

export default function AdminHome() {
    return (
        <main className="relative min-h-[calc(100vh-80px)] w-full bg-[#0b0c10] text-gray-200 font-sans selection:bg-[#ff00a0] selection:text-white overflow-hidden flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            
            <SynthwaveBackground 
                gridColorRgba="rgba(255,0,160,0.18)"
                vignetteGradient="from-[#ffea00]/8 via-[#0b0c10]/50 to-[#0b0c10]"
                scanlineColorRgba="rgba(255, 234, 0, 0.18)"
            />

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
                <motion.header 
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4 text-[#ffea00]" aria-live="polite">
                        <ShieldAlert className="w-6 h-6 animate-pulse" aria-hidden="true" />
                        <span className="font-mono text-xs uppercase tracking-[0.3em] drop-shadow-[0_0_8px_currentColor]">AUTHORIZED PERSONNEL ONLY</span>
                        <ShieldAlert className="w-6 h-6 animate-pulse" aria-hidden="true" />
                    </div>

                    <h1 id="admin-heading" className="text-5xl sm:text-7xl font-black italic tracking-[-3px] text-transparent bg-clip-text bg-gradient-to-r from-[#ffea00] via-[#ff00a0] to-[#ffea00] drop-shadow-[0_0_30px_rgba(255,234,0,0.6)] mb-3 uppercase">
                        SYSTEM CORE
                    </h1>
                    <p className="text-[#ffea00] text-lg sm:text-xl font-mono tracking-widest drop-shadow-[0_0_12px_#ffea00]">
                        &gt; MANAGE YOUR DIGITAL INVENTORY
                    </p>
                </motion.header>

                <motion.section 
                    aria-labelledby="admin-heading"
                    variants={homeContainerVariants}
                    initial="hidden" animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl"
                >
                    {ADMIN_ACTIONS.map((action) => (
                        <ActionCard key={action.name} item={action} isAdmin />
                    ))}
                </motion.section>
                
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-20 font-mono text-xs text-slate-400 uppercase tracking-widest flex flex-wrap justify-center gap-x-8 gap-y-4"
                >
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" /> DATABASE LINKED</span>
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ffea00] animate-pulse" /> ADMIN PRIVILEGES ACTIVE</span>
                    <span className="flex items-center gap-2 text-[#ff00a0]"><span className="w-2 h-2 rounded-full bg-[#ff00a0] animate-pulse" /> FIREWALL SECURE</span>
                </motion.div>
            </div>
        </main>
    );
}