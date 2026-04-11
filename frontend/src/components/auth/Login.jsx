import { useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../provider/AuthProvider";
import { useLoginMutation } from "../hooks/useAuthApi";
import { loginSchema } from "../lib/schemas";

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Look for ?expired=true passed from the Axios Interceptor
    const queryParams = new URLSearchParams(location.search);
    const isExpired = queryParams.get("expired");

    // Initialize React Hook Form with Zod validation
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" }
    });

    // Bring in our API Mutation
    const { mutate: login, isPending, isError } = useLoginMutation();

    // RHF passes the strictly validated data here
    const onSubmit = (data) => {
        login(data, {
            onSuccess: (responseData) => {
                setToken(responseData.token);
                navigate("/", { replace: true });
            },
            onError: (err) => {
                console.error("Login Error:", err.response?.data || err.message);
            }
        });
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Bookstore Admin</h1>
            <h2>Sign In</h2>

            {/* Expired Session Warning */}
            {isExpired && (
                <div style={{
                    backgroundColor: '#fff3cd', color: '#856404', padding: '12px',
                    borderRadius: '5px', display: 'inline-block', marginBottom: '20px',
                    border: '1px solid #ffeeba', fontWeight: 'bold'
                }}>
                    ⚠️ Your session has expired. Please log in again to continue.
                </div>
            )}

            {/* Global API Error */}
            {isError && (
                <div style={{
                    color: "white", backgroundColor: "#ff4444", padding: "10px",
                    borderRadius: "5px", display: "inline-block", marginBottom: "15px"
                }}>
                    Invalid username or password. Please try again.
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "inline-block", textAlign: "left", minWidth: "300px" }}>
                
                {/* Username Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label>Username:</label><br/>
                    <input
                        type="text"
                        placeholder="e.admin"
                        {...register("email")}
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                    {/* Zod Validation Error */}
                    {errors.email && <span className="error-text" style={{display: 'block'}}>{errors.email.message}</span>}
                    <small style={{display:"block", color:"#888", marginTop: "4px"}}>Hint: try 'admin' or 'user'</small>
                </div>

                {/* Password Input */}
                <div style={{ marginBottom: "20px" }}>
                    <label>Password:</label><br/>
                    <input
                        type="password"
                        {...register("password")}
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                    {/* Zod Validation Error */}
                    {errors.password && <span className="error-text" style={{display: 'block'}}>{errors.password.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    style={{
                        width: "100%", padding: "10px", backgroundColor: isPending ? "#6c757d" : "#007bff",
                        color: "white", border: "none", borderRadius: "5px", cursor: isPending ? "not-allowed" : "pointer",
                        fontSize: "16px"
                    }}
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;