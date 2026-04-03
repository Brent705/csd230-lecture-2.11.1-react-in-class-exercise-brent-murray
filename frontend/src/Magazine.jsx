import { useState } from 'react';

function Magazine({ id, title, price, orderQty, currentIssue, onDelete, onUpdate }) {
    // 1. Local state for "Edit Mode"
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempOrderQty, setTempOrderQty] = useState(orderQty || 0);

    // HTML datetime-local requires YYYY-MM-DDTHH:mm (16 chars).
    // Spring Boot often sends seconds (YYYY-MM-DDTHH:mm:ss).
    const formatForInput = (dateStr) => dateStr ? dateStr.substring(0, 16) : '';
    const [tempCurrentIssue, setTempCurrentIssue] = useState(formatForInput(currentIssue));

    // 2. Handle Save
    const handleSave = () => {
        const updatedMagazine = {
            id,
            title: tempTitle,
            price: parseFloat(tempPrice),
            orderQty: parseInt(tempOrderQty, 10),
            currentIssue: tempCurrentIssue,
            copies: 1 // Placeholder to inherit from PublicationEntity requirements
        };

        onUpdate(id, updatedMagazine);
        setIsEditing(false);
    };

    // 3. Conditional Rendering: EDIT MODE
    if (isEditing) {
        return (
            <div className="magazine-row editing" style={{ border: '2px solid #aa3bff', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', gap: '10px', backgroundColor: '#f4eaff', flexWrap: 'wrap' }}>
                <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} style={{ flex: 2 }} />
                <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} style={{ width: '80px' }} />
                <input type="number" value={tempOrderQty} onChange={(e) => setTempOrderQty(e.target.value)} style={{ width: '80px' }} />
                <input type="datetime-local" value={tempCurrentIssue} onChange={(e) => setTempCurrentIssue(e.target.value)} />

                <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: 'white' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', color: 'white' }}>Cancel</button>
            </div>
        );
    }

    // 4. Conditional Rendering: VIEW MODE
    const displayDate = currentIssue ? new Date(currentIssue).toLocaleString() : 'N/A';

    return (
        <div className="magazine-row" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div className="magazine-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{title}</h3>
                <p style={{ margin: '0' }}>
                    <strong>Price:</strong> ${price ? price.toFixed(2) : '0.00'} |
                    <strong> Order Qty:</strong> {orderQty} |
                    <strong> Current Issue:</strong> {displayDate}
                </p>
            </div>

            <div className="magazine-actions">
                <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107', marginRight: '5px' }}>Edit</button>
                <button onClick={() => onDelete(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>Delete</button>
            </div>
        </div>
    );
}

export default Magazine;