import { Navigate, Outlet } from "react-router";
import { useAuth } from "../provider/AuthProvider"; // FIXED

export const ProtectedRoute = () => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};