import { useMemo } from 'react';
import { toast } from 'sonner';
import { useCart } from './useCart';

export function useCartLogic() {
    const { data: cart, isLoading, removeFromCart } = useCart();

    const getItemName = (p) => {
        let name = p.title || p.brand || p.description || 'Unknown Item';
        return name.length > 65 ? name.slice(0, 62) + '...' : name;
    };

    const getQuantity = (p) => (typeof p?.quantity === 'number' ? p.quantity : 1);

    const cartTotal = useMemo(() => {
        if (!cart?.products?.length) return 0;
        return cart.products.reduce((sum, p) => {
            return sum + (p.price || 0) * getQuantity(p);
        }, 0);
    }, [cart]);

    const itemCount = cart?.products?.length || 0;

    const handleCheckout = () => {
        toast.success("PAYMENT AUTHORIZED", {
            description: "Initiating receipt print protocol...",
            style: { background: '#0a0710', color: '#00f0ff', border: '1px solid #00f0ff' }
        });

        setTimeout(async () => {
            window.print(); 
            
            if (cart?.products?.length > 0) {
                try {
                    await Promise.all(cart.products.map(p => removeFromCart.mutateAsync(p.id)));
                } catch (error) {
                    console.error("Cart clear failed:", error);
                }
            }
            window.location.href = '/'; 
        }, 600);
    };

    return {
        cart,
        isLoading,
        removeFromCart,
        cartTotal,
        itemCount,
        getItemName,
        getQuantity,
        handleCheckout
    };
}