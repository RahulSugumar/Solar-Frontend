import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRight, User, MapPin, Calculator, Banknote, Sun, Sprout, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LandOwnerWelcome = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const heroContentRef = useRef(null);
    const stepsRef = useRef(null);
    const calculatorRef = useRef(null);

    // Calculator State
    const [acres, setAcres] = useState(5);
    const baseRate = 25000; // per acre/year fixed
    const revenueShare = 15000; // estimated per acre/year

    const formattedEarnings = (acres * (baseRate + revenueShare)).toLocaleString('en-IN');

    useEffect(() => {
        // Hero Animation
        const tl = gsap.timeline();
        tl.fromTo(heroContentRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
        );

        // Scroll Triggers for Sections
        gsap.fromTo(stepsRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
                scrollTrigger: {
                    trigger: stepsRef.current,
                    start: "top 80%",
                }
            }
        );

        gsap.fromTo(calculatorRef.current,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: calculatorRef.current,
                    start: "top 75%",
                }
            }
        );

    }, []);

    return (
        <div className="min-h-screen bg-land-bg text-land-text font-sans overflow-x-hidden">

            {/* ================= NAVBAR ================= */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-land-primary rounded-lg flex items-center justify-center">
                            <Sprout className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold text-land-primary">SolarGrid <span className="text-sm font-normal text-gray-500">Land</span></span>
                    </div>
                    <div className="hidden md:flex gap-8 text-gray-600 font-medium">
                        <a href="#how-it-works" className="hover:text-land-primary transition">How it Works</a>
                        <a href="#calculator" className="hover:text-land-primary transition">Calculator</a>
                        <a href="#safety" className="hover:text-land-primary transition">Safety</a>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('/login')} className="px-5 py-2 text-land-primary font-bold hover:bg-green-50 rounded-full transition">Log In</button>
                        <button onClick={() => navigate('/register')} className="px-6 py-2 bg-land-primary text-white font-bold rounded-full hover:bg-green-700 shadow-lg shadow-green-200 transition transform hover:scale-105">Get Started</button>
                    </div>
                </div>
            </nav>

            {/* ================= HERO SECTION ================= */}
            <div ref={heroRef} className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div ref={heroContentRef}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-land-primary rounded-full font-bold text-sm mb-6">
                            <CheckCircle size={16} /> Verified Govt. approved Solar Projects
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-gray-900 mb-6">
                            Turn Idle Land into <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-land-primary to-green-400">Recurring Wealth.</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                            Zero Investment. We lease your land, install solar panels, and pay you guaranteed monthly rent plus a share of the revenue.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/land-owner/submit')} className="px-8 py-4 bg-land-primary text-white text-lg font-bold rounded-xl shadow-xl shadow-green-200 hover:shadow-2xl hover:bg-green-700 transition flex items-center justify-center gap-2">
                                Check Eligibility  <ArrowRight size={20} />
                            </button>
                            <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 text-lg font-bold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                View Sample Contract
                            </button>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-sm font-medium text-gray-500">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                            </div>
                            <p>Trusted by 120+ Land Owners across India</p>
                        </div>
                    </div>

                    {/* Hero Image / Graphic */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-land-primary rounded-3xl rotate-6 opacity-20 transition-transform group-hover:rotate-3 duration-500"></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-2">
                            <img
                                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000"
                                alt="Solar Farm"
                                className="w-full h-[500px] object-cover rounded-2xl"
                            />
                            {/* Floating Card */}
                            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-land-primary">
                                    <Banknote size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Monthly Payout</p>
                                    <p className="text-xl font-bold text-gray-900">₹ 45,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= HOW IT WORKS ================= */}
            <div id="how-it-works" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-land-primary font-bold tracking-widest uppercase mb-4">Simple Process</h2>
                        <h3 className="text-4xl font-bold text-gray-900 mb-6">How to Monetize Your Land</h3>
                        <p className="text-xl text-gray-500">No complex paperwork. No hidden fees. Just 4 steps to financial freedom.</p>
                    </div>

                    <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: MapPin, title: "1. Submit Details", desc: "Share your land location and documents for preliminary verification." },
                            { icon: CheckCircle, title: "2. Site Audit", desc: "Our team visits to check solar feasibility (Soil, Sunlight, Grid)." },
                            { icon: Calculator, title: "3. Lease Agreement", desc: "Sign a 25-year lease with guaranteed rental terms." },
                            { icon: Sun, title: "4. Earn Passive Income", desc: "Once panels are live, you get monthly rent + revenue share." }
                        ].map((step, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-land-primary mb-6">
                                    <step.icon size={32} />
                                </div>
                                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= CALCULATOR ================= */}
            <div id="calculator" className="py-24 bg-land-primary text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Estimate Your Earnings</h2>
                        <p className="text-green-100 text-xl mb-12">
                            See how much your idle land could be generating. Based on average solar performance in India.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <CheckCircle className="text-green-300" /> <span>Guaranteed Fixed Rent (Inflation Adjusted)</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <CheckCircle className="text-green-300" /> <span>10-15% Revenue Share from Electricity</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <CheckCircle className="text-green-300" /> <span>0 Maintenance Cost for You</span>
                            </div>
                        </div>
                    </div>

                    <div ref={calculatorRef} className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <span className="font-bold text-gray-500">LAND SIZE</span>
                            <span className="text-3xl font-bold text-land-primary">{acres} Acres</span>
                        </div>

                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={acres}
                            onChange={(e) => setAcres(parseInt(e.target.value))}
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-land-primary mb-12"
                        />

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <div className="text-sm text-gray-500 font-bold uppercase mb-1">Fixed Rent</div>
                                <div className="text-xl font-bold">₹ {(acres * baseRate).toLocaleString()}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-center">
                                <div className="text-sm text-gray-500 font-bold uppercase mb-1">Rev. Share</div>
                                <div className="text-xl font-bold">~ ₹ {(acres * revenueShare).toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="bg-land-bg p-6 rounded-2xl text-center border border-green-200">
                            <div className="text-gray-600 font-medium mb-2">Total Estimated Annual Income</div>
                            <div className="text-5xl font-bold text-land-primary">₹ {formattedEarnings}</div>
                            <div className="text-sm text-gray-500 mt-2">*Indicative figures only</div>
                        </div>

                        <button onClick={() => navigate('/land-owner/submit')} className="w-full mt-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition">
                            Unlock This Income Now
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= FOOTER CTA ================= */}
            <div className="py-24 text-center">
                <h2 className="text-3xl font-bold mb-8">Ready to transform your land?</h2>
                <button onClick={() => navigate('/land-owner/submit')} className="px-10 py-4 bg-land-primary text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition">
                    Start Your Application
                </button>
            </div>

        </div>
    );
};

export default LandOwnerWelcome;
