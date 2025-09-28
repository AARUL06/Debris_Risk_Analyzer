import React, { useEffect, useRef } from 'react';

const Earth3D: React.FC = () => {
  const earthRef = useRef<HTMLDivElement>(null);
  const debrisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate random debris particles
    const debrisContainer = debrisRef.current;
    if (!debrisContainer) return;

    // Clear existing debris
    debrisContainer.innerHTML = '';

    // Create debris particles
    for (let i = 0; i < 150; i++) {
      const debris = document.createElement('div');
      debris.className = 'debris-particle';
      
      // Random orbital position
      const angle = Math.random() * 360;
      const distance = 180 + Math.random() * 100; // Distance from Earth center
      const elevation = (Math.random() - 0.5) * 60; // Vertical spread
      
      debris.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
        transform: 
          translateX(-50%) 
          translateY(-50%) 
          rotateY(${angle}deg) 
          translateZ(${distance}px) 
          translateY(${elevation}px);
        animation: orbit ${15 + Math.random() * 10}s linear infinite;
        animation-delay: ${Math.random() * 10}s;
      `;
      
      debrisContainer.appendChild(debris);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes orbit {
        from { transform: translateX(-50%) translateY(-50%) rotateY(0deg) translateZ(${180}px); }
        to { transform: translateX(-50%) translateY(-50%) rotateY(360deg) translateZ(${180}px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center perspective-1000">
      <div className="relative preserve-3d" ref={earthRef}>
        {/* Earth */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-white/20 shadow-lg relative overflow-hidden">
          {/* Earth surface details */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-6 w-8 h-6 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-6 right-4 w-6 h-4 bg-white/10 rounded-full"></div>
            <div className="absolute top-8 right-8 w-4 h-3 bg-white/10 rounded-full"></div>
          </div>
          
          {/* Earth glow */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.1)]"></div>
        </div>

        {/* Low Earth Orbit ring */}
        <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-reverse"></div>

        {/* Debris field */}
        <div ref={debrisRef} className="absolute top-1/2 left-1/2 preserve-3d"></div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 text-white/80 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20"></div>
          <span className="text-sm">Earth</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]"></div>
          <span className="text-sm">Space Debris</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-0.5 bg-white/20"></div>
          <span className="text-sm">Orbital Paths</span>
        </div>
      </div>
    </div>
  );
};

export default Earth3D;