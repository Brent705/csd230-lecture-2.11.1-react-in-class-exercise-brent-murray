import { useAuth } from '../provider/AuthProvider';
import AdminHome from '../components/home/AdminHome.jsx';
import UserHome from '../components/home/UserHome.jsx';

export default function HomePage() {
    const { isAdmin } = useAuth();
    return isAdmin ? <AdminHome /> : <UserHome />;
}