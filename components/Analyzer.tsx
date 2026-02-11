
import React, { useState, useRef } from 'react';
import { Gender } from '../types';

interface AnalyzerProps {
  onAnalyze: (image: string, gender: Gender) => void;
  error: string | null;
}

const Analyzer: React.FC<AnalyzerProps> = ({ onAnalyze, error }) => {
  const [selectedGender, setSelectedGender] = useState<Gender>('Male');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (preview) {
      onAnalyze(preview, selectedGender);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Let's Style You</h2>
        <p className="text-gray-600">Upload your photo and select your preference to get started.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 grid md:grid-cols-2 gap-12">
        {/* Left Side: Inputs */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">I am:</label>
            <div className="flex gap-4">
              {(['Male', 'Female', 'Non-binary'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${
                    selectedGender === g
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-200 text-gray-600 hover:border-rose-200'
                  }`}
                >
                  {g === 'Male' && '♂️ '}
                  {g === 'Female' && '♀️ '}
                  {g === 'Non-binary' && '✨ '}
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">Upload Photo:</label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center cursor-pointer hover:border-rose-400 hover:bg-rose-50/30 transition-all"
            >
              <div className="text-rose-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <p className="font-semibold text-gray-700">Drag & Drop Your Photo</p>
              <p className="text-xs text-gray-400 mt-2">Supported: PNG, JPG, JPEG (Max 10MB)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!preview}
            className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all ${
              preview 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:scale-102 hover:shadow-xl' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Analyze My Style
          </button>
        </div>

        {/* Right Side: Preview */}
        <div className="flex items-center justify-center bg-gray-50 rounded-2xl border-2 border-gray-100 overflow-hidden min-h-[400px]">
          {preview ? (
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-8 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p>Your preview will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
