import { Link } from 'react-router'; 
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

import { useNavbarLogic } from '../../hooks/useNavbarLogic';
import { navStyles } from '../../utils/styles';

import CommandPalette from './CommandPalette';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const { 
        isAdmin, cartCount, 
        isMenuOpen, setIsMenuOpen, 
        isCmdkOpen, setIsCmdkOpen, 
        runCommand 
    } = useNavbarLogic();

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-[#0a0710]/90 backdrop-blur-md border-b border-[#ff00a0]/30 shadow-[0_4px_30px_rgba(255,0,160,0.1)]">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    
                    {/* Brand Logo */}
                    <Link to="/" className={`group flex flex-col justify-center p-1 ${navStyles.focusRing}`}>
                        <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff00a0] group-hover:drop-shadow-[0_0_15px_rgba(255,0,160,0.6)] transition-all">
                            BRENT'S
                        </span>
                        <span className="text-[10px] sm:text-xs font-mono text-white uppercase tracking-[0.3em] [text-shadow:1px_1px_0px_#00f0ff,-1px_-1px_0px_#ff00a0] -mt-1 pl-1">
                            Bookstore
                        </span>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        
                        {/* Desktop Search */}
                        <button
                            type="button"
                            onClick={() => setIsCmdkOpen(true)}
                            className={`hidden sm:flex items-center gap-3 px-4 py-2 bg-[#0b0c10] border border-[#00f0ff]/30 text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/60 transition-all ${navStyles.focusRing}`}
                        >
                            <Search className="w-4 h-4" />
                            <span className="font-mono text-xs uppercase tracking-wider">Search...</span>
                            <kbd className="ml-2 font-sans text-[10px] px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">⌘K</kbd>
                        </button>

                        {/* Mobile Search */}
                        <button
                            type="button"
                            onClick={() => setIsCmdkOpen(true)}
                            className={`sm:hidden p-2 ${navStyles.neonTextBlue} ${navStyles.focusRing}`}
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Cart */}
                        <Link 
                            to="/cart"
                            className={`relative flex items-center justify-center p-2 ml-2 ${navStyles.neonTextBlue} ${navStyles.focusRing}`}
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <motion.span 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-[#ff00a0] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_#ff00a0]"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {/* Mobile Menu Trigger */}
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(true)}
                            className={`p-2 ${navStyles.neonTextPink} ${navStyles.focusRing}`}
                        >
                            <Menu className="w-8 h-8" />
                        </button>
                    </div>
                </nav>
            </header>

            <CommandPalette 
                isOpen={isCmdkOpen} 
                setIsOpen={setIsCmdkOpen} 
                runCommand={runCommand} 
                isAdmin={isAdmin} 
            />

            <MobileMenu 
                isOpen={isMenuOpen} 
                setIsOpen={setIsMenuOpen} 
                isAdmin={isAdmin} 
            />
        </>
    );
}