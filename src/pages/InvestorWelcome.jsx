import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, BarChart3, ArrowRight } from 'lucide-react';

const InvestorWelcome = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-invest-bg text-invest-text font-sans">
            {/* Header */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-gray-100">
                <div className="text-2xl font-bold text-invest-primary">SolarGrid <span className="text-sm font-normal text-gray-500">Invest</span></div>
                <div className="flex gap-4">
                    <button onClick={() => navigate('/login')} className="px-4 py-2 text-invest-primary font-medium hover:underline">Log In</button>
                    <button onClick={() => navigate('/register')} className="px-6 py-2 bg-invest-primary text-white rounded-lg hover:bg-invest-primary/90 transition shadow-lg shadow-invest-primary/30">Start Investing</button>
                </div>
            </nav>

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
                <motion.div
                    className="md:w-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block px-4 py-1 bg-invest-light/20 text-invest-primary rounded-full text-sm font-semibold mb-6">
                        🚀 12% - 18% Annual Returns
                    </div>
                    <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        The Future of <br /> <span className="text-invest-primary">Solar Investing</span>
                    </h1>
                    <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                        Own a piece of a real solar farm. Track your energy production daily and receive monthly payouts directly to your wallet.
                    </p>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('/investor/market')} className="px-8 py-4 bg-invest-primary text-white text-lg font-bold rounded-lg shadow-xl shadow-invest-primary/20 hover:scale-105 transition flex items-center gap-2">
                            View Opportunities <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 text-lg font-semibold rounded-lg hover:bg-gray-50 transition">
                            How it Works
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="md:w-1/2 relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Abstract Dashboard Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-gray-700">Portfolio Performance</h3>
                            <BarChart3 className="text-invest-primary" />
                        </div>
                        <div className="h-40 flex items-end gap-2 mb-6">
                            {[40, 60, 45, 70, 50, 80, 65, 90].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-invest-light/50 rounded-t-md hover:bg-invest-primary transition cursor-pointer"></div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                            <div>
                                <div className="text-xs text-gray-500 uppercase font-bold">Total Profit</div>
                                <div className="text-2xl font-bold text-gray-800">₹ 8,450</div>
                            </div>
                            <div className="text-green-500 font-bold bg-green-100 px-3 py-1 rounded-full text-sm">
                                +14.2%
                            </div>
                        </div>
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute top-10 right-[-20px] bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
                    >
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Shield className="text-yellow-600" size={20} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-400">STATUS</div>
                            <div className="font-bold text-gray-800">Asset Backed</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default InvestorWelcome;
