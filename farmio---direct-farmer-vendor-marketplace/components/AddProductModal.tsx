
import React, { useState } from 'react';
import { Product } from '../types';
import { getPriceSuggestion } from '../geminiService';

interface Props {
  onClose: () => void;
  onSubmit: (p: Partial<Product>) => void;
  t: (key: string) => string;
}

const AddProductModal: React.FC<Props> = ({ onClose, onSubmit, t }) => {
  const [cropName, setCropName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState('kg');
  const [loadingPrice, setLoadingPrice] = useState(false);

  const handleSuggestPrice = async () => {
    if (!cropName || !quantity) return;
    setLoadingPrice(true);
    const suggested = await getPriceSuggestion(cropName, 1, unit);
    setPrice(suggested);
    setLoadingPrice(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end md:items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-t-[32px] md:rounded-[32px] p-6 animate-slideUp">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-800">{t('add_crop')}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="flex gap-4">
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Crop Name</label>
                <input 
                  type="text" 
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder="e.g. Tomato"
                />
             </div>
             <div className="w-24">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Unit</label>
                <select 
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition"
                >
                  <option value="kg">kg</option>
                  <option value="Box">Box</option>
                  <option value="Quintal">Quintal</option>
                </select>
             </div>
          </div>

          <div className="flex gap-4">
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('quantity')}</label>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition"
                />
             </div>
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('price')} (₹)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition"
                  />
                  <button 
                    onClick={handleSuggestPrice}
                    disabled={loadingPrice}
                    className="absolute right-2 top-2 bg-green-100 text-green-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase hover:bg-green-200 transition"
                  >
                    {loadingPrice ? '...' : 'AI'}
                  </button>
                </div>
             </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Photos / Video</label>
             <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </div>
                <div className="aspect-square bg-gray-100 rounded-2xl animate-pulse"></div>
                <div className="aspect-square bg-gray-100 rounded-2xl animate-pulse"></div>
             </div>
          </div>

          <button 
            onClick={() => onSubmit({
              id: Math.random().toString(),
              cropName,
              price,
              quantity,
              unit,
              harvestDate: new Date().toISOString().split('T')[0],
              images: [`https://picsum.photos/seed/${cropName}/600`],
              description: `High quality ${cropName} directly from the farm.`,
              freshness: 5,
              status: 'available'
            })}
            className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition mt-6"
          >
            Post Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
