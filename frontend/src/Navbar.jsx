import { Link } from 'react-router';
import { useAuth } from './provider/AuthProvider';

function Navbar({ cartCount }) {
    const { isAdmin } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/">🏠 Home</Link>
            <Link to="/inventory">📚 Books</Link>
            <Link to="/magazines">📰 Magazines</Link>
            <Link to="/gloves">🥊 Gloves</Link>
            <Link to="/shoes">👟 Shoes</Link>
            <Link to="/cart">🛒 Cart ({cartCount})</Link>

            {/* ONLY Admins see the Add options */}
            {isAdmin && (
                <>
                    <Link to="/add">➕ Add Book</Link>
                    <Link to="/add-magazine">➕ Add Magazine</Link>
                    <Link to="/add-gloves">➕ Add Gloves</Link>
                    <Link to="/add-shoes">➕ Add Shoes</Link>
                </>
            )}

            <Link to="/logout" style={{ color: "#ff4444", marginLeft: "auto" }}>🚪 Logout</Link>
        </nav>
    );
}
export default Navbar;