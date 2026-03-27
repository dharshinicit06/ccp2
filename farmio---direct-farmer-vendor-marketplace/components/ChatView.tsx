
import React, { useState } from 'react';
import { User, Message } from '../types';

interface Props {
  user: User;
  t: (key: string) => string;
}

const ChatView: React.FC<Props> = ({ user, t }) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  const contacts = [
    { id: 'c1', name: 'Ravi Kumar', lastMsg: 'Is the rice quality grade A?', time: '12m', avatar: 'https://picsum.photos/seed/ravi/100' },
    { id: 'c2', name: 'Global Foods', lastMsg: 'Sent payment for order #122', time: '2h', avatar: 'https://picsum.photos/seed/global/100' },
    { id: 'c3', name: 'Meena Reddy', lastMsg: 'Voice message • 0:12', time: '1d', avatar: 'https://picsum.photos/seed/meena/100' },
  ];

  return (
    <div className="bg-white md:border border-gray-100 md:rounded-3xl md:h-[calc(100vh-160px)] flex animate-fadeIn overflow-hidden">
      {/* Contact List */}
      <div className={`${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-gray-100 bg-gray-50/50`}>
        <div className="p-6 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-black text-gray-800 tracking-tight">Direct</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map(c => (
            <button 
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`w-full p-4 flex gap-4 items-center hover:bg-white transition border-b border-gray-100/50 ${activeChat === c.id ? 'bg-white' : ''}`}
            >
              <img src={c.avatar} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" alt={c.name} />
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{c.time}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">{c.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Room */}
      <div className={`${activeChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white relative`}>
        {activeChat ? (
          <>
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <button onClick={() => setActiveChat(null)} className="md:hidden p-2">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <img src={contacts.find(c => c.id === activeChat)?.avatar} className="w-8 h-8 rounded-full" alt="profile" />
              <span className="font-bold text-gray-800">{contacts.find(c => c.id === activeChat)?.name}</span>
              <button className="ml-auto text-gray-400">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/30">
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-2.5 rounded-2xl rounded-bl-none text-sm font-medium shadow-sm max-w-[80%]">
                  Hello! I'm interested in the Alphonso mangoes you listed. Are they available for bulk shipping?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-green-600 text-white px-4 py-2.5 rounded-2xl rounded-br-none text-sm font-medium shadow-sm max-w-[80%]">
                  Yes, they are. I have around 50 boxes ready. I can offer a discount if you take more than 30.
                </div>
              </div>
              <div className="flex justify-center my-4">
                 <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">AI: Auto-translated from Tamil</span>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
               <div className="flex gap-2 items-center bg-gray-50 p-2 rounded-3xl border border-gray-100">
                  <button className="p-2 text-gray-400 hover:text-green-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </button>
                  <input 
                    type="text" 
                    placeholder="Message..." 
                    className="flex-1 bg-transparent px-2 py-1 outline-none text-sm"
                  />
                  <button className="bg-green-600 text-white px-6 py-2 rounded-2xl font-bold text-sm hover:bg-green-700">Send</button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400">
             <div className="w-24 h-24 rounded-full border-4 border-gray-100 flex items-center justify-center mb-4">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
             </div>
             <h3 className="text-gray-900 font-black text-xl mb-2">Your Messages</h3>
             <p className="max-w-xs text-sm">Send private messages and direct trade offers to verified farmers and vendors.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatView;
