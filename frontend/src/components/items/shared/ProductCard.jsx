import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { cn } from '../../../utils/cn';
import AdminControls from './AdminControls';
import DeleteConfirmOverlay from './DeleteConfirmOverlay';

const variantConfig = {
  gloves: {
    card: 'border-[#ff00a0]/20 hover:border-[#ff00a0]/60',
    image: 'bg-gradient-to-br from-[#ff00a0]/10 via-[#0a0710] to-transparent',
    overlay: 'bg-[radial-gradient(circle_at_center,rgba(255,0,160,0.4)_0%,transparent_70%)]',
    icon: 'text-[#ff00a0]',
    categoryText: 'text-[#ffea00]',
    button: 'from-[#ff00a0]/10 to-transparent hover:from-[#ff00a0] hover:to-[#ffea00] text-[#ff00a0] hover:text-black border-[#ff00a0]/30',
  },
  book: {
    card: 'border-[#00f0ff]/20 hover:border-[#00f0ff]/60',
    image: 'bg-gradient-to-br from-[#00f0ff]/10 via-[#0a0710] to-transparent',
    overlay: 'bg-[repeating-linear-gradient(transparent_0px,transparent_2px,rgba(0,240,255,0.05)_2px,rgba(0,240,255,0.05)_4px)]',
    icon: 'text-[#00f0ff]',
    categoryText: 'text-[#ff00a0]',
    button: 'from-[#00f0ff]/10 to-transparent hover:from-[#00f0ff] hover:to-[#b026ff] text-[#00f0ff] hover:text-white border-[#00f0ff]/30',
  },
  shoes: {
    card: 'border-[#b026ff]/20 hover:border-[#b026ff]/60',
    image: 'bg-gradient-to-br from-[#b026ff]/10 via-[#0a0710] to-transparent',
    overlay: 'bg-[radial-gradient(circle_at_center,rgba(176,38,255,0.4)_0%,transparent_70%)]',
    icon: 'text-[#b026ff]',
    categoryText: 'text-[#00f0ff]',
    button: 'from-[#b026ff]/10 to-transparent hover:from-[#b026ff] hover:to-[#ff00a0] text-[#b026ff] hover:text-white border-[#b026ff]/30',
  },
  magazine: {
    card: 'border-[#00f0ff]/20 hover:border-[#b026ff]/60',
    image: 'bg-gradient-to-br from-[#b026ff]/10 via-[#0a0710] to-transparent',
    overlay: 'bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.4)_0%,transparent_70%)]',
    icon: 'text-[#00f0ff]',
    categoryText: 'text-[#ff00a0]',
    button: 'from-[#00f0ff]/10 to-[#b026ff]/10 hover:from-[#00f0ff] hover:to-[#b026ff] text-[#00f0ff] hover:text-white border-[#00f0ff]/30',
  },
  discmag: {
    card: 'border-[#39ff14]/20 hover:border-[#39ff14]/60',
    image: 'bg-gradient-to-br from-[#39ff14]/10 via-[#0a0710] to-transparent',
    overlay: 'bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.4)_0%,transparent_70%)]',
    icon: 'text-[#39ff14]',
    categoryText: 'text-[#00f0ff]',
    button: 'from-[#39ff14]/10 to-[#00f0ff]/10 hover:from-[#39ff14] hover:to-[#00f0ff] text-[#39ff14] hover:text-black border-[#39ff14]/30',
  },
  headgear: {
    card: 'border-[#ff5500]/20 hover:border-[#ff5500]/60',
    image: 'bg-gradient-to-br from-[#ff5500]/10 via-[#0a0710] to-transparent',
    overlay: 'bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.4)_0%,transparent_70%)]',
    icon: 'text-[#ff5500]',
    categoryText: 'text-[#ffea00]',
    button: 'from-[#ff5500]/10 to-[#ff00a0]/10 hover:from-[#ff5500] hover:to-[#ff00a0] text-[#ff5500] hover:text-white border-[#ff5500]/30',
  },
  handwraps: {
    card: 'border-[#00ffcc]/20 hover:border-[#00ffcc]/60',
    image: 'bg-gradient-to-br from-[#00ffcc]/10 via-[#0a0710] to-transparent',
    overlay: 'bg-[radial-gradient(circle_at_center,rgba(0,255,204,0.4)_0%,transparent_70%)]',
    icon: 'text-[#00ffcc]',
    categoryText: 'text-[#00f0ff]',
    button: 'from-[#00ffcc]/10 to-[#b026ff]/10 hover:from-[#00ffcc] hover:to-[#b026ff] text-[#00ffcc] hover:text-black border-[#00ffcc]/30',
  },
};

export default function ProductCard({
  id,
  variant,
  title,
  middleContent,
  price,
  buttonLabel,
  Icon,
  onAddToCart,
  isAdmin = false,
  onEdit,
  onDelete,
  isDeleting = false,
  onConfirmDelete,
  onAbortDelete,
}) {
  const config = variantConfig[variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className={cn(
        'group flex flex-col bg-[#0a0710]/80 backdrop-blur-md rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] transition-all duration-300 h-[400px] relative',
        config.card
      )}
    >
      <AnimatePresence>
        {isDeleting && (
          <DeleteConfirmOverlay
            accentColor="#ff00a0"
            confirmLabel="Delete"
            onConfirm={onConfirmDelete}
            onAbort={onAbortDelete}
          />
        )}
      </AnimatePresence>

      {/* Image area */}
      <div
        className={cn(
          'h-44 flex flex-col items-center justify-center relative overflow-hidden',
          config.image
        )}
      >
        {/* Cyberpunk scanline overlay (always present) */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(transparent_0px,transparent_2px,rgba(255,255,255,0.08)_2px,rgba(255,255,255,0.08)_4px)] pointer-events-none" />
        
        {/* Accent radial overlay */}
        <div className={cn('absolute inset-0 opacity-20 pointer-events-none', config.overlay)} />

        <Icon
          size={72}
          className={cn(
            'opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_currentColor] transition-all duration-500 z-10',
            config.icon
          )}
        />

        {isAdmin && !isDeleting && (
          <AdminControls onEdit={onEdit} onDelete={onDelete} />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <p className={cn('font-mono text-[10px] uppercase tracking-widest mb-1', config.categoryText)}>
          {variant === 'gloves' && 'Combat Gear'}
          {variant === 'book' && 'Literature'}
          {variant === 'shoes' && 'Boxing Footwear'}
          {variant === 'magazine' && 'Periodical'}
        </p>
        
        <h3 className="text-lg font-bold text-white uppercase leading-tight line-clamp-2 mb-2">
          {title}
        </h3>

        {/* Variable middle content (badges, author, issue/stock, etc.) */}
        <div className="mt-auto">
          {middleContent}
        </div>

        {/* Price */}
        <div className="mt-2 pt-4 border-t border-[#ff00a0]/20 flex items-end justify-between">
          <span className="font-mono text-xs text-slate-400 uppercase">Price</span>
          <span className="text-2xl font-black text-white tabular-nums drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <span className="text-[#ff00a0] text-lg mr-1">$</span>
            {Number(price).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={onAddToCart}
        aria-label={`Add ${title} to cart`}
        className={cn(
          'w-full py-4 bg-gradient-to-r transition-all duration-300 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm',
          config.button
        )}
      >
        <ShoppingCart size={18} />
        {buttonLabel}
      </button>
    </motion.div>
  );
}