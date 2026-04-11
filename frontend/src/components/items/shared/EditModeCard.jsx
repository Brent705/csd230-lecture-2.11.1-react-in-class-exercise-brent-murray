import { motion } from 'framer-motion';
import { Edit2, Save, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

export default function EditModeCard({ children, onSave, onCancel }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col bg-[#0a0710]/95 backdrop-blur-md border border-[#ffea00] rounded-sm overflow-hidden shadow-[0_0_20px_rgba(255,234,0,0.15)] h-[400px]"
    >
      {/* Banner */}
      <div className="bg-[#ffea00] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 flex items-center justify-between shrink-0">
        <span>ADMIN EDIT MODE</span>
        <Edit2 size={14} />
      </div>

      {/* Fields */}
      <div className="p-4 flex-1 flex flex-col justify-center gap-3 overflow-y-auto">
        {children}
      </div>

      {/* Footer */}
      <div className="flex border-t border-[#ffea00]/30 shrink-0">
        <button
          onClick={onCancel}
          className={cn(
            'flex-1 py-4 bg-transparent text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex justify-center items-center gap-2 font-mono text-xs uppercase tracking-widest'
          )}
        >
          <X size={16} /> Cancel
        </button>
        <button
          onClick={onSave}
          className={cn(
            'flex-1 py-4 bg-[#ffea00]/10 text-[#ffea00] hover:bg-[#ffea00] hover:text-black transition-colors flex justify-center items-center gap-2 font-bold font-mono text-xs uppercase tracking-widest'
          )}
        >
          <Save size={16} /> Save
        </button>
      </div>
    </motion.div>
  );
}