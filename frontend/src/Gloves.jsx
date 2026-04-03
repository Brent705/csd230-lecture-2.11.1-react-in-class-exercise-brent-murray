import { useState } from 'react';
import { useAuth } from './provider/AuthProvider';

function Gloves({ id, size, brand, price, weightOz, onDelete, onUpdate }) {
    const { isAdmin } = useAuth(); // Security check
    const [isEditing, setIsEditing] = useState(false);

    const [tempSize, setTempSize] = useState(size);
    const [tempBrand, setTempBrand] = useState(brand);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempWeightOz, setTempWeightOz] = useState(weightOz);

    const handleSave = () => {
        onUpdate(id, { size: tempSize, brand: tempBrand, price: parseFloat(tempPrice), weightOz: parseInt(tempWeightOz, 10) });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div style={{ border: '2px solid #ff4444', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', gap: '10px', backgroundColor: '#ffe5e5', color: '#000' }}>
                <input type="text" value={tempBrand} onChange={e => setTempBrand(e.target.value)} style={{ flex: 2 }} />
                <input type="text" value={tempSize} onChange={e => setTempSize(e.target.value)} style={{ width: '80px' }} />
                <input type="number" value={tempPrice} onChange={e => setTempPrice(e.target.value)} style={{ width: '80px' }} />
                <input type="number" value={tempWeightOz} onChange={e => setTempWeightOz(e.target.value)} style={{ width: '80px' }} />
                <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: 'white' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', color: 'white' }}>Cancel</button>
            </div>
        );
    }

    return (
        <div style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9f9f9', color: '#000' }}>
            <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{brand} Gloves</h3>
                <p style={{ margin: '0' }}><strong>Size:</strong> {size} | <strong>Weight:</strong> {weightOz} oz | <strong>Price:</strong> ${price?.toFixed(2)}</p>
            </div>
            <div>
                {/* Only render these if the user is an Admin */}
                {isAdmin && (
                    <>
                        <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107', marginRight: '5px' }}>Edit</button>
                        <button onClick={() => onDelete(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Gloves;