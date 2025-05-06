// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import QuotationMaker from './pages/QuotationMaker';
import QuotationV2 from './pages/QuotationV2';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white antialiased">
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/q" element={<QuotationMaker />} />
          <Route path="/" element={<QuotationV2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;