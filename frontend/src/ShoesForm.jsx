import { useState } from 'react';

function ShoesForm({ onShoesAdded }) {
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [highTop, setHighTop] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/shoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ size, brand, price: parseFloat(price), highTop }),
        })
            .then(res => res.json())
            .then(saved => {
                alert("Shoes Saved!");
                onShoesAdded(saved);
                setSize(''); setBrand(''); setPrice(0); setHighTop(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid #28a745', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>Add New Shoes</h3>
            <input type="text" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} required />
            <input type="text" placeholder="Size" value={size} onChange={e => setSize(e.target.value)} required />
            <input type="number" placeholder="Price" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
            <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <input type="checkbox" checked={highTop} onChange={e => setHighTop(e.target.checked)} />
                Is High-Top?
            </label>
            <button type="submit">Save Shoes</button>
        </form>
    );
}

export default ShoesForm;