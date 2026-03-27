import React, { useState, useEffect, useCallback } from 'react';
import { UserRole } from './types';
import { translations } from './translations';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import ChatView from './components/ChatView';
import AgroBot from './components/AgroBot';
import NotificationCenter from './components/NotificationCenter';

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(UserRole.GUEST);
  const [currentPage, setCurrentPage] = useState('landing');
  const [language, setLanguage] = useState('en');
  const [showAgroBot, setShowAgroBot] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Initial Mock Data
  const [products, setProducts] = useState([
    {
      id: 'p1',
      farmerId: 'f1',
      farmerName: 'Ramesh Singh',
      cropName: 'Alphonso Mango',
      price: 1200,
      unit: 'Box',
      quantity: 50,
      harvestDate: '2023-10-25',
      images: ['https://picsum.photos/seed/mango/600/600'],
      description: 'Organic, export quality mangoes from my farm in Ratnagiri.',
      freshness: 5,
      status: 'available'
    },
    {
      id: 'p2',
      farmerId: 'f2',
      farmerName: 'Selvam K',
      cropName: 'Basmati Rice',
      price: 85,
      unit: 'kg',
      quantity: 500,
      harvestDate: '2023-10-20',
      images: ['https://picsum.photos/seed/rice/600/600'],
      description: 'Long grain, highly fragrant basmati.',
      freshness: 4,
      status: 'available'
    }
  ]);

  const [demands, setDemands] = useState([
    {
      id: 'd1',
      vendorId: 'v1',
      vendorName: 'FreshMart Exports',
      cropName: 'Red Onion',
      maxPrice: 35,
      quantityNeeded: 2000,
      location: 'Nashik'
    }
  ]);

  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const t = (key) => translations[language][key] || key;

  const handleRegister = (newUser) => {
    setUser(newUser);
    setRole(newUser.role);
    setLanguage(newUser.language);
    setCurrentPage('dashboard');
    setNotifications(prev => [...prev, `Welcome to FARMIO, ${newUser.name}!`]);
  };

  const handleLogout = () => {
    setUser(null);
    setRole(UserRole.GUEST);
    setCurrentPage('landing');
  };

  const addProduct = (p) => setProducts([p, ...products]);
  const addOrder = (o) => {
    setOrders([o, ...orders]);
    setNotifications(prev => [...prev, `New order for ${o.cropName}!`]);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-16 bg-[#F8F9F3]">
      {/* Header */}
      {currentPage !== 'landing' && (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-green-700 tracking-tight cursor-pointer" onClick={() => setCurrentPage('dashboard')}>FARMIO</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              {notifications.length > 0 && <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>}
            </button>
            <button 
              onClick={() => setCurrentPage('messages')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </button>
            <div className="hidden md:flex items-center gap-2 border-l pl-4">
              <img src={user?.avatar || 'https://picsum.photos/32'} className="w-8 h-8 rounded-full" alt="profile" />
              <span className="font-medium text-sm">{user?.name || 'Guest'}</span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 pt-4">
        {currentPage === 'landing' && (
          <LandingPage 
            onRegisterFarmer={() => setCurrentPage('register_farmer')}
            onRegisterVendor={() => setCurrentPage('register_vendor')}
            t={t}
          />
        )}

        {currentPage === 'register_farmer' && (
          <RegistrationPage 
            role={UserRole.FARMER} 
            onSuccess={handleRegister} 
            onBack={() => setCurrentPage('landing')}
          />
        )}

        {currentPage === 'register_vendor' && (
          <RegistrationPage 
            role={UserRole.VENDOR} 
            onSuccess={handleRegister} 
            onBack={() => setCurrentPage('landing')}
          />
        )}

        {currentPage === 'dashboard' && user && (
          <Dashboard 
            user={user} 
            products={products} 
            demands={demands} 
            orders={orders}
            onAddProduct={addProduct}
            onAddOrder={addOrder}
            t={t}
          />
        )}

        {currentPage === 'messages' && user && (
          <ChatView user={user} t={t} />
        )}
      </main>

      {/* Side Overlays */}
      {showNotifications && <NotificationCenter items={notifications} onClose={() => setShowNotifications(false)} />}
      {showAgroBot && <AgroBot onClose={() => setShowAgroBot(false)} language={language} />}

      {/* Floating Action Buttons */}
      {currentPage !== 'landing' && (
        <button 
          onClick={() => setShowAgroBot(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
        </button>
      )}

      {/* Bottom Navigation (Mobile) */}
      {currentPage !== 'landing' && (
        <Navigation 
          current={currentPage} 
          onChange={(p) => setCurrentPage(p)} 
          t={t}
        />
      )}
    </div>
  );
};

export default App;
