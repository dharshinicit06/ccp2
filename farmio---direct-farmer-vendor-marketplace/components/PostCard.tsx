
import React from 'react';
import { Product, Demand } from '../types';

interface Props {
  type: 'product' | 'demand';
  data: any;
  onOrder?: () => void;
  t: (key: string) => string;
}

const PostCard: React.FC<Props> = ({ type, data, onOrder, t }) => {
  const isProduct = type === 'product';
  const item = data as (Product & Demand);

  return (
    <div className="bg-white rounded-3xl overflow-hidden instagram-shadow border border-gray-100 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img 
          src={`https://picsum.photos/seed/${isProduct ? item.farmerName : item.vendorName}/40`} 
          className="w-10 h-10 rounded-full border border-gray-100" 
          alt="avatar" 
        />
        <div>
          <h4 className="font-bold text-sm text-gray-900">{isProduct ? item.farmerName : item.vendorName}</h4>
          <p className="text-xs text-gray-500">2 hours ago • Verified User</p>
        </div>
        <button className="ml-auto text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
        </button>
      </div>

      {/* Main Image (Product Only) */}
      {isProduct && (
        <div className="aspect-square bg-gray-100 relative">
          <img 
            src={item.images[0]} 
            className="w-full h-full object-cover" 
            alt={item.cropName} 
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
            Freshness: {item.freshness}/5
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button className="text-gray-900 hover:scale-110 transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
          <button className="text-gray-900 hover:scale-110 transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">{item.cropName}</h3>
          <p className="text-xl font-black text-green-700">
            ₹{isProduct ? item.price : item.maxPrice} 
            <span className="text-sm font-normal text-gray-400"> / {isProduct ? item.unit : 'unit'}</span>
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-500">
            Qty: {isProduct ? item.quantity : item.quantityNeeded}
          </div>
          <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-500">
            {isProduct ? 'Harvested: ' + item.harvestDate : 'Location: ' + item.location}
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-5">
          {item.description || `High quality ${item.cropName} sourced directly. Limited stock available for immediate procurement.`}
        </p>

        {isProduct && onOrder && (
          <div className="flex gap-2">
            <button 
              onClick={onOrder}
              className="flex-1 bg-green-600 text-white py-3 rounded-2xl font-bold text-sm shadow-md hover:bg-green-700 active:scale-95 transition"
            >
              {t('buy_now')}
            </button>
            <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-100 rounded-2xl text-gray-400 hover:text-green-600 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
            </button>
          </div>
        )}

        {!isProduct && (
           <button 
           className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold text-sm shadow-md hover:bg-blue-700 active:scale-95 transition"
         >
           Fulfill Demand
         </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
