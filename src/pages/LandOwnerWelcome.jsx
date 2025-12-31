import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRight, User, MapPin, Calculator, Banknote, Sun, Sprout, TrendingUp, Lock } from 'lucide-react';

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
            // Target the inner glass card (robust selector matching any border-white class or just the first child div that isn't the dot)
            const content = card.querySelector(".group"); // the card container has 'group' class
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
                    scale: 1.2, borderColor: "#2F855A", duration: 0.5,
                    scrollTrigger: { trigger: card, start: "top 60%", toggleActions: "play none none reverse" }
                });
            }
        });

        // Continuous Animations for Step Icons - ALL FLOATING
        gsap.to(".step-icon-1", { y: -10, duration: 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".step-icon-2", { y: -10, duration: 0.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
        gsap.to(".step-icon-3", { y: -10, duration: 0.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });
        gsap.to(".step-icon-4", { rotation: 360, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 });

        // Continuous Hero Animations
        gsap.to(".hero-blob-1", {
            scale: 1.2, x: 20, y: -20, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut"
        });
        gsap.to(".hero-blob-2", {
            scale: 1.1, x: -30, y: 30, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut"
        });

        gsap.to(".hero-image-container", {
            y: -20, duration: 3, repeat: -1, yoyo: true, ease: "power1.inOut"
        });

        gsap.to(".hero-float-card", {
            y: -10, x: 5, duration: 4, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 0.5
        });

        gsap.to(".hero-float-card-2", {
            y: 15, x: -5, duration: 5, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 1
        });

    }, []);

    return (
        <div className="min-h-screen bg-land-bg text-land-text font-sans overflow-x-hidden">

            {/* ================= NAVBAR ================= */}
            {/* ================= NAVBAR ================= */}
            <nav className="fixed w-[100%] top-0 z-50 transition-all duration-300">
                <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg shadow-gray-200/20  px-6 py-4 flex justify-between items-center relative overflow-hidden">
                    {/* Glass Shine Effect */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-50 pointer-events-none"></div>

                    <div className="flex items-center gap-2 cursor-pointer z-10" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-land-primary to-green-600 rounded-full flex items-center justify-center shadow-md">
                            <Sprout className="text-white" size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 tracking-tight font-display">SolarGrid<span className="text-land-primary">.</span></span>
                    </div>

                    <div className="hidden md:flex gap-16 text-gray-600 font-medium z-10">
                        <a href="#how-it-works" className="hover:text-land-primary transition relative group">
                            How it Works
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-land-primary transition-all group-hover:w-full"></span>
                        </a>
                        <a href="#calculator" className="hover:text-land-primary transition relative group">
                            Calculator
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-land-primary transition-all group-hover:w-full"></span>
                        </a>
                    </div>

                    <div className="flex gap-4 z-10">
                        <button onClick={() => navigate('/land-owner/auth')} className="px-6 py-2.5 text-gray-600 font-bold hover:text-land-primary transition">Log In</button>
                        <button onClick={() => navigate('/land-owner/auth')} className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-full hover:bg-black hover:scale-105 transition shadow-lg flex items-center gap-2">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* ================= HERO SECTION ================= */}
            <div ref={heroRef} className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Blobs */}
                <div className="hero-blob-1 absolute top-0 right-0 w-[800px] h-[800px] bg-green-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
                <div className="hero-blob-2 absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-100 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div ref={heroContentRef}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-land-primary rounded-full font-bold text-sm mb-6 relative overflow-hidden">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute "></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Verified Govt. approved Solar Projects
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-bold font-display tracking-tight leading-tight text-gray-900 mb-6 lining-nums">
                            Turn Idle Land into <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-land-primary to-green-400">Recurring Wealth.</span>
                        </h1>
                        <p className="text-xl text-gray-600 font-medium mb-8 max-w-lg leading-relaxed opacity-90">
                            Zero Investment. We lease your land, install solar panels, and pay you guaranteed monthly rent plus a share of the revenue.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/land-owner/auth')} className="px-8 py-4 bg-land-primary text-white text-lg font-bold rounded-xl shadow-xl shadow-green-200 hover:shadow-2xl hover:bg-green-700 transition flex items-center justify-center gap-2">
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
                    <div className="hero-image-container relative group">
                        <div className="absolute inset-0 bg-land-primary rounded-3xl rotate-6 opacity-20 transition-transform group-hover:rotate-3 duration-500"></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-2">
                            <img
                                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000"
                                alt="Solar Farm"
                                className="w-full h-[500px] object-cover rounded-2xl"
                            />
                            {/* Floating Card */}
                            <div className="hero-float-card absolute bottom-8 left-8 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-land-primary">
                                    <Banknote size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Monthly Payout</p>
                                    <p className="text-xl font-bold text-gray-900 font-sans lining-nums">₹ 45,000</p>
                                </div>
                            </div>

                            {/* Secondary Floating Card */}
                            <div className="hero-float-card-2 absolute top-8 right-8 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                                    <Sprout size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">CO₂ Reduced</p>
                                    <p className="text-xl font-bold text-gray-900 font-sans lining-nums">12 Tons</p>
                                </div>
                            </div>

                            {/* Floating Particles */}
                            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-yellow-400 rounded-full blur-[2px] animate-pulse opacity-60"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-400 rounded-full blur-[1px] animate-ping opacity-40"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= HOW IT WORKS (Timeline Journey) ================= */}
            <div id="how-it-works" className="py-32 bg-land-bg1 relative overflow-hidden">
                {/* Dynamic Background Elements for Glass Effect */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[100px]"></div>
                    <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-yellow-100/30 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* PREMIUM HEADING */}
                    <div className="text-center max-w-4xl mx-auto mb-32">
                        <div className="inline-block mb-4 px-6 py-2 rounded-full border border-land-primary/30 bg-land-primary/5 backdrop-blur-md">
                            <span className="text-land-primary font-bold tracking-[0.2em] uppercase text-sm font-display">Monetization Roadmap</span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-land-primary to-gray-900 mb-8 leading-tight lining-nums">
                            Your Path to <br /> Passive Wealth
                        </h2>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-land-primary"></div>
                            <Sun className="text-land-primary fill-current" size={32} />
                            <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-land-primary"></div>
                        </div>
                        <p className="text-2xl text-gray-600 font-light max-w-2xl mx-auto">
                            Transforming your idle asset into a revenue generator is easier than you think. A fully managed, transparent 4-step process.
                        </p>
                    </div>

                    <div ref={stepsRef} className="relative">
                        {/* Central Line (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300/50 -translate-x-1/2 rounded-full overflow-hidden">
                            <div className="timeline-progress w-full h-full bg-gradient-to-b from-land-primary to-green-400 origin-top scale-y-0 shadow-[0_0_20px_rgba(34,197,94,0.6)]"></div>
                        </div>

                        {[
                            {
                                icon: MapPin,
                                title: "1. Submission",
                                subtitle: "The First Step",
                                desc: "Submit your land details for a preliminary satellite & accessibility check.",
                                color: "border-blue-500 text-blue-600",
                                gradient: "from-blue-50/80 to-white/60",
                                features: ["Instant Eligibility Check", "Secure Data Encryption", "No Commitments Required"],
                                animClass: "step-icon-1"
                            },
                            {
                                icon: CheckCircle,
                                title: "2. Expert Audit",
                                subtitle: "Quality Assurance",
                                desc: "Our engineers visit your site to verify soil stability, grid proximity, and sunlight.",
                                color: "border-orange-500 text-orange-600",
                                gradient: "from-orange-50/80 to-white/60",
                                features: ["Drone Topography Scan", "Grid Capacity Feasibility", "Soil Testing Analysis"],
                                animClass: "step-icon-2"
                            },
                            {
                                icon: Calculator,
                                title: "3. The Agreement",
                                subtitle: "Legal & Secure",
                                desc: "We sign a comprehensive 25-year lease agreement with inflation-adjusted rent.",
                                color: "border-purple-500 text-purple-600",
                                gradient: "from-purple-50/80 to-white/60",
                                features: ["25-Year Lock-in Period", "Inflation-Linked Rent", "Zero Maintenance Liability"],
                                animClass: "step-icon-3"
                            },
                            {
                                icon: Sun,
                                title: "4. Earnings Begin",
                                subtitle: "Sit Back & Relax",
                                desc: "Construction begins. Once grid-connected, your monthly rental income starts flowing.",
                                color: "border-green-500 text-green-600",
                                gradient: "from-green-50/80 to-white/60",
                                features: ["Direct Bank Transfer", "Quarterly Revenue Share", "Real-time Monitoring App"],
                                animClass: "step-icon-4"
                            }
                        ].map((step, i) => (
                            <div key={i} className={`timeline-card relative flex items-center justify-between mb-32 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>

                                {/* Content Card - Premium Glass Design */}
                                <div className={`w-full md:w-5/12 p-10 rounded-[2.5rem] border border-white/80 bg-gradient-to-br ${step.gradient} backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-700 hover:-translate-y-2 group cursor-default relative overflow-hidden`}>

                                    {/* Glass Shine Effect */}
                                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/30 via-transparent to-transparent rotate-45 pointer-events-none group-hover:translate-x-10 group-hover:translate-y-10 transition-transform duration-1000"></div>

                                    <div className="flex items-start justify-between mb-8">
                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl bg-white shadow-lg border border-white/60 group-hover:scale-110 transition-transform duration-500 ${step.color.split(' ')[1]}`}>
                                            <step.icon size={36} strokeWidth={1.5} className={step.animClass} />
                                        </div>
                                        <span className="text-8xl font-black text-gray-400 select-none font-display lining-nums">{i + 1}</span>
                                    </div>

                                    <div className="mb-3 flex items-center gap-2">
                                        <div className={`h-[1px] w-8 ${step.color.split(' ')[1].replace('text-', 'bg-')}`}></div>
                                        <div className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 font-display">{step.subtitle}</div>
                                    </div>

                                    <h4 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 mb-6 leading-tight tracking-tight font-display lining-nums">
                                        {step.title}
                                    </h4>

                                    <p className="text-gray-600 leading-relaxed text-lg font-light mb-8 border-b border-gray-200/50 pb-6">
                                        {step.desc}
                                    </p>

                                    {/* Feature List */}
                                    <ul className="space-y-3">
                                        {step.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-gray-900 font-medium group/item">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 ${step.color.split(' ')[1]}`}>
                                                    <CheckCircle size={14} strokeWidth={3} />
                                                </div>
                                                <span className="group-hover/item:text-land-primary transition-colors font-sans text-sm tracking-wide">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Center Node */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-[6px] border-gray-100 rounded-full z-10 items-center justify-center shadow-lg timeline-dot">
                                    <div className={`w-5 h-5 rounded-full ${step.color.split(' ')[1].replace('text-', 'bg-')} opacity-0 transition-opacity duration-500 shadow-[0_0_15px_currentColor]`}></div>
                                </div>

                                {/* ANIMATED ILLUSTRATION (Empty Space Filler) */}
                                <div className="hidden md:flex w-5/12 items-center justify-center relative min-h-[300px] opacity-80">
                                    {/* Illustration 1: Submission / Radar */}
                                    {i === 0 && (
                                        <div className="relative w-64 h-64">
                                            <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-20"></div>
                                            <div className="absolute inset-4 border border-blue-400 rounded-full animate-[ping_3s_ease-in-out_infinite_0.5s] opacity-30"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-32 h-32 bg-blue-50/50 rounded-full blur-xl animate-pulse"></div>
                                                <MapPin className="text-blue-400 w-16 h-16 relative z-10 animate-bounce" />
                                            </div>
                                            {/* Orbiting Dot */}
                                            <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                                                <div className="w-3 h-3 bg-blue-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-[1px]"></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Illustration 2: Audit / Scan */}
                                    {i === 1 && (
                                        <div className="relative w-64 h-64 bg-orange-50/50">
                                            {/* Grid */}
                                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-orange-200"></div>
                                            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-orange-200"></div>
                                            <div className="absolute inset-0 border-2 border-orange-200 rounded-xl overflow-hidden">
                                                {/* Scanning Bar */}
                                                <div className="w-full h-1 bg-orange-500/50 blur-sm absolute top-0 animate-[scan_3s_linear_infinite]"></div>
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-20 h-20 border-2 border-dashed border-orange-300 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center">
                                                    <div className="w-16 h-16 border border-orange-200 rounded-full"></div>
                                                </div>
                                                <CheckCircle className="text-orange-400 w-10 h-10 absolute animate-pulse" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Illustration 3: Agreement / Trust */}
                                    {i === 2 && (
                                        <div className="relative w-64 h-64 flex items-center justify-center">
                                            <div className="absolute w-48 h-56 bg-purple-50 rounded-xl rotate-3 border border-purple-100 shadow-sm transition-transform hover:rotate-6 duration-500"></div>
                                            <div className="absolute w-48 h-56 bg-white rounded-xl -rotate-3 border border-purple-100 shadow-lg flex flex-col items-center justify-center p-6 transition-transform hover:-rotate-6 duration-500">
                                                <div className="w-full h-2 bg-gray-100 rounded mb-2 w-3/4"></div>
                                                <div className="w-full h-2 bg-gray-100 rounded mb-2"></div>
                                                <div className="w-full h-2 bg-gray-100 rounded mb-4 w-5/6"></div>
                                                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-00 flex items-center justify-center mt-4">
                                                    <Lock key="lock" size={24} className='animate-pulse' />
                                                </div>
                                            </div>
                                            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-purple-200/50 rounded-full blur-xl animate-pulse"></div>
                                        </div>
                                    )}

                                    {/* Illustration 4: Earnings / Growth */}
                                    {i === 3 && (
                                        <div className="relative w-64 h-64 flex items-end justify-center gap-4 py-8">
                                            <div className="w-8 bg-green-200 rounded-t-lg h-16 animate-[growth_2s_ease-out_infinite_alternating]"></div>
                                            <div className="w-8 bg-green-300 rounded-t-lg h-24 animate-[growth_2s_ease-out_infinite_alternating_0.2s]"></div>
                                            <div className="w-8 bg-green-400 rounded-t-lg h-32 animate-[growth_2s_ease-out_infinite_alternating_0.4s]"></div>
                                            <div className="w-8 bg-land-primary rounded-t-lg h-40 animate-[growth_2s_ease-out_infinite_alternating_0.6s]"></div>

                                            <div className="absolute top-0 right-0 animate-[spin_20s_linear_infinite]">
                                                <Sun className="text-yellow-500 w-16 h-16" />
                                            </div>
                                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300/30 rounded-full blur-xl animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= CALCULATOR ================= */}
            <div id="calculator" className="py-24 bg-land-bgcalc text-white relative overflow-hidden">
                {/* Background Rotating Sunburst */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl animate-[spin_60s_linear_infinite] origin-center -mr-20"></div>

                {/* Floating Coins/Elements Background */}
                <div className="absolute top-20 right-20 animate-bounce delay-700 opacity-20">
                    <Banknote size={64} className="text-green-300" />
                </div>
                <div className="absolute bottom-20 left-20 animate-[spin_20s_linear_infinite]  opacity-10">
                    <Sun size={80} className="text-yellow-300" />
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <div className="inline-block px-4 py-1.5 bg-green-400/20 border border-green-400/30 rounded-full text-green-100 text-sm font-bold mb-6 backdrop-blur">
                            💰 ROI Calculator
                        </div>
                        <h2 className="text-5xl font-bold mb-6 font-display lining-nums leading-tight">
                            Estimate Your <br /> <span className="text-green-300">Annual Earnings</span>
                        </h2>
                        <p className="text-green-100/80 text-xl mb-12 font-light max-w-lg">
                            Adjust the slider to see how much your idle land could generate. Based on average solar performance in India.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center group-hover:bg-green-400/40 transition">
                                    <CheckCircle className="text-green-300" />
                                </div>
                                <span className="font-medium text-lg">Guaranteed Fixed Rent (Inflation Adjusted)</span>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center group-hover:bg-green-400/40 transition">
                                    <CheckCircle className="text-green-300" />
                                </div>
                                <span className="font-medium text-lg">10-15% Revenue Share from Electricity</span>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center group-hover:bg-green-400/40 transition">
                                    <CheckCircle className="text-green-300" />
                                </div>
                                <span className="font-medium text-lg">0 Maintenance Cost for You</span>
                            </div>
                        </div>
                    </div>

                    <div ref={calculatorRef} className="relative">
                        {/* Card Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-yellow-100 rounded-[2.5rem] blur-xl opacity-30 animate-pulse"></div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[2rem] shadow-2xl relative">
                            <div className="flex justify-between items-center mb-8">
                                <span className="font-bold text-green-100 tracking-wider text-sm">LAND SIZE</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-white font-display lining-nums">{acres}</span>
                                    <span className="text-xl font-medium text-green-200">Acres</span>
                                </div>
                            </div>

                            <div className="mb-12 relative">
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={acres}
                                    onChange={(e) => setAcres(parseInt(e.target.value))}
                                    className="w-full h-4 bg-green-900/40 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(255,255,255,0.5)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                                />
                                <div className="flex justify-between text-xs font-bold text-green-400/60 mt-2 px-1">
                                    <span>1 Acre</span>
                                    <span>50 Acres</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-green-900/30 p-4 rounded-2xl text-center border border-white/5 hover:bg-green-900/50 transition">
                                    <div className="text-xs text-green-300 font-bold uppercase mb-1 tracking-wider">Fixed Rent</div>
                                    <div className="text-xl font-bold font-display lining-nums">₹ {(acres * baseRate).toLocaleString()}</div>
                                </div>
                                <div className="bg-green-900/30 p-4 rounded-2xl text-center border border-white/5 hover:bg-green-900/50 transition">
                                    <div className="text-xs text-green-300 font-bold uppercase mb-1 tracking-wider">Rev. Share</div>
                                    <div className="text-xl font-bold font-display lining-nums">~ ₹ {(acres * revenueShare).toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl text-center shadow-lg transform transition-transform hover:scale-[1.02]">
                                <div className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Total Estimated Income</div>
                                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-land-primary to-green-600 font-display lining-nums">
                                    ₹ {formattedEarnings}
                                </div>
                                <div className="text-xs text-gray-400 font-medium mt-3 bg-gray-50 inline-block px-3 py-1 rounded-full">
                                    *Per Annum (Approx)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= FOOTER CTA ================= */}
            <div className="py-24 text-center">
                <h2 className="text-3xl font-bold font-display mb-8">Ready to transform your land?</h2>
                <button onClick={() => navigate('/land-owner/auth')} className="px-10 py-4 bg-land-primary text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition">
                    Start Your Application
                </button>
            </div>

        </div>
    );
};

export default LandOwnerWelcome;
