import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, ArrowLeft, Briefcase, Eye, EyeOff, TrendingUp, ShieldCheck, Coins, BarChart3, Sun, Zap, DollarSign } from 'lucide-react';
import api from '../api'; // Import the axios instance

const InvestorAuth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'investor' // Default role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                // Sign In Logic
                const response = await api.post('/auth/login', {
                    email: formData.email,
                    password: formData.password
                });

                if (response.data.id) {
                    localStorage.setItem('user_id', response.data.id);
                }

                console.log("Login Success:", response.data);
                navigate('/investor/dashboard'); // Redirect to Investor Dashboard

            } else {
                // Sign Up Logic
                const response = await api.post('/auth/register', formData);
                console.log("Signup Success:", response.data);
                alert("Account created successfully! Please Sign In.");
                setIsLogin(true); // Switch to login view
            }
        } catch (error) {
            console.error("Auth Error:", error.response?.data || error.message);
            alert("Authentication failed: " + (error.response?.data?.detail || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans overflow-hidden">
            {/* ================= LEFT SIDE: DECORATIVE (GOLD THEME) ================= */}
            <div className={`relative w-0 md:w-1/2 bg-invest-primary transition-all duration-700 ease-in-out flex flex-col justify-between p-12 text-white overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_#fbbf24_0%,_transparent_60%)]"></div>

                {/* DECORATIVE ANIMATIONS */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Floating Coins */}
                    <div className="absolute top-20 right-20 animate-bounce opacity-20" style={{ animationDuration: '3s' }}>
                        <Coins size={64} className="text-yellow-200" />
                    </div>
                    <div className="absolute bottom-1/3 left-10 animate-pulse opacity-10" style={{ animationDuration: '4s' }}>
                        <DollarSign size={80} className="text-white" />
                    </div>

                    {/* Rising Graph */}
                    <div className="absolute bottom-10 right-10 animate-float opacity-30" style={{ animationDelay: '1s' }}>
                        <TrendingUp size={100} className="text-yellow-100" />
                    </div>

                    {/* Shield */}
                    <div className="absolute top-10 left-10 animate-spin opacity-10" style={{ animationDuration: '15s' }}>
                        <ShieldCheck size={50} className="text-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 mt-10">
                    <button onClick={() => navigate('/investor/welcome')} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </button>
                    <h1 className="text-4xl lg:text-5xl font-bold font-display leading-tight mb-6">
                        {isLogin ? "Welcome Back," : "Invest in the Future."}
                    </h1>
                    <p className="text-lg text-white/80 max-w-md font-light leading-relaxed">
                        {isLogin
                            ? "Track your solar portfolio, monitor real-time energy generation, and withdraw your monthly earnings."
                            : "Join over 500 investors earning 15% APY. Secure, asset-backed solar investments starting at ₹50k."
                        }
                    </p>
                </div>

                {/* CENTRAL ILLUSTRATION */}
                <div className="flex-1 flex items-center justify-center relative z-10">
                    <div className="relative">
                        {/* Orbit Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full animate-[spin_25s_linear_infinite]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white/20 rounded-full animate-[spin_18s_linear_infinite_reverse]"></div>

                        {/* Floating Center */}
                        <div className="relative w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-12 shadow-2xl flex items-center justify-center border border-white/20 animate-float">
                            <BarChart3 size={70} className="text-white drop-shadow-lg" />
                        </div>

                        {/* Satellites */}
                        <div className="absolute -top-10 right-10 animate-bounce delay-700">
                            <div className="bg-white p-2 rounded-lg shadow-lg">
                                <Zap size={20} className="text-yellow-500 fill-current" />
                            </div>
                        </div>
                        <div className="absolute -bottom-5 left-0 animate-bounce delay-300">
                            <div className="bg-white p-2 rounded-full shadow-lg">
                                <span className="font-bold text-invest-primary text-xs">15% IRR</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Decor */}
                <div className="relative z-10 text-sm text-white/60 font-medium tracking-wide">
                    © 2025 SolarGrid. SEBI Compliant.
                </div>
            </div>

            {/* ================= RIGHT SIDE: FORM ================= */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-gray-50/30">

                {/* Background Decorations (Right Side) */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Top Right Blob */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-100/50 rounded-full blur-3xl animate-pulse"></div>
                    {/* Bottom Left Blob */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Toggle Switch */}
                <div className="absolute top-8 right-8 flex border border-gray-200 rounded-full p-1 bg-gray-50">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isLogin ? 'bg-white text-invest-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!isLogin ? 'bg-white text-invest-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{isLogin ? 'Investor Login' : 'Create Portfolio'}</h2>
                        <p className="text-gray-500">
                            {isLogin ? 'Access your investments and earnings' : 'Start your wealth generation journey'}
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                                <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-invest-primary transition-colors py-2">
                                    <User size={20} className="text-gray-400 mr-3" />
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        placeholder="Jane Smith"
                                        className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent"
                                    />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                                <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-invest-primary transition-colors py-2">
                                    <Phone size={20} className="text-gray-400 mr-3" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="group">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-invest-primary transition-colors py-2">
                                <Mail size={20} className="text-gray-400 mr-3" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="investor@example.com"
                                    className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-invest-primary transition-colors py-2 relative">
                                <Lock size={20} className="text-gray-400 mr-3" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent pr-8"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Role Field - Read Only for Sign Up */}
                        {!isLogin && (
                            <div className="group opacity-70">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Role</label>
                                <div className="flex items-center border-b-2 border-gray-200 py-2 bg-gray-50/50">
                                    <Briefcase size={20} className="text-gray-400 mr-3" />
                                    <input
                                        type="text"
                                        value="Investor"
                                        readOnly
                                        className="flex-1 outline-none text-gray-600 bg-transparent cursor-not-allowed font-medium"
                                    />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="flex items-start gap-2 mt-4">
                                <input type="checkbox" className="mt-1 accent-invest-primary" required />
                                <p className="text-xs text-gray-500 leading-snug">
                                    I agree to the <a href="#" className="text-invest-primary hover:underline">Terms of Service</a> and <a href="#" className="text-invest-primary hover:underline">Risk Disclosure</a>.
                                </p>
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-xs font-bold text-invest-primary hover:text-yellow-600 transition-colors">Forgot Password?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-8 bg-invest-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-invest-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Secure Login' : 'Start Investing')} {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            {isLogin ? "New to SolarGrid? " : "Already an investor? "}
                            <button onClick={() => setIsLogin(!isLogin)} className="text-invest-primary font-bold hover:underline">
                                {isLogin ? "create an account" : "login here"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorAuth;
