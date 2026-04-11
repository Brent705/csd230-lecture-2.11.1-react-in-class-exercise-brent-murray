import { useState } from 'react';

export function useItemEditor(initialData, onSave) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(initialData);

    const handleSave = () => {
        onSave(tempData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempData(initialData); // reset to original
        setIsEditing(false);
    };

    return { isEditing, setIsEditing, tempData, setTempData, handleSave, handleCancel };
}