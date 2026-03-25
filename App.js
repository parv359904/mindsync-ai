import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// ================= COMPONENTS =================
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import AdminPortal from './pages/AdminPortal';
import Chatbot from './pages/Chatbot'; // full chat page
import PatientForm from './pages/PatientForm';

// ================= AUTH CHECK =================
const isAuthenticated = () => {
  return localStorage.getItem("user"); // simple auth check
};

// ================= PROTECTED ROUTE =================
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" />;
};

// ================= PAGE TRANSITION =================
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.25 }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

// ================= ROUTES =================
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/auth" element={<PageWrapper><AuthPage /></PageWrapper>} />

        {/* ================= CORE FEATURES ================= */}
        <Route path="/test" element={<PageWrapper><TestPage /></PageWrapper>} />
        <Route path="/result" element={<PageWrapper><ResultPage /></PageWrapper>} />
        <Route path="/form" element={<PageWrapper><PatientForm /></PageWrapper>} />

        {/* ================= CHAT PAGE (FULL SCREEN) ================= */}
        <Route path="/chat" element={<PageWrapper><Chatbot /></PageWrapper>} />

        {/* ================= PROTECTED ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageWrapper><Dashboard /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <PageWrapper><HistoryPage /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <PageWrapper><AdminPortal /></PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </AnimatePresence>
  );
};

// ================= MAIN APP =================
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-[#020617] transition-all duration-300">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;