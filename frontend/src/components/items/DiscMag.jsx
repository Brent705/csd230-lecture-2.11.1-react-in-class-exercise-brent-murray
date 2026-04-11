import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { useDiscMags } from '../../hooks/useDiscMags';
import { useCart } from '../../hooks/useCart';
import { formatIssueDateForInput, formatIssueDateForBackend } from '../../utils/dateUtils';
import { useItemEditor } from '../../hooks/useItemEditor';
import { Disc } from 'lucide-react';
import { toast } from 'sonner';
import EditModeCard from './shared/EditModeCard';
import ProductCard from './shared/ProductCard';
import { neonInput } from '../../utils/styles';

export default function DiscMag({ id, title, price, copies, orderQty, currentIssue, hasDisc }) {
  const { isAdmin } = useAuth();
  const { updateDiscMag, deleteDiscMag } = useDiscMags();
  const { addToCart } = useCart();

  const [isDeleting, setIsDeleting] = useState(false);

  const { isEditing, setIsEditing, tempData, setTempData, handleSave, handleCancel } =
    useItemEditor(
      { title, price, orderQty, currentIssue: formatIssueDateForInput(currentIssue), hasDisc },
      (data) => {
        updateDiscMag.mutate(
          {
            id,
            data: {
              ...data,
              price: parseFloat(data.price),
              orderQty: parseInt(data.orderQty, 10),
              copies,
              currentIssue: formatIssueDateForBackend(data.currentIssue),
              hasDisc: data.hasDisc
            },
          },
          {
            onSuccess: () =>
              toast.success('DiscMag Updated', {
                style: { background: '#0a0710', color: '#39ff14', border: '1px solid #39ff14' },
              }),
          }
        );
      }
    );

  const executeDelete = () =>
    deleteDiscMag.mutate(id, {
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
        <div className="flex items-center gap-2 mt-1 px-1">
          <input
            type="checkbox"
            id={`hasDisc-${id}`}
            checked={tempData.hasDisc}
            onChange={e => setTempData({ ...tempData, hasDisc: e.target.checked })}
            className="w-4 h-4 accent-[#ffea00] bg-transparent border-[#ffea00]"
          />
          <label htmlFor={`hasDisc-${id}`} className="text-[10px] font-mono text-white uppercase tracking-widest cursor-pointer">
            Includes Disc Media
          </label>
        </div>
      </EditModeCard>
    );
  }

  return (
    <ProductCard
      id={id}
      variant="discmag"
      title={title}
      Icon={Disc}
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
            ISSUE: <span className="text-[#39ff14]">{displayDate}</span>
          </p>
          <div className="flex justify-between items-center mb-2">
            <p className="font-mono text-[10px] text-slate-400">
              STOCK: <span className="text-[#39ff14]">{orderQty}</span>
            </p>
            {hasDisc && (
              <span className="px-2 py-0.5 bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] text-[9px] font-mono uppercase tracking-widest rounded-sm">
                + DISC
              </span>
            )}
          </div>
        </>
      }
    />
  );
}