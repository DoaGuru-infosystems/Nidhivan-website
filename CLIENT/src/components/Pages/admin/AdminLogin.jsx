import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { loginAdminApi } from '@/lib/api';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/UserSlice';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoading(true);
        try {
            const result = await loginAdminApi(loginEmail, loginPassword);
            dispatch(loginUser(result));
            navigate('/admin/blogs');
        } catch (err) {
            setLoginError(err.message || 'Invalid credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white">
            {/* Add this once in your public/index.html <head>:
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"> */}
            <style>{`
                @keyframes floatGlow {
                    0%, 100% { opacity: 0.35; transform: translateY(0px); }
                    50% { opacity: 0.8; transform: translateY(-8px); }
                }
                .nd-particle { animation: floatGlow 4.5s ease-in-out infinite; }
                .nd-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
            `}</style>

            {/* LEFT BRAND PANEL */}
            <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-gradient-to-b from-[#0d6b38] via-[#118A43] to-[#0a5a2f]">
                {/* Repeating arch pattern, echoing the logo's house/gate silhouette */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 400 800" preserveAspectRatio="none">
                    {[0, 1, 2, 3].map(i => (
                        <path key={i}
                            d={`M ${-50 + i * 140} 800 L ${-50 + i * 140} 300 L ${20 + i * 140} 180 L ${90 + i * 140} 300 L ${90 + i * 140} 800`}
                            fill="none" stroke="#F4B54B" strokeWidth="6" />
                    ))}
                </svg>

                {/* Gold floating particles */}
                <div className="nd-particle absolute top-[18%] left-[20%] w-2 h-2 rounded-full bg-[#F4B54B] blur-[1px]" style={{ animationDelay: '0s' }} />
                <div className="nd-particle absolute top-[35%] left-[65%] w-1.5 h-1.5 rounded-full bg-[#F4B54B] blur-[1px]" style={{ animationDelay: '1.2s' }} />
                <div className="nd-particle absolute top-[60%] left-[30%] w-2.5 h-2.5 rounded-full bg-[#F4B54B]/80 blur-[1px]" style={{ animationDelay: '2.1s' }} />
                <div className="nd-particle absolute top-[75%] left-[70%] w-1.5 h-1.5 rounded-full bg-[#F4B54B] blur-[1px]" style={{ animationDelay: '3s' }} />

                {/* Peacock feather illustration — logo's core motif, reimagined larger */}
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

            {/* RIGHT LOGIN PANEL */}
            <div className="w-full lg:w-[54%] flex flex-col items-center justify-center px-6 py-12 bg-[#FBFAF7]">
                {/* Mobile-only compact logo */}
                <img
                    src="/images/nidhivan logo.png"
                    alt="Nidhivan Developer"
                    className="lg:hidden h-16 w-auto object-contain mb-8"
                />

                <div className="w-full max-w-sm">
                    <p className="text-[#118A43] text-xs tracking-[0.2em] uppercase font-semibold mb-2">
                        Admin Portal
                    </p>
                    <h2 className="nd-serif text-3xl font-semibold text-slate-800 mb-1">
                        Welcome back
                    </h2>
                    <p className="text-slate-500 text-sm mb-8">
                        Sign in to manage Nidhivan Developer
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="login-email" className="text-slate-700 font-medium text-sm">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                    className="pl-10 h-12 rounded-lg focus-visible:ring-[#118A43] bg-white border-slate-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="login-password" className="text-slate-700 font-medium text-sm">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                                <Input
                                    id="login-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                    className="pl-10 h-12 rounded-lg focus-visible:ring-[#118A43] bg-white border-slate-200"
                                />
                            </div>
                        </div>

                        {loginError && (
                            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                                {loginError}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-base font-semibold rounded-lg bg-[#118A43] hover:bg-[#0d6b38] text-white shadow-lg shadow-[#118A43]/20 transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-slate-400 text-xs leading-relaxed">
                        Copyright &copy; 2026 Nidhivan Developer, Jabalpur. All rights reserved.<br />
                        Design and developed by DOAGuru Infosystems.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;