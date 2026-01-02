import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, DollarSign, Settings, Plus, LogOut, Sun, CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import api from '../api';

const LandOwnerDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // API State
    const [user, setUser] = useState({ name: "Loading...", role: "" });
    const [lands, setLands] = useState([]);
    const [earnings, setEarnings] = useState({ total_earnings: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch User Profile
                const userRes = await api.get('/auth/me');
                setUser({
                    name: userRes.data.full_name,
                    role: userRes.data.role === 'land_owner' ? 'Land Owner' : 'User'
                });

                // 2. Fetch My Lands
                const landsRes = await api.get('/land/my-lands');
                setLands(landsRes.data);

                // 3. Fetch Earnings
                try {
                    const earnRes = await api.get('/land/my-earnings');
                    setEarnings(earnRes.data);
                } catch (e) {
                    // console.warn("Earnings endpoint might fail if no active lands", e);
                }

            } catch (error) {
                console.error("Dashboard Load Error:", error);
                if (error.response?.status === 401) {
                    navigate('/land-owner/auth');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/');
    };

    // Derived Stats
    const activeLeases = lands.filter(l => l.status === 'active').length;
    const totalLands = lands.length;
    const monthlyIncome = activeLeases * 5000;

    // Static Data for "Next Payout"
    const nextPayout = activeLeases > 0 ? "Feb 1, 2026" : "-";

    const stats = {
        totalLands: totalLands,
        activeLeases: activeLeases,
        monthlyIncome: monthlyIncome,
        nextPayout: nextPayout
    };

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-land-bg">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-land-primary"></div>
        </div>
    );

    return (
        <div className="flex h-screen bg-land-bg font-medium z-10 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-land-light/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-land-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

            {/* ================= SIDEBAR ================= */}
            <aside className="w-72 bg-land-bg backdrop-blur-xl border-r border-white/50 hidden md:flex flex-col shadow-2xl z-20 relative">
                <div className="p-8">
                    <div className="flex items-center gap-3 font-display font-bold text-2xl text-land-text tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-land-primary to-land-light rounded-xl flex items-center justify-center shadow-lg shadow-land-primary/30">
                            <Sun className="text-white fill-current" size={22} />
                        </div>
                        SolarGrid
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavItem icon={<LayoutDashboard size={22} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <NavItem icon={<Map size={22} />} label="My Lands" active={activeTab === 'lands'} onClick={() => setActiveTab('lands')} />
                    <NavItem icon={<DollarSign size={22} />} label="Payments" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
                    <NavItem icon={<Settings size={22} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </nav>

                <div className="p-6 border-t border-gray-100/50 bg-white/40">
                    <div className="flex items-center gap-4 mb-4 px-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-land-primary to-land-light p-0.5 shadow-md">
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-land-primary font-bold text-xl">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-900 leading-tight">{user.name}</div>
                            <div className="text-xs text-land-primary font-medium mt-0.5 bg-land-light/20 px-2 py-0.5 rounded-full inline-block">
                                {user.role}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 group">
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <main className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
                {/* Mobile Header */}
                <div className="md:hidden bg-white/90 backdrop-blur-md p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-30 shadow-sm">
                    <span className="font-display font-bold text-xl text-land-primary">SolarGrid</span>
                    <button className="p-2 text-gray-600"><Settings size={24} /></button>
                </div>

                <div className="p-6 lg:p-12 max-w-7xl mx-auto space-y-10">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
                        <div>
                            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                            <p className="text-gray-500 text-lg font-light">Welcome back, {user.name.split(' ')[0]}. Here's your portfolio status.</p>
                        </div>
                        <button
                            onClick={() => navigate('/land-owner/submit')}
                            className="bg-land-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-land-primary/30 hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 active:scale-95 group"
                        >
                            <div className="bg-white/20 p-1 rounded-full group-hover:rotate-90 transition-transform duration-500">
                                <Plus size={18} />
                            </div>
                            Submit New Land
                        </button>
                    </div>

                    {/* Content Switcher */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {activeTab === 'overview' && <OverviewSection stats={stats} lands={lands} />}
                        {activeTab === 'lands' && <MyLandsSection lands={lands} />}
                        {activeTab === 'payments' && <div className="text-gray-400 font-light text-xl text-center py-32 bg-white/50 rounded-3xl border border-white">No Payment History Yet</div>}
                        {activeTab === 'settings' && <div className="text-gray-400 font-light text-xl text-center py-32 bg-white/50 rounded-3xl border border-white">Settings Module Coming Soon</div>}
                    </div>

                </div>
            </main>
        </div>
    );
};

// --- Sub-Components ---

const NavItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden group ${active
            ? 'text-land-primary bg-land-light/10 shadow-sm'
            : 'text-gray-500 hover:text-land-primary hover:bg-gray-50'
            }`}
    >
        {active && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-land-primary rounded-r-full"></div>}
        <span className={`transform transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
        {label}
    </button>
);

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-inner flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">{label}</span>
        </div>
        <div className="text-3xl font-sans  text-gray-800">{value}</div>
    </div>
);

const OverviewSection = ({ stats, lands }) => (
    <div className="space-y-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Map className="text-blue-500" />} label="Total Properties" value={stats.totalLands} />
            <StatCard icon={<CheckCircle className="text-green-500" />} label="Active Leases" value={stats.activeLeases} />
            <StatCard icon={<DollarSign className="text-yellow-600" />} label="Monthly Income" value={`₹${stats.monthlyIncome?.toLocaleString()}`} />
            <StatCard icon={<Clock className="text-purple-500" />} label="Next Payout" value={stats.nextPayout} />
        </div>

        {/* Recent Activity / Lands Preview */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-100/50 flex justify-between items-center bg-white/40">
                <h3 className="font-display font-bold text-xl text-gray-800">Your Properties</h3>
                <span className="text-sm font-bold text-land-primary cursor-pointer hover:bg-land-light/10 px-3 py-1 rounded-lg transition-colors">View All</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 text-gray-400 uppercase tracking-wider font-bold text-xs">
                        <tr>
                            <th className="px-8 py-5">Title</th>
                            <th className="px-8 py-5">Location</th>
                            <th className="px-8 py-5">Area</th>
                            <th className="px-8 py-5">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100/50">
                        {lands.length === 0 ? (
                            <tr><td colSpan="4" className="px-8 py-10 text-center text-gray-400 font-medium block">No properties submitted yet.</td></tr>
                        ) : lands.map((land) => (
                            <tr key={land.id} className="hover:bg-white/60 transition-colors group cursor-default">
                                <td className="px-8 py-5 font-bold text-gray-800">{land.title}</td>
                                <td className="px-8 py-5 text-gray-500">{land.location}</td>
                                <td className="px-8 py-5 text-gray-800 font-mono font-medium">{land.area_sqft} <span className="text-gray-400 text-xs">sqft</span></td>
                                <td className="px-8 py-5"><StatusBadge status={land.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const MyLandsSection = ({ lands }) => (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white shadow-xl overflow-hidden animate-fade-in-up">
        <div className="p-8 border-b border-gray-100/50 bg-white/40">
            <h3 className="font-display font-bold text-xl text-gray-800">All Submitted Lands</h3>
            <p className="text-gray-500 text-sm mt-1">Manage and track your submitte properties.</p>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50/50 text-gray-400 uppercase tracking-wider font-bold text-xs">
                    <tr>
                        <th className="px-8 py-5">Property Name</th>
                        <th className="px-8 py-5">Size</th>
                        <th className="px-8 py-5">Location</th>
                        <th className="px-8 py-5">Current Status</th>
                        <th className="px-8 py-5">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50">
                    {lands.length === 0 ? (
                        <tr><td colSpan="5" className="px-8 py-12 text-center text-gray-400 font-medium">No properties found.</td></tr>
                    ) : lands.map((land) => (
                        <tr key={land.id} className="hover:bg-white/60 transition-colors">
                            <td className="px-8 py-5 font-bold text-gray-800">{land.title}</td>
                            <td className="px-8 py-5 text-gray-800 font-mono">{land.area_sqft} <span className="text-gray-400 text-xs">sqft</span></td>
                            <td className="px-8 py-5">{land.location}</td>
                            <td className="px-8 py-5"><StatusBadge status={land.status} /></td>
                            <td className="px-8 py-5">
                                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-land-primary hover:text-white transition-all shadow-sm">
                                    <ChevronRight size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        active: "bg-green-100 text-green-700 border-green-200",
        available: "bg-green-50 text-green-600 border-green-100",
        pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
        pending_approval: "bg-orange-50 text-orange-600 border-orange-200",
        approved: "bg-blue-50 text-blue-700 border-blue-200",
        rejected: "bg-red-50 text-red-600 border-red-200",
    };
    // Normalize status to lowercase for matching
    const normalizedKey = status?.toLowerCase() || 'pending';

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${styles[normalizedKey] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${normalizedKey.includes('active') || normalizedKey.includes('approved') ? 'animate-pulse bg-current' : 'bg-current opacity-50'}`}></span>
            {status?.replace('_', ' ') || 'Unknown'}
        </span>
    );
};

export default LandOwnerDashboard;
