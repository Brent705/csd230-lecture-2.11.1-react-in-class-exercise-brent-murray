export default function CartReceipt({ cart, cartTotal, getItemName, getQuantity }) {
    return (
        <div className="hidden print:block max-w-2xl mx-auto p-8 font-mono text-black bg-white">
            <div className="text-center mb-8 border-b-2 border-black pb-4">
                <h1 className="text-3xl font-black tracking-widest uppercase">MERCHANT NODE</h1>
                <p className="text-sm mt-2">OFFICIAL TRANSACTION RECEIPT</p>
                <p className="text-xs mt-1 text-gray-500">
                    {new Date().toLocaleString()} // TX-ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
            </div>

            <div className="space-y-4 mb-8">
                {cart?.products?.map(p => {
                    const qty = getQuantity(p);
                    return (
                        <div key={p.id} className="flex justify-between items-start text-sm">
                            <div className="flex gap-4">
                                <span className="font-bold">{qty}x</span>
                                <span className="max-w-[250px]">{getItemName(p)}</span>
                            </div>
                            <span className="tabular-nums">${((p.price || 0) * qty).toFixed(2)}</span>
                        </div>
                    );
                })}
            </div>

            <div className="border-t-2 border-black pt-4 flex justify-between items-center text-xl font-black">
                <span>TOTAL</span>
                <span>${cartTotal.toFixed(2)}</span>
            </div>
        </div>
    );
}