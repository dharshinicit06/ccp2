import React, { useState } from 'react';
import { UserRole } from '../types';

const RegistrationPage = ({ role, onSuccess, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [cropsGrown, setCropsGrown] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      businessName: role === UserRole.VENDOR ? businessName : undefined,
      cropsGrown: role === UserRole.FARMER ? cropsGrown.split(',').map(c => c.trim()).filter(c => c) : undefined,
      role,
      location,
      language,
      trustScore: 4.5,
      avatar: `https://picsum.photos/seed/${name}/200`
    };
    onSuccess(mockUser);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: 'User',
      role,
      trustScore: 4.5,
      avatar: `https://picsum.photos/seed/${email}/200`
    };
    onSuccess(mockUser);
  };

  return (
    <div className="py-8 animate-fadeIn">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-600 font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Back
      </button>

      <div className="bg-white p-8 rounded-3xl instagram-shadow border border-gray-100 max-w-md mx-auto">
        {/* Tab Toggle */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setIsSignUp(true)}
            className={`pb-3 font-semibold transition ${
              isSignUp 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            className={`pb-3 font-semibold transition ${
              !isSignUp 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isSignUp ? `Join as ${role === UserRole.FARMER ? 'Farmer' : 'Vendor'}` : 'Welcome Back'}
        </h2>

        {/* Sign Up Form */}
        {isSignUp && (
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                placeholder="e.g. name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                placeholder="e.g. Ramesh Singh"
              />
            </div>

            {role === UserRole.VENDOR && (
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Business Name</label>
                <input 
                  required
                  type="text" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                  placeholder="e.g. FreshMart Enterprises"
                />
              </div>
            )}

            {role === UserRole.FARMER && (
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Crops You Grow</label>
                <input 
                  required
                  type="text" 
                  value={cropsGrown}
                  onChange={(e) => setCropsGrown(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                  placeholder="e.g. Wheat, Rice, Corn (comma separated)"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Location / District</label>
              <input 
                required
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                placeholder="e.g. Nashik, Maharashtra"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Preferred Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              >
                <option value="en">English</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="kn">Kannada (ಕನ್ನಡ)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Confirm Password</label>
              <input 
                required
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition mt-4"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Login Form */}
        {!isSignUp && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                placeholder="e.g. name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition mt-4"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account? 
              <button 
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-green-600 font-semibold hover:text-green-700 ml-1"
              >
                Sign up
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
