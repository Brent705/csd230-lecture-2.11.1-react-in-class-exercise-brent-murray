import { Link } from 'react-router';

function Navbar() {
    const linkStyle = { color: 'white', textDecoration: 'none', fontWeight: 'bold' };

    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#222',
            color: 'white',
            marginBottom: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            borderRadius: '8px',
            justifyContent: 'center'
        }}>
            <Link to="/" style={linkStyle}>🏠 Home</Link>

            <Link to="/inventory" style={linkStyle}>📚 Books</Link>
            <Link to="/add" style={linkStyle}>➕ Add Book</Link>

            <Link to="/magazines" style={linkStyle}>📰 Magazines</Link>
            <Link to="/add-magazine" style={linkStyle}>➕ Add Magazine</Link>

            <Link to="/gloves" style={linkStyle}>🥊 Gloves</Link>
            <Link to="/add-gloves" style={linkStyle}>➕ Add Gloves</Link>

            <Link to="/shoes" style={linkStyle}>👟 Shoes</Link>
            <Link to="/add-shoes" style={linkStyle}>➕ Add Shoes</Link>
        </nav>
    );
}

export default Navbar;