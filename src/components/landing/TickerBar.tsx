import { useEffect, useRef } from 'react';
import { Zap, Globe, Clock, DollarSign, Layers, Palette, Rocket, Lock } from 'lucide-react';

const tickerItems = [
  { icon: Zap, text: 'AI-Powered' },
  { icon: Globe, text: 'Custom Domains' },
  { icon: Clock, text: '60-Second Builds' },
  { icon: DollarSign, text: '$500-$5K Per Site' },
  { icon: Layers, text: '100 Industries' },
  { icon: Palette, text: 'Visual Editor' },
  { icon: Rocket, text: 'Instant Deploy' },
  { icon: Lock, text: 'SSL Included' },
];

export default function TickerBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animationId: number;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full py-4 border-y border-white/5" style={{ background: '#000000' }}>
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex items-center gap-12 whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white/40">
              <item.icon className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-medium tracking-wider uppercase">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
