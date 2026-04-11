import { motion } from "framer-motion";
import { Link } from "react-router"; 
import { ShieldAlert } from "lucide-react";
import { pageContainerClass, neonGridFloorStyle, neonButtonClass } from "../../utils/styles";
import { staggerContainer, childFadeInUp, floatAnimation } from "../../constants/animations";

const ForbiddenPage = () => {
    return (
        <main className={pageContainerClass}>
            {/* Neon grid floor effect */}
            <div 
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[42%] pointer-events-none z-0"
                style={neonGridFloorStyle}
            />

            {/* Cyan/Pink Fog */}
            <motion.div 
                aria-hidden="true" 
                className="absolute inset-0 bg-gradient-to-br from-[#ff00a0]/10 via-transparent to-transparent pointer-events-none z-0"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.section 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="relative z-10 text-center flex flex-col items-center max-w-2xl bg-[#0b0c10]/60 p-10 rounded-lg backdrop-blur-md border border-[#ff00a0]/30 shadow-[0_0_50px_rgba(255,0,160,0.15)]"
            >
                <motion.div variants={floatAnimation} className="mb-6 text-[#ff00a0] drop-shadow-[0_0_15px_#ff00a0]">
                    <ShieldAlert size={80} strokeWidth={1.5} aria-hidden="true" />
                </motion.div>

                <motion.h1 
                    variants={childFadeInUp}
                    className="text-7xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ffea00] to-[#ff00a0] drop-shadow-[0_0_20px_rgba(255,0,160,0.6)] mb-2"
                >
                    403
                </motion.h1>

                <motion.h2 
                    variants={childFadeInUp}
                    className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-white uppercase mb-4 [text-shadow:2px_2px_0px_#ff00a0]"
                >
                    Access Denied
                </motion.h2>

                <motion.p 
                    variants={childFadeInUp}
                    className="text-[#00f0ff] text-sm md:text-base font-mono tracking-widest uppercase mb-10 drop-shadow-[0_0_5px_#00f0ff]"
                >
                    &gt; Warning: Insufficient Clearance Level
                </motion.p>

                <motion.div variants={childFadeInUp}>
                    <Link to="/" className={neonButtonClass}>
                        Return to Mainframe
                    </Link>
                </motion.div>
            </motion.section>
        </main>
    );
};

export default ForbiddenPage;