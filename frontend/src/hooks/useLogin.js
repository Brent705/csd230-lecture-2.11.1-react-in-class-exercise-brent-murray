import { useNavigate } from "react-router";
import { useAuth } from "../provider/AuthProvider.jsx";
import { useLoginMutation } from "./useAuthApi.js";

export const useLogin = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const { mutate, isPending, isError } = useLoginMutation();

    const login = (data) => {
        mutate(data, {
            onSuccess: (responseData) => {
                setToken(responseData.token);
                navigate("/", { replace: true });
            },
            onError: (err) => {
                console.error("Login Error:", err.response?.data || err.message);
            }
        });
    };

    return {
        login,
        isPending,
        isError
    };
};