import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function CategoryPage({
    isLoading,
    accentColor,
    loadingLabel,
    headerIcon,
    title,
    subtitle,
    children,
}) {
    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#0b0c10] flex flex-col items-center justify-center p-6">
                <Loader2
                    className="w-12 h-12 animate-spin mb-4"
                    style={{ color: accentColor }}
                />
                <p
                    className="font-mono tracking-widest uppercase text-sm animate-pulse"
                    style={{ color: accentColor }}
                >
                    {loadingLabel}
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#0b0c10] p-6 lg:p-12 overflow-hidden relative">
            {/* Ambient radial glow */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(ellipse at top, color-mix(in srgb, ${accentColor} 10%, transparent), #0b0c10 60%)`,
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <header
                    className="mb-12 pb-6 flex items-center gap-4"
                    style={{ borderBottom: `1px solid color-mix(in srgb, ${accentColor} 30%, transparent)` }}
                >
                    {headerIcon}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text uppercase"
                            style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #ff00a0)` }}
                        >
                            {title}
                        </h1>
                        <p
                            className="font-mono text-sm tracking-widest uppercase mt-1"
                            style={{
                                color: accentColor,
                                filter: `drop-shadow(0 0 8px ${accentColor})`,
                            }}
                        >
                            {subtitle}
                        </p>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {children}
                </motion.div>
            </div>
        </main>
    );
}