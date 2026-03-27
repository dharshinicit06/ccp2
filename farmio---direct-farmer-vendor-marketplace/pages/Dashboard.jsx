import React, { useState } from 'react';
import { UserRole } from '../types';
import PostCard from '../components/PostCard';
import AddProductModal from '../components/AddProductModal';

const Dashboard = ({ user, products, demands, orders, onAddProduct, onAddOrder, t }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="pb-10">
      {/* Role specific header stats */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <StatCard title={t('trust_score')} value={user.trustScore.toString()} icon="★" />
        {user.role === UserRole.FARMER ? (
          <>
            <StatCard title={t('earnings')} value="₹45,200" icon="₹" />
            <StatCard title={t('orders')} value={orders.length.toString()} icon="✓" />
          </>
        ) : (
          <>
            <StatCard title="Active Sourcing" value="12 Crops" icon="🛒" />
            <StatCard title="Procured" value="4.2 Tons" icon="📦" />
          </>
        )}
      </div>

      <div className="flex gap-8 border-b mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">
        <button 
          onClick={() => setActiveTab('feed')}
          className={`pb-3 ${activeTab === 'feed' ? 'text-green-700 border-b-2 border-green-700' : ''}`}
        >
          Feed
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-3 ${activeTab === 'orders' ? 'text-green-700 border-b-2 border-green-700' : ''}`}
        >
          {t('orders')}
        </button>
      </div>

      {activeTab === 'feed' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {user.role === UserRole.FARMER ? t('demand_posts') : t('available_crops')}
            </h3>
            {user.role === UserRole.FARMER && (
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 text-sm shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                {t('add_crop')}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {user.role === UserRole.VENDOR ? (
              products.map(p => (
                <PostCard 
                  key={p.id} 
                  type="product" 
                  data={p} 
                  onOrder={() => onAddOrder({
                    id: Math.random().toString(),
                    productId: p.id,
                    farmerId: p.farmerId,
                    vendorId: user.id,
                    cropName: p.cropName,
                    quantity: 10,
                    totalPrice: p.price * 10,
                    status: 'pending',
                    timestamp: new Date().toISOString()
                  })}
                  t={t} 
                />
              ))
            ) : (
              demands.map(d => (
                <PostCard key={d.id} type="demand" data={d} t={t} />
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              No orders yet.
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800">{order.cropName}</h4>
                  <p className="text-sm text-gray-500">{order.quantity} units • ₹{order.totalPrice}</p>
                </div>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                  {order.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)} 
          onSubmit={(p) => {
            onAddProduct({ ...p, farmerId: user.id, farmerName: user.name });
            setShowAddModal(false);
          }}
          t={t}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex-shrink-0 w-40 instagram-shadow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</span>
      <span className="text-green-600 font-bold">{icon}</span>
    </div>
    <div className="text-2xl font-black text-gray-800">{value}</div>
  </div>
);

export default Dashboard;
