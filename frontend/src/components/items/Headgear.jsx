import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { useHeadgear } from '../../hooks/useHeadgear';
import { useCart } from '../../hooks/useCart';
import { useItemEditor } from '../../hooks/useItemEditor';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';
import EditModeCard from './shared/EditModeCard';
import ProductCard from './shared/ProductCard';
import { neonInput } from '../../utils/styles';

export default function Headgear({ id, brand, price, size, type }) {
  const { isAdmin } = useAuth();
  const { updateHeadgear, deleteHeadgear } = useHeadgear();
  const { addToCart } = useCart();
  const [isDeleting, setIsDeleting] = useState(false);

  const { isEditing, setIsEditing, tempData, setTempData, handleSave, handleCancel } =
    useItemEditor({ brand, price, size, type }, (data) => {
        updateHeadgear.mutate(
          { id, data: { ...data, price: parseFloat(data.price) } },
          { onSuccess: () => toast.success('Updated', { style: { background: '#0a0710', color: '#ff5500', border: '1px solid #ff5500' }}) }
        );
    });

  if (isEditing) {
    return (
      <EditModeCard onSave={handleSave} onCancel={handleCancel}>
        <input type="text" value={tempData.brand} onChange={e => setTempData({ ...tempData, brand: e.target.value })} className={neonInput} placeholder="Brand" />
        <input type="text" value={tempData.type} onChange={e => setTempData({ ...tempData, type: e.target.value })} className={neonInput} placeholder="Type" />
        <div className="grid grid-cols-2 gap-3">
          <input type="number" step="0.01" value={tempData.price} onChange={e => setTempData({ ...tempData, price: e.target.value })} className={neonInput} placeholder="Price" />
          <input type="text" value={tempData.size} onChange={e => setTempData({ ...tempData, size: e.target.value })} className={neonInput} placeholder="Size" />
        </div>
      </EditModeCard>
    );
  }

  return (
    <ProductCard
      id={id} variant="headgear" title={brand} Icon={Shield} price={price} buttonLabel="Add to Cart"
      onAddToCart={() => addToCart.mutate(id)} isAdmin={isAdmin} onEdit={() => setIsEditing(true)}
      onDelete={() => setIsDeleting(true)} isDeleting={isDeleting}
      onConfirmDelete={() => deleteHeadgear.mutate(id)} onAbortDelete={() => setIsDeleting(false)}
      middleContent={
        <>
          <p className="font-mono text-[10px] text-slate-400 mt-auto">TYPE: <span className="text-[#ff5500]">{type}</span></p>
          <p className="font-mono text-[10px] text-slate-400 mb-2">SIZE: <span className="text-[#ff5500]">{size}</span></p>
        </>
      }
    />
  );
}