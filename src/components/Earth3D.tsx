import React, { useEffect, useRef } from 'react';

const Earth3D: React.FC = () => {
  const earthRef = useRef<HTMLDivElement>(null);
  const debrisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const debrisContainer = debrisRef.current;
    if (!debrisContainer) return;

    // Clear existing debris
    debrisContainer.innerHTML = '';

    // Create debris particles with realistic distribution
    const totalDebris = 800;
    
    for (let i = 0; i < totalDebris; i++) {
      const debris = document.createElement('div');
      debris.className = 'debris-particle';
      
      // Create realistic orbital distribution
      const orbitType = Math.random();
      let distance, elevation, size, opacity;
      
      if (orbitType < 0.7) {
        // LEO debris (most dense)
        distance = 140 + Math.random() * 80;
        elevation = (Math.random() - 0.5) * 40;
        size = Math.random() < 0.8 ? 1 : 2;
        opacity = 0.6 + Math.random() * 0.4;
      } else if (orbitType < 0.9) {
        // MEO debris
        distance = 220 + Math.random() * 100;
        elevation = (Math.random() - 0.5) * 60;
        size = Math.random() < 0.9 ? 1 : 1.5;
        opacity = 0.4 + Math.random() * 0.3;
      } else {
        // GEO debris (ring-like)
        distance = 320 + Math.random() * 40;
        elevation = (Math.random() - 0.5) * 20; // More concentrated
        size = 1;
        opacity = 0.3 + Math.random() * 0.2;
      }
      
      const angle = Math.random() * 360;
      const inclination = Math.random() * 180 - 90; // Full range of inclinations
      
      debris.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, ${opacity});
        opacity: ${opacity};
        transform: 
          translateX(-50%) 
          translateY(-50%) 
          rotateX(${inclination}deg)
          rotateY(${angle}deg) 
          translateZ(${distance}px) 
          translateY(${elevation}px);
        animation: orbit ${20 + Math.random() * 30}s linear infinite;
        animation-delay: ${Math.random() * 20}s;
      `;
      
      debrisContainer.appendChild(debris);
    }

    // Add some larger tracked objects
    for (let i = 0; i < 50; i++) {
      const trackedObject = document.createElement('div');
      trackedObject.className = 'tracked-object';
      
      const angle = Math.random() * 360;
      const distance = 160 + Math.random() * 120;
      const elevation = (Math.random() - 0.5) * 50;
      
      trackedObject.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: #60a5fa;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(96, 165, 250, 0.8);
        transform: 
          translateX(-50%) 
          translateY(-50%) 
          rotateY(${angle}deg) 
          translateZ(${distance}px) 
          translateY(${elevation}px);
        animation: orbit ${25 + Math.random() * 20}s linear infinite;
        animation-delay: ${Math.random() * 15}s;
      `;
      
      debrisContainer.appendChild(trackedObject);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes orbit {
        from { 
          transform: translateX(-50%) translateY(-50%) rotateY(0deg) translateZ(var(--distance)) translateY(var(--elevation));
        }
        to { 
          transform: translateX(-50%) translateY(-50%) rotateY(360deg) translateZ(var(--distance)) translateY(var(--elevation));
        }
      }
      
      .debris-particle:hover {
        transform: scale(1.5) !important;
        opacity: 1 !important;
        transition: all 0.3s ease;
      }
      
      .tracked-object:hover {
        transform: scale(2) !important;
        box-shadow: 0 0 15px rgba(96, 165, 250, 1) !important;
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center perspective-1000 overflow-hidden">
      <div className="relative preserve-3d" ref={earthRef}>
        {/* Earth with more realistic appearance */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 border border-blue-400/30 shadow-2xl relative overflow-hidden">
          {/* Earth continents */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-2 left-4 w-6 h-4 bg-green-400/30 rounded-full"></div>
            <div className="absolute bottom-4 right-2 w-4 h-3 bg-green-400/30 rounded-full"></div>
            <div className="absolute top-6 right-6 w-3 h-2 bg-green-400/30 rounded-full"></div>
            <div className="absolute bottom-6 left-6 w-5 h-3 bg-green-400/30 rounded-full"></div>
          </div>
          
          {/* Earth atmosphere glow */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.3)]"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
        </div>

        {/* Orbital rings representing different altitudes */}
        <div className="absolute top-1/2 left-1/2 w-72 h-72 border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-[32rem] h-[32rem] border border-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>

        {/* Dense debris field */}
        <div ref={debrisRef} className="absolute top-1/2 left-1/2 preserve-3d"></div>
      </div>

      {/* Enhanced legend with statistics */}
      <div className="absolute bottom-8 left-8 text-white/80 space-y-3 bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Orbital Environment</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 border border-blue-400/30"></div>
            <span className="text-sm">Earth</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]"></div>
            <span className="text-sm">Space Debris (~34,000 tracked)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.8)]"></div>
            <span className="text-sm">Active Satellites</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-0.5 bg-white/20"></div>
            <span className="text-sm">Orbital Shells (LEO/MEO/GEO)</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-white/20 text-xs text-white/60">
          <p>Real-time visualization of orbital debris distribution</p>
          <p>Hover over objects for details</p>
        </div>
      </div>

      {/* Debris density indicator */}
      <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">HIGH</div>
          <div className="text-sm text-white/80">Debris Density</div>
          <div className="text-xs text-white/60 mt-1">LEO: 400-1000km</div>
        </div>
      </div>

      {/* Floating particles for atmosphere effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Earth3D;