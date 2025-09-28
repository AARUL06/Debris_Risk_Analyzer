import React, { useRef, useEffect } from 'react';
import Earth3D from './components/Earth3D';
import RiskCalculator from './components/RiskCalculator';
import { ChevronDown, Satellite, Shield, AlertCircle } from 'lucide-react';

function App() {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section with 3D Earth */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90"></div>
        
        {/* Header */}
        <header className="relative z-10 p-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Satellite className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Space Debris Monitor</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={scrollToCalculator}
                className="hover:text-gray-300 transition-colors"
              >
                Risk Calculator
              </button>
              <a href="#" className="hover:text-gray-300 transition-colors">About</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        {/* 3D Earth Visualization */}
        <div className="relative z-10">
          <Earth3D />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-8 max-w-4xl mx-auto px-8">
            <div className="space-y-4">
              <h2 className="text-6xl md:text-7xl font-bold leading-tight">
                Space Debris
                <span className="block text-gray-400">Risk Assessment</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Advanced collision probability analysis for satellites operating in debris-populated orbital environments
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold">34,000+</div>
                <div className="text-gray-400">Tracked Objects</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold">130M+</div>
                <div className="text-gray-400">Debris Fragments</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold">28,000</div>
                <div className="text-gray-400">km/h Average Speed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={scrollToCalculator}
            className="animate-bounce p-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all pointer-events-auto group"
          >
            <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </section>

      {/* Risk Calculator Section */}
      <section ref={calculatorRef}>
        <RiskCalculator />
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Satellite className="w-6 h-6" />
                <h3 className="text-xl font-bold">Space Debris Monitor</h3>
              </div>
              <p className="text-gray-400">
                Advanced orbital debris risk assessment tools for the space industry.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Safety Notice
              </h4>
              <p className="text-sm text-gray-400">
                This calculator provides approximations for educational and planning purposes. 
                For mission-critical applications, consult professional space debris specialists.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Data Sources
              </h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>• ESA Space Debris Office</p>
                <p>• NASA Orbital Debris Program</p>
                <p>• Space-Track.org</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 Space Debris Monitor. Educational and research purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;