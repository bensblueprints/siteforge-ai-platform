import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Navigation from '../components/landing/Navigation';
import HeroSection from '../components/landing/HeroSection';
import TickerBar from '../components/landing/TickerBar';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import IndustryShowcase from '../components/landing/IndustryShowcase';
import PricingSection from '../components/landing/PricingSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden" style={{ background: '#000000' }}>
      <Navigation scrolled={scrolled} />
      
      <div ref={heroRef}>
        <HeroSection 
          onGetStarted={() => navigate(isAuthenticated ? '/dashboard' : '/signup')} 
        />
      </div>

      <TickerBar />

      <HowItWorks />

      <FeaturesGrid />

      <IndustryShowcase />

      <PricingSection />

      <FAQSection />

      <CTASection onGetStarted={() => navigate(isAuthenticated ? '/dashboard' : '/signup')} />

      <Footer />
    </div>
  );
}
