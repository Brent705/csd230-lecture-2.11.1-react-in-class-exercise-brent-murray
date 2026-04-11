import { Edit2, Trash2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

export default function AdminControls({ onEdit, onDelete }) {
  return (
    <div className="absolute top-3 right-3 flex gap-2 z-20">
      <button
        onClick={onEdit}
        aria-label="Edit item"
        className={cn(
          'p-2 bg-[#0b0c10]/80 backdrop-blur border border-[#ffea00]/50 text-[#ffea00] hover:bg-[#ffea00] hover:text-black rounded-sm transition-colors'
        )}
      >
        <Edit2 size={14} />
      </button>
      <button
        onClick={onDelete}
        aria-label="Delete item"
        className={cn(
          'p-2 bg-[#0b0c10]/80 backdrop-blur border border-[#ff00a0]/50 text-[#ff00a0] hover:bg-[#ff00a0] hover:text-white rounded-sm transition-colors'
        )}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}