
import React, { useState, useEffect, useRef } from 'react';
import { agroBotChat } from '../geminiService';

interface Props {
  onClose: () => void;
  language: string;
}

const AgroBot: React.FC<Props> = ({ onClose, language }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{role: 'bot', text: "Namaste! I'm AgroBot. How can I help you with your farm or trading today?"}]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setIsTyping(true);
    
    const botResponse = await agroBotChat(userMsg);
    setMessages(prev => [...prev, {role: 'bot', text: botResponse}]);
    setIsTyping(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:inset-auto md:bottom-24 md:right-8 md:w-96 md:h-[600px] md:rounded-3xl md:shadow-2xl md:border md:border-gray-100">
      <div className="bg-green-700 p-4 flex items-center justify-between md:rounded-t-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <h3 className="text-white font-black text-lg">AgroBot</h3>
            <span className="text-green-200 text-xs">AI Farming Assistant</span>
          </div>
        </div>
        <button onClick={onClose} className="text-white p-2">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-green-600 text-white' : 'bg-white text-gray-800 shadow-sm border border-gray-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl flex gap-1 items-center shadow-sm border border-gray-100">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 md:rounded-b-3xl">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about prices, crops..."
            className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500"
          />
          <button 
            onClick={handleSend}
            className="bg-green-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-green-700 transition active:scale-95"
          >
            <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgroBot;
