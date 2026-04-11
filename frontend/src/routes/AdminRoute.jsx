import { Navigate, Outlet } from "react-router";
import { useAuth } from "../provider/AuthProvider";

export const AdminRoute = () => {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <Navigate to="/403" replace />;
    }

    return <Outlet />;
};