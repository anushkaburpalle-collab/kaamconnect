import { Provider, Enquiry, UserSession } from '../types';
import { SEED_PROVIDERS } from '../data/seedProviders';

const STORAGE_KEYS = {
  PROVIDERS: 'kaamconnect_providers_v1',
  ENQUIRIES: 'kaamconnect_enquiries_v1',
  USER_SESSION: 'kaamconnect_user_session_v1',
};

// Default demo user session
export const DEFAULT_USER: UserSession = {
  isLoggedIn: true,
  name: 'Rohan Sharma',
  phone: '+91 98450 12345',
  locality: 'Koramangala, Bengaluru',
};

export const getStoredProviders = (): Provider[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
    if (!raw) {
      // First time initialize with seeds
      localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(SEED_PROVIDERS));
      return SEED_PROVIDERS;
    }
    const parsed: Provider[] = JSON.parse(raw);
    return parsed.length > 0 ? parsed : SEED_PROVIDERS;
  } catch (error) {
    console.error('Error reading providers from localStorage:', error);
    return SEED_PROVIDERS;
  }
};

export const saveNewProvider = (newProvider: Omit<Provider, 'id' | 'isDemo' | 'rating' | 'reviewCount'>): Provider => {
  const current = getStoredProviders();
  const providerWithDefaults: Provider = {
    ...newProvider,
    id: `prov-custom-${Date.now()}`,
    rating: 5.0,
    reviewCount: 1,
    isDemo: true,
    badge: 'Newly Listed Partner',
    createdAt: new Date().toISOString(),
    reviews: [
      {
        id: `rev-initial-${Date.now()}`,
        author: 'KaamConnect Community',
        locality: newProvider.locality,
        rating: 5,
        date: 'Today',
        comment: 'Verified local onboarding profile. Ready to accept neighbourhood home service bookings.',
      },
    ],
  };

  const updated = [providerWithDefaults, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to persist provider in localStorage:', error);
  }
  return providerWithDefaults;
};

export const getStoredEnquiries = (): Enquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (!raw) {
      // Seed 1 sample initial enquiry for immediate delight
      const initialEnquiry: Enquiry[] = [
        {
          id: 'enq-sample-101',
          providerId: 'prov-1',
          providerName: 'Ramesh Kumar',
          providerCategory: 'Plumber',
          providerLocality: 'Koramangala, Bengaluru',
          customerName: 'Rohan Sharma',
          customerPhone: '+91 98450 12345',
          customerLocality: 'Koramangala 5th Block',
          preferredDate: 'Tomorrow',
          preferredTimeSlot: 'Morning (9:00 AM - 12:00 PM)',
          notes: 'Bathroom sink pipe leaking under the washbasin cabinet. Need replacement gasket.',
          serviceRequested: 'General Tap & Leak Repair',
          status: 'Acknowledged',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        },
      ];
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(initialEnquiry));
      return initialEnquiry;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading enquiries from localStorage:', error);
    return [];
  }
};

export const saveNewEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry => {
  const current = getStoredEnquiries();
  const newEnquiry: Enquiry = {
    ...enquiryData,
    id: `enq-${Date.now()}`,
    status: 'Pending Response',
    createdAt: new Date().toISOString(),
  };

  const updated = [newEnquiry, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to persist enquiry in localStorage:', error);
  }
  return newEnquiry;
};

export const updateEnquiryStatus = (id: string, status: Enquiry['status']): Enquiry[] => {
  const current = getStoredEnquiries();
  const updated = current.map((enq) => (enq.id === id ? { ...enq, status } : enq));
  try {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to update enquiry in localStorage:', error);
  }
  return updated;
};

export const getUserSession = (): UserSession => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USER;
  }
};

export const saveUserSession = (user: UserSession) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user session:', error);
  }
};

export const resetToDemoDefaults = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROVIDERS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
  } catch (e) {
    console.error(e);
  }
};
