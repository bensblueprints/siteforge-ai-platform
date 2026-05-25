import { useState, useMemo } from 'react';
import { industries, industryCategories } from '../../data/industries';
import { Search, ArrowLeft, Sparkles, MapPin, Globe } from 'lucide-react';

interface IndustrySelectProps {
  onSelect: (industryId: string) => void;
  onBack: () => void;
  inputUrl: string;
  inputType: 'maps' | 'website';
}

export default function IndustrySelect({ onSelect, onBack, inputUrl, inputType }: IndustrySelectProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = industries;
    if (activeCategory) {
      result = result.filter((i) => i.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  // Icon component mapping
  const iconMap: Record<string, React.ComponentType<any>> = {
    Wind: Sparkles, Droplets: Sparkles, Zap: Sparkles, Home: Sparkles, TreePine: Sparkles,
    Shield: Sparkles, Paintbrush: Sparkles, Grid3x3: Sparkles, Warehouse: Sparkles,
    Square: Sparkles, Truck: Sparkles, Trash2: Sparkles, Wrench: Sparkles, Hammer: Sparkles,
    Fence: Sparkles, Calculator: Sparkles, TrendingUp: Sparkles, Megaphone: Sparkles,
    ShieldCheck: Sparkles, Camera: Sparkles, Video: Sparkles, Monitor: Sparkles,
    Globe: Sparkles, Users: Sparkles, FileText: Sparkles, Activity: Sparkles,
    Heart: Sparkles, Pin: Sparkles, Apple: Sparkles, Brain: Sparkles, Dumbbell: Sparkles,
    Sparkles: Sparkles, Flower2: Sparkles, UtensilsCrossed: Sparkles, Coffee: Sparkles,
    Cake: Sparkles, ChefHat: Sparkles, Beer: Sparkles, Wine: Sparkles, CupSoda: Sparkles,
    IceCreamCone: Sparkles, ShoppingBag: Sparkles, Diamond: Sparkles, Flower: Sparkles,
    BookOpen: Sparkles, Armchair: Sparkles, Gamepad2: Sparkles, Bike: Sparkles,
    Car: Sparkles, CircleDot: Sparkles, CarFront: Sparkles, Scissors: Sparkles,
    Crown: Sparkles, Hand: Sparkles, Bath: Sparkles, PenTool: Sparkles, Sun: Sparkles,
    Flame: Sparkles, Swords: Sparkles, Music: Sparkles, Mountain: Sparkles, Waves: Sparkles,
    Flag: Sparkles, GraduationCap: Sparkles, Music2: Sparkles, Languages: Sparkles,
    SteeringWheel: Sparkles, Code2: Sparkles, Baby: Sparkles, Cloud: Sparkles,
    Smartphone: Sparkles, Lock: Sparkles, BrainCircuit: Sparkles, HardDrive: Sparkles,
    Building2: Sparkles, Building: Sparkles, Search: Sparkles, Banknote: Sparkles,
    Scale: Sparkles, Stamp: Sparkles, CreditCard: Sparkles, Palette: Sparkles,
    PaintBucket: Sparkles, Frame: Sparkles, Signpost: Sparkles, HeartPulse: Sparkles,
    PawPrint: Sparkles, Fish: Sparkles, PartyPopper: Sparkles, Disc3: Sparkles,
    Tent: Sparkles, BedDouble: Sparkles, Plane: Sparkles, Map: Sparkles, Van: Sparkles,
    Package: Sparkles, Recycle: Sparkles, ShieldAlert: Sparkles, Gavel: Sparkles,
    Footprints: Sparkles, Clock: Sparkles, Crosshair: Sparkles, Shirt: Sparkles,
    Eye: Sparkles, Smile: Sparkles, SmilePlus: Sparkles, Stethoscope: Sparkles,
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-medium text-violet-300 tracking-wider uppercase">
            Step 2
          </span>
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
        >
          Choose Your Industry
        </h2>
        <p className="text-sm text-white/40">
          Select the industry that best matches your business for a purpose-built template.
        </p>

        {/* URL Badge */}
        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
          {inputType === 'maps' ? (
            <MapPin className="w-3 h-3 text-violet-400" />
          ) : (
            <Globe className="w-3 h-3 text-blue-400" />
          )}
          <span className="text-xs text-white/40 truncate max-w-xs">{inputUrl}</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search industries..."
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            !activeCategory
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
              : 'text-white/40 border border-white/5 hover:border-white/10'
          }`}
        >
          All
        </button>
        {industryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                : 'text-white/40 border border-white/5 hover:border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {filtered.map((industry) => {
          const IconComponent = iconMap[industry.icon] || Sparkles;
          return (
            <button
              key={industry.id}
              onClick={() => onSelect(industry.id)}
              onMouseEnter={() => setHoveredIndustry(industry.id)}
              onMouseLeave={() => setHoveredIndustry(null)}
              className={`group relative p-4 rounded-xl border text-left transition-all duration-300 ${
                hoveredIndustry === industry.id
                  ? 'border-violet-500/30 bg-violet-500/5'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
              }`}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${industry.color}15` }}
              >
                <IconComponent className="w-4 h-4" style={{ color: industry.color }} />
              </div>
              <h4 className="text-xs font-semibold text-white mb-1 leading-tight">{industry.name}</h4>
              <p className="text-[10px] text-white/30 leading-snug line-clamp-2">{industry.description}</p>
              <div className="text-[10px] text-white/20 mt-2">{industry.sections.length} sections</div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-white/40">No industries found for &quot;{search}&quot;</p>
        </div>
      )}

      {/* Back */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to URL input
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
    </div>
  );
}
