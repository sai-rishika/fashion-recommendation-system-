
import React, { useState, useEffect } from 'react';

const LoadingOverlay: React.FC = () => {
  const [step, setStep] = useState(0);
  const messages = [
    "Analyzing your skin tone...",
    "Gemini is identifying your facial features...",
    "Consulting fashion trends for 2026...",
    "Curating your personalized wardrobe...",
    "Finding the perfect accessories...",
    "Almost ready to unveil your style..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="relative w-40 h-40 mb-8">
        {/* Animated Rings */}
        <div className="absolute inset-0 border-4 border-rose-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 border-4 border-pink-100 rounded-full"></div>
        <div className="absolute inset-4 border-4 border-pink-500 rounded-full border-b-transparent animate-spin-slow"></div>
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rose-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Analyzing your style</h3>
        <p className="text-rose-500 font-medium transition-opacity duration-500">{messages[step]}</p>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
