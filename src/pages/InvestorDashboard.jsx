import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, PieChart, Wallet, Settings, LogOut, Sun, TrendingUp, ArrowUpRight, Shield, CreditCard, Search, MapPin } from 'lucide-react';
import api from '../api';

const InvestorDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // API State
    const [user, setUser] = useState({ name: "Loading...", role: "" });
    const [marketLands, setMarketLands] = useState([]);
    const [myInvestments, setMyInvestments] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [showAddModal, setShowAddModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showInvestModal, setShowInvestModal] = useState(false);

    // Transaction State
    const [amount, setAmount] = useState("");
    const [investAmount, setInvestAmount] = useState("");
    const [selectedLand, setSelectedLand] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleTransaction = async (type) => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        setProcessing(true);
        try {
            const endpoint = type === 'add' ? '/invest/wallet/add' : '/invest/wallet/withdraw';
            const res = await api.post(endpoint, { amount: parseFloat(amount) });
            setWalletBalance(res.data.balance);
            alert(type === 'add' ? "Funds Added!" : "Withdrawal Successful!");
            setShowAddModal(false);
            setShowWithdrawModal(false);
            setAmount("");
        } catch (error) {
            alert(error.response?.data?.detail || "Transaction Failed");
        } finally {
            setProcessing(false);
        }
    };

    const handleInvest = async () => {
        if (!investAmount || isNaN(investAmount) || investAmount <= 0) {
            alert("Please enter a valid investment amount");
            return;
        }
        setProcessing(true);
        try {
            // Need user ID, get from storage or context (api handles header)
            const userId = localStorage.getItem('user_id');
            const payload = {
                land_id: selectedLand.id,
                investor_id: userId,
                amount: parseFloat(investAmount)
            };

            await api.post('/invest/request', payload);
            alert("Investment Request Sent! Waiting for Admin Approval.");
            setShowInvestModal(false);
            setInvestAmount("");
            setSelectedLand(null);

            // Refresh Portfolio & Market Data
            try {
                const portfolioRes = await api.get('/invest/my-investments');
                setMyInvestments(portfolioRes.data);

                const marketRes = await api.get('/invest/available-lands');
                setMarketLands(marketRes.data);
            } catch (e) { }

        } catch (error) {
            console.error("Invest Error", error);
            alert(error.response?.data?.detail || "Investment Failed");
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch User Profile
                const userRes = await api.get('/auth/me');
                setUser({
                    name: userRes.data.full_name,
                    role: userRes.data.role === 'investor' ? 'Investor' : 'User'
                });

                // 2. Fetch Wallet Balance
                try {
                    const walletRes = await api.get('/invest/wallet');
                    setWalletBalance(walletRes.data.balance);
                } catch (e) {
                    console.warn("Wallet fetch failed", e);
                }

                // 3. Fetch Market Data (Available Lands)
                try {
                    const marketRes = await api.get('/invest/available-lands');
                    setMarketLands(marketRes.data);
                } catch (e) {
                    // console.warn("Market data empty", e);
                }

                // 4. Fetch My Investments
                try {
                    const portfolioRes = await api.get('/invest/my-investments');
                    setMyInvestments(portfolioRes.data);
                } catch (e) {
                    // console.warn("Portfolio empty", e);
                }

            } catch (error) {
                console.error("Dashboard Load Error:", error);
                if (error.response?.status === 401) {
                    navigate('/investor/auth');
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

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-invest-primary"></div>
        </div>
    );

    return (
        <div className="flex h-screen bg-invest-bg font-sans overflow-hidden relative selection:bg-invest-primary/10">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-invest-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none animate-float-slow"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none animate-float"></div>

            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-invest-primary/20 rounded-full blur-sm animate-rise" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-yellow-400/20 rounded-full blur-sm animate-rise" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-orange-400/20 rounded-full blur-sm animate-rise" style={{ animationDelay: '4s' }}></div>

            {/* ================= SIDEBAR ================= */}
            <aside className="w-72 bg-white border-r border-gray-100 hidden md:flex flex-col z-20 shadow-sm">
                <div className="p-8">
                    <div className="flex items-center gap-3 font-display font-bold text-2xl text-gray-900 tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-invest-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-invest-primary/20">
                            <Sun size={22} fill="white" />
                        </div>
                        SolarGrid
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <NavItem icon={<ShoppingBag size={20} />} label="Marketplace" active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')} />
                    <NavItem icon={<PieChart size={20} />} label="Portfolio" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
                    <NavItem icon={<Wallet size={20} />} label="Wallet" active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} />
                    <NavItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </nav>

                <div className="p-6 border-t border-gray-100">
                    <div className="flex items-center gap-4 mb-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-invest-light flex items-center justify-center text-invest-primary font-bold text-lg shadow-inner">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-0.5">{user.role}</div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300">
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <main className="flex-1 overflow-y-auto relative z-10 scrollbar-hide p-6 lg:p-12">
                {/* Header */}
                <div className="flex justify-between items-end mb-10 animate-fade-in-up">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                            {activeTab === 'overview' && 'Dashboard'}
                            {activeTab === 'marketplace' && 'Energy Market'}
                            {activeTab === 'portfolio' && 'My Portfolio'}
                            {activeTab === 'wallet' && 'My Wallet'}
                        </h1>
                        <p className="text-gray-500">Welcome back, {user.name.split(' ')[0]}.</p>
                    </div>

                    {/* Wallet Balance Display */}
                    <div className="hidden md:flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-right">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Wallet Balance</p>
                            <p className="text-lg font-bold text-gray-900">₹ {walletBalance.toLocaleString()}</p>
                        </div>
                        <div className="w-10 h-10 bg-invest-light rounded-full flex items-center justify-center text-invest-primary">
                            <Wallet size={20} />
                        </div>
                    </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {activeTab === 'overview' && <OverviewSection marketLands={marketLands} myInvestments={myInvestments} walletBalance={walletBalance} onInvest={(land) => { setSelectedLand(land); setShowInvestModal(true); }} />}
                    {activeTab === 'marketplace' && <MarketplaceSection lands={marketLands} onInvest={(land) => { setSelectedLand(land); setShowInvestModal(true); }} />}
                    {activeTab === 'portfolio' && <PortfolioSection investments={myInvestments} />}
                    {activeTab === 'wallet' && <WalletSection balance={walletBalance} onAdd={() => setShowAddModal(true)} onWithdraw={() => setShowWithdrawModal(true)} />}
                </div>

                {/* Wallet Modals */}
                {(showAddModal || showWithdrawModal) && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-invest-primary"></div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {showAddModal ? "Add Funds" : "Withdraw Funds"}
                            </h3>
                            <p className="text-gray-500 mb-6 text-sm">
                                {showAddModal ? "Securely add money to your solar wallet." : "Withdraw earnings to your bank account."}
                            </p>

                            <div className="space-y-4">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-invest-primary focus:ring-4 focus:ring-invest-primary/10 transition-all font-bold text-lg text-gray-900"
                                        placeholder="0.00"
                                        autoFocus
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => { setShowAddModal(false); setShowWithdrawModal(false); setAmount(""); }}
                                        className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleTransaction(showAddModal ? 'add' : 'withdraw')}
                                        disabled={processing}
                                        className="flex-1 py-3 bg-invest-primary text-white font-bold rounded-xl hover:bg-yellow-600 transition-colors shadow-lg shadow-invest-primary/20 disabled:opacity-70"
                                    >
                                        {processing ? 'Processing...' : 'Confirm'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Investment Modal */}
                {showInvestModal && selectedLand && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-invest-primary"></div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">Invest in Future</h3>
                            <p className="text-gray-500 text-sm mb-4">You are investing in <span className="font-bold text-gray-800">{selectedLand.title}</span></p>

                            <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100 text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Target IRR</span>
                                    <span className="font-bold text-invest-primary">12-14%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Required Investment</span>
                                    <span className="font-bold text-gray-900">₹ {selectedLand.total_price?.toLocaleString() || "N/A"}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Investment Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                                        <input
                                            type="number"
                                            value={investAmount}
                                            onChange={(e) => setInvestAmount(e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold text-lg text-gray-900"
                                            placeholder={selectedLand.total_price}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => { setShowInvestModal(false); setInvestAmount(""); setSelectedLand(null); }}
                                        className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleInvest}
                                        disabled={processing}
                                        className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {processing ? 'Processing...' : 'Confirm Invest'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

// --- Sub-Components ---

const NavItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${active
            ? 'bg-invest-primary text-white shadow-md shadow-invest-primary/20'
            : 'text-gray-500 hover:bg-gray-50 hover:text-invest-primary'
            }`}
    >
        {icon}
        {label}
    </button>
);

const StatCard = ({ icon, label, value, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-invest-primary group-hover:bg-invest-primary group-hover:text-white transition-colors duration-300">
                {icon}
            </div>
            {trend && (
                <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp size={12} /> {trend}
                </span>
            )}
        </div>
        <p className="text-gray-500 text-sm font-semibold">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
    </div>
);

const OverviewSection = ({ marketLands, myInvestments, walletBalance, onInvest }) => {
    const totalInvested = myInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
    const totalEarnings = totalInvested * 0.142; // Mock ROI logic for now

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <StatCard icon={<PieChart />} label="Total Invested" value={`₹ ${totalInvested.toLocaleString()}`} trend="+12.5%" />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <StatCard icon={<TrendingUp />} label="Total Earnings" value={`₹ ${totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} trend="+2.4%" />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <StatCard icon={<Shield />} label="Active Projects" value={myInvestments.length} />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <StatCard icon={<Wallet />} label="Available Funds" value={`₹ ${walletBalance.toLocaleString()}`} />
                </div>
            </div>

            {/* Featured Opportunities */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Featured Opportunities</h3>
                    <button className="text-invest-primary font-bold text-sm hover:underline">View Market</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {marketLands.slice(0, 3).map(land => <MarketCard key={land.id} land={land} onInvest={onInvest} />)}
                    {marketLands.length === 0 && <p className="text-gray-400 italic col-span-3 text-center py-10">No active listings available right now.</p>}
                </div>
            </div>
        </div>
    );
};

const MarketCard = ({ land, onInvest }) => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div className="h-40 bg-gray-200 relative overflow-hidden">
            {/* Mock Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1">
                <Sun size={12} className="text-invest-primary" /> {land.status}
            </div>
            <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold text-lg">{land.title}</h4>
                <p className="text-xs opacity-90 flex items-center gap-1"><MapPin size={10} /> {land.location}</p>
            </div>
        </div>
        <div className="p-5 space-y-4">
            <div className="flex justify-between text-sm">
                <div className="text-gray-500">Target IRR</div>
                <div className="font-bold text-green-600">12-14%</div>
            </div>
            <div className="flex justify-between text-sm">
                <div className="text-gray-500">Land Value</div>
                <div className="font-bold text-gray-900">₹ {land.total_price?.toLocaleString() || "N/A"}</div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-invest-primary w-2/3 h-full rounded-full"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
                <span>65% Funded</span>
                <span>4 Days Left</span>
            </div>

            <button onClick={() => onInvest(land)} className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-invest-primary transition-colors flex items-center justify-center gap-2">
                Invest Now <ArrowUpRight size={16} />
            </button>
        </div>
    </div>
);

const MarketplaceSection = ({ lands, onInvest }) => (
    <div>
        <div className="flex gap-4 mb-8 bg-white p-2 rounded-2xl border border-gray-100 w-full max-w-lg shadow-sm">
            <Search className="text-gray-400 ml-2" />
            <input type="text" placeholder="Search by location, return rate..." className="w-full outline-none text-gray-700 font-medium" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lands.map(land => <MarketCard key={land.id} land={land} onInvest={onInvest} />)}
            {lands.length === 0 && <p className="text-gray-400 italic col-span-3 text-center py-20 bg-white rounded-3xl border border-dashed">No lands found.</p>}
        </div>
    </div>
);

const PortfolioSection = ({ investments }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-bold text-xs">
                <tr>
                    <th className="px-6 py-4">Asset</th>
                    <th className="px-6 py-4">Invested Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Current Value</th>
                    <th className="px-6 py-4">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {investments.length === 0 ? (
                    <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-medium">No investments yet. Start exploring the marketplace!</td></tr>
                ) : investments.map(inv => (
                    <tr key={inv.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-bold text-gray-900">Solar Farm #{inv.land_id}</td>
                        <td className="px-6 py-4 text-gray-500">{new Date(inv.created_at || Date.now()).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-medium">₹ {inv.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 font-medium text-invest-primary">
                            {inv.status === 'pending_approval' ? '-' : `₹ ${(inv.amount * 1.05).toFixed(0)}`}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${inv.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-700' :
                                inv.status === 'completed' || inv.status === 'active' ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                {inv.status === 'pending_approval' ? 'Reserved' :
                                    inv.status === 'completed' ? 'Active' : inv.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const WalletSection = ({ balance, onAdd, onWithdraw }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Card Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <p className="text-gray-400 font-medium mb-1">Total Balance</p>
            <h2 className="text-5xl font-display font-bold mb-8">₹ {balance?.toLocaleString()}</h2>

            <div className="flex gap-4">
                <button onClick={onAdd} className="flex-1 bg-invest-primary hover:bg-yellow-500 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-invest-primary/20">
                    Add Funds
                </button>
                <button onClick={onWithdraw} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-colors backdrop-blur-md">
                    Withdraw
                </button>
            </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <h3 className="font-bold text-gray-900 mb-6">Recent Transactions</h3>
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                <ArrowUpRight size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Deposit</p>
                                <p className="text-xs text-gray-400">Today, 10:23 AM</p>
                            </div>
                        </div>
                        <div className="font-bold text-green-600">+ ₹ 50,000</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


export default InvestorDashboard;
