import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Trees, Zap, ArrowRight, ShieldCheck, Banknote, Sun, Clock, TrendingUp, Cloud, Leaf, Coins, BarChart, Bird, Hexagon } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const leftSideRef = useRef(null);
    const rightSideRef = useRef(null);
    const leftContentRef = useRef(null);
    const rightContentRef = useRef(null);
    const leftFloatingRef = useRef(null);
    const rightFloatingRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        // Entrance
        tl.fromTo(leftSideRef.current, { x: '-100%' }, { x: '0%', duration: 1, ease: 'power3.out' })
            .fromTo(rightSideRef.current, { x: '100%' }, { x: '0%', duration: 1, ease: 'power3.out' }, '-=0.8')
            .fromTo([leftContentRef.current, rightContentRef.current],
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
            );

        // Continuous Floating Animation (Gentle)
        const float = (elements) => {
            gsap.to(elements, {
                y: "-=20",
                rotation: 5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5
            });
        }

        // Specific Land Animations
        gsap.to(".cloud-anim", {
            x: "+=100",
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "linear"
        });
        gsap.to(".sun-anim", {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "linear"
        });

        // Specific Investor Animations
        gsap.to(".chart-bar-anim", {
            scaleY: 1.5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            stagger: 0.2
        });

        // Select all children of floating refs for general float
        if (leftFloatingRef.current) float(leftFloatingRef.current.children);
        if (rightFloatingRef.current) float(rightFloatingRef.current.children);

    }, []);

    const handleHoverLeft = () => {
        gsap.to(leftSideRef.current, { width: '65%', duration: 0.6, ease: 'power2.inOut' });
        gsap.to(rightSideRef.current, { width: '35%', duration: 0.6, ease: 'power2.inOut' });
        gsap.to(leftContentRef.current, { scale: 1.05, duration: 0.5 });
        gsap.to(rightContentRef.current, { scale: 0.95, opacity: 0.7, duration: 0.5 });
    };

    const handleHoverRight = () => {
        gsap.to(leftSideRef.current, { width: '35%', duration: 0.6, ease: 'power2.inOut' });
        gsap.to(rightSideRef.current, { width: '65%', duration: 0.6, ease: 'power2.inOut' });
        gsap.to(rightContentRef.current, { scale: 1.05, duration: 0.5 });
        gsap.to(leftContentRef.current, { scale: 0.95, opacity: 0.7, duration: 0.5 });
    };

    const handleReset = () => {
        gsap.to([leftSideRef.current, rightSideRef.current], { width: '50%', duration: 0.6, ease: 'power2.inOut' });
        gsap.to([leftContentRef.current, rightContentRef.current], { scale: 1, opacity: 1, duration: 0.5 });
    };

    return (
        <div ref={containerRef} className="relative w-full h-screen flex overflow-hidden font-sans">

            {/* ================= LEFT SIDE: LAND OWNER ================= */}
            <div
                ref={leftSideRef}
                className="relative h-full bg-land-bg text-land-primary flex flex-col justify-center items-center cursor-pointer border-r border-gray-200 overflow-hidden"
                onMouseEnter={handleHoverLeft}
                onMouseLeave={handleReset}
                onClick={() => navigate('/land-owner/welcome')}
                style={{ width: '50%' }}
            >
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_left,_#2F855A_0%,_transparent_50%)]"></div>

                {/* Animated Floating Elements (Land) */}
                <div ref={leftFloatingRef} className="absolute inset-0 pointer-events-none opacity-20">
                    <Leaf className="absolute top-20 left-20 w-16 h-16 text-land-primary" />
                    <Cloud className="cloud-anim absolute top-40 right-40 w-24 h-24 text-land-primary" />
                    <Trees className="absolute bottom-32 left-32 w-20 h-20 text-land-primary" />
                    <Bird className="absolute top-1/4 left-1/2 w-12 h-12 text-land-primary" />
                    <Hexagon className="sun-anim absolute bottom-20 right-32 w-32 h-32 text-land-light opacity-30" />

                    {/* Random Circles */}
                    <div className="absolute top-1/2 left-10 w-4 h-4 rounded-full bg-land-primary"></div>
                    <div className="absolute bottom-10 right-1/2 w-8 h-8 rounded-full bg-land-light"></div>
                </div>

                <div ref={leftContentRef} className="z-10 text-center p-8 max-w-2xl transition-all relative">
                    <div className="mb-8 inline-flex items-center justify-center p-6 bg-white rounded-full shadow-xl shadow-land-primary/10">
                        <Trees size={64} className="text-land-primary" strokeWidth={1.5} />
                    </div>

                    <h2 className="text-sm font-bold tracking-widest text-land-light uppercase mb-2">For Land Owners</h2>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Nature's Asset, <br />
                        <span className="text-land-light">Your Income.</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto leading-relaxed font-medium">
                        Lease your idle land for solar projects.
                        <br />
                        <span className="text-land-primary">Guaranteed Monthly Rent + 100% Green Impact.</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10 max-w-lg mx-auto">
                        <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg backdrop-blur-sm border border-white/50 shadow-sm">
                            <ShieldCheck size={20} className="text-land-primary" /> <span className="text-gray-800 font-medium">25-Year Secure Lease</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg backdrop-blur-sm border border-white/50 shadow-sm">
                            <Banknote size={20} className="text-land-primary" /> <span className="text-gray-800 font-medium">Rs. 30k+ / Acre / Year</span>
                        </div>
                    </div>

                    <button className="group px-10 py-4 bg-land-primary text-white text-lg font-bold rounded-full flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl hover:bg-land-primary/90 transition-all transform hover:-translate-y-1">
                        Submit My Land <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* ================= RIGHT SIDE: INVESTOR ================= */}
            <div
                ref={rightSideRef}
                className="relative h-full bg-white text-invest-primary flex flex-col justify-center items-center cursor-pointer overflow-hidden"
                onMouseEnter={handleHoverRight}
                onMouseLeave={handleReset}
                onClick={() => navigate('/investor/welcome')}
                style={{ width: '50%' }}
            >
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[repeating-linear-gradient(45deg,#D69E2E_0,#D69E2E_1px,transparent_0,transparent_50%)] bg-[length:30px_30px]"></div>

                {/* Animated Floating Elements (Investor) */}
                <div ref={rightFloatingRef} className="absolute inset-0 pointer-events-none opacity-20">
                    <Coins className="absolute top-20 right-20 w-16 h-16 text-invest-primary" />
                    <TrendingUp className="absolute bottom-40 left-20 w-24 h-24 text-invest-primary" />
                    <BarChart className="chart-bar-anim absolute top-1/3 right-1/4 w-20 h-20 text-invest-primary" />
                    <Sun className="sun-anim absolute bottom-20 right-20 w-32 h-32 text-orange-400 opacity-50" />


                    {/* Random Geometric Shapes */}
                    <div className="chart-bar-anim absolute top-1/2 right-10 w-6 h-6 rotate-45 bg-invest-primary"></div>
                    <div className="chart-bar-anim absolute bottom-10 left-1/3 w-4 h-4 rounded-sm bg-invest-primary"></div>
                </div>

                <div ref={rightContentRef} className="z-10 text-center p-8 max-w-2xl transition-all relative">
                    <div className="mb-8 inline-flex items-center justify-center p-6 bg-gray-50 rounded-full shadow-xl shadow-invest-primary/10 border border-gray-100">
                        <Zap size={64} className="text-invest-primary" strokeWidth={1.5} />
                    </div>

                    <h2 className="text-sm font-bold tracking-widest text-invest-light uppercase mb-2">For Investors</h2>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                        Power Future, <br />
                        <span className="text-invest-primary">Grow Wealth.</span>
                    </h1>

                    <p className="text-xl text-gray-500 mb-10 max-w-md mx-auto leading-relaxed font-medium">
                        Invest in fractional ownership of solar farms.
                        <br />
                        <span className="text-invest-primary">High Yield (15% IRR) + Asset Backed Security.</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10 max-w-lg mx-auto">
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                            <TrendingUp size={20} className="text-invest-primary" /> <span className="text-gray-800 font-medium">Target 15% Returns</span>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                            <ShieldCheck size={20} className="text-invest-primary" /> <span className="text-gray-800 font-medium">100% Insured Assets</span>
                        </div>
                    </div>

                    <button className="group px-10 py-4 bg-invest-primary text-white text-lg font-bold rounded-full flex items-center gap-3 mx-auto shadow-lg shadow-invest-primary/30 hover:shadow-xl hover:bg-invest-primary/90 transition-all transform hover:-translate-y-1">
                        Start Investing <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* CENTER LOGO TAG */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-land-primary"></div>
                <span className="font-bold text-gray-800 tracking-wider text-sm">SOLAR GRID</span>
                <div className="w-3 h-3 rounded-full bg-invest-primary"></div>
            </div>

        </div>
    );
};

export default LandingPage;
