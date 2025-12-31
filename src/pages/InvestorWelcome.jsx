
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRight, TrendingUp, ShieldCheck, Sun, DollarSign, BarChart3, PieChart, Coins, Zap } from 'lucide-react';
import InvestorsImg from "../assets/Investors.webp";
gsap.registerPlugin(ScrollTrigger);

const InvestorWelcome = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const heroContentRef = useRef(null);
    const stepsRef = useRef(null);
    const calculatorRef = useRef(null);

    // Calculator State (Investment)
    const [investment, setInvestment] = useState(500000); // 5 Lakhs default
    const roiRate = 0.15; // 15% Annual Return

    const annualEarnings = investment * roiRate;
    const monthlyEarnings = annualEarnings / 12;
    const totalEarnings = annualEarnings * 25; // 25 Years

    useEffect(() => {
        // Hero Animation
        const tl = gsap.timeline();
        tl.fromTo(heroContentRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
        );

        // Scroll Triggers for Timeline
        const tlSteps = gsap.timeline({
            scrollTrigger: {
                trigger: stepsRef.current,
                start: "top 70%",
                end: "bottom 80%",
                scrub: 1
            }
        });

        tlSteps.to(".timeline-progress", { scaleY: 1, ease: "none", duration: 1 });

        // Animate Cards
        const cards = gsap.utils.toArray(".timeline-card");
        cards.forEach((card, i) => {
            const content = card.querySelector(".group");
            const dot = card.querySelector(".timeline-dot");

            if (content) {
                gsap.fromTo(content,
                    { opacity: 0, x: i % 2 === 0 ? -100 : 100, rotateY: i % 2 === 0 ? -10 : 10 },
                    {
                        opacity: 1, x: 0, rotateY: 0, duration: 1, ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%"
                        }
                    }
                );
            }

            if (dot) {
                gsap.to(dot, {
                    scale: 1.2, borderColor: "#D69E2E", duration: 0.5,
                    scrollTrigger: { trigger: card, start: "top 60%", toggleActions: "play none none reverse" }
                });
            }
        });

        // Continuous Animations
        gsap.to(".step-icon-1", { y: -10, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".step-icon-2", { scale: 2, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".step-icon-3", { rotation: 360, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".step-icon-4", { y: -5, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });

        // Hero Blobs
        gsap.to(".hero-blob-1", {
            scale: 1.2, x: 20, y: -20, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut"
        });
        gsap.to(".hero-blob-2", {
            scale: 1.1, x: -30, y: 30, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut"
        });

    }, []);

    return (
        <div className="min-h-screen bg-invest-bg text-invest-text font-sans overflow-x-hidden">

            {/* ================= NAVBAR ================= */}
            <nav className="fixed w-[100%] top-0 z-50 transition-all duration-300">
                <div className="bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-md px-6 py-4 flex justify-between items-center relative overflow-hidden">
                    <div className="flex items-center gap-2 cursor-pointer z-10" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-invest-primary to-orange-500 rounded-full flex items-center justify-center shadow-md">
                            <Zap className="text-white fill-current" size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 tracking-tight font-display">SolarGrid<span className="text-invest-primary">.</span></span>
                    </div>

                    <div className="hidden md:flex gap-16 text-gray-600 font-medium z-10">
                        <a href="#market" className="hover:text-invest-primary transition relative group">
                            Marketplace
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-invest-primary transition-all group-hover:w-full"></span>
                        </a>
                        <a href="#roi-calculator" className="hover:text-invest-primary transition relative group">
                            ROI Calculator
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-invest-primary transition-all group-hover:w-full"></span>
                        </a>
                    </div>

                    <div className="flex gap-4 z-10">
                        <button onClick={() => navigate('/login')} className="px-6 py-2.5 text-gray-600 font-bold hover:text-invest-primary transition">Log In</button>
                        <button onClick={() => navigate('/register')} className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-full hover:bg-black hover:scale-105 transition shadow-lg flex items-center gap-2">
                            Start Investing
                        </button>
                    </div>
                </div>
            </nav>

            {/* ================= HERO SECTION ================= */}
            <div ref={heroRef} className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 bg-invest-light overflow-hidden">
                {/* Background Blobs */}
                <div className="hero-blob-1 absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
                <div className="hero-blob-2 absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div ref={heroContentRef}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full font-bold text-sm mb-6 relative overflow-hidden">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                            Average 15% IRR across all projects
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-bold font-display tracking-tight leading-tight text-gray-900 mb-6 lining-nums">
                            Invest in Solar, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-invest-primary to-orange-500">Harvest Wealth.</span>
                        </h1>
                        <p className="text-xl text-gray-600 font-medium mb-8 max-w-lg leading-relaxed opacity-90">
                            Own fractional shares of operational solar farms. Secure, asset-backed investments with guaranteed monthly returns.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/investor/market')} className="px-8 py-4 bg-invest-primary text-white text-lg font-bold rounded-xl shadow-xl shadow-yellow-200 hover:shadow-2xl hover:bg-yellow-600 transition flex items-center justify-center gap-2">
                                Explore Projects <ArrowRight size={20} />
                            </button>
                            <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 text-lg font-bold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                View Sample Portfolio
                            </button>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-sm font-medium text-gray-500">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                            </div>
                            <p>Joined by 500+ Investors this month</p>
                        </div>
                    </div>

                    {/* Hero Image / Illustration */}
                    <div className="relative group animate-[float_6s_ease-in-out_infinite]">
                        <div className="absolute inset-0 bg-invest-card rounded-3xl rotate-6 opacity-10 transition-transform group-hover:rotate-3 duration-500"></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-2">
                            <img
                                src={InvestorsImg}
                                alt="Solar Investment Dashboard"
                                className="w-full h-[500px] object-cover rounded-2xl"
                            />

                            {/* Floating Analytics Card */}
                            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4 animate-bounce delay-1000 duration-[3000ms]">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Portfolio Yield</p>
                                    <p className="text-xl font-bold text-gray-900 font-sans lining-nums">+16.4%</p>
                                </div>
                            </div>

                            {/* Secondary Floating Card */}
                            <div className="absolute top-8 right-8 bg-white backdrop-blur p-4 rounded-xl shadow-lg border border-gray-400 flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Security</p>
                                    <p className="text-xl font-bold text-gray-900 font-sans">100% Insured</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= TIMELINE JOURNEY ================= */}
            <div id="how-it-works" className="py-32 bg-invest-bgtimeline relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-32">
                        <div className="inline-block mb-4 px-6 py-2 rounded-full border border-invest-primary bg-invest-primary/2">
                            <span className="text-invest-primary font-bold tracking-[0.2em] uppercase text-sm font-display">The Process</span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-bold font-display text-[#3f3528] mb-8 leading-tight">
                            Smart Investing in <br />
                            <span className="bg-gradient-to-r from-invest-primary to-orange-500 text-transparent bg-clip-text">4 Simple Steps</span>
                        </h2>
                    </div>

                    <div ref={stepsRef} className="relative">
                        {/* Central Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 rounded-full overflow-hidden">
                            <div className="timeline-progress w-full h-full bg-gradient-to-b from-invest-primary to-orange-400 origin-top scale-y-0"></div>
                        </div>

                        {[
                            {
                                icon: PieChart,
                                title: "1. Choose Asset",
                                subtitle: "Browse Marketplace",
                                desc: "Select from a curated list of high-performance solar farms with detailed revenue projections.",
                                color: "border-blue-600 text-blue-700",
                                gradient: "from-white to-blue-50",
                                features: ["Verified Audits", "Historical Data", "Risk Assessment"],
                                anim: "step-icon-1"
                            },
                            {
                                icon: Coins,
                                title: "2. Buy Tokens",
                                subtitle: "Fractional Ownership",
                                desc: "Invest as little as ₹50,000. Purchase digital tokens representing your share of the project.",
                                color: "border-yellow-600 text-yellow-700",
                                gradient: "from-white to-yellow-50",
                                features: ["Legally Binding", "Instant Issuance", "Low Entry Barrier"],
                                anim: "step-icon-2"
                            },
                            {
                                icon: Sun,
                                title: "3. Solar Generation",
                                subtitle: "Asset Production",
                                desc: "The solar farm generates electricity which is sold to the grid or private offtakers.",
                                color: "border-orange-600 text-orange-700",
                                gradient: "from-white to-orange-50",
                                features: ["Green Energy", "Carbon Credits", "Grid Connectivity"],
                                anim: "step-icon-3"
                            },
                            {
                                icon: DollarSign,
                                title: "4. Monthly Returns",
                                subtitle: "Earn Passive Income",
                                desc: "Receive your share of the revenue directly into your bank account every month.",
                                color: "border-green-600 text-green-700",
                                gradient: "from-white to-green-50",
                                features: ["Automated Payouts", "Performance Bonuses", "Liquid Secondary Market"],
                                anim: "step-icon-4"
                            }
                        ].map((step, i) => (
                            <div key={i} className={`timeline-card relative flex items-center justify-between mb-32 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>

                                {/* Card */}
                                <div className={`w-full md:w-5/12 p-10 rounded-[2.5rem] border border-white bg-gradient-to-br ${step.gradient} shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group cursor-default relative overflow-hidden`}>
                                    <div className="flex items-start justify-between mb-8">
                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl bg-white shadow-lg border border-white/60 group-hover:scale-110 transition-transform duration-500 ${step.color.split(' ')[1]}`}>
                                            <step.icon size={36} strokeWidth={1.5} className={step.anim} />
                                        </div>
                                        <span className="text-8xl font-black text-gray-400 select-none font-display lining-nums">{i + 1}</span>
                                    </div>

                                    <div className="mb-3 flex items-center gap-2">
                                        <div className={`h-[1px] w-8 ${step.color.split(' ')[1].replace('text-', 'bg-')}`}></div>
                                        <div className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 font-display">{step.subtitle}</div>
                                    </div>

                                    <h4 className="text-4xl font-bold text-gray-900 mb-6 leading-tight font-display">
                                        {step.title}
                                    </h4>

                                    <p className="text-gray-600 leading-relaxed text-lg font-light mb-8 border-b border-gray-200/50 pb-6">
                                        {step.desc}
                                    </p>

                                    <ul className="space-y-3">
                                        {step.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-gray-900 font-medium group/item">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 ${step.color.split(' ')[1]}`}>
                                                    <CheckCircle size={14} strokeWidth={3} />
                                                </div>
                                                <span className="group-hover/item:text-gray-900 transition-colors font-sans text-sm tracking-wide">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Center Dot */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-[6px] border-gray-100 rounded-full z-10 items-center justify-center shadow-lg timeline-dot">
                                    <div className={`w-5 h-5 rounded-full ${step.color.split(' ')[1].replace('text-', 'bg-')} opacity-0 transition-opacity duration-500`}></div>
                                </div>

                                {/* Illustration Space: "Moving Scenes" */}
                                <div className="hidden md:flex w-5/12 items-center justify-center relative min-h-[300px]">

                                    {/* Scene 1: Marketplace Selection (Best Choice) */}
                                    {i === 0 && (
                                        <div className="relative w-80 h-56 flex items-center justify-center perspective-1000">
                                            {/* Left Card (Average) */}
                                            <div className="absolute left-4 w-24 h-32 bg-gray-100 rounded-lg border border-gray-200 p-2 opacity-60 scale-90 blur-[1px] transform -rotate-6 transition-all duration-500 animate-[fadeBack_4s_infinite_alternate]">
                                                <div className="w-8 h-8 bg-gray-300 rounded mb-2"></div>
                                                <div className="w-full h-2 bg-gray-300 rounded mb-1"></div>
                                                <div className="w-2/3 h-2 bg-gray-300 rounded"></div>
                                                <div className="mt-4 text-xs font-bold text-gray-400">6% Yield</div>
                                            </div>

                                            {/* Right Card (Average) */}
                                            <div className="absolute right-4 w-24 h-32 bg-gray-100 rounded-lg border border-gray-200 p-2 opacity-60 scale-90 blur-[1px] transform rotate-6 transition-all duration-500 animate-[fadeBack_4s_infinite_alternate]">
                                                <div className="w-8 h-8 bg-gray-300 rounded mb-2"></div>
                                                <div className="w-full h-2 bg-gray-300 rounded mb-1"></div>
                                                <div className="w-2/3 h-2 bg-gray-300 rounded"></div>
                                                <div className="mt-4 text-xs font-bold text-gray-400">5% Yield</div>
                                            </div>

                                            {/* Center Card (The Best) - Pops Up */}
                                            <div className="relative z-20 w-32 h-40 bg-white rounded-xl shadow-2xl border-2 border-blue-400 p-3 transform transition-all duration-500 animate-[scaleIn_4s_infinite_alternate]">
                                                <div className="absolute -top-3 -right-3 bg-yellow-300 text-yellow-600 text-[10px] font-bold px-2 py-1 rounded-full shadow-md animate-bounce">
                                                    BEST PICK
                                                </div>

                                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-3 opacity-20">
                                                    <PieChart size={20} />
                                                </div>
                                                <div className="w-full h-2 bg-gray-100 rounded mb-1 opacity-20"></div>
                                                <div className="w-3/4 h-2 bg-gray-100 rounded mb-4 opacity-20"></div>
                                                <div className="flex items-center gap-2">
                                                    <div className="text-sm font-bold text-blue-600">15% Yield</div>
                                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-sm animate-[scaleIn_0.5s_ease-out_1s_both]">
                                                        <CheckCircle className="text-white w-3 h-3" strokeWidth={3} />
                                                    </div>
                                                </div>
                                                <div className="text-[10px] text-green-500 font-medium opacity-20">Verified Audit</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Scene 2: Digital Token Purchase (Wallet & Token) */}
                                    {i === 1 && (
                                        <div className="relative w-64 h-64 flex items-center justify-center">
                                            {/* Digital Wallet Card */}
                                            <div className="absolute left-0 w-32 h-40 bg-gray-800 rounded-2xl shadow-2xl rotate-[-10deg] border border-gray-600 flex flex-col items-center justify-center z-0">
                                                <div className="w-20 h-2 bg-gray-600 rounded-full mb-4"></div>
                                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center">
                                                    <div className="w-12 h-1 bg-gray-600 rotate-45"></div>
                                                </div>
                                            </div>

                                            {/* The Token Card - Slips Into Wallet */}
                                            <div className="absolute w-28 h-36 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-xl z-10 border-2 border-yellow-200 flex flex-col items-center justify-center p-2 animate-[slide_3s_easeInOut_infinite_alternate]">
                                                <div className="w-12 h-12 bg-white/20 rounded-full mb-2 flex items-center justify-center backdrop-blur-md">
                                                    <Coins className="text-white" size={24} />
                                                </div>
                                                <div className="w-16 h-2 bg-white/30 rounded mb-1"></div>
                                                <div className="w-10 h-2 bg-white/30 rounded"></div>
                                                <div className="mt-4 text-[10px] font-mono text-yellow-900 font-bold bg-white/40 px-2 rounded">TOKEN</div>
                                            </div>

                                            {/* Sparkles */}
                                            <div className="absolute top-10 right-10 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
                                            <div className="absolute bottom-10 left-10 w-2 h-2 bg-yellow-100 rounded-full animate-ping delay-100"></div>
                                        </div>
                                    )}

                                    {/* Scene 3: Energy Flow (Premium Solar Array) */}
                                    {i === 2 && (
                                        <div className="relative w-80 h-56 flex items-center justify-center perspective-[800px] overflow-hidden">

                                            {/* Sun Source with Rays */}
                                            <div className="absolute -top-10 -right-10 z-0">
                                                <Sun className="text-orange-400 w-24 h-24 animate-[spin_30s_linear_infinite] opacity-40 blur-sm" />
                                                <div className="absolute inset-0 bg-orange-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                                            </div>

                                            {/* 3D Solar Array Grid */}
                                            <div className="relative z-10 transform rotate-x-12 rotate-y-12 rotate-z-[-5deg] scale-90">
                                                <div className="grid grid-cols-2 gap-2 w-48 bg-gray-700 p-2 rounded-lg border-b-4 border-r-4 border-gray-800 shadow-2xl relative overflow-hidden group">

                                                    {/* Panels */}
                                                    {[...Array(4)].map((_, idx) => (
                                                        <div key={idx} className="h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded border border-blue-400/30 relative overflow-hidden">

                                                        </div>
                                                    ))}

                                                    {/* Panel Reflection Glare */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                                                </div>
                                            </div>

                                            {/* Energy Transmission Line */}
                                            <div className="absolute bottom-0 left-0 w-full h-24 flex items-end px-10 pb-4 z-20 pointer-events-none">
                                                <div className="w-full h-1 bg-gradient-to-r from-blue-500/50 to-yellow-400/50 rounded-full relative">
                                                    {/* Moving Energy Orbs */}
                                                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_orange] animate-[slide_3s_linear_infinite]"></div>
                                                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-1 bg-white rounded-full blur-[1px] animate-[slide_3s_linear_infinite_1.4s]"></div>
                                                </div>
                                            </div>

                                            {/* Grid/City Destination */}
                                            <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center">
                                                <div className="relative">
                                                    <Zap className="text-yellow-600 w-8 h-8 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-bounce" fill="currentColor" />
                                                    <div className="absolute inset-0 bg-yellow-600 blur-xl opacity-30 animate-ping"></div>
                                                </div>
                                                <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">Grid Live</div>
                                            </div>

                                        </div>
                                    )}

                                    {/* Scene 4: Monthly Returns (Premium Banking App) */}
                                    {i === 3 && (
                                        <div className="relative w-64 h-64 flex items-center justify-center">
                                            {/* Background Rising Coins */}
                                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                                <div className="absolute bottom-0 left-10 text-yellow-400 animate-[flight_4s_linear_infinite] opacity-60"><Coins size={20} /></div>
                                                <div className="absolute bottom-0 right-12 text-yellow-500 animate-[flight_5s_linear_infinite_1s] opacity-60"><DollarSign size={16} /></div>
                                                <div className="absolute -bottom-4 left-20 text-yellow-300 animate-[flight_6s_linear_infinite_2s] opacity-40"><Coins size={14} /></div>
                                            </div>

                                            {/* Phone Body */}
                                            <div className="w-36 h-64 bg-gray-900 border-4 border-gray-700 rounded-[2.5rem] shadow-2xl flex flex-col items-center overflow-hidden relative ring-4 ring-gray-200/20 animate-[float_6s_easeInOut_infinite]">
                                                {/* Notch */}
                                                <div className="w-20 h-5 bg-black rounded-b-xl absolute top-0 z-30"></div>

                                                {/* Screen Content */}
                                                <div className="w-full h-full bg-gray-50 flex flex-col relative">

                                                    {/* Header */}
                                                    <div className="h-16 bg-green-500 w-full flex items-center justify-between px-4 pt-4 pb-2 text-white">
                                                        <div className="text-[10px] font-medium opacity-80">My Wallet</div>
                                                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px]">👤</div>
                                                    </div>

                                                    {/* Balance Card */}
                                                    <div className="mx-3 -mt-6 bg-white rounded-xl shadow-lg p-3 z-10 border border-gray-100 flex flex-col items-center">
                                                        <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Total Balance</div>
                                                        <div className="text-xl font-bold text-gray-800 mt-1 flex items-center gap-1">
                                                            ₹ <span className="animate-[countUp_3s_ease-out_infinite]">5,45,000</span>
                                                        </div>
                                                    </div>

                                                    {/* Transaction List */}
                                                    <div className="flex-1 px-3 pt-4 space-y-2 overflow-hidden">
                                                        <div className="text-[10px] text-gray-400 font-bold mb-1">Recent Activity</div>

                                                        {/* Static Previous Transaction */}
                                                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100 opacity-50">
                                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">📉</div>
                                                            <div className="flex-1">
                                                                <div className="h-2 w-12 bg-gray-200 rounded mb-1"></div>
                                                                <div className="h-1.5 w-8 bg-gray-100 rounded"></div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    {/* Incoming Transaction Animation (Absolute Overlay) */}
                                                    <div className="absolute top-16 left-2 right-2 flex items-center gap-2 p-2 bg-white rounded-lg border border-green-100 animate-[notificationSlide_3s_ease-in-out_3s_infinite] shadow-lg z-20">
                                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                            <DollarSign size={14} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-[10px] font-bold text-gray-800">Solar Dividend</div>
                                                            <div className="text-[8px] text-green-600 font-medium">+ Received</div>
                                                        </div>
                                                        <div className="text-[10px] font-bold text-green-700">+₹45k</div>
                                                    </div>

                                                    {/* Bottom Nav Mockup */}
                                                    <div className="mt-auto h-10 w-full border-t border-gray-200 flex justify-around items-center px-4">
                                                        <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                                                        <div className="w-8 h-1 bg-green-500 rounded-full"></div>
                                                        <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= ROI CALCULATOR ================= */}
            <div id="roi-calculator" className="py-24 bg-gray-900 text-white relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-invest-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <div className="inline-block px-4 py-1.5 bg-yellow-900/30 border border-yellow-500/30 rounded-full text-yellow-500 text-sm font-bold mb-6 backdrop-blur">
                            📈 Project Your Returns
                        </div>
                        <h2 className="text-5xl font-bold mb-6 font-display lining-nums leading-tight">
                            See Your Money <br /> <span className="text-invest-primary">Grow.</span>
                        </h2>
                        <p className="text-gray-400 text-xl mb-12 font-light max-w-lg">
                            Use the slider to estimate potential earnings based on our historical performance of 15% IRR.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-yellow-900/20 flex items-center justify-center group-hover:bg-invest-primary/20 transition">
                                    <CheckCircle className="text-invest-primary" />
                                </div>
                                <span className="font-medium text-lg text-gray-200">Consistent Monthly Income</span>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-yellow-900/20 flex items-center justify-center group-hover:bg-invest-primary/20 transition">
                                    <CheckCircle className="text-invest-primary" />
                                </div>
                                <span className="font-medium text-lg text-gray-200">Asset-Backed Security</span>
                            </div>
                        </div>
                    </div>

                    <div ref={calculatorRef} className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-invest-primary to-orange-500 rounded-[2.5rem] blur opacity-30"></div>
                        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700 p-8 md:p-10 rounded-[2rem] shadow-2xl relative">

                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="font-bold text-gray-400 text-sm tracking-wider uppercase">Investment Amount</span>
                                    <span className="text-3xl font-bold text-white font-display lining-nums">₹ {investment.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="50000"
                                    max="5000000"
                                    step="10000"
                                    value={investment}
                                    onChange={(e) => setInvestment(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-invest-primary hover:accent-yellow-400 transition-all"
                                />
                                <div className="flex justify-between text-xs font-medium text-gray-500 mt-2">
                                    <span>₹ 50k</span>
                                    <span>₹ 50 Lakhs</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700 text-center">
                                    <div className="text-xs text-yellow-500 font-bold uppercase mb-2">Monthly Income</div>
                                    <div className="text-2xl font-bold text-white lining-nums">₹ {Math.round(monthlyEarnings).toLocaleString()}</div>
                                </div>
                                <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700 text-center">
                                    <div className="text-xs text-yellow-500 font-bold uppercase mb-2">Annual Return</div>
                                    <div className="text-2xl font-bold text-white lining-nums">₹ {Math.round(annualEarnings).toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-invest-primary to-orange-500 p-6 rounded-2xl text-center shadow-lg transform transition-transform hover:scale-[1.02]">
                                <div className="text-yellow-100 font-bold text-xs uppercase tracking-widest mb-2">Total 25-Year Earnings</div>
                                <div className="text-4xl md:text-5xl font-black text-white font-display lining-nums">
                                    ₹ {Math.round(totalEarnings).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= FOOTER CTA ================= */}
            <div className="py-24 text-center bg-white text-gray-900">
                <h2 className="text-4xl font-bold font-display mb-8">Ready to grow your wealth?</h2>
                <button onClick={() => navigate('/register')} className="px-12 py-5 bg-invest-primary text-white text-xl font-bold rounded-full shadow-xl shadow-yellow-200 hover:shadow-2xl hover:-translate-y-1 transition">
                    Start Investing Now
                </button>
            </div>

        </div >
    );
};

export default InvestorWelcome;
