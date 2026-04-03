import { useState } from 'react';
import api from './api/axiosConfig';
import { useAuth } from './provider/AuthProvider';

function GlovesForm({ onGlovesAdded }) {
    const { isAdmin } = useAuth(); // Security check
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [weightOz, setWeightOz] = useState(12);

    // Hard block for non-admins navigating manually via URL
    if (!isAdmin) {
        return <h2 style={{ color: "#ff4444", textAlign: "center", marginTop: "2rem" }}>Access Denied: Admins Only</h2>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/gloves', {
                size,
                brand,
                price: parseFloat(price),
                weightOz: parseInt(weightOz, 10)
            });
            alert("Gloves Saved!");
            onGlovesAdded(res.data);
            setSize(''); setBrand(''); setPrice(0); setWeightOz(12);
        } catch (err) {
            console.error(err);
            alert("Failed to save gloves");
        }
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