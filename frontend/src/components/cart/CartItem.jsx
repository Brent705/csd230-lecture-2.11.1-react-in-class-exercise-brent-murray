import { motion } from 'framer-motion';
import { Trash2, Loader2 } from 'lucide-react';
import { cartStyles } from '../../utils/styles.js';

export default function CartItem({ product, itemName, quantity, removeFromCart }) {
    const subtotal = (product.price || 0) * quantity;

    return (
        <motion.li 
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -80, filter: "blur(8px)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cartStyles.itemCard}
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(transparent_40%,rgba(255,0,160,0.12)_50%,transparent_60%)] bg-[length:100%_6px] pointer-events-none transition-opacity z-0" />
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start sm:items-center">
                <div className="sm:col-span-6">
                    <div className="font-medium text-white tracking-wide text-lg leading-tight break-words">
                        {itemName}
                    </div>
                </div>
                
                <div className="sm:col-span-3 flex justify-between sm:justify-end items-baseline sm:text-right font-mono text-[#00f0ff] text-xl sm:text-base">
                    <span className="sm:hidden text-xs text-slate-400 uppercase">Subtotal</span>
                    <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="sm:col-span-3 flex justify-end sm:justify-center mt-4 sm:mt-0">
                    <button
                        onClick={() => removeFromCart.mutate(product.id)}
                        disabled={removeFromCart.isPending}
                        aria-label={`Remove ${itemName} from cart`}
                        className={cartStyles.deleteBtn}
                    >
                        {removeFromCart.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4 transition-transform group-active:scale-110" aria-hidden="true" />
                                <span className="sm:hidden">PURGE</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.li>
    );
}