import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";
import LoginVisualPanel from "./LoginVisualPanel";
import LoginForm from "../forms/LoginForm";
import { useLogin } from "../../hooks/useLogin.js";

const Login = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isExpired = queryParams.get("expired");

    const { login, isPending, isError } = useLogin();

    // Ref to prevent duplicate toasts on re-renders (defensive)
    const hasShownExpiredToast = useRef(false);
    const hasShownErrorToast = useRef(false);

    // Expired session toast – only once per mount
    useEffect(() => {
        if (isExpired && !hasShownExpiredToast.current) {
            hasShownExpiredToast.current = true;
            toast.warning("Session Expired", {
                description: "Your connection to the app was lost. Please re-authenticate.",
                style: {
                    background: '#0a0710',
                    border: '1px solid #ffea00',
                    color: '#ffea00',
                },
                duration: 6000,
            });
        }
    }, [isExpired]);

    // Login error toast – only once per error state change
    useEffect(() => {
        if (isError && !hasShownErrorToast.current) {
            hasShownErrorToast.current = true;
            toast.error("Access Denied", {
                description: "Invalid credentials. Please try again.",
                style: {
                    background: '#0a0710',
                    border: '1px solid #ff00a0',
                    color: '#ff00a0',
                },
                duration: 5000,
            });
        }
    }, [isError]);

    // Reset error toast flag when error clears (so next failed attempt shows again)
    useEffect(() => {
        if (!isError) hasShownErrorToast.current = false;
    }, [isError]);

    return (
        <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0b0c10] text-gray-200 font-sans selection:bg-[#ff00a0] selection:text-white overflow-hidden relative">
            
            {/* Neon grid floor effect – slightly more intense and higher opacity */}
            <div 
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[42%] pointer-events-none z-0"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,0,160,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,160,0.2) 1px, transparent 1px)',
                    backgroundSize: '42px 42px',
                    transform: 'perspective(520px) rotateX(62deg)',
                    transformOrigin: 'bottom',
                }}
            />

            {/* Split Panels */}
            <LoginVisualPanel />

            <section 
                aria-labelledby="login-heading"
                className="flex-1 flex w-full relative z-10 lg:w-[45%] p-6 sm:p-12 items-center justify-center bg-[#0b0c10]/80 backdrop-blur-md lg:border-l lg:border-[#ff00a0]/30 shadow-[-20px_0_50px_rgba(0,240,255,0.05)]"
            >
                <div className="w-full max-w-md space-y-8">
                    <LoginForm
                        onSubmit={login}
                        isPending={isPending}
                    />
                </div>
            </section>
        </main>
    );
};

export default Login;