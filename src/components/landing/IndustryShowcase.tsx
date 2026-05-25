import { useState, useRef, useEffect } from 'react';
import { industryCategories, industries } from '../../data/industries';
import {
  Wind, Droplets, Zap, Home, TreePine, Shield, Paintbrush, Grid3x3,
  Warehouse, Square, Truck, Trash2, Wrench, Hammer, Fence,
  Calculator, TrendingUp, Megaphone, ShieldCheck, Camera, Video,
  Monitor, Globe, Users, FileText, Activity, Heart, Pin, Apple,
  Brain, Dumbbell, Sparkles, Flower2, UtensilsCrossed, Coffee, Cake,
  ChefHat, Beer, Wine, CupSoda, IceCreamCone, ShoppingBag, Diamond,
  Flower, BookOpen, Armchair, Gamepad2, Bike, Car, CircleDot, Wrench as WrenchIcon,
  CarFront, Scissors, Crown, Hand, Bath, PenTool, Sun, Flame, Swords,
  Music, Mountain, Waves, Flag, GraduationCap, Music2, Languages,
  Code2, Baby, Cloud, Smartphone, Lock, BrainCircuit, HardDrive, Building2,
  Building, Search, Banknote, Scale, Stamp, CreditCard, Palette, PaintBucket,
  CircleDot as CircleDotIcon, Frame, Signpost, HeartPulse, PawPrint, Fish,
  PartyPopper, Disc3, Tent, BedDouble, Plane, Map, Van, Package, Recycle,
  ShieldAlert, Gavel, Footprints, Clock, Crosshair, Shirt, Eye, Smile, SmilePlus,
  Stethoscope,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Wind, Droplets, Zap, Home, TreePine, Shield, Paintbrush, Grid3x3,
  Warehouse, Square, Truck, Trash2, Wrench, Hammer, Fence,
  Calculator, TrendingUp, Megaphone, ShieldCheck, Camera, Video,
  Monitor, Globe, Users, FileText, Activity, Heart, Pin, Apple,
  Brain, Dumbbell, Sparkles, Flower2, UtensilsCrossed, Coffee, Cake,
  ChefHat, Beer, Wine, CupSoda, IceCreamCone, ShoppingBag, Diamond,
  Flower, BookOpen, Armchair, Gamepad2, Bike, Car, CircleDot, WrenchIcon,
  CarFront, Scissors, Crown, Hand, Bath, PenTool, Sun, Flame, Swords,
  Music, Mountain, Waves, Flag, GraduationCap, Music2, Languages,
  Code2, Baby, Cloud, Smartphone, Lock, BrainCircuit, HardDrive, Building2,
  Building, Search, Banknote, Scale, Stamp, CreditCard, Palette, PaintBucket,
  CircleDotIcon, Frame, Signpost, HeartPulse, PawPrint, Fish,
  PartyPopper, Disc3, Tent, BedDouble, Plane, Map, Van, Package, Recycle,
  ShieldAlert, Gavel, Footprints, Clock, Crosshair, Shirt, Eye, Smile, SmilePlus,
  Stethoscope,
};

export default function IndustryShowcase() {
  const [activeCategory, setActiveCategory] = useState(industryCategories[0]);
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = industries.filter((i) => i.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('showcase-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="industries" className="relative py-24 sm:py-32" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Grid3x3 className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-violet-300 tracking-wider uppercase">
              100 Industries
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
          >
            A Template for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #2563eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Every Business
            </span>
          </h2>
          <p className="text-base text-white/50 max-w-2xl mx-auto">
            From auto repair shops to yoga studios, we have purpose-built templates with the right sections, layouts, and content for every industry.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {industryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-white border border-violet-500/50 bg-violet-500/10'
                  : 'text-white/40 border border-white/5 hover:border-white/10 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Industries Grid */}
        <div
          ref={gridRef}
          className="showcase-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {filtered.map((industry) => {
            const IconComponent = iconMap[industry.icon] || Sparkles;
            return (
              <div
                key={industry.id}
                className="group relative p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIndustry(industry.id)}
                onMouseLeave={() => setHoveredIndustry(null)}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${industry.color}15` }}
                >
                  <IconComponent className="w-4 h-4" style={{ color: industry.color }} />
                </div>
                <h4 className="text-sm font-medium text-white mb-1 leading-tight">{industry.name}</h4>
                <p className="text-xs text-white/30 leading-snug">{industry.description}</p>

                {hoveredIndustry === industry.id && (
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                    style={{ background: industry.color }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '100+', label: 'Industries Covered' },
            { value: '50+', label: 'Section Types' },
            { value: '15K+', label: 'Sites Launched' },
            { value: '<60s', label: 'Average Build Time' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div
                className="text-3xl sm:text-4xl font-bold mb-1"
                style={{
                  fontFamily: 'Oswald, Inter, sans-serif',
                  background: 'linear-gradient(135deg, #a78bfa 0%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .showcase-grid {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        .showcase-grid.showcase-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
