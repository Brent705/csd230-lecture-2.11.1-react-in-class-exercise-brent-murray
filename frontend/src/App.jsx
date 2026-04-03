import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import MagazineForm from './MagazineForm'
import Gloves from './Gloves'
import GlovesForm from './GlovesForm'
import Shoes from './Shoes'
import ShoesForm from './ShoesForm'
import './App.css'

function App() {
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [gloves, setGloves] = useState([]);
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/books').then(res => res.json()),
            fetch('/api/magazines').then(res => res.json()),
            fetch('/api/gloves').then(res => res.json()),
            fetch('/api/shoes').then(res => res.json())
        ]).then(([booksData, magazinesData, glovesData, shoesData]) => {
            setBooks(booksData);
            setMagazines(magazinesData);
            setGloves(glovesData);
            setShoes(shoesData);
            setLoading(false);
        });
    }, []);

    // --- Book Handlers ---
    const handleAddBook = (n) => setBooks([...books, n]);
    const handleDeleteBook = (id) => {
        if (!window.confirm("Delete this book?")) return;
        fetch(`/api/books/${id}`, { method: 'DELETE' }).then(res => { if (res.ok) setBooks(books.filter(b => b.id !== id)); });
    };
    const handleUpdateBook = (id, data) => {
        fetch(`/api/books/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json()).then(s => setBooks(books.map(b => (b.id === id ? s : b))));
    };

    // --- Magazine Handlers ---
    const handleAddMagazine = (n) => setMagazines([...magazines, n]);
    const handleDeleteMagazine = (id) => {
        if (!window.confirm("Delete this magazine?")) return;
        fetch(`/api/magazines/${id}`, { method: 'DELETE' }).then(res => { if (res.ok) setMagazines(magazines.filter(m => m.id !== id)); });
    };
    const handleUpdateMagazine = (id, data) => {
        if (data.currentIssue && data.currentIssue.length === 16) data.currentIssue += ':00';
        fetch(`/api/magazines/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json()).then(s => setMagazines(magazines.map(m => (m.id === id ? s : m))));
    };

    // --- Gloves Handlers ---
    const handleAddGloves = (n) => setGloves([...gloves, n]);
    const handleDeleteGloves = (id) => {
        if (!window.confirm("Delete these gloves?")) return;
        fetch(`/api/gloves/${id}`, { method: 'DELETE' }).then(res => { if (res.ok) setGloves(gloves.filter(g => g.id !== id)); });
    };
    const handleUpdateGloves = (id, data) => {
        fetch(`/api/gloves/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json()).then(s => setGloves(gloves.map(g => (g.id === id ? s : g))));
    };

    // --- Shoes Handlers ---
    const handleAddShoes = (n) => setShoes([...shoes, n]);
    const handleDeleteShoes = (id) => {
        if (!window.confirm("Delete these shoes?")) return;
        fetch(`/api/shoes/${id}`, { method: 'DELETE' }).then(res => { if (res.ok) setShoes(shoes.filter(s => s.id !== id)); });
    };
    const handleUpdateShoes = (id, data) => {
        fetch(`/api/shoes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json()).then(s => setShoes(shoes.map(sh => (sh.id === id ? s : sh))));
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="app-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                {/* Book Routes */}
                <Route path="/inventory" element={<div className="book-list"><h1>Books</h1>{books.map(b => <Book key={b.id} {...b} onDelete={handleDeleteBook} onUpdate={handleUpdateBook} />)}</div>} />
                <Route path="/add" element={<div><h1>Add Book</h1><BookForm onBookAdded={handleAddBook} /></div>} />

                {/* Magazine Routes */}
                <Route path="/magazines" element={<div className="magazine-list"><h1>Magazines</h1>{magazines.map(m => <Magazine key={m.id} {...m} onDelete={handleDeleteMagazine} onUpdate={handleUpdateMagazine} />)}</div>} />
                <Route path="/add-magazine" element={<div><h1>Add Magazine</h1><MagazineForm onMagazineAdded={handleAddMagazine} /></div>} />

                {/* Gloves Routes */}
                <Route path="/gloves" element={<div className="gloves-list"><h1>Boxing Gloves</h1>{gloves.map(g => <Gloves key={g.id} {...g} onDelete={handleDeleteGloves} onUpdate={handleUpdateGloves} />)}</div>} />
                <Route path="/add-gloves" element={<div><h1>Add Gloves</h1><GlovesForm onGlovesAdded={handleAddGloves} /></div>} />

                {/* Shoes Routes */}
                <Route path="/shoes" element={<div className="shoes-list"><h1>Boxing Shoes</h1>{shoes.map(s => <Shoes key={s.id} {...s} onDelete={handleDeleteShoes} onUpdate={handleUpdateShoes} />)}</div>} />
                <Route path="/add-shoes" element={<div><h1>Add Shoes</h1><ShoesForm onShoesAdded={handleAddShoes} /></div>} />
            </Routes>
        </div>
    )
}

export default App