import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

const LandOwnerAuth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex bg-white font-sans overflow-hidden">
            {/* ================= LEFT SIDE: DECORATIVE ================= */}
            <div className={`relative w-0 md:w-1/2 bg-land-primary transition-all duration-700 ease-in-out flex flex-col justify-between p-12 text-white overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_transparent_60%)]"></div>

                {/* Content */}
                <div className="relative z-10 mt-10">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group">
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

                {/* Bottom Decor */}
                <div className="relative z-10 text-sm text-white/60 font-medium tracking-wide">
                    © 2025 SolarGrid. 100% Secure Platform.
                </div>
            </div>

            {/* ================= RIGHT SIDE: FORM ================= */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
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

                    <form className="space-y-4">
                        {!isLogin && (
                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                                <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-land-primary transition-colors py-2">
                                    <User size={20} className="text-gray-400 mr-3" />
                                    <input type="text" placeholder="John Doe" className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent" />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                                <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-land-primary transition-colors py-2">
                                    <Phone size={20} className="text-gray-400 mr-3" />
                                    <input type="tel" placeholder="+91 98765 43210" className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent" />
                                </div>
                            </div>
                        )}

                        <div className="group">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-land-primary transition-colors py-2">
                                <Mail size={20} className="text-gray-400 mr-3" />
                                <input type="email" placeholder="example@email.com" className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent" />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-land-primary transition-colors py-2">
                                <Lock size={20} className="text-gray-400 mr-3" />
                                <input type="password" placeholder="••••••••" className="flex-1 outline-none text-gray-800 placeholder-gray-300 bg-transparent" />
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="flex items-start gap-2 mt-4">
                                <input type="checkbox" className="mt-1 accent-land-primary" />
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

                        <button type="button" className="w-full mt-8 bg-land-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-land-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
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
                </div>
            </div>
        </div>
    );
};

export default LandOwnerAuth;
