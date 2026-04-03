import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Navbar from './Navbar';
import Home from './Home';
import Book from './Book';
import BookForm from './BookForm';
import Magazine from './Magazine';
import MagazineForm from './MagazineForm';
import Gloves from './Gloves';
import GlovesForm from './GlovesForm';
import Shoes from './Shoes';
import ShoesForm from './ShoesForm';
import Cart from './Cart';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useAuth } from './provider/AuthProvider';
import api from './api/axiosConfig';

import './App.css';

function App() {
    const { token } = useAuth();

    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [gloves, setGloves] = useState([]);
    const [shoes, setShoes] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                const [
                    booksRes,
                    magsRes,
                    glovesRes,
                    shoesRes,
                    cartRes
                ] = await Promise.all([
                    api.get('/books'),
                    api.get('/magazines'),
                    api.get('/gloves'),
                    api.get('/shoes'),
                    api.get('/cart')
                ]);

                setBooks(booksRes.data);
                setMagazines(magsRes.data);
                setGloves(glovesRes.data);
                setShoes(shoesRes.data);
                setCartCount(cartRes.data.products.length);

            } catch (err) {
                console.error("Error loading data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [token]);

    // ---------------- CART ----------------
    const handleAddToCart = async (productId) => {
        try {
            const res = await api.post(`/cart/add/${productId}`);
            setCartCount(res.data.products.length);
            alert("Added to cart!");
        } catch {
            alert("Error adding to cart");
        }
    };

    // ---------------- BOOKS ----------------
    const handleAddBook = (b) => setBooks([...books, b]);

    const handleDeleteBook = async (id) => {
        if (!window.confirm("Delete book?")) return;
        await api.delete(`/books/${id}`);
        setBooks(books.filter(b => b.id !== id));
    };

    const handleUpdateBook = async (id, data) => {
        const res = await api.put(`/books/${id}`, data);
        setBooks(books.map(b => b.id === id ? res.data : b));
    };

    // ---------------- MAGAZINES ----------------
    const handleAddMagazine = (m) => setMagazines([...magazines, m]);

    const handleDeleteMagazine = async (id) => {
        if (!window.confirm("Delete magazine?")) return;
        await api.delete(`/magazines/${id}`);
        setMagazines(magazines.filter(m => m.id !== id));
    };

    const handleUpdateMagazine = async (id, data) => {
        if (data.currentIssue && data.currentIssue.length === 16) {
            data.currentIssue += ':00';
        }
        const res = await api.put(`/magazines/${id}`, data);
        setMagazines(magazines.map(m => m.id === id ? res.data : m));
    };

    // ---------------- GLOVES ----------------
    const handleAddGloves = (g) => setGloves([...gloves, g]);

    const handleDeleteGloves = async (id) => {
        if (!window.confirm("Delete gloves?")) return;
        await api.delete(`/gloves/${id}`);
        setGloves(gloves.filter(g => g.id !== id));
    };

    const handleUpdateGloves = async (id, data) => {
        const res = await api.put(`/gloves/${id}`, data);
        setGloves(gloves.map(g => g.id === id ? res.data : g));
    };

    // ---------------- SHOES ----------------
    const handleAddShoes = (s) => setShoes([...shoes, s]);

    const handleDeleteShoes = async (id) => {
        if (!window.confirm("Delete shoes?")) return;
        await api.delete(`/shoes/${id}`);
        setShoes(shoes.filter(s => s.id !== id));
    };

    const handleUpdateShoes = async (id, data) => {
        const res = await api.put(`/shoes/${id}`, data);
        setShoes(shoes.map(s => s.id === id ? res.data : s));
    };

    if (loading) return <h2>Loading Store...</h2>;

    return (
        <div className="app-container">

            {/* Navbar only when logged in */}
            {token && <Navbar cartCount={cartCount} />}

            <Routes>

                {/* PUBLIC */}
                <Route path="/login" element={<Login />} />

                {/* PROTECTED */}
                <Route element={<ProtectedRoute />}>

                    <Route path="/" element={<Home />} />

                    {/* BOOKS */}
                    <Route path="/inventory" element={
                        <div className="book-list">
                            <h1>Books</h1>
                            {books.map(b => (
                                <Book key={b.id} {...b}
                                      onDelete={handleDeleteBook}
                                      onUpdate={handleUpdateBook}
                                      onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    } />

                    <Route path="/add" element={
                        <BookForm onBookAdded={handleAddBook} api={api} />
                    } />

                    {/* MAGAZINES */}
                    <Route path="/magazines" element={
                        <div className="magazine-list">
                            <h1>Magazines</h1>
                            {magazines.map(m => (
                                <Magazine key={m.id} {...m}
                                          onDelete={handleDeleteMagazine}
                                          onUpdate={handleUpdateMagazine}
                                          onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    } />

                    <Route path="/add-magazine" element={
                        <MagazineForm onMagazineAdded={handleAddMagazine} api={api} />
                    } />

                    {/* GLOVES */}
                    <Route path="/gloves" element={
                        <div className="gloves-list">
                            <h1>Boxing Gloves</h1>
                            {gloves.map(g => (
                                <Gloves key={g.id} {...g}
                                        onDelete={handleDeleteGloves}
                                        onUpdate={handleUpdateGloves}
                                />
                            ))}
                        </div>
                    } />

                    <Route path="/add-gloves" element={
                        <GlovesForm onGlovesAdded={handleAddGloves} />
                    } />

                    {/* SHOES */}
                    <Route path="/shoes" element={
                        <div className="shoes-list">
                            <h1>Boxing Shoes</h1>
                            {shoes.map(s => (
                                <Shoes key={s.id} {...s}
                                       onDelete={handleDeleteShoes}
                                       onUpdate={handleUpdateShoes}
                                />
                            ))}
                        </div>
                    } />

                    <Route path="/add-shoes" element={
                        <ShoesForm onShoesAdded={handleAddShoes} />
                    } />

                    {/* CART */}
                    <Route path="/cart" element={
                        <Cart api={api} onCartChange={setCartCount} />
                    } />

                    {/* LOGOUT */}
                    <Route path="/logout" element={<Logout />} />

                </Route>
            </Routes>
        </div>
    );
}

export default App;