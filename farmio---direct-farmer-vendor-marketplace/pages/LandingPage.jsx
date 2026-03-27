import React from 'react';

const LandingPage = ({ onRegisterFarmer, onRegisterVendor, t }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <div className="mb-8 p-4 bg-green-50 rounded-full">
        <svg className="w-20 h-20 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
        FARM<span className="text-green-600">IO</span>
      </h1>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {t('welcome')}
      </h2>
      <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto">
        {t('tagline')} AI-powered direct trading between farmers and vendors. No middlemen, just fair value.
      </p>

      <div className="flex flex-col w-full max-w-sm gap-4">
        <button 
          onClick={onRegisterFarmer}
          className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition shadow-lg"
        >
          {t('farmer_cta')}
        </button>
        <button 
          onClick={onRegisterVendor}
          className="w-full py-4 bg-white text-green-700 border-2 border-green-600 rounded-2xl font-bold text-lg hover:bg-green-50 transition"
        >
          {t('vendor_cta')}
        </button>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
        <FeatureCard 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          title="Instant Trade"
          desc="Connect in real-time."
        />
        <FeatureCard 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
          title="Verified Profiles"
          desc="Safe & secure deals."
        />
        <FeatureCard 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          title="Fair Pricing"
          desc="AI suggested rates."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col gap-2">
    <div className="text-green-600">{icon}</div>
    <h4 className="font-bold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

export default LandingPage;
