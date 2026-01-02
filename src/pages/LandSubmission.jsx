import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Upload, MapPin, Maximize2, CheckCircle, Info, DollarSign, Sun, Sprout, TrendingUp, ShieldCheck } from 'lucide-react';
import api from '../api';

const LandSubmission = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        land_type: "Open Land",
        ownership_info: "Sole Owner",
        area_sqft: "",
        total_price: "",
        description: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userId = localStorage.getItem('user_id');
        if (!userId) {
            alert("You must be logged in to submit land.");
            navigate('/land-owner/auth');
            return;
        }

        const payload = {
            ...formData,
            area_sqft: parseFloat(formData.area_sqft),
            total_price: parseFloat(formData.total_price),
            potential_capacity_kw: 0,
            owner_id: userId,
            status: 'pending_approval'
        };

        try {
            const response = await api.post('/land/submit', payload);
            console.log("Submission Success:", response.data);
            alert("Land Submitted Successfully! It is now into pending approval.");
            navigate('/land-owner/dashboard');
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Failed to submit land. " + (error.response?.data?.detail || "Please try again."));
        } finally {
            setLoading(false);
        }
    };
    const float = (elements) => {
        gsap.to(elements, {
            y: "+=40",
            rotation: 5,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.5
        });
    }


    useEffect(() => {
        float(".animate-float");
    }, []);
    return (
        <div className="min-h-screen bg-land-bg font-sans relative overflow-hidden flex flex-col p-6 md:p-12">
            {/* Dynamic Background Elements */}
            <div className="fixed top-20 left-10 text-land-primary animate-float opacity-50 z-0 pointer-events-none">
                <Sun size={120} />
            </div>
            <div className="fixed bottom-20 right-20 text-land-primary animate-float opacity-50 z-0 pointer-events-none " style={{ animationDelay: '1.5s' }}>
                <Sprout size={100} />
            </div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-land-primary/5 to-transparent rounded-full blur-[100px] pointer-events-none z-0"></div>

            {/* Back Button */}
            <div className="max-w-4xl mx-auto w-full relative z-20 mb-6">
                <button
                    onClick={() => navigate('/land-owner/dashboard')}
                    className="group flex items-center gap-3 text-gray-500 hover:text-land-primary font-bold transition-all duration-300 transform hover:-translate-x-1"
                >
                    <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                        <ArrowLeft size={20} />
                    </div>
                    Back to Dashboard
                </button>
            </div>

            {/* Centered Form Container */}
            <div className="max-w-4xl mx-auto w-full relative z-10">
                <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden relative animate-fade-in-up">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-land-primary/5 to-transparent p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 text-land-bg rotate-12">
                            <Upload size={200} />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2 relative z-10">Property Submission</h2>
                        <p className="text-gray-600 relative z-10">Fill in the details below to initiate the valuation process.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">

                        {/* Section 1 */}
                        <section className="space-y-6">
                            <SectionHeader number="01" title="Location & Type" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField
                                    label="Property Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="My Property"
                                    focused={focusedField === 'title'}
                                    onFocus={() => setFocusedField('title')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <SelectField
                                    label="Land Type"
                                    name="land_type"
                                    value={formData.land_type}
                                    onChange={handleChange}
                                    options={["Open Land", "Rooftop", "Agricultural", "Industrial"]}
                                />
                                <div className="col-span-1 md:col-span-2">
                                    <InputField
                                        label="Full Address"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Complete physical address"
                                        icon={<MapPin size={20} />}
                                        focused={focusedField === 'location'}
                                        onFocus={() => setFocusedField('location')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="w-full h-px bg-gray-100"></div>

                        {/* Section 2 */}
                        <section className="space-y-6">
                            <SectionHeader number="02" title="Dimensions & Value" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField
                                    label="Area (sq.ft)"
                                    name="area_sqft"
                                    type="number"
                                    value={formData.area_sqft}
                                    onChange={handleChange}
                                    placeholder="5000"
                                    icon={<Maximize2 size={20} />}
                                    focused={focusedField === 'area'}
                                    onFocus={() => setFocusedField('area')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <SelectField
                                    label="Ownership"
                                    name="ownership_info"
                                    value={formData.ownership_info}
                                    onChange={handleChange}
                                    options={["Sole Owner", "Co-Owned", "Leased"]}
                                />
                                <div className="col-span-1 md:col-span-2">
                                    <InputField
                                        label="Asking Price (₹)"
                                        name="total_price"
                                        type="number"
                                        value={formData.total_price}
                                        onChange={handleChange}
                                        placeholder="Expected annual return"
                                        icon={<DollarSign size={20} />}
                                        focused={focusedField === 'price'}
                                        onFocus={() => setFocusedField('price')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 3 - PRESERVED Secure Verification */}
                        <section className="space-y-6">
                            <SectionHeader number="03" title="Documents" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left: Info & Animation */}
                                <div className="bg-gradient-to-br from-land-primary/5 to-transparent rounded-2xl p-6 border border-land-primary/10 flex flex-col justify-center items-center text-center space-y-4 relative overflow-hidden group">
                                    {/* Background Pulse */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-land-primary/10 rounded-full blur-2xl animate-pulse"></div>

                                    <div className="relative bg-white p-4 rounded-2xl shadow-lg shadow-land-primary/10 animate-float">
                                        <ShieldCheck size={32} className="text-land-primary" />
                                    </div>

                                    <div className="relative z-10">
                                        <h4 className="font-bold text-gray-800">Secure Verification</h4>
                                        <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                                            We encrypt your data. Only verified buyers can view your property details.
                                        </p>
                                    </div>

                                    {/* Mini Checklist */}
                                    <div className="w-full bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 space-y-2 mt-2">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle size={10} /></div>
                                            Proof of Ownership
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle size={10} /></div>
                                            Clear Titles
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Upload Box */}
                                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 hover:border-land-primary/50 hover:bg-land-primary/5 transition-all duration-300 cursor-pointer group bg-gray-50/30 flex flex-col items-center justify-center gap-4 h-full min-h-[250px]">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Upload size={28} className="text-gray-400 group-hover:text-land-primary transition-colors" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-gray-800">Upload Property Papers</p>
                                        <p className="text-sm text-gray-400">PDF, JPG or PNG (Max 5MB)</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto bg-land-primary text-white px-12 py-5 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-xl shadow-land-primary/20 hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : 'Submit Property'}
                                {!loading && <CheckCircle size={20} />}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Components ---

const SectionHeader = ({ number, title }) => (
    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-land-primary/10 text-land-primary flex items-center justify-center text-sm font-bold shadow-inner font-mono">{number}</span>
        {title}
    </h3>
);

const InputField = ({ label, icon, focused, ...props }) => (
    <div className="space-y-2 group">
        <label className={`text-sm font-bold transition-colors duration-300 ${focused ? 'text-land-primary' : 'text-gray-700'}`}>
            {label}
        </label>
        <div className={`flex items-center gap-3 bg-gray-50/50 border-2 rounded-xl px-4 transition-all duration-300 ${focused ? 'border-land-primary bg-white shadow-lg ring-4 ring-land-primary/10' : 'border-gray-100 hover:border-gray-300'}`}>
            {icon && <span className={`transition-colors duration-300 ${focused ? 'text-land-primary' : 'text-gray-400'}`}>{icon}</span>}
            <input
                {...props}
                className="w-full py-4 bg-transparent outline-none text-gray-900 font-medium placeholder-gray-400"
            />
        </div>
    </div>
);

const SelectField = ({ label, options, ...props }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">{label}</label>
        <div className="relative">
            <select
                {...props}
                className="w-full py-4 px-4 bg-gray-50/50 border-2 border-gray-100 hover:border-gray-300 rounded-xl outline-none focus:border-land-primary focus:bg-white focus:shadow-lg focus:ring-4 focus:ring-land-primary/10 transition-all duration-300 appearance-none font-medium cursor-pointer text-gray-900"
            >
                {options.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
        </div>
    </div>
);

export default LandSubmission;
