
import React from 'react';
import { StyleAnalysis } from '../types';

interface ResultsProps {
  analysis: StyleAnalysis;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ analysis, onReset }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h2 className="text-4xl font-extrabold text-gray-900">Your Personalized Style Profile</h2>
        <button 
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Try Again
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Skin Tone & Summary */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-pink-500">🎨</span> Skin Tone Analysis
            </h3>
            <div className="flex items-center gap-6 mb-6">
              <div 
                className="w-20 h-20 rounded-full shadow-inner border-4 border-white ring-4 ring-rose-50"
                style={{ backgroundColor: analysis.skinTone.hex }}
              />
              <div>
                <p className="text-2xl font-bold text-gray-800">{analysis.skinTone.category}</p>
                <p className="text-sm text-gray-500">Detected Skin Type</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm italic">
              "{analysis.skinTone.description}"
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-rose-500">🌟</span> Why This Works
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {analysis.reasoning}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-orange-500">🌈</span> Recommended Palette
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Primary', color: analysis.colorPalette.primary },
                { label: 'Secondary', color: analysis.colorPalette.secondary },
                { label: 'Accent', color: analysis.colorPalette.accent }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div 
                    className="h-16 rounded-xl shadow-sm mb-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">{item.label}</p>
                  <p className="text-xs font-mono">{item.color}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Recommendations */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {analysis.recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 text-white">
                  <h4 className="text-lg font-bold uppercase tracking-wider">{rec.occasion}</h4>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Outfit</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><span className="font-semibold">Top:</span> {rec.outfit.top}</li>
                      <li><span className="font-semibold">Bottom:</span> {rec.outfit.bottom}</li>
                      <li><span className="font-semibold">Shoes:</span> {rec.outfit.shoes}</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Grooming & Hair</h5>
                    <p className="text-sm text-gray-700 font-semibold">{rec.hairstyle}</p>
                    <p className="text-xs text-gray-500 mt-1">{rec.maintenanceTip}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Accessories</h5>
                    <div className="flex flex-wrap gap-2">
                      {rec.accessories.map((acc, aidx) => (
                        <span key={aidx} className="bg-rose-50 text-rose-600 px-2 py-1 rounded-md text-[10px] font-bold border border-rose-100">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shopping Links */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-blue-500">🛒</span> Shop Your Style
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {analysis.shoppingLinks.map((link, idx) => (
                <div key={idx} className="group border border-gray-100 rounded-2xl p-5 hover:border-rose-200 hover:bg-rose-50/20 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{link.product}</h4>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">{link.retailer}</p>
                  </div>
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(link.product + ' ' + link.retailer)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-gray-900 text-white rounded-xl text-xs font-bold text-center hover:bg-rose-600 transition-colors"
                  >
                    View Product
                  </a>
                </div>
              ))}
            </div>
            <p className="text-center mt-10 text-xs text-gray-400">
              Note: Shopping links are suggestions. Prices and availability may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
