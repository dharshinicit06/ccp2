
import React from 'react';

interface Props {
  current: string;
  onChange: (page: string) => void;
  t: (key: string) => string;
}

const Navigation: React.FC<Props> = ({ current, onChange, t }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 px-4 z-50 md:hidden">
      <button 
        onClick={() => onChange('dashboard')}
        className={`flex flex-col items-center gap-1 ${current === 'dashboard' ? 'text-green-600' : 'text-gray-400'}`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
        <span className="text-[10px] uppercase font-bold tracking-wider">{t('home')}</span>
      </button>
      
      <button 
        onClick={() => onChange('search')}
        className={`flex flex-col items-center gap-1 ${current === 'search' ? 'text-green-600' : 'text-gray-400'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <span className="text-[10px] uppercase font-bold tracking-wider">{t('search')}</span>
      </button>

      <button 
        onClick={() => onChange('messages')}
        className={`flex flex-col items-center gap-1 ${current === 'messages' ? 'text-green-600' : 'text-gray-400'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        <span className="text-[10px] uppercase font-bold tracking-wider">{t('messages')}</span>
      </button>

      <button 
        onClick={() => onChange('profile')}
        className={`flex flex-col items-center gap-1 ${current === 'profile' ? 'text-green-600' : 'text-gray-400'}`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
        <span className="text-[10px] uppercase font-bold tracking-wider">{t('profile')}</span>
      </button>
    </nav>
  );
};

export default Navigation;
