import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Map, DollarSign, Settings, LogOut, CheckCircle, XCircle, AlertTriangle, Eye, Activity, Shield, Command, Hexagon } from 'lucide-react';
import gsap from 'gsap';
import api from '../api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Animation Refs
    const sidebarRef = useRef(null);
    const mainRef = useRef(null);
    const bgRef = useRef(null);

    // Mock Data State (Will replace with API later)
    // Data State
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeLands: 0,
        totalInvested: 0,
        pendingApprovals: 0
    });
    const [pendingLands, setPendingLands] = useState([]);
    const [pendingInvestments, setPendingInvestments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const statsRes = await api.get('/admin/stats');
            setStats({
                totalUsers: statsRes.data.total_users,
                activeLands: statsRes.data.active_lands,
                totalInvested: statsRes.data.total_volume,
                pendingApprovals: (statsRes.data.pending_lands + statsRes.data.pending_investments)
            });

            const landsRes = await api.get('/admin/lands/pending');
            setPendingLands(landsRes.data);

            const invRes = await api.get('/admin/investments/pending');
            setPendingInvestments(invRes.data);

            setLoading(false);
        } catch (error) {
            console.error("Admin Fetch Error", error);
            if (error.response?.status === 403 || error.response?.status === 401) navigate('/admin');
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000); // Poll every 10s

        // --- Entrance Animations ---
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(bgRef.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.5 })
            .fromTo(sidebarRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '-=1')
            .fromTo(mainRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
            .fromTo('.stagger-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.6 }, '-=0.4');

        return () => clearInterval(interval);
    }, []);

    const handleApproveLand = async (id) => {
        if (!window.confirm("Approve this land for public investment?")) return;
        try {
            await api.post(`/admin/lands/${id}/approve`);
            fetchData();
        } catch (e) { alert("Action Failed"); }
    };

    const handleRejectLand = async (id) => {
        if (!window.confirm("Reject and remove this land?")) return;
        try {
            await api.post(`/admin/lands/${id}/reject`);
            fetchData();
        } catch (e) { alert("Action Failed"); }
    };

    const handleApproveInvestment = async (id) => {
        if (!window.confirm("Approve investor request? This will request payment.")) return;
        try {
            await api.post(`/admin/investments/${id}/approve`);
            fetchData();
        } catch (e) { alert("Action Failed"); }
    };

    const handleLogout = () => {
        gsap.to([sidebarRef.current, mainRef.current], {
            opacity: 0, y: 10, duration: 0.3, onComplete: () => {
                localStorage.removeItem('user_id');
                navigate('/admin');
            }
        });
    };

    return (
        <div className="flex h-screen bg-[#0a0a0c] text-gray-100 font-sans overflow-hidden selection:bg-blue-500/30 font-display">
            {/* Background Layers */}
            <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Sidebar */}
            <aside ref={sidebarRef} className="w-72 relative z-20 flex flex-col border-r border-white/5 bg-gray-900/30 backdrop-blur-xl">
                <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-4 font-bold text-xl text-white tracking-wide font-display group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            <Shield size={20} className="text-white" />
                        </div>
                        <div>
                            <div className="text-xs text-blue-400 font-mono mb-0.5 tracking-widest">NEXUS</div>
                            ADMIN<span className="text-gray-500">CORE</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-3">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">Main Menu</div>
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <NavItem icon={<Map size={20} />} label="Land Approvals" active={activeTab === 'lands'} count={pendingLands.length} onClick={() => setActiveTab('lands')} />
                    <NavItem icon={<DollarSign size={20} />} label="Investments" active={activeTab === 'investments'} count={pendingInvestments.length} onClick={() => setActiveTab('investments')} />

                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mt-8 mb-2">System</div>
                    <NavItem icon={<Users size={20} />} label="User Registry" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                    <NavItem icon={<Activity size={20} />} label="System Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
                </nav>

                <div className="p-6 border-t border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all group">
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> Terminate Session
                    </button>
                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-600 font-mono">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        SECURE CONNECTION
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main ref={mainRef} className="flex-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                <div className="p-10 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight font-display">
                                {activeTab === 'overview' && 'System Overview'}
                                {activeTab === 'lands' && 'Land Verification'}
                                {activeTab === 'investments' && 'Investment Requests'}
                                {activeTab === 'users' && 'User Registry'}
                                {activeTab === 'logs' && 'System Logs'}
                            </h1>
                            <p className="text-gray-400 text-sm font-medium">Welcome back, Administrator. System is operating at peak efficiency.</p>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 bg-green-500/5 border border-green-500/20 rounded-full text-green-400 text-xs font-bold shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            LIVE DATA FEED
                        </div>
                    </div>

                    {/* Content Switcher */}
                    {activeTab === 'overview' && <OverviewSection stats={stats} />}

                    {activeTab === 'lands' && (
                        <TableSection
                            title="Pending Land Verifications"
                            headers={['ID', 'Location', 'Owner', 'Area (Acres)', 'Expected Rent', 'Action']}
                            data={pendingLands}
                            renderRow={(land) => (
                                <tr key={land.id} className="group border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-5 text-gray-500 font-mono text-xs">#{land.id}</td>
                                    <td className="px-6 py-5 font-bold text-white group-hover:text-blue-400 transition-colors">{land.location}</td>
                                    <td className="px-6 py-5 text-gray-400">
                                        <div className="font-medium text-gray-300">{land.users?.full_name}</div>
                                        <div className="text-xs opacity-50">{land.users?.email}</div>
                                    </td>
                                    <td className="px-6 py-5 text-blue-400 font-mono">{land.area_acres} ac</td>
                                    <td className="px-6 py-5 text-emerald-400 font-mono">₹{land.expected_rent?.toLocaleString() || 0}/mo</td>
                                    <td className="px-6 py-5 flex gap-2">
                                        <button onClick={() => handleApproveLand(land.id)} className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500 hover:text-white hover:scale-110 transition-all shadow-lg hover:shadow-green-500/30"><CheckCircle size={18} /></button>
                                        <button onClick={() => handleRejectLand(land.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white hover:scale-110 transition-all shadow-lg hover:shadow-red-500/30"><XCircle size={18} /></button>
                                    </td>
                                </tr>
                            )}
                            emptyMessage="No pending land submissions."
                        />
                    )}

                    {activeTab === 'investments' && (
                        <TableSection
                            title="Pending Investment Requests"
                            headers={['Ref ID', 'Asset Details', 'Investor Info', 'Amount', 'Date', 'Authorization']}
                            data={pendingInvestments}
                            renderRow={(inv) => (
                                <tr key={inv.id} className="group border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-5 text-gray-500 font-mono text-xs">#{inv.id ? inv.id.substring(0, 8) : '...'}</td>
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-white group-hover:text-amber-400 transition-colors">{inv.lands?.location}</div>
                                        <span className="text-xs text-gray-500 font-mono">{inv.lands?.area_sqft?.toLocaleString() || 0} sqft</span>
                                    </td>
                                    <td className="px-6 py-5 text-gray-400">
                                        <div className="font-medium text-gray-300">{inv.users?.full_name}</div>
                                        <div className="text-xs opacity-50">{inv.users?.email}</div>
                                    </td>
                                    <td className="px-6 py-5 text-emerald-400 font-mono text-lg">₹{inv.amount?.toLocaleString()}</td>
                                    <td className="px-6 py-5 text-gray-500 text-xs font-mono">{new Date(inv.created_at || Date.now()).toLocaleDateString()}</td>
                                    <td className="px-6 py-5">
                                        <button onClick={() => handleApproveInvestment(inv.id)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center gap-2">
                                            Authorize <ChevronRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            )}
                            emptyMessage="No pending investment requests."
                        />
                    )}

                    {activeTab === 'users' && <PlaceholderSection title="User Management" />}
                    {activeTab === 'logs' && <PlaceholderSection title="System Logs" />}

                </div>
            </main>
        </div>
    );
};

// --- Sub-Components ---

const NavItem = ({ icon, label, active, onClick, count }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group ${active
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 translate-x-1'
            : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
            }`}
    >
        <div className="flex items-center gap-3">
            <span className={`${active ? 'text-white' : 'text-gray-500 group-hover:text-blue-400'} transition-colors`}>{icon}</span>
            {label}
        </div>
        {count > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-mono shadow-md shadow-red-500/20 animate-pulse">
                {count}
            </span>
        )}
    </button>
);

const StatCard = ({ label, value, icon, color, trend }) => (
    <div className="stagger-item bg-gray-800/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-all hover:-translate-y-1 hover:shadow-2xl">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 ${color}`}>
            {icon}
        </div>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-gray-900/50 border border-white/5 ${color.replace('text', 'text')}`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            {trend && <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">+{trend}%</span>}
        </div>
        <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
            <h3 className="text-3xl font-bold text-white font-display">{value}</h3>
        </div>
    </div>
);

const OverviewSection = ({ stats }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Users" value={stats.totalUsers} icon={<Users />} color="text-blue-500" trend="12" />
        <StatCard label="Active Lands" value={stats.activeLands} icon={<Map />} color="text-emerald-500" trend="5" />
        <StatCard label="Total Volume" value={`₹ ${(stats.totalInvested / 100000).toFixed(1)}L`} icon={<DollarSign />} color="text-amber-500" trend="8.4" />
        <StatCard label="Pending Items" value={stats.pendingApprovals} icon={<AlertTriangle />} color="text-red-500" />
    </div>
);

const TableSection = ({ title, headers, data, renderRow, emptyMessage }) => (
    <div className="stagger-item bg-gray-800/20 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
            <h3 className="text-lg font-bold text-white font-display tracking-tight">{title}</h3>
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-900/50 text-gray-500 uppercase font-bold text-[10px] tracking-widest border-b border-white/5">
                    <tr>
                        {headers.map(h => <th key={h} className="px-6 py-4">{h}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {data.length === 0 ? (
                        <tr><td colSpan={headers.length} className="px-6 py-20 text-center text-gray-500 italic flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-600">
                                <CheckCircle size={32} />
                            </div>
                            {emptyMessage}
                        </td></tr>
                    ) : data.map(renderRow)}
                </tbody>
            </table>
        </div>
    </div>
);

const PlaceholderSection = ({ title }) => (
    <div className="stagger-item bg-gray-800/20 backdrop-blur border-2 border-dashed border-gray-700/50 rounded-3xl p-16 text-center group hover:border-gray-600 transition-colors">
        <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Settings size={40} className="text-gray-600 group-hover:text-blue-500 transition-colors" />
        </div>
        <h3 className="text-2xl font-bold text-gray-300 mb-3 font-display">{title}</h3>
        <p className="text-gray-500 max-w-md mx-auto">This module is currently under active development. Access will be granted in the next system update.</p>
    </div>
);

export default AdminDashboard;
