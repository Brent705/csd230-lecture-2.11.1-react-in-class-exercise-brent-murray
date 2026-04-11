import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { useShoes } from '../../hooks/useShoes';
import { useCart } from '../../hooks/useCart';
import { useItemEditor } from '../../hooks/useItemEditor';
import { GiRunningShoe } from 'react-icons/gi';
import { toast } from 'sonner';
import EditModeCard from './shared/EditModeCard';
import ProductCard from './shared/ProductCard';
import { neonInput } from '../../utils/styles';

export default function Shoes({ id, size, brand, price, highTop }) {
  const { isAdmin } = useAuth();
  const { updateShoes, deleteShoes } = useShoes();
  const { addToCart } = useCart();

  const [isDeleting, setIsDeleting] = useState(false);

  const { isEditing, setIsEditing, tempData, setTempData, handleSave, handleCancel } =
    useItemEditor({ size, brand, price, highTop }, (data) => {
      updateShoes.mutate(
        { id, data: { ...data, price: parseFloat(data.price) } },
        {
          onSuccess: () =>
            toast.success('Footwear Updated', {
              style: { background: '#0a0710', color: '#b026ff', border: '1px solid #b026ff' },
            }),
        }
      );
    });

  const executeDelete = () =>
    deleteShoes.mutate(id, {
      onSuccess: () =>
        toast.success('Record Deleted', {
          style: { background: '#0a0710', color: '#ff00a0', border: '1px solid #ff00a0' },
        }),
    });

  if (isEditing) {
    return (
      <EditModeCard onSave={handleSave} onCancel={handleCancel}>
        <div>
          <label className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest">Brand</label>
          <input
            type="text"
            value={tempData.brand}
            onChange={e => setTempData({ ...tempData, brand: e.target.value })}
            className={neonInput}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest">Size</label>
            <input
              type="text"
              value={tempData.size}
              onChange={e => setTempData({ ...tempData, size: e.target.value })}
              className={neonInput}
            />
          </div>
          <div>
            <label className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest">Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={tempData.price}
              onChange={e => setTempData({ ...tempData, price: e.target.value })}
              className={neonInput}
            />
          </div>
        </div>
        <div className="mt-2 p-2 border border-[#ffea00]/20 bg-[#ffea00]/5 flex items-center justify-between">
          <label
            htmlFor={`highTop-${id}`}
            className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest cursor-pointer"
          >
            High-Top Variant
          </label>
          <input
            id={`highTop-${id}`}
            type="checkbox"
            checked={tempData.highTop}
            onChange={e => setTempData({ ...tempData, highTop: e.target.checked })}
            className="w-4 h-4 accent-[#ffea00] cursor-pointer"
          />
        </div>
      </EditModeCard>
    );
  }

  return (
    <ProductCard
      id={id}
      variant="shoes"
      title={`${brand} Shoes`}
      Icon={GiRunningShoe}
      price={price}
      buttonLabel="Equip Footwear"
      onAddToCart={() => addToCart.mutate(id)}
      isAdmin={isAdmin}
      onEdit={() => setIsEditing(true)}
      onDelete={() => setIsDeleting(true)}
      isDeleting={isDeleting}
      onConfirmDelete={executeDelete}
      onAbortDelete={() => setIsDeleting(false)}
      middleContent={
        <div className="mt-auto mb-2 flex items-center gap-3">
          <span className="font-mono text-[10px] px-2 py-1 bg-[#b026ff]/10 text-[#b026ff] border border-[#b026ff]/30 rounded-sm">
            SIZE: {size}
          </span>
          <span className="font-mono text-[10px] px-2 py-1 bg-[#b026ff]/10 text-[#b026ff] border border-[#b026ff]/30 rounded-sm">
            {highTop ? 'HIGH-TOP' : 'LOW-TOP'}
          </span>
        </div>
      }
    />
  );
}