import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, ArrowLeft, Briefcase, Eye, EyeOff, Sun, Wind, Cloud, Sprout, Trees, Zap, Globe } from 'lucide-react';
import api from '../api'; // Import the axios instance

const LandOwnerAuth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Clear existing session on mount to prevent stale login states
    React.useEffect(() => {
        localStorage.removeItem('user_id');
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'land_owner' // Default role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                // Sign In Logic - Send JSON as expected by Pydantic model
                const response = await api.post('/auth/login', {
                    email: formData.email,
                    password: formData.password
                });

                // Store user_id or token if needed. 
                // The MVP backend returns the user object, let's store the ID.
                if (response.data.id) {
                    localStorage.setItem('user_id', response.data.id);
                }

                console.log("Login Success:", response.data);
                console.log("Login Success:", response.data);
                navigate('/land-owner/dashboard', { replace: true }); // Redirect after login

            } else {
                // Sign Up Logic - Correct endpoint is /register
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
            {/* ================= LEFT SIDE: DECORATIVE ================= */}
            <div className={`relative w-0 md:w-1/2 bg-land-primary transition-all duration-700 ease-in-out flex flex-col justify-between p-12 text-white overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_transparent_60%)]"></div>

                {/* DECORATIVE ANIMATIONS */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Floating Sun */}
                    <div className="absolute top-10 right-10 animate-spin opacity-20" style={{ animationDuration: '20s' }}>
                        <Sun size={80} className="text-yellow-300" />
                    </div>
                    {/* Drifting Clouds */}
                    <div className="absolute top-32 left-10 animate-float opacity-30" style={{ animationDelay: '0s' }}>
                        <Cloud size={64} className="text-white" />
                    </div>
                    <div className="absolute bottom-1/3 right-10 animate-float opacity-20" style={{ animationDelay: '2s' }}>
                        <Wind size={56} className="text-white" />
                    </div>
                    {/* Rising Nature */}
                    <div className="absolute bottom-10 left-10 animate-bounce opacity-30" style={{ animationDuration: '4s' }}>
                        <Sprout size={48} className="text-green-200" />
                    </div>
                    <div className="absolute bottom-20 right-20 animate-pulse opacity-20" style={{ animationDuration: '5s' }}>
                        <Trees size={64} className="text-green-100" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 mt-10">
                    <button onClick={() => navigate('/land-owner/welcome')} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </button>
                    <h1 className="text-4xl lg:text-5xl font-bold font-display leading-tight mb-6">
                        {isLogin ? "Welcome Back," : "Join the Green Revolution."}
                    </h1>
                    <p className="text-lg text-white/80 max-w-md font-light leading-relaxed">
                        {isLogin
                            ? "Access your dashboard to track your land's performance and monthly rental income."
                            : "Lease your idle land for solar projects and earn a guaranteed monthly income for 25 years."
                        }
                    </p>
                </div>

                {/* CENTRAL ILLUSTRATION */}
                <div className="flex-1 flex items-center justify-center relative z-10">
                    <div className="relative">
                        {/* Orbit Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                        {/* Floating Center */}
                        <div className="relative w-40 h-40 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl animate-float">
                            <Globe size={80} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" strokeWidth={1} />
                        </div>

                        {/* Satellites */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[200%] animate-bounce">
                            <Zap size={24} className="text-yellow-300 fill-current drop-shadow-lg" />
                        </div>
                    </div>
                </div>

                {/* Bottom Decor */}
                <div className="relative z-10 text-sm text-white/60 font-medium tracking-wide">
                    © 2025 SolarGrid. 100% Secure Platform.
                </div>
            </div>

            {/* ================= RIGHT SIDE: FORM ================= */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-gray-50/30">

                {/* Background Decorations (Right Side) */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Top Right Blob - Increased opacity */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-land-light/40 rounded-full blur-3xl animate-pulse"></div>
                    {/* Bottom Left Blob - Increased opacity */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-land-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                    {/* Subtle Solar/Hexagon Pattern - Increased opacity */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                        <Sun size={600} className="text-green-300 animate-[spin_60s_linear_infinite]" />
                    </div>
                </div>

                {/* Toggle Switch */}
                <div className="absolute top-8 right-8 flex border border-gray-200 rounded-full p-1 bg-gray-50">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isLogin ? 'bg-white text-land-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!isLogin ? 'bg-white text-land-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{isLogin ? 'Sign In' : 'Create Account'}</h2>
                        <p className="text-gray-500">
                            {isLogin ? 'Enter your details to access your account' : 'Fill in the form to get started'}
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                                <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-land-primary transition-colors py-2">
                                    <User size={20} className="text-gray-400 mr-3" />
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent"
                                    />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                                <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-land-primary transition-colors py-2">
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
                            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-land-primary transition-colors py-2">
                                <Mail size={20} className="text-gray-400 mr-3" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-land-primary transition-colors py-2 relative">
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
                                        value="Land Owner"
                                        readOnly
                                        className="flex-1 outline-none text-gray-600 bg-transparent cursor-not-allowed font-medium"
                                    />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="flex items-start gap-2 mt-4">
                                <input type="checkbox" className="mt-1 accent-land-primary" required />
                                <p className="text-xs text-gray-500 leading-snug">
                                    I agree to the <a href="#" className="text-land-primary hover:underline">Terms of Service</a> and <a href="#" className="text-land-primary hover:underline">Privacy Policy</a>.
                                </p>
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-xs font-bold text-land-primary hover:text-land-light transition-colors">Forgot Password?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-8 bg-land-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-land-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')} {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => setIsLogin(!isLogin)} className="text-land-primary font-bold hover:underline">
                                {isLogin ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>

                    <div className="mt-8 text-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/40 shadow-sm max-w-sm mx-auto">
                        <button
                            onClick={() => navigate('/', { replace: true })}
                            className="text-sm font-bold text-land-primary hover:text-land-dark hover:underline flex items-center justify-center gap-2 mx-auto transition-colors"
                        >
                            <ArrowLeft size={16} /> Return to Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandOwnerAuth;
