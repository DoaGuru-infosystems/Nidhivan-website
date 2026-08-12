import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { loginAdminApi, forgotPasswordApi, resetPasswordApi } from '@/lib/api';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/UserSlice';
import { Lock, Mail, ArrowLeft, KeyRound, ShieldCheck, Eye, EyeOff, Home } from 'lucide-react';

// ─── Shared Brand Panel ────────────────────────────────────────────────────────
const BrandPanel = () => (
    <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-gradient-to-b from-[#0d6b38] via-[#118A43] to-[#0a5a2f]">
        <style>{`
            @keyframes floatGlow {
                0%, 100% { opacity: 0.35; transform: translateY(0px); }
                50% { opacity: 0.8; transform: translateY(-8px); }
            }
            .nd-particle { animation: floatGlow 4.5s ease-in-out infinite; }
            .nd-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        `}</style>
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 400 800" preserveAspectRatio="none">
            {[0, 1, 2, 3].map(i => (
                <path key={i}
                    d={`M ${-50 + i * 140} 800 L ${-50 + i * 140} 300 L ${20 + i * 140} 180 L ${90 + i * 140} 300 L ${90 + i * 140} 800`}
                    fill="none" stroke="#F4B54B" strokeWidth="6" />
            ))}
        </svg>
        <div className="nd-particle absolute top-[18%] left-[20%] w-2 h-2 rounded-full bg-[#F4B54B] blur-[1px]" style={{ animationDelay: '0s' }} />
        <div className="nd-particle absolute top-[35%] left-[65%] w-1.5 h-1.5 rounded-full bg-[#F4B54B] blur-[1px]" style={{ animationDelay: '1.2s' }} />
        <div className="nd-particle absolute top-[60%] left-[30%] w-2.5 h-2.5 rounded-full bg-[#F4B54B]/80 blur-[1px]" style={{ animationDelay: '2.1s' }} />
        <div className="nd-particle absolute top-[75%] left-[70%] w-1.5 h-1.5 rounded-full bg-[#F4B54B] blur-[1px]" style={{ animationDelay: '3s' }} />
        <svg className="absolute -bottom-10 -right-16 w-[420px] h-[420px] opacity-90" viewBox="0 0 200 200">
            <g transform="rotate(15 100 100)">
                <path d="M100 20 C 130 60, 130 110, 100 170" fill="none" stroke="#F4B54B" strokeWidth="2.5" opacity="0.9" />
                <ellipse cx="100" cy="35" rx="26" ry="34" fill="#0a5a2f" stroke="#F4B54B" strokeWidth="1.5" />
                <ellipse cx="100" cy="35" rx="15" ry="21" fill="#118A43" />
                <ellipse cx="100" cy="35" rx="6" ry="9" fill="#F4B54B" />
                {[...Array(9)].map((_, i) => {
                    const t = i / 8;
                    const y = 55 + t * 110;
                    const spread = 18 + t * 40;
                    return (
                        <path key={i}
                            d={`M100 ${y} Q ${100 - spread} ${y + 10} ${100 - spread * 0.7} ${y + 25}`}
                            fill="none" stroke="#F4B54B" strokeWidth="1" opacity={0.5 - t * 0.25} />
                    );
                })}
            </g>
        </svg>
        <div className="relative z-10 flex flex-col justify-center h-full px-14 py-16">
            <img
                src="/images/nidhivan logo.png"
                alt="Nidhivan Developer"
                className="h-20 w-auto object-contain mb-8 brightness-0 invert opacity-95"
            />
            <h1 className="nd-serif text-white text-4xl font-semibold leading-tight mb-3">
                Nidhivan<br />Developer
            </h1>
            <div className="w-14 h-[3px] bg-[#F4B54B] mb-4" />
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Shree Radha Krishna ki nagri mein apka apna farms — manage your listings, blogs and enquiries from one place.
            </p>
        </div>
    </div>
);

// ─── Shared Footer ─────────────────────────────────────────────────────────────
const PanelFooter = () => (
    <p className="mt-8 text-center text-slate-400 text-xs leading-relaxed">
        Copyright &copy; 2026 Nidhivan Developer, Jabalpur. All rights reserved.<br />
        Design and developed by DOAGuru Infosystems.
    </p>
);

// ─── Login View ────────────────────────────────────────────────────────────────
const LoginView = ({ onForgotPassword }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const result = await loginAdminApi(email, password);
            dispatch(loginUser(result));
            navigate('/admin/blogs');
        } catch (err) {
            setError(err.message || 'Invalid credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <p className="text-[#118A43] text-xs tracking-[0.2em] uppercase font-semibold mb-2">Admin Portal</p>
            <h2 className="nd-serif text-3xl font-semibold text-slate-800 mb-1">Welcome back</h2>
            <p className="text-slate-500 text-sm mb-8">Sign in to manage Nidhivan Developer</p>

            <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-slate-700 font-medium text-sm">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                        <Input
                            id="login-email"
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10 h-12 rounded-lg focus-visible:ring-[#118A43] bg-white border-slate-200"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="login-password" className="text-slate-700 font-medium text-sm">Password</Label>
                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="text-xs text-[#118A43] hover:text-[#0d6b38] hover:underline transition-colors font-medium"
                        >
                            Forgot password?
                        </button>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                        <Input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pl-10 pr-10 h-12 rounded-lg focus-visible:ring-[#118A43] bg-white border-slate-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-semibold rounded-lg bg-[#118A43] hover:bg-[#0d6b38] text-white shadow-lg shadow-[#118A43]/20 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    {isLoading ? 'Signing in…' : 'Sign In'}
                </Button>
            </form>
            <PanelFooter />
        </div>
    );
};

// ─── Forgot Password View ─────────────────────────────────────────────────────
const ForgotPasswordView = ({ onBack, onOtpSent }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await forgotPasswordApi(email.trim().toLowerCase());
            onOtpSent(email.trim().toLowerCase());
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-slate-500 hover:text-[#118A43] text-sm mb-6 transition-colors group"
            >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to login
            </button>

            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#118A43]/10 flex items-center justify-center">
                    <KeyRound size={18} className="text-[#118A43]" />
                </div>
                <div>
                    <h2 className="nd-serif text-2xl font-semibold text-slate-800">Forgot Password</h2>
                    <p className="text-slate-500 text-sm">Enter your admin email to receive an OTP</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="forgot-email" className="text-slate-700 font-medium text-sm">Registered Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                        <Input
                            id="forgot-email"
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10 h-12 rounded-lg focus-visible:ring-[#118A43] bg-white border-slate-200"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-semibold rounded-lg bg-[#118A43] hover:bg-[#0d6b38] text-white shadow-lg shadow-[#118A43]/20 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    {isLoading ? 'Sending OTP…' : 'Send OTP'}
                </Button>
            </form>
            <PanelFooter />
        </div>
    );
};

// ─── Reset Password View ──────────────────────────────────────────────────────
const ResetPasswordView = ({ email, onBack, onSuccess }) => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        if (!otp || !newPassword || !confirmPassword) return 'All fields are required.';
        if (otp.length !== 6) return 'OTP must be exactly 6 digits.';
        if (newPassword.length < 6) return 'Password must be at least 6 characters.';
        if (newPassword !== confirmPassword) return 'Passwords do not match.';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) { setError(validationError); return; }
        setError('');
        setIsLoading(true);
        try {
            await resetPasswordApi(email, otp, newPassword);
            onSuccess();
        } catch (err) {
            setError(err.message || 'Password reset failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-slate-500 hover:text-[#118A43] text-sm mb-6 transition-colors group"
            >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                Back
            </button>

            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#118A43]/10 flex items-center justify-center">
                    <ShieldCheck size={18} className="text-[#118A43]" />
                </div>
                <div>
                    <h2 className="nd-serif text-2xl font-semibold text-slate-800">Reset Password</h2>
                </div>
            </div>

            <div className="bg-[#f4f9f6] border border-[#118A43]/20 rounded-lg px-4 py-3 mb-6 text-sm text-slate-600">
                OTP sent to <span className="font-semibold text-[#118A43]">{email}</span>. Check your inbox (and spam folder).
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="reset-otp" className="text-slate-700 font-medium text-sm">OTP Code</Label>
                    <Input
                        id="reset-otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        className="h-12 rounded-lg text-center text-xl tracking-[0.3em] font-bold focus-visible:ring-[#118A43] bg-white border-slate-200"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="reset-new-password" className="text-slate-700 font-medium text-sm">New Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                        <Input
                            id="reset-new-password"
                            type={showNew ? 'text' : 'password'}
                            placeholder="Min. 6 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="pl-10 pr-10 h-12 rounded-lg focus-visible:ring-[#118A43] bg-white border-slate-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            tabIndex={-1}
                        >
                            {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="reset-confirm-password" className="text-slate-700 font-medium text-sm">Confirm Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                        <Input
                            id="reset-confirm-password"
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Re-enter new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="pl-10 pr-10 h-12 rounded-lg focus-visible:ring-[#118A43] bg-white border-slate-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            tabIndex={-1}
                        >
                            {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                    </div>
                    {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-semibold rounded-lg bg-[#118A43] hover:bg-[#0d6b38] text-white shadow-lg shadow-[#118A43]/20 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    {isLoading ? 'Resetting…' : 'Reset Password'}
                </Button>
            </form>
            <PanelFooter />
        </div>
    );
};

// ─── Success View ─────────────────────────────────────────────────────────────
const SuccessView = ({ onBackToLogin }) => (
    <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[#118A43]/10 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck size={32} className="text-[#118A43]" />
        </div>
        <h2 className="nd-serif text-2xl font-semibold text-slate-800 mb-2">Password Reset!</h2>
        <p className="text-slate-500 text-sm mb-8">
            Your password has been reset successfully. You can now sign in with your new password.
        </p>
        <Button
            onClick={onBackToLogin}
            className="w-full h-12 text-base font-semibold rounded-lg bg-[#118A43] hover:bg-[#0d6b38] text-white shadow-lg shadow-[#118A43]/20 transition-all active:scale-[0.98]"
        >
            Back to Login
        </Button>
        <PanelFooter />
    </div>
);

// ─── Main AdminLogin Component ────────────────────────────────────────────────
const AdminLogin = () => {
    // view: 'login' | 'forgot' | 'reset' | 'success'
    const [view, setView] = useState('login');
    const [otpEmail, setOtpEmail] = useState('');

    const handleOtpSent = (email) => {
        setOtpEmail(email);
        setView('reset');
    };

    return (
        <div className="min-h-screen w-full flex bg-white">
            <style>{`
                .nd-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
            `}</style>

            {/* LEFT BRAND PANEL */}
            <BrandPanel />

            {/* RIGHT PANEL */}
            <div className="w-full lg:w-[54%] flex flex-col items-center justify-center px-6 py-12 bg-[#FBFAF7] relative">
                {/* Back to Home Link */}
                <a 
                    href="/" 
                    className="absolute top-6 right-6 lg:right-10 flex items-center gap-2 px-4 py-2 bg-white text-slate-600 hover:text-[#118A43] text-sm font-medium rounded-full shadow-sm border border-slate-200 transition-all hover:shadow-md group"
                >
                    <Home size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                    <span>Go to Website</span>
                </a>
                {/* Mobile-only compact logo */}
                <img
                    src="/images/nidhivan logo.png"
                    alt="Nidhivan Developer"
                    className="lg:hidden h-16 w-auto object-contain mb-8"
                />

                {view === 'login' && (
                    <LoginView onForgotPassword={() => setView('forgot')} />
                )}

                {view === 'forgot' && (
                    <ForgotPasswordView
                        onBack={() => setView('login')}
                        onOtpSent={handleOtpSent}
                    />
                )}

                {view === 'reset' && (
                    <ResetPasswordView
                        email={otpEmail}
                        onBack={() => setView('forgot')}
                        onSuccess={() => setView('success')}
                    />
                )}

                {view === 'success' && (
                    <SuccessView onBackToLogin={() => setView('login')} />
                )}
            </div>
        </div>
    );
};

export default AdminLogin;