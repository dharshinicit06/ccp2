
export type Language = 'en' | 'ta' | 'hi' | 'kn';

export enum UserRole {
  FARMER = 'FARMER',
  VENDOR = 'VENDOR',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  location: string;
  language: Language;
  trustScore: number;
  businessName?: string;
  cropsGrown?: string[];
  avatar: string;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  price: number;
  unit: string;
  quantity: number;
  harvestDate: string;
  images: string[];
  description: string;
  freshness: number; // 1-5
  status: 'available' | 'sold';
}

export interface Demand {
  id: string;
  vendorId: string;
  vendorName: string;
  cropName: string;
  maxPrice: number;
  quantityNeeded: number;
  location: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isVoice?: boolean;
}

export interface Order {
  id: string;
  productId: string;
  farmerId: string;
  vendorId: string;
  cropName: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'accepted' | 'shipped' | 'delivered' | 'rejected';
  timestamp: string;
}
