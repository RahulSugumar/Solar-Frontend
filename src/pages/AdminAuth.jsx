import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ChevronRight, AlertCircle, Eye, EyeOff, Hexagon, Command } from 'lucide-react';
import gsap from 'gsap';
import api from '../api';

const AdminAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        // Entrance Animation
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(bgRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 2 })
            .fromTo(cardRef.current, { y: 20, opacity: 0, rotationX: 10 }, { y: 0, opacity: 1, rotationX: 0, duration: 1 }, '-=1.5')
            .fromTo('.stagger-input', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }, '-=0.5');

        // Continuous Floating Animation
        gsap.to('.float-element', {
            y: '-=15',
            rotation: 5,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 1
        });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Standard Login
            const res = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });

            // 2. Role Check
            if (res.data.role !== 'admin') {
                setError("Access Denied: Insufficient Privileges");
                return;
            }

            // 3. Success
            localStorage.setItem('user_id', res.data.id);
            // Exit Animation
            gsap.to(containerRef.current, { opacity: 0, scale: 0.95, duration: 0.5, onComplete: () => navigate('/admin/dashboard', { replace: true }) });

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "Authentication Failed");
            gsap.fromTo(cardRef.current, { x: -5 }, { x: 5, duration: 0.1, repeat: 3, yoyo: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center relative overflow-hidden font-sans text-gray-100 selection:bg-blue-500/30">
            {/* Dynamic Background */}
            <div ref={bgRef} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/40 via-gray-900 to-black"></div>
                <div className="absolute inset-0 header-pattern opacity-[0.03]"></div> {/* Custom CSS pattern if available, else plain */}

                {/* Floating Abstract Elements */}
                <div className="float-element absolute top-20 left-[20%] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
                <div className="float-element absolute bottom-20 right-[20%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" style={{ animationDelay: '2s' }}></div>

                <Hexagon size={48} className="float-element absolute top-40 right-40 text-gray-800 opacity-20 rotate-12" strokeWidth={1} />
                <Command size={64} className="float-element absolute bottom-40 left-40 text-gray-800 opacity-20 -rotate-12" strokeWidth={1} />
            </div>

            <div ref={cardRef} className="relative z-10 w-full max-w-[420px] p-8 mx-4">
                {/* Glassmorphism Card */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"></div>

                <div className="relative z-20 px-4 py-6">
                    {/* Header */}
                    <div className="text-center mb-10 stagger-input">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl mb-5 group-hover:border-blue-500/50 transition-colors">
                            <Shield size={24} className="text-gray-300" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-1 font-display">System Access</h1>
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Administrative Gateway</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="stagger-input flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="stagger-input group">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1 group-focus-within:text-blue-400 transition-colors">Administrator ID</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-gray-900/50 border border-gray-700 text-gray-200 text-sm font-medium rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 block w-full px-4 py-3.5 transition-all outline-none placeholder:text-gray-700"
                                        placeholder="admin@solargrid.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="stagger-input group">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1 group-focus-within:text-blue-400 transition-colors">Secure Key</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-gray-900/50 border border-gray-700 text-gray-200 text-sm font-medium rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 block w-full pl-4 pr-12 py-3.5 transition-all outline-none placeholder:text-gray-700 font-mono tracking-wider"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="stagger-input w-full mt-6 group bg-white text-black hover:bg-gray-200 focus:ring-4 focus:ring-gray-500/30 font-bold rounded-xl text-sm px-5 py-3.5 text-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="w-4 h-4 border-2 border-gray-400 border-t-black rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    Authenticate <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="stagger-input mt-8 text-center">
                        <button onClick={() => navigate('/', { replace: true })} className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors uppercase tracking-widest font-bold border-b border-transparent hover:border-gray-600 pb-0.5">
                            Return to Homepage
                        </button>
                    </div>
                </div>
            </div>

            {/* Subtle Footer */}
            <div className="stagger-input absolute bottom-6 text-[10px] text-gray-700 font-mono tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                SYSTEM OPERATIONAL
            </div>
        </div>
    );
};

export default AdminAuth;
