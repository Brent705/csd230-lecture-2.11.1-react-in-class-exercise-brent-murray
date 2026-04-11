import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/schemas.js";
import { Loader2, Eye, EyeOff } from "lucide-react";

const LoginForm = ({ onSubmit, isPending }) => {
    const [showPassword, setShowPassword] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" } // kept "email" field name to match your schema
    });

    // Reusable neon input styles for consistency
    const neonInputClass = (hasError) => `
        w-full px-4 py-3 bg-[#0a0710]/80 text-white placeholder-slate-600 
        border-b-2 border-transparent transition-all font-mono text-sm 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] 
        focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c10] 
        focus:bg-[#00f0ff]/5 hover:bg-[#0a0710] rounded-sm
        ${hasError 
            ? 'border-[#ff00a0] shadow-[0_2px_10px_rgba(255,0,160,0.3)]' 
            : 'focus:border-[#00f0ff] shadow-[0_2px_10px_rgba(0,240,255,0.1)] focus:shadow-[0_2px_15px_rgba(0,240,255,0.4)]'
        }
    `;

    return (
        <div className="w-full flex flex-col space-y-8">
            {/* Header */}
            <header className="w-full">
                <h3 id="login-heading" className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-wide uppercase italic [text-shadow:0_0_15px_#ff00a0]">
                    Sign In
                </h3>
                <p className="text-sm text-[#00f0ff] font-mono drop-shadow-[0_0_5px_#00f0ff]">
                    Secure authentication — hint: <span className="font-bold">user/user</span> or <span className="font-bold">admin/admin</span>
                </p>
            </header>

            {/* Form */}
            <form 
                aria-labelledby="login-heading"
                onSubmit={handleSubmit(onSubmit)} 
                className="w-full space-y-6" 
                noValidate
            >
                {/* Username field */}
                <div>
                    <label htmlFor="email" className="block text-xs font-mono text-[#00f0ff] mb-1.5 uppercase tracking-widest cursor-pointer">
                        Username
                    </label>
                    <input
                        id="email"
                        type="text"
                        autoComplete="username"
                        placeholder="e.admin"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email_error" : undefined}
                        aria-required="true"
                        className={neonInputClass(!!errors.email)}
                    />
                    {errors.email && (
                        <p id="email_error" role="alert" className="text-[#ff00a0] text-[10px] mt-2 font-mono uppercase tracking-wider">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password field */}
                <div>
                    <label htmlFor="password" className="block text-xs font-mono text-[#00f0ff] mb-1.5 uppercase tracking-widest cursor-pointer">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            {...register("password")}
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? "password_error" : undefined}
                            aria-required="true"
                            className={neonInputClass(!!errors.password)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            aria-pressed={showPassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#00f0ff] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0710] rounded-sm p-1"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p id="password_error" role="alert" className="text-[#ff00a0] text-[10px] mt-2 font-mono uppercase tracking-wider">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit Button – enhanced hover + active scale */}
                <button
                    type="submit"
                    disabled={isPending}
                    aria-busy={isPending}
                    className="w-full bg-gradient-to-r from-[#ff00a0] to-[#00f0ff] text-white font-bold py-4 px-4 uppercase tracking-[0.2em] text-sm transition-all hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c10] shadow-[0_0_20px_rgba(255,0,160,0.4)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 mt-10 rounded-sm"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> 
                            Authenticating...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;