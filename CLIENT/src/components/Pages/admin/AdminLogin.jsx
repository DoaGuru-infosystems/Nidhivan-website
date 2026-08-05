import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { loginAdminApi, registerAdminApi } from '@/lib/api';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/UserSlice';
import { Building2, Lock, Mail, User, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Register State
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirm, setRegConfirm] = useState('');
    const [regMessage, setRegMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const result = await loginAdminApi(loginEmail, loginPassword);
            
            // Expected result should contain user and token, depending on your backend
            // Let's dispatch the full result or token to Redux
            dispatch(loginUser(result));
            
            navigate('/admin/blogs');
        } catch (err) {
            setLoginError(err.message || 'Invalid credentials.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegMessage('');

        if (regPassword !== regConfirm) {
            setRegMessage('Passwords do not match.');
            return;
        }

        if (regPassword.length < 6) {
            setRegMessage('Password too short.');
            return;
        }

        try {
            const result = await registerAdminApi(regName, regEmail, regPassword);
            setRegMessage(result.message || 'Account created — please login.');
            
            // Optional: Auto-fill login fields or reset reg fields
            setRegName('');
            setRegEmail('');
            setRegPassword('');
            setRegConfirm('');
        } catch (err) {
            setRegMessage(err.message || 'Registration failed.');
        }
    };
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#118A43]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#F4B54B]/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Logo Header */}
            <div className="mb-8 z-10 flex flex-col items-center">
                <img 
                    src="/images/nidhivan logo.png" 
                    alt="Nidhivan Logo" 
                    className="h-20 w-auto object-contain mb-4 drop-shadow-md"
                />
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Admin Portal</h1>
                <p className="text-slate-500 text-sm">Secure access to your management dashboard</p>
            </div>

            <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 z-10">
                
                {/* LOGIN CARD */}
                <Card className="w-full border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 pt-8 px-8">
                        <CardTitle className="text-2xl flex items-center gap-2 text-slate-800">
                            <ShieldCheck className="text-[#118A43]" />
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-slate-500 text-base">Enter your credentials to access the dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="login-email" className="text-slate-700 font-medium ml-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input 
                                        id="login-email" 
                                        type="email" 
                                        placeholder="admin@example.com"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                        className="pl-10 h-12 rounded-xl focus-visible:ring-[#118A43] bg-slate-50 border-slate-200"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="login-password" className="text-slate-700 font-medium ml-1">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input 
                                        id="login-password" 
                                        type="password"
                                        placeholder="••••••••"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                        className="pl-10 h-12 rounded-xl focus-visible:ring-[#118A43] bg-slate-50 border-slate-200"
                                    />
                                </div>
                            </div>
                            {loginError && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                                    {loginError}
                                </div>
                            )}
                            <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl bg-[#118A43] hover:bg-[#0f7a3b] text-white shadow-lg shadow-[#118A43]/20 transition-all active:scale-[0.98]">
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* REGISTER CARD */}
                <Card className="w-full border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 pt-8 px-8">
                        <CardTitle className="text-2xl flex items-center gap-2 text-slate-800">
                            <User className="text-[#F4B54B]" />
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-slate-500 text-base">Register a new admin user (Demo mode).</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <form onSubmit={handleRegister} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="reg-name" className="text-slate-700 font-medium ml-1">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input 
                                        id="reg-name" 
                                        type="text" 
                                        placeholder="John Doe"
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                        required
                                        className="pl-10 h-12 rounded-xl focus-visible:ring-[#F4B54B] bg-slate-50 border-slate-200"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg-email" className="text-slate-700 font-medium ml-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <Input 
                                        id="reg-email" 
                                        type="email" 
                                        placeholder="john@example.com"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required
                                        className="pl-10 h-12 rounded-xl focus-visible:ring-[#F4B54B] bg-slate-50 border-slate-200"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="reg-password" className="text-slate-700 font-medium ml-1">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input 
                                            id="reg-password" 
                                            type="password"
                                            placeholder="••••••••"
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                            required
                                            className="pl-10 h-12 rounded-xl focus-visible:ring-[#F4B54B] bg-slate-50 border-slate-200"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reg-confirm" className="text-slate-700 font-medium ml-1">Confirm Password</Label>
                                    <div className="relative">
                                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <Input 
                                            id="reg-confirm" 
                                            type="password"
                                            placeholder="••••••••"
                                            value={regConfirm}
                                            onChange={(e) => setRegConfirm(e.target.value)}
                                            required
                                            className="pl-10 h-12 rounded-xl focus-visible:ring-[#F4B54B] bg-slate-50 border-slate-200"
                                        />
                                    </div>
                                </div>
                            </div>
                            {regMessage && (
                                <div className={`p-3 rounded-lg text-sm font-medium border ${regMessage.includes('created') ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-100"}`}>
                                    {regMessage}
                                </div>
                            )}
                            <Button type="submit" variant="outline" className="w-full h-12 text-base font-semibold rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98]">
                                Register New Admin
                            </Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
            
            {/* Footer Text */}
            <div className="mt-12 z-10 text-slate-400 text-sm">
                &copy; 2025 Nidhivan Real Estate. All rights reserved.
            </div>
        </div>
    );
};

export default AdminLogin;
