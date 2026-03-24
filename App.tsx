import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Innovation from './pages/Innovation';
import Competencies from './pages/Competencies';
import Infrastructure from './pages/Infrastructure';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home openBooking={() => { }} />} />
          <Route path="/about" element={<About />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/competencies" element={<Competencies />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;