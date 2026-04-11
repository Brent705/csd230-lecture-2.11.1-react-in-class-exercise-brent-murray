import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../../utils/cn';

export default function DeleteConfirmOverlay({
  accentColor = '#ff00a0',
  confirmLabel = 'Delete',
  onConfirm,
  onAbort,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'absolute inset-0 z-50 bg-[#0a0710]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center'
      )}
      style={{ border: `2px solid ${accentColor}` }}
    >
      <AlertTriangle
        className="w-12 h-12 mb-4 animate-pulse"
        style={{ color: accentColor }}
      />
      <h4
        className="text-xl font-black uppercase tracking-widest mb-2"
        style={{ color: accentColor }}
      >
        Confirm Delete
      </h4>
      <p className="text-[10px] font-mono text-slate-300 mb-8 uppercase tracking-wider leading-relaxed">
        Warning: This action will permanently delete this record from the grid.
      </p>
      <div className="flex gap-4 w-full">
        <button
          onClick={onAbort}
          className={cn(
            'flex-1 py-3 border border-slate-600 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-mono text-xs uppercase tracking-widest'
          )}
        >
          Abort
        </button>
        <button
          onClick={onConfirm}
          className={cn(
            'flex-1 py-3 font-bold font-mono text-xs uppercase tracking-widest transition-colors'
          )}
          style={{
            backgroundColor: `color-mix(in srgb, ${accentColor} 20%, transparent)`,
            color: accentColor,
            border: `1px solid ${accentColor}`,
            boxShadow: `0 0 15px color-mix(in srgb, ${accentColor} 40%, transparent)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = accentColor;
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${accentColor} 20%, transparent)`;
            e.currentTarget.style.color = accentColor;
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </motion.div>
  );
}