import { useState } from 'react';

function GlovesForm({ onGlovesAdded }) {
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [weightOz, setWeightOz] = useState(12);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/gloves', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ size, brand, price: parseFloat(price), weightOz: parseInt(weightOz, 10) }),
        })
            .then(res => res.json())
            .then(saved => {
                alert("Gloves Saved!");
                onGlovesAdded(saved);
                setSize(''); setBrand(''); setPrice(0); setWeightOz(12);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid #ff4444', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>Add New Gloves</h3>
            <input type="text" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} required />
            <input type="text" placeholder="Size (S, M, L, XL)" value={size} onChange={e => setSize(e.target.value)} required />
            <input type="number" placeholder="Price" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
            <input type="number" placeholder="Weight (oz)" value={weightOz} onChange={e => setWeightOz(e.target.value)} required />
            <button type="submit">Save Gloves</button>
        </form>
    );
}

export default GlovesForm;