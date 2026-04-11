import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, LogOut } from 'lucide-react';
import { NAV_LINKS, ADMIN_LINKS } from '../../constants/navigation';
import { MenuLink } from './NavbarItems';
import { navStyles } from '../../utils/styles';

export default function MobileMenu({ isOpen, setIsOpen, isAdmin }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
                        aria-hidden="true"
                    />
                    <motion.aside
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0b0c10] border-l border-[#00f0ff]/30 shadow-[-20px_0_50px_rgba(0,240,255,0.1)] z-50 flex flex-col overflow-y-auto overflow-x-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#00f0ff]/10 via-transparent to-[#ff00a0]/10 pointer-events-none z-0" />

                        <div className="relative z-10 flex items-center justify-between p-6 border-b border-[#00f0ff]/20">
                            <span className="font-mono text-sm text-[#00f0ff] uppercase tracking-widest">Navigation</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={`p-2 text-slate-400 hover:text-[#ff00a0] transition-colors rounded-sm ${navStyles.focusRingDanger}`}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <nav className="relative z-10 flex-1 px-6 py-8 flex flex-col gap-6">
                            <ul className="space-y-4">
                                {NAV_LINKS.map(link => (
                                    <li key={link.path}><MenuLink to={link.path} icon={link.icon}>{link.label}</MenuLink></li>
                                ))}
                            </ul>

                            {isAdmin && (
                                <div className="mt-4 pt-6 border-t border-[#ff00a0]/30">
                                    <h4 className="flex items-center gap-2 font-mono text-[#ffea00] text-xs uppercase tracking-widest mb-4">
                                        <ShieldAlert className="w-4 h-4" /> Admin Pages
                                    </h4>
                                    <ul className="space-y-3">
                                        {ADMIN_LINKS.map(link => (
                                            <li key={link.path}><MenuLink to={link.path} icon={link.icon} admin>{link.label}</MenuLink></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </nav>

                        <div className="relative z-10 p-6 border-t border-[#00f0ff]/20 mt-auto">
                            <Link
                                to="/logout"
                                className={`flex items-center justify-center gap-3 w-full py-4 px-4 bg-[#ff00a0]/10 hover:bg-[#ff00a0] text-[#ff00a0] hover:text-white border border-[#ff00a0] transition-all font-mono uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(255,0,160,0.2)] hover:shadow-[0_0_25px_rgba(255,0,160,0.6)] rounded-sm ${navStyles.focusRingDanger}`}
                            >
                                <LogOut className="w-5 h-5" /> Logout
                            </Link>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}