import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { useGloves } from '../../hooks/useGloves';
import { useCart } from '../../hooks/useCart';
import { useItemEditor } from '../../hooks/useItemEditor';
import { GiBoxingGlove } from 'react-icons/gi';
import { toast } from 'sonner';
import EditModeCard from './shared/EditModeCard';
import ProductCard from './shared/ProductCard';
import { neonInput } from '../../utils/styles';

export default function Gloves({ id, size, brand, price, weightOz }) {
  const { isAdmin } = useAuth();
  const { updateGloves, deleteGloves } = useGloves();
  const { addToCart } = useCart();

  const [isDeleting, setIsDeleting] = useState(false);

  const { isEditing, setIsEditing, tempData, setTempData, handleSave, handleCancel } =
    useItemEditor({ size, brand, price, weightOz }, (data) => {
      updateGloves.mutate(
        { id, data: { ...data, price: parseFloat(data.price), weightOz: parseInt(data.weightOz, 10) } },
        {
          onSuccess: () =>
            toast.success('Equipment Updated', {
              style: { background: '#0a0710', color: '#ff00a0', border: '1px solid #ff00a0' },
            }),
        }
      );
    });

  const executeDelete = () =>
    deleteGloves.mutate(id, {
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
            <label className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest">Weight (oz)</label>
            <input
              type="number"
              value={tempData.weightOz}
              onChange={e => setTempData({ ...tempData, weightOz: e.target.value })}
              className={neonInput}
            />
          </div>
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
      </EditModeCard>
    );
  }

  return (
    <ProductCard
      id={id}
      variant="gloves"
      title={`${brand} Gloves`}
      Icon={GiBoxingGlove}
      price={price}
      buttonLabel="Equip Gear"
      onAddToCart={() => addToCart.mutate(id)}
      isAdmin={isAdmin}
      onEdit={() => setIsEditing(true)}
      onDelete={() => setIsDeleting(true)}
      isDeleting={isDeleting}
      onConfirmDelete={executeDelete}
      onAbortDelete={() => setIsDeleting(false)}
      middleContent={
        <div className="mt-auto mb-2 flex items-center gap-3">
          <span className="font-mono text-[10px] px-2 py-1 bg-[#ff00a0]/10 text-[#ff00a0] border border-[#ff00a0]/30 rounded-sm">
            SIZE: {size}
          </span>
          <span className="font-mono text-[10px] px-2 py-1 bg-[#ff00a0]/10 text-[#ff00a0] border border-[#ff00a0]/30 rounded-sm">
            {weightOz} OZ
          </span>
        </div>
      }
    />
  );
}