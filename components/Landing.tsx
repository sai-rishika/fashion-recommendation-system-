
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center gradient-bg text-white">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/fashion/1920/1080" 
            alt="Fashion background" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
            Your Personal AI Fashion Stylist
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 drop-shadow-md">
            Upload your photo and let our advanced AI analyze your skin tone and features to curate the perfect wardrobe for you.
          </p>
          <button 
            onClick={onStart}
            className="bg-white text-rose-600 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Why Choose StyleAI?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                icon: "📷", 
                title: "Instant Analysis", 
                desc: "Simply upload a photo and get styling advice in seconds using Gemini's vision capabilities." 
              },
              { 
                icon: "🎨", 
                title: "Color Matching", 
                desc: "Discover the perfect color palette that matches your unique skin tone and complexion." 
              },
              { 
                icon: "🛍️", 
                title: "Curated Links", 
                desc: "Direct access to top products from Amazon, Myntra, and Zara tailored for your style." 
              },
              { 
                icon: "✨", 
                title: "Professional Tips", 
                desc: "Expert-level grooming, hairstyle, and accessory suggestions for every occasion." 
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16 text-gray-800">How It Works</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { step: "1", title: "Upload Photo", text: "Share a clear portrait photo of yourself." },
              { step: "2", title: "AI Analysis", text: "Gemini detects skin tone and facial features." },
              { step: "3", title: "Get Styled", text: "Receive personalized outfit and grooming advice." },
              { step: "4", title: "Shop Style", text: "Buy curated items directly from your favorite stores." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center w-64">
                <div className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
