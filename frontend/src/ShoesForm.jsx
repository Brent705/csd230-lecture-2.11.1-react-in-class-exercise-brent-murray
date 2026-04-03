import { useState } from 'react';
import api from './api/axiosConfig';
import { useAuth } from './provider/AuthProvider';

function ShoesForm({ onShoesAdded }) {
    const { isAdmin } = useAuth(); // Security check
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [highTop, setHighTop] = useState(false);

    // Hard block for non-admins navigating manually via URL
    if (!isAdmin) {
        return <h2 style={{ color: "#ff4444", textAlign: "center", marginTop: "2rem" }}>Access Denied: Admins Only</h2>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/shoes', {
                size,
                brand,
                price: parseFloat(price),
                highTop
            });
            alert("Shoes Saved!");
            onShoesAdded(res.data);
            setSize(''); setBrand(''); setPrice(0); setHighTop(false);
        } catch (err) {
            console.error(err);
            alert("Failed to save shoes");
        }
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