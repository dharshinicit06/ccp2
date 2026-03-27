import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface Props {
  user: User;
  onLogout: () => void;
  onEdit?: () => void;
  t: (key: string) => string;
}

const ProfilePage: React.FC<Props> = ({ user, onLogout, onEdit, t }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false);
  };

  return (
    <div className="pb-20 md:pb-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-green-50 to-white rounded-3xl border border-gray-100 p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-green-600 object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-sm text-gray-500 capitalize">
                {user.role === UserRole.FARMER ? 'Farmer' : 'Vendor'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Trust Score</p>
            <p className="text-2xl font-bold text-green-600">{user.trustScore} ★</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Member Since</p>
            <p className="text-lg font-bold text-gray-800">{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h2>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            ) : (
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">{user.name}</p>
            )}
          </div>

          {/* Role-Specific: Business Name for Vendors */}
          {user.role === UserRole.VENDOR && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Business Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.businessName || ''}
                  onChange={(e) => setEditData({ ...editData, businessName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">
                  {user.businessName || 'Not specified'}
                </p>
              )}
            </div>
          )}

          {/* Role-Specific: Crops Grown for Farmers */}
          {user.role === UserRole.FARMER && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Crops Grown</label>
              {isEditing ? (
                <input
                  type="text"
                  value={(editData.cropsGrown || []).join(', ')}
                  onChange={(e) => setEditData({ ...editData, cropsGrown: e.target.value.split(',').map(c => c.trim()) })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                  placeholder="e.g. Wheat, Rice, Corn"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">
                  {user.cropsGrown && user.cropsGrown.length > 0
                    ? user.cropsGrown.join(', ')
                    : 'Not specified'}
                </p>
              )}
            </div>
          )}

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Location / District</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            ) : (
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">{user.location}</p>
            )}
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Preferred Language</label>
            {isEditing ? (
              <select
                value={editData.language}
                onChange={(e) => setEditData({ ...editData, language: e.target.value as any })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              >
                <option value="en">English</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="kn">Kannada (ಕನ್ನಡ)</option>
              </select>
            ) : (
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">
                {editData.language === 'en' && 'English'}
                {editData.language === 'ta' && 'Tamil (தமிழ்)'}
                {editData.language === 'hi' && 'Hindi (हिन्दी)'}
                {editData.language === 'kn' && 'Kannada (ಕನ್ನಡ)'}
              </p>
            )}
          </div>

          {/* User ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">User ID</label>
            <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600 font-mono text-sm break-all">{user.id}</p>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditData(user);
              }}
              className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Role-Specific Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-blue-900 mb-2">
          {user.role === UserRole.FARMER ? '🌾 Farmer Account' : '🛒 Vendor Account'}
        </h3>
        <p className="text-sm text-blue-800">
          {user.role === UserRole.FARMER
            ? 'You are registered as a farmer. You can list your crops, manage orders from vendors, and track your sales.'
            : 'You are registered as a vendor. You can source crops from farmers, manage your inventory, and place orders.'}
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
