import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArrowRight, MapPin, Globe, Sparkles } from 'lucide-react';

// Bioluminescent Cavern Background
function LightBeams() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 300;

  const { positions, alphas, seeds, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const alp = new Float32Array(count);
    const sed = new Float32Array(count);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      alp[i] = 0.1 + Math.random() * 0.5;
      sed[i] = Math.random() * 100;
      spd[i] = 0.2 + Math.random() * 0.8;
    }
    return { positions: pos, alphas: alp, seeds: sed, speeds: spd };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.05, 8, 1, 1);
    geo.setAttribute('aAlpha', new THREE.InstancedBufferAttribute(alphas, 1));
    geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1));
    geo.setAttribute('aSpeed', new THREE.InstancedBufferAttribute(speeds, 1));
    return geo;
  }, [alphas, seeds, speeds]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#6b46c1') },
        uColor2: { value: new THREE.Color('#2563eb') },
      },
      vertexShader: `
        attribute float aAlpha;
        attribute float aSeed;
        attribute float aSpeed;
        varying float vAlpha;
        varying vec2 vUv;
        uniform float uTime;
        
        void main() {
          vAlpha = aAlpha;
          vUv = uv;
          
          vec3 pos = position;
          float t = uTime * 0.3;
          
          // Sway
          pos.x += sin(aSeed * 0.5 + t) * 0.3;
          
          // Rise
          float rise = mod(pos.y + t * aSpeed + aSeed * 3.0, 15.0) - 7.5;
          pos.y = rise;
          
          // Bend
          pos.x += sin(aSeed + pos.y * 0.5) * 0.5;
          
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying float vAlpha;
        varying vec2 vUv;
        
        void main() {
          float gradient = smoothstep(0.0, 0.5, vUv.y);
          vec3 color = mix(uColor1, uColor2, gradient);
          float alpha = vAlpha * (1.0 - smoothstep(0.7, 1.0, vUv.y));
          gl_FragColor = vec4(color, alpha * 0.6);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.rotation.z = Math.random() * Math.PI * 2;
      dummy.scale.set(1, 0.5 + Math.random() * 1.5, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
}

function ParticleSpores() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1] + Math.sin(t * 0.05 + i) * 0.5;
      const z = positions[i * 3 + 2];
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.03 + Math.sin(t + i) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[1, 8]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}

function CavernBackground() {
  return (
    <>
      <ambientLight intensity={0} />
      <LightBeams />
      <ParticleSpores />
    </>
  );
}

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center" style={{ background: '#000000' }}>
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <CavernBackground />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Liquid Glass Card */}
          <div className="liquid-glass rounded-3xl p-8 sm:p-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-medium text-violet-300 tracking-wider uppercase">
                AI-Powered Website Builder
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-none mb-6"
              style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
            >
              <span className="text-white">Turn Any</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Listing Into
              </span>
              <br />
              <span className="text-white">Legend</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-white/60 mb-8 leading-relaxed max-w-md">
              Paste a Google Maps URL or existing website link. Our AI scans, extracts, and builds a
              stunning, conversion-optimized website in under 60 seconds. Support for{' '}
              <span className="text-violet-400 font-semibold">100 industries</span>.
            </p>

            {/* Input Area */}
            <div className="space-y-4 mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <MapPin className="w-4 h-4 text-white/30" />
                </div>
                <input
                  type="text"
                  placeholder="Paste Google Maps listing URL..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-white/30 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Globe className="w-4 h-4 text-white/30" />
                </div>
                <input
                  type="text"
                  placeholder="Enter existing website URL..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onGetStarted}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
            >
              <span>Start Building Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Indicators */}
            <div className="mt-6 flex items-center gap-6 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Free forever plan
              </span>
            </div>
          </div>

          {/* Right: Preview Image */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-violet-500/10">
              <img
                src="/images/hero-website.jpg"
                alt="Website Preview"
                className="w-full h-auto object-cover"
              />
              {/* Overlay Stats */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="liquid-glass px-4 py-2 rounded-xl">
                  <div className="text-xs text-white/50 uppercase tracking-wider">Built in</div>
                  <div className="text-lg font-bold text-white">0:47</div>
                </div>
                <div className="liquid-glass px-4 py-2 rounded-xl">
                  <div className="text-xs text-white/50 uppercase tracking-wider">Industries</div>
                  <div className="text-lg font-bold text-white">100+</div>
                </div>
              </div>
              {/* Live Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-green-400">LIVE PREVIEW</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
