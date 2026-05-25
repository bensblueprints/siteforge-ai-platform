import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import EditorPage from './pages/EditorPage';
import PricingPage from './pages/PricingPage';
import './App.css';

function App() {
  const { isAuthenticated } = useStore();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <LoginPage />} />
      <Route path="/builder" element={isAuthenticated ? <BuilderPage /> : <LoginPage />} />
      <Route path="/editor/:projectId" element={isAuthenticated ? <EditorPage /> : <LoginPage />} />
    </Routes>
  );
}

export default App;
