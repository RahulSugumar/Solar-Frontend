import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import LandingPage from './pages/LandingPage';
import LandOwnerWelcome from './pages/LandOwnerWelcome';
import InvestorWelcome from './pages/InvestorWelcome';
import LandOwnerAuth from './pages/LandOwnerAuth';
import InvestorAuth from './pages/InvestorAuth';
import LandOwnerDashboard from './pages/LandOwnerDashboard';
import LandSubmission from './pages/LandSubmission';
import InvestorDashboard from './pages/InvestorDashboard';

// Placeholders for Dashboard/Auth
const LoginPlaceholder = () => <div className="p-10 text-center">Login Page</div>;
const RegisterPlaceholder = () => <div className="p-10 text-center">Register Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-dark font-sans">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/land-owner/welcome" element={<LandOwnerWelcome />} />
          <Route path="/investor/welcome" element={<InvestorWelcome />} />

          <Route path="/login" element={<LoginPlaceholder />} />
          <Route path="/register" element={<RegisterPlaceholder />} />


          {/* Private Routes (We will add protection later) */}
          <Route path="/land-owner/auth" element={<LandOwnerAuth />} />
          <Route path="/land-owner/submit" element={<LandSubmission />} />
          <Route path="/investor/auth" element={<InvestorAuth />} />

          <Route path="/land-owner/*" element={<LandOwnerDashboard />} />
          <Route path="/investor/dashboard/*" element={<InvestorDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
