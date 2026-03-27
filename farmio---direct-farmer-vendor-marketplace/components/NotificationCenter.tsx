
import React from 'react';

interface Props {
  items: string[];
  onClose: () => void;
}

const NotificationCenter: React.FC<Props> = ({ items, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-sm bg-white h-full animate-slideLeft flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-800 tracking-tight uppercase tracking-widest">Activity</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 text-gray-300">
               No recent activity.
            </div>
          ) : (
            items.map((note, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium leading-tight">{note}</p>
                  <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 block">Just now</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
