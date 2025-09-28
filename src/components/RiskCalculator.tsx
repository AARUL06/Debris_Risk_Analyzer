import React, { useState, useCallback } from 'react';
import { Calculator, Satellite, AlertTriangle } from 'lucide-react';

interface CalculatorInputs {
  spatialDensity: number;
  relativeVelocity: number;
  crossSectionalArea: number;
  missionDuration: number;
  orbitalAltitude: number;
  orbitalInclination: number;
  debrisSize: number;
  debrisMass: number;
  debrisVelocity: number;
  maneuverCapability: number;
  structuralVulnerability: number;
}

const RiskCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    spatialDensity: 0.001,
    relativeVelocity: 10,
    crossSectionalArea: 5,
    missionDuration: 31536000, // 1 year in seconds
    orbitalAltitude: 400,
    orbitalInclination: 51.6,
    debrisSize: 1,
    debrisMass: 0.1,
    debrisVelocity: 8,
    maneuverCapability: 0.8,
    structuralVulnerability: 0.6
  });

  const [result, setResult] = useState<number>(0);

  const calculateRisk = useCallback(() => {
    // Basic collision probability calculation: P_C = S_PD × V_REL × A_C × T
    const basicProbability = inputs.spatialDensity * inputs.relativeVelocity * inputs.crossSectionalArea * inputs.missionDuration;
    
    // Apply modifiers for advanced factors
    const altitudeModifier = 1 + (Math.max(0, 600 - inputs.orbitalAltitude) / 600) * 0.5; // Higher risk at lower altitudes
    const inclinationModifier = 1 + (Math.abs(inputs.orbitalInclination - 28.5) / 90) * 0.3; // Risk varies with inclination
    const sizeModifier = Math.log10(inputs.debrisSize + 1) + 1;
    const maneuverModifier = 1 - (inputs.maneuverCapability * 0.7); // Good maneuverability reduces risk
    const vulnerabilityModifier = 1 + inputs.structuralVulnerability;

    const adjustedProbability = basicProbability * altitudeModifier * inclinationModifier * sizeModifier * maneuverModifier * vulnerabilityModifier;
    
    // Convert to percentage and cap at 100%
    const percentage = Math.min(adjustedProbability * 100, 100);
    setResult(percentage);
  }, [inputs]);

  React.useEffect(() => {
    calculateRisk();
  }, [calculateRisk]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRiskLevel = (probability: number) => {
    if (probability < 1) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-400/10' };
    if (probability < 5) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
    if (probability < 15) return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-400/10' };
    return { level: 'Critical', color: 'text-red-400', bg: 'bg-red-400/10' };
  };

  const riskLevel = getRiskLevel(result);

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="w-8 h-8 mr-3" />
            <h2 className="text-4xl font-bold">Space Debris Risk Calculator</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Calculate the probability of collision between your satellite and space debris using advanced orbital mechanics and statistical analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Parameters */}
          <div className="space-y-8">
            {/* Basic Parameters */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Satellite className="w-6 h-6 mr-3" />
                Basic Parameters
              </h3>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Spatial Density (S_PD) - objects/km³
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={inputs.spatialDensity}
                    onChange={(e) => handleInputChange('spatialDensity', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Relative Velocity (V_REL) - km/s
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.relativeVelocity}
                    onChange={(e) => handleInputChange('relativeVelocity', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cross-sectional Area (A_C) - m²
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.crossSectionalArea}
                    onChange={(e) => handleInputChange('crossSectionalArea', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mission Duration (T) - seconds
                  </label>
                  <input
                    type="number"
                    value={inputs.missionDuration}
                    onChange={(e) => handleInputChange('missionDuration', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Orbital Parameters */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6">Orbital Parameters</h3>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Orbital Altitude - km
                  </label>
                  <input
                    type="number"
                    value={inputs.orbitalAltitude}
                    onChange={(e) => handleInputChange('orbitalAltitude', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Orbital Inclination - degrees
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.orbitalInclination}
                    onChange={(e) => handleInputChange('orbitalInclination', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Parameters */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6">Advanced Parameters</h3>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Debris Size - cm
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.debrisSize}
                    onChange={(e) => handleInputChange('debrisSize', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Maneuver Capability (0-1)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={inputs.maneuverCapability}
                    onChange={(e) => handleInputChange('maneuverCapability', Math.min(1, Math.max(0, parseFloat(e.target.value) || 0)))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Structural Vulnerability (0-1)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={inputs.structuralVulnerability}
                    onChange={(e) => handleInputChange('structuralVulnerability', Math.min(1, Math.max(0, parseFloat(e.target.value) || 0)))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results and Formula */}
          <div className="space-y-8">
            {/* Risk Assessment Result */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">Risk Assessment</h3>
                <AlertTriangle className="w-6 h-6 text-orange-400" />
              </div>
              
              <div className={`${riskLevel.bg} rounded-xl p-6 mb-6 border border-white/10`}>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{result.toFixed(4)}%</div>
                  <div className={`text-lg font-semibold ${riskLevel.color}`}>
                    {riskLevel.level} Risk
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Mission Duration:</span>
                  <span>{(inputs.missionDuration / 31536000).toFixed(1)} years</span>
                </div>
                <div className="flex justify-between">
                  <span>Orbital Regime:</span>
                  <span>{inputs.orbitalAltitude < 600 ? 'LEO' : inputs.orbitalAltitude < 20000 ? 'MEO' : 'GEO'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Debris Environment:</span>
                  <span>{inputs.spatialDensity > 0.01 ? 'Dense' : inputs.spatialDensity > 0.001 ? 'Moderate' : 'Sparse'}</span>
                </div>
              </div>
            </div>

            {/* Mathematical Formula */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6">Mathematical Model</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-200">Basic Approximation</h4>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                    P<sub>C</sub> = S<sub>PD</sub> × V<sub>REL</sub> × A<sub>C</sub> × T
                  </div>
                </div>

                <div className="text-sm text-gray-400 space-y-2">
                  <p><strong>Where:</strong></p>
                  <p>• S<sub>PD</sub> = Spatial density of debris (objects/km³)</p>
                  <p>• V<sub>REL</sub> = Average relative velocity (km/s)</p>
                  <p>• A<sub>C</sub> = Satellite cross-sectional area (km²)</p>
                  <p>• T = Mission duration (seconds)</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-200">Enhancement Factors</h4>
                  <div className="text-sm text-gray-400 space-y-2">
                    <p>• <strong>Altitude Modifier:</strong> Higher risk at lower altitudes due to increased debris density</p>
                    <p>• <strong>Inclination Modifier:</strong> Risk varies with orbital inclination relative to debris distribution</p>
                    <p>• <strong>Maneuver Capability:</strong> Active satellites can avoid predicted collisions</p>
                    <p>• <strong>Structural Vulnerability:</strong> Accounts for satellite's susceptibility to damage</p>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h4 className="text-orange-400 font-semibold mb-2">Limitations</h4>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>• Not suitable for close encounters with tracked objects</p>
                    <p>• Simplified debris size distribution model</p>
                    <p>• Does not account for complex orbital mechanics</p>
                    <p>• Assumes uniform spatial distribution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskCalculator;