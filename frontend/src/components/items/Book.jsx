import { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../provider/AuthProvider';
import { useItemEditor } from '../../hooks/useItemEditor';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import EditModeCard from './shared/EditModeCard';
import ProductCard from './shared/ProductCard';
import { neonInput } from '../../utils/styles';

export default function Book({ id, title, author, price }) {
  const { isAdmin } = useAuth();
  const { updateBook, deleteBook } = useBooks();
  const { addToCart } = useCart();

  const [isDeleting, setIsDeleting] = useState(false);

  const { isEditing, setIsEditing, tempData, setTempData, handleSave, handleCancel } =
    useItemEditor({ title, author, price }, (data) => {
      updateBook.mutate(
        { id, data: { ...data, copies: 10 } },
        {
          onSuccess: () =>
            toast.success('Book Updated', {
              style: { background: '#0a0710', color: '#00f0ff', border: '1px solid #00f0ff' },
            }),
        }
      );
    });

  const executeDelete = () =>
    deleteBook.mutate(id, {
      onSuccess: () =>
        toast.success('Record Deleted', {
          style: { background: '#0a0710', color: '#ff00a0', border: '1px solid #ff00a0' },
        }),
    });

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
        <div>
          <label className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest">Author</label>
          <input
            type="text"
            value={tempData.author}
            onChange={e => setTempData({ ...tempData, author: e.target.value })}
            className={neonInput}
          />
        </div>
        <div>
          <label className="text-[10px] font-mono text-[#ffea00] uppercase tracking-widest">Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={tempData.price}
            onChange={e => setTempData({ ...tempData, price: parseFloat(e.target.value) })}
            className={neonInput}
          />
        </div>
      </EditModeCard>
    );
  }

  return (
    <ProductCard
      id={id}
      variant="book"
      title={title}
      Icon={BookOpen}
      price={price}
      buttonLabel="Add to Cart"
      onAddToCart={() => addToCart.mutate(id)}
      isAdmin={isAdmin}
      onEdit={() => setIsEditing(true)}
      onDelete={() => setIsDeleting(true)}
      isDeleting={isDeleting}
      onConfirmDelete={executeDelete}
      onAbortDelete={() => setIsDeleting(false)}
      middleContent={
        <p className="font-mono text-xs text-[#00f0ff] opacity-80 mt-auto">{author}</p>
      }
    />
  );
}