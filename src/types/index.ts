export type ServiceCategory = 
  | 'Plumber'
  | 'Electrician'
  | 'Cook'
  | 'Maid / House Cleaning'
  | 'Tutor'
  | 'Carpenter'
  | 'Painter'
  | 'Appliance Repair';

export interface CategoryItem {
  id: string;
  name: ServiceCategory;
  icon: string;
  tagline: string;
  startingPrice: string;
  count: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  locality: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ServiceDetail {
  name: string;
  rate: string;
  description?: string;
}

export interface Provider {
  id: string;
  name: string;
  category: ServiceCategory;
  locality: string;
  city: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  priceStarting: number;
  priceUnit: string; // e.g. "per visit", "per hour", "per month"
  priceRange?: string; // e.g. "₹299 - ₹799"
  availability: string; // e.g. "Available Today", "Mon-Sat, 9AM-8PM"
  shortDescription: string;
  about: string;
  servicesOffered: ServiceDetail[];
  phone: string;
  languages: string[];
  isDemo: true; // Clearly indicates demo data
  badge?: string; // e.g. "Top Rated", "Popular", "Quick Responder"
  reviews?: ReviewItem[];
  createdAt?: string;
}

export interface Enquiry {
  id: string;
  providerId: string;
  providerName: string;
  providerCategory: ServiceCategory;
  providerLocality: string;
  customerName: string;
  customerPhone: string;
  customerLocality: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string;
  serviceRequested?: string;
  status: 'Pending Response' | 'Acknowledged' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  category: string; // '' for all
  locality: string; // '' for all
  sortBy: 'recommended' | 'rating-desc' | 'price-asc' | 'price-desc' | 'experience-desc';
}


export interface UserSession {
  isLoggedIn: boolean;
  name: string;
  phone: string;
  locality: string;
  role?: 'customer' | 'provider';
}

