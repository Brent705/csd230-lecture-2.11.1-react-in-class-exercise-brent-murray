import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Loader2, AlertTriangle, CreditCard, Terminal } from 'lucide-react';

import { useCartLogic } from '../../hooks/useCartLogic.js';
import { cartStyles } from '../../utils/styles.js';

import CartBackground from './CartBackground.jsx';
import CartItem from './CartItem.jsx';
import CartReceipt from './CartReceipt.jsx';

export default function Cart() {
    const { 
        cart, isLoading, removeFromCart, cartTotal, 
        itemCount, getItemName, getQuantity, handleCheckout 
    } = useCartLogic();

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-80px)] w-full bg-[#0b0c10] flex flex-col items-center justify-center p-6" aria-busy="true">
                <Loader2 className="w-12 h-12 text-[#00f0ff] animate-spin mb-4 drop-shadow-[0_0_15px_#00f0ff]" />
                <p className="font-mono text-[#00f0ff] uppercase tracking-widest animate-pulse text-sm flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> ACCESSING CART...
                </p>
            </div>
        );
    }

    if (!cart) {
        return (
            <div className="min-h-[calc(100vh-80px)] w-full bg-[#0b0c10] flex flex-col items-center justify-center p-6" role="alert">
                <AlertTriangle className="w-12 h-12 text-[#ff00a0] mb-4 drop-shadow-[0_0_15px_#ff00a0]" />
                <p className="font-mono text-[#ff00a0] uppercase tracking-widest text-sm text-center max-w-xs">
                    ERROR: Cart items not found.<br />
                    <span className="text-xs text-slate-400 mt-2 block">Check your connection.</span>
                </p>
            </div>
        );
    }

    return (
        <main className={cartStyles.pageContainer}>
            
            {/* Visual UI (Hidden During Print) */}
            <div className="print:hidden">
                <CartBackground />

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-12">
                    <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#00f0ff]/30 pb-6">
                        <h1 id="cart-heading" className={cartStyles.headerText}>YOUR CART</h1>
                        <span className="font-mono text-sm text-[#ff00a0] bg-[#ff00a0]/10 px-4 py-2 rounded-sm border border-[#ff00a0]/30 flex items-center gap-2">
                            <span>{itemCount}</span>
                            <span className="text-xs opacity-75">{itemCount === 1 ? 'ITEM' : 'ITEMS'} LOADED</span>
                        </span>
                    </header>

                    <div aria-live="polite">
                        {itemCount === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                className="w-full flex flex-col items-center justify-center p-16 bg-[#0a0710]/90 backdrop-blur-xl border border-dashed border-[#00f0ff]/30 rounded-sm"
                            >
                                <ShoppingCart className="w-20 h-20 text-slate-600 mb-8" />
                                <p className="font-mono text-2xl text-[#00f0ff] uppercase tracking-[0.125em] mb-2 text-center">CART EMPTY</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => window.location.href = '/'} 
                                    className="mt-8 px-6 py-3 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10 font-mono text-xs uppercase tracking-widest transition-colors rounded-sm"
                                >
                                    BROWSE STORE →
                                </motion.button>
                            </motion.div>
                        ) : (
                            <div className="space-y-6">
                                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs uppercase tracking-widest rounded-sm">
                                    <div className="col-span-6">ITEM NAME</div>
                                    <div className="col-span-3 text-right">SUBTOTAL</div>
                                    <div className="col-span-3 text-center">ACTION</div>
                                </div>

                                <ul aria-labelledby="cart-heading" className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {cart.products.map(p => (
                                            <CartItem 
                                                key={p.id} 
                                                product={p} 
                                                itemName={getItemName(p)}
                                                quantity={getQuantity(p)}
                                                removeFromCart={removeFromCart} 
                                            />
                                        ))}
                                    </AnimatePresence>
                                </ul>

                                <motion.div layout className="mt-10 border-t border-[#00f0ff]/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                                    <div className="text-center sm:text-left">
                                        <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">TOTAL</h2>
                                        <p className="text-4xl font-black text-white drop-shadow-[0_0_15px_#00f0ff] tabular-nums">
                                            <span className="text-[#00f0ff]">$</span>{cartTotal.toFixed(2)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={removeFromCart.isPending}
                                        className={cartStyles.checkoutBtn}
                                    >
                                        <CreditCard className="w-5 h-5 transition-transform group-active:rotate-12" />
                                        INITIALIZE CHECKOUT
                                    </button>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Print Only View */}
            <CartReceipt 
                cart={cart} 
                cartTotal={cartTotal} 
                getItemName={getItemName} 
                getQuantity={getQuantity} 
            />
        </main>
    );
}