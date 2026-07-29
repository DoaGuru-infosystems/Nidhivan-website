import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { loginAdmin, DEMO_CREDENTIALS_DISPLAY } from './utils/auth';

const AdminLogin = () => {
    const navigate = useNavigate();

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
        
        const result = await loginAdmin(loginEmail, loginPassword);
        
        if (result.success) {
            navigate('/admin/blogs');
        } else {
            setLoginError(result.error || 'Invalid credentials.');
        }
    };

    const handleRegister = (e) => {
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

        setRegMessage('Account created — please login.');
        // Reset fields
        setRegName('');
        setRegEmail('');
        setRegPassword('');
        setRegConfirm('');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
                
                {/* LOGIN CARD */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Admin Login</CardTitle>
                        <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* DEMO CREDENTIALS BANNER */}
                        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                            <strong>Demo login</strong> <br/>
                            Username: <code className="bg-white px-1 py-0.5 rounded">{DEMO_CREDENTIALS_DISPLAY.username}</code> <br/>
                            Password: <code className="bg-white px-1 py-0.5 rounded">{DEMO_CREDENTIALS_DISPLAY.password}</code>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="login-email">Email</Label>
                                <Input 
                                    id="login-email" 
                                    type="email" 
                                    placeholder={DEMO_CREDENTIALS_DISPLAY.username}
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="login-password">Password</Label>
                                <Input 
                                    id="login-password" 
                                    type="password"
                                    placeholder="********"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* REGISTER CARD */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Create Account</CardTitle>
                        <CardDescription>Register a new admin user (Demo).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reg-name">Full Name</Label>
                                <Input 
                                    id="reg-name" 
                                    type="text" 
                                    placeholder="John Doe"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg-email">Email</Label>
                                <Input 
                                    id="reg-email" 
                                    type="email" 
                                    placeholder="john@example.com"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="reg-password">Password</Label>
                                    <Input 
                                        id="reg-password" 
                                        type="password"
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reg-confirm">Confirm Password</Label>
                                    <Input 
                                        id="reg-confirm" 
                                        type="password"
                                        value={regConfirm}
                                        onChange={(e) => setRegConfirm(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            {regMessage && <p className={regMessage.includes('created') ? "text-green-600 text-sm" : "text-red-500 text-sm"}>{regMessage}</p>}
                            <Button type="submit" variant="outline" className="w-full">Register</Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default AdminLogin;
