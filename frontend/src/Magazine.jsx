import { useState } from 'react';
import { useAuth } from './provider/AuthProvider'; // FIXED

function Magazine({ id, title, price, copies, orderQty, currentIssue, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();

    const formatIssueDate = (issue) => {
        if (!issue) return '';
        return typeof issue === 'string' ? issue.slice(0, 16) : '';
    };

    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempOrder, setTempOrder] = useState(orderQty);
    const [tempIssue, setTempIssue] = useState(formatIssueDate(currentIssue));

    const handleSave = () => {
        const updatedData = {
            id,
            title: tempTitle,
            price: parseFloat(tempPrice),
            copies: copies,
            orderQty: parseInt(tempOrder),
            currentIssue: tempIssue.length === 16 ? tempIssue + ":00" : tempIssue
        };
        onUpdate(id, updatedData);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="book-row editing">
                <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    style={{flex: 2}}
                    placeholder="Title"
                />
                <input
                    type="number"
                    step="0.01"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                    placeholder="Price"
                />
                <input
                    type="number"
                    value={tempOrder}
                    onChange={(e) => setTempOrder(e.target.value)}
                    placeholder="Order Qty"
                />
                <input
                    type="datetime-local"
                    value={tempIssue}
                    onChange={(e) => setTempIssue(e.target.value)}
                />
                <div className="book-actions">
                    <button onClick={handleSave} className="btn-save">Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="book-row">
            <div className="book-info">
                <h3>{title}</h3>
                <p>
                    <strong>Issue:</strong> {formatIssueDate(currentIssue).replace('T', ' ')} |
                    <strong>Price:</strong> ${Number(price).toFixed(2)} |
                    <strong>Order Qty:</strong> {orderQty}
                </p>
            </div>
            <div className="book-actions">
                <button
                    onClick={() => onAddToCart(id)}
                    style={{ backgroundColor: '#28a745', color: 'white' }}
                >
                    🛒 Add to Cart
                </button>

                {isAdmin && (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            style={{ backgroundColor: '#ffc107' }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(id)}
                            style={{ backgroundColor: '#ff4444', color: 'white' }}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Magazine;