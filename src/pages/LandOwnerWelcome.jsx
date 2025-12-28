import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, User } from 'lucide-react';

const LandOwnerWelcome = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-land-bg text-land-text">
            {/* Header */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-2xl font-bold text-land-primary">SolarGrid <span className="text-sm font-normal text-gray-500">for Land Owners</span></div>
                <div className="flex gap-4">
                    <button onClick={() => navigate('/login')} className="px-4 py-2 text-land-primary font-medium hover:underline">Log In</button>
                    <button onClick={() => navigate('/register')} className="px-6 py-2 bg-land-primary text-white rounded-full hover:bg-land-primary/90 transition">Get Started</button>
                </div>
            </nav>

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl font-bold text-land-primary mb-6 leading-tight">
                        Your Land. <br /> Our Technology. <br /> <span className="text-gray-800">Guaranteed Income.</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Transform your unused acres into a powerhouse of renewable energy. We handle the installation, maintenance, and funding. You just collect the rent.
                    </p>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('/land-owner/submit')} className="px-8 py-4 bg-land-primary text-white text-lg font-bold rounded-lg shadow-lg hover:translate-y-[-2px] transition flex items-center gap-2">
                            Check My Land Eligibility <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <User className="text-land-primary" />
                            </div>
                            <div>
                                <div className="font-bold text-lg">Estimated Earnings</div>
                                <div className="text-gray-500 text-sm">Based on 5 Acres in Tamil Nadu</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b">
                                <span>Fixed Monthly Rent</span>
                                <span className="font-bold text-land-primary">+ ₹25,000</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                <span>Revenue Share (10%)</span>
                                <span className="font-bold text-land-primary">+ ₹12,500</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 text-xl font-bold">
                                <span>Total Monthly</span>
                                <span className="text-green-600">₹37,500</span>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute top-[-20px] right-[-20px] w-full h-full bg-land-primary/10 rounded-2xl -z-0"></div>
                </motion.div>
            </div>

            {/* Features */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">Why lease to SolarGrid?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Zero Investment", desc: "You don't pay a single rupee. Investors fund the entire solar infrastructure." },
                            { title: "25-Year Lease", desc: "Secure, long-term passive income agreement backed by legal contracts." },
                            { title: "Green Impact", desc: "Your land will generate clean energy for thousands of local homes." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-land-bg rounded-xl hover:shadow-md transition">
                                <CheckCircle className="text-land-primary mb-4" size={32} />
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LandOwnerWelcome;
