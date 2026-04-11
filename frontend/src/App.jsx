import { Routes, Route } from 'react-router';
import { useAuth } from './provider/AuthProvider';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminRoute } from './routes/AdminRoute';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Logout from './components/auth/Logout.jsx';
import Cart from './pages/CartPage.jsx';
import { BooksPage } from './pages/items/BooksPage.jsx';
import { MagazinesPage } from './pages/items/MagazinesPage.jsx';
import { GlovesPage } from './pages/items/GlovesPage.jsx';
import { ShoesPage } from './pages/items/ShoesPage.jsx';
import BookForm from './components/forms/BookForm';
import MagazineForm from './components/forms/MagazineForm';
import GlovesForm from './components/forms/GlovesForm';
import ShoesForm from './components/forms/ShoesForm';
import NotFoundPage from './pages/error/NotFoundPage.jsx'
import ForbiddenPage from './pages/error/ForbiddenPage.jsx'
import { DiscMagsPage } from './pages/items/DiscMagsPage.jsx';
import DiscMagForm from './components/forms/DiscMagForm.jsx';
import { HeadgearPage } from './pages/items/HeadgearPage.jsx';
import { HandWrapsPage } from './pages/items/HandWrapsPage.jsx';
import HeadgearForm from './components/forms/HeadgearForm.jsx';
import HandWrapsForm from './components/forms/HandWrapsForm.jsx';
import { Toaster } from "sonner";
import './styles/App.css';

function App() {
    const { token } = useAuth();

    return (
        <div className="min-h-screen flex flex-col font-serif bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-700">
            {token && <Navbar />}
            <Toaster position="top-left" theme="dark" />

            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/magazines" element={<MagazinesPage />} />
                    <Route path="/gloves" element={<GlovesPage />} />
                    <Route path="/shoes" element={<ShoesPage />} />
                    <Route path="/discmags" element={<DiscMagsPage />} />
                    <Route path="/headgear" element={<HeadgearPage />} />
                    <Route path="/handwraps" element={<HandWrapsPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/403" element={<ForbiddenPage />} />

                    <Route element={<AdminRoute />}>
                        <Route path="/add-book" element={<BookForm />} />
                        <Route path="/add-magazine" element={<MagazineForm />} />
                        <Route path="/add-gloves" element={<GlovesForm />} />
                        <Route path="/add-shoes" element={<ShoesForm />} />
                        <Route path="/add-discmag" element={<DiscMagForm />} />
                        <Route path="/add-headgear" element={<HeadgearForm />} />
                        <Route path="/add-handwraps" element={<HandWrapsForm />} />
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;