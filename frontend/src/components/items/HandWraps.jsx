import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { useHandWraps } from '../../hooks/useHandWraps';
import { useCart } from '../../hooks/useCart';
import { useItemEditor } from '../../hooks/useItemEditor';
import { Activity } from 'lucide-react';
import { toast } from 'sonner';
import EditModeCard from './shared/EditModeCard';
import ProductCard from './shared/ProductCard';
import { neonInput } from '../../utils/styles';

export default function HandWraps({ id, brand, price, size, elastic }) {
  const { isAdmin } = useAuth();
  const { updateHandWraps, deleteHandWraps } = useHandWraps();
  const { addToCart } = useCart();
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Force the incoming value into a strict boolean, handling 0/1, "true"/"false", and true/false
  const isElastic = elastic === true || elastic === 'true' || elastic === 1 || elastic === '1';

  const { isEditing, setIsEditing, tempData, setTempData, handleSave, handleCancel } =
    useItemEditor(
      { brand, price, size, elastic: isElastic }, // <-- Pass the strict boolean to initial state
      (data) => {
        updateHandWraps.mutate(
          { 
            id, 
            data: { 
              ...data, 
              price: parseFloat(data.price),
              elastic: Boolean(data.elastic) // 2. Guarantee we send a strict boolean to the API
            } 
          },
          { 
            onSuccess: () => toast.success('Updated', { style: { background: '#0a0710', color: '#ff5500', border: '1px solid #ff5500' }}),
            onError: (err) => toast.error('Update Failed', { description: err.message, style: { background: '#0a0710', color: '#ff0000', border: '1px solid #ff0000' }})
          }
        );
    });

  if (isEditing) {
    return (
      <EditModeCard onSave={handleSave} onCancel={handleCancel}>
        <input 
            type="text" 
            value={tempData.brand} 
            onChange={e => setTempData({ ...tempData, brand: e.target.value })} 
            className={neonInput} 
            placeholder="Brand" 
        />
        <div className="grid grid-cols-2 gap-3">
          <input 
              type="number" 
              step="0.01" 
              value={tempData.price} 
              onChange={e => setTempData({ ...tempData, price: e.target.value })} 
              className={neonInput} 
              placeholder="Price" 
          />
          <input 
              type="text" 
              value={tempData.size} 
              onChange={e => setTempData({ ...tempData, size: e.target.value })} 
              className={neonInput} 
              placeholder="Size (Length)" 
          />
        </div>
        
        {/* Fixed Checkbox Layout */}
        <div className="flex items-center gap-2 mt-2 px-1">
          <input
            type="checkbox"
            id={`elastic-${id}`}
            checked={tempData.elastic} // Now guaranteed to be a strict boolean
            onChange={e => setTempData({ ...tempData, elastic: e.target.checked })} 
            className="w-4 h-4 accent-[#00ffcc] bg-transparent border-[#00ffcc] cursor-pointer"
          />
          <label htmlFor={`elastic-${id}`} className="text-[10px] font-mono text-white uppercase tracking-widest cursor-pointer">
            Mexican Style (Elastic)
          </label>
        </div>
      </EditModeCard>
    );
  }

  return (
    <ProductCard
      id={id} variant="handwraps" title={brand} Icon={Activity} price={price} buttonLabel="Add to Cart"
      onAddToCart={() => addToCart.mutate(id)} isAdmin={isAdmin} onEdit={() => setIsEditing(true)}
      onDelete={() => setIsDeleting(true)} isDeleting={isDeleting}
      onConfirmDelete={() => deleteHandWraps.mutate(id)} onAbortDelete={() => setIsDeleting(false)}
      middleContent={
        <>
          <p className="font-mono text-[10px] text-slate-400 mt-auto">LENGTH: <span className="text-[#00ffcc]">{size}</span></p>
          {/* 3. Use the parsed boolean for accurate display logic */}
          <p className="font-mono text-[10px] text-slate-400 mb-2">STYLE: <span className="text-[#00ffcc]">{isElastic ? 'Mexican (Stretch)' : 'Traditional'}</span></p>
        </>
      }
    />
  );
}