import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router'; 
import { useCart } from '../hooks/useCart';
import { useAuth } from '../provider/AuthProvider';

export function useNavbarLogic() {
    const { isAdmin } = useAuth();
    const { data: cart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCmdkOpen, setIsCmdkOpen] = useState(false);

    const cartCount = cart?.products?.length || 0;

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsCmdkOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMenuOpen]);

    // Helper for CMDK
    const runCommand = (path) => {
        setIsCmdkOpen(false);
        navigate(path);
    };

    return {
        isAdmin,
        cartCount,
        isMenuOpen,
        setIsMenuOpen,
        isCmdkOpen,
        setIsCmdkOpen,
        runCommand,
    };
}