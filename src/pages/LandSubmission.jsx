import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, MapPin, Maximize2, FileText, CheckCircle } from 'lucide-react';
import api from '../api';

const LandSubmission = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        land_type: "Open Land",
        ownership_info: "Sole Owner",
        area_sqft: "",
        total_price: "", // Expected annual rent or sale price concept
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
            status: 'pending_approval' // Explicitly set initial status
        };

        try {
            console.log("Submitting Payload:", payload);

            // Real Backend Call
            const response = await api.post('/land/submit', payload);
            console.log("Submission Success:", response.data);

            alert("Land Submitted Successfully! It is now Pending Approval.");
            navigate('/land-owner/dashboard');

        } catch (error) {
            console.error("Submission Error:", error);
            alert("Failed to submit land. " + (error.response?.data?.detail || "Please try again."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <button onClick={() => navigate('/land-owner/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-land-primary mb-8 font-medium transition-colors">
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-land-primary/5 p-8 border-b border-land-primary/10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Land</h1>
                        <p className="text-gray-600">Provide details about your property to get it verified and listed for solar projects.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">

                        {/* Section 1: Basic Info */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-land-light/30 text-land-primary flex items-center justify-center text-sm">1</span>
                                Property Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Property Title / Name</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Green Valley Farm"
                                        required
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-land-primary transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Land Type</label>
                                    <select
                                        name="land_type"
                                        value={formData.land_type}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-land-primary transition-colors appearance-none cursor-pointer"
                                    >
                                        <option>Open Land</option>
                                        <option>Rooftop</option>
                                        <option>Agricultural</option>
                                        <option>Industrial</option>
                                    </select>
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Full Address / Location</label>
                                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 focus-within:border-land-primary transition-colors">
                                        <MapPin className="text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Street, City, State, Landmark"
                                            required
                                            className="w-full p-3 bg-transparent outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Section 2: Technical Specs */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-land-light/30 text-land-primary flex items-center justify-center text-sm">2</span>
                                Size & Ownership
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Total Area (sq.ft)</label>
                                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 focus-within:border-land-primary transition-colors">
                                        <Maximize2 className="text-gray-400" size={20} />
                                        <input
                                            type="number"
                                            name="area_sqft"
                                            value={formData.area_sqft}
                                            onChange={handleChange}
                                            placeholder="e.g. 5000"
                                            required
                                            className="w-full p-3 bg-transparent outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Ownership Status</label>
                                    <select
                                        name="ownership_info"
                                        value={formData.ownership_info}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-land-primary transition-colors"
                                    >
                                        <option>Sole Owner</option>
                                        <option>Co-Owned</option>
                                        <option>Leased</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Expected Annual Rent / Sale Price (₹)</label>
                                    <input
                                        type="number"
                                        name="total_price"
                                        value={formData.total_price}
                                        onChange={handleChange}
                                        placeholder="e.g. 100000"
                                        required
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-land-primary transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Section 3: Documents (Mock) */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-land-light/30 text-land-primary flex items-center justify-center text-sm">3</span>
                                Documents & Photos
                            </h3>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 transition-colors cursor-pointer text-center group">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-land-light/20 group-hover:text-land-primary transition-colors">
                                    <Upload size={24} className="text-gray-400 group-hover:text-land-primary" />
                                </div>
                                <p className="text-sm font-bold text-gray-700">Click to upload property photos or documents</p>
                                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or PDF (MAX. 5MB)</p>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-land-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition flex items-center gap-2 shadow-lg hover:translate-y-px disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Submitting...' : 'Submit Property'}
                                {!loading && <CheckCircle size={20} />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LandSubmission;
