import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { useMagazines } from '../../hooks/useMagazines';
import { useCart } from '../../hooks/useCart';
import { formatIssueDateForInput, formatIssueDateForBackend } from '../../utils/dateUtils';
import { useItemEditor } from '../../hooks/useItemEditor';
import { Newspaper } from 'lucide-react';
import { toast } from 'sonner';
import EditModeCard from './shared/EditModeCard';
import ProductCard from './shared/ProductCard';
import { neonInput } from '../../utils/styles';

export default function Magazine({ id, title, price, copies, orderQty, currentIssue }) {
  const { isAdmin } = useAuth();
  const { updateMagazine, deleteMagazine } = useMagazines();
  const { addToCart } = useCart();

  const [isDeleting, setIsDeleting] = useState(false);

  const { isEditing, setIsEditing, tempData, setTempData, handleSave, handleCancel } =
    useItemEditor(
      { title, price, orderQty, currentIssue: formatIssueDateForInput(currentIssue) },
      (data) => {
        updateMagazine.mutate(
          {
            id,
            data: {
              ...data,
              price: parseFloat(data.price),
              orderQty: parseInt(data.orderQty, 10),
              copies,
              currentIssue: formatIssueDateForBackend(data.currentIssue),
            },
          },
          {
            onSuccess: () =>
              toast.success('Magazine Updated', {
                style: { background: '#0a0710', color: '#00f0ff', border: '1px solid #00f0ff' },
              }),
          }
        );
      }
    );

  const executeDelete = () =>
    deleteMagazine.mutate(id, {
      onSuccess: () =>
        toast.success('Record Deleted', {
          style: { background: '#0a0710', color: '#ff00a0', border: '1px solid #ff00a0' },
        }),
    });

  const displayDate = currentIssue ? formatIssueDateForInput(currentIssue).replace('T', ' ') : 'N/A';

  if (isEditing) {
    return (
      <EditModeCard onSave={handleSave} onCancel={handleCancel}>
        <div>
          <label className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest">Title</label>
          <input
            type="text"
            value={tempData.title}
            onChange={e => setTempData({ ...tempData, title: e.target.value })}
            className={neonInput}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
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
          <div>
            <label className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest">Order Qty</label>
            <input
              type="number"
              value={tempData.orderQty}
              onChange={e => setTempData({ ...tempData, orderQty: e.target.value })}
              className={neonInput}
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest">Issue Date</label>
          <input
            type="datetime-local"
            value={tempData.currentIssue}
            onChange={e => setTempData({ ...tempData, currentIssue: e.target.value })}
            className={neonInput}
          />
        </div>
      </EditModeCard>
    );
  }

  return (
    <ProductCard
      id={id}
      variant="magazine"
      title={title}
      Icon={Newspaper}
      price={price}
      buttonLabel="Subscribe"
      onAddToCart={() => addToCart.mutate(id)}
      isAdmin={isAdmin}
      onEdit={() => setIsEditing(true)}
      onDelete={() => setIsDeleting(true)}
      isDeleting={isDeleting}
      onConfirmDelete={executeDelete}
      onAbortDelete={() => setIsDeleting(false)}
      middleContent={
        <>
          <p className="font-mono text-[10px] text-slate-400 mt-auto mb-1">
            ISSUE: <span className="text-[#00f0ff]">{displayDate}</span>
          </p>
          <p className="font-mono text-[10px] text-slate-400 mb-2">
            STOCK: <span className="text-[#00f0ff]">{orderQty}</span>
          </p>
        </>
      }
    />
  );
}