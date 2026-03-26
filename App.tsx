import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BriefingSPA from './src/pages/BriefingSPA';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* The New High-Fidelity SPA Terminal */}
        <Route path="/" element={<BriefingSPA />} />
        
        {/* Legacy Route Orchestration -> SPA Anchors */}
        <Route path="/about" element={<Navigate to="/#problem" replace />} />
        <Route path="/innovation" element={<Navigate to="/#framework" replace />} />
        <Route path="/competencies" element={<Navigate to="/#architecture" replace />} />
        <Route path="/infrastructure" element={<Navigate to="/#governance" replace />} />
        
        {/* Catch-all/Default */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;