import { useState } from 'react';

function MagazineForm({ onMagazineAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [orderQty, setOrderQty] = useState(0);
    const [currentIssue, setCurrentIssue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Spring Boot LocalDateTime expects seconds.
        // If the HTML input gives "2024-03-10T10:15" (16 chars), we append ":00"
        let formattedIssue = currentIssue;
        if (formattedIssue && formattedIssue.length === 16) {
            formattedIssue += ':00';
        }

        const newMagazine = {
            title,
            price: parseFloat(price),
            orderQty: parseInt(orderQty, 10),
            currentIssue: formattedIssue,
            copies: 1 // Inherited from PublicationEntity
        };

        fetch('/api/magazines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMagazine),
        })
            .then(response => response.json())
            .then(savedMagazine => {
                alert("Magazine Saved!");
                onMagazineAdded(savedMagazine);
                // Clear the form
                setTitle('');
                setPrice(0);
                setOrderQty(0);
                setCurrentIssue('');
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid #aa3bff', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>Add New Magazine</h3>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="number" placeholder="Price" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <input type="number" placeholder="Order Quantity" value={orderQty} onChange={(e) => setOrderQty(e.target.value)} required />
            <input type="datetime-local" value={currentIssue} onChange={(e) => setCurrentIssue(e.target.value)} required />
            <button type="submit" style={{ marginTop: '10px' }}>Save to Database</button>
        </form>
    );
}

export default MagazineForm;