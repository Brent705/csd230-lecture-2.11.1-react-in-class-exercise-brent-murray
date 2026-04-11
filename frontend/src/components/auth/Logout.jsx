import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../provider/AuthProvider.jsx"; // FIXED

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setToken(null);
        navigate("/login", { replace: true });
    }, [setToken, navigate]);

    return <div>Logging out...</div>;
};

export default Logout;