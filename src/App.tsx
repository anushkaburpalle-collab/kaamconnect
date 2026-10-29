import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryPills } from './components/CategoryPills';
import { Marketplace } from './components/Marketplace';
import { HowItWorks } from './components/HowItWorks';
import { TrustSection } from './components/TrustSection';
import { ProviderCta } from './components/ProviderCta';
import { Footer } from './components/Footer';
import { ProviderModal } from './components/ProviderModal';
import { EnquiryModal } from './components/EnquiryModal';
import { ProviderRegistrationModal } from './components/ProviderRegistrationModal';
import { EnquiriesDrawer } from './components/EnquiriesDrawer';
import { AuthModal } from './components/AuthModal';
import { Toast, ToastMessage } from './components/Toast';

import { Provider, Enquiry, FilterState, UserSession } from './types';
import {
  getStoredProviders,
  getStoredEnquiries,
  getUserSession,
  resetToDemoDefaults,
} from './utils/storage';

export function App() {
  // Main Data States persisted in LocalStorage
  const [providers, setProviders] = useState<Provider[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [userSession, setUserSession] = useState<UserSession>({
    isLoggedIn: true,
    name: 'Rohan Sharma',
    phone: '+91 98450 12345',
    locality: 'Koramangala, Bengaluru',
  });

  // Filter States
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: '',
    locality: '',
    sortBy: 'recommended',
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'my-enquiries'>('home');

  // Modals & Drawers States
  const [selectedProviderForProfile, setSelectedProviderForProfile] = useState<Provider | null>(null);
  const [selectedProviderForEnquiry, setSelectedProviderForEnquiry] = useState<Provider | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isEnquiriesDrawerOpen, setIsEnquiriesDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize on mount
  useEffect(() => {
    const loadedProviders = getStoredProviders();
    const loadedEnquiries = getStoredEnquiries();
    const loadedSession = getUserSession();

    setProviders(loadedProviders);
    setEnquiries(loadedEnquiries);
    setUserSession(loadedSession);
  }, []);

  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Search submit from Hero
  const handleHeroSearch = () => {
    setActiveTab('explore');
    const el = document.getElementById('explore-services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickCategorySelect = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === categoryName ? '' : categoryName,
      searchQuery: '', // clear any stale search query so category results show immediately
    }));
    setActiveTab('explore');
    const el = document.getElementById('explore-services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Provider Registration handler
  const handleProviderAdded = (newProvider: Provider) => {
    setProviders((prev) => [newProvider, ...prev]);
    addToast(
      'success',
      'Listing Published!',
      `${newProvider.name} is now listed for ${newProvider.category} in ${newProvider.locality}.`
    );
  };

  // Enquiry submitted handler
  const handleEnquirySuccess = (newEnquiry: Enquiry) => {
    setEnquiries((prev) => [newEnquiry, ...prev]);
    addToast(
      'success',
      'Enquiry Sent & Saved',
      `Forwarded to ${newEnquiry.providerName}. You can track it in My Enquiries.`
    );
  };

  // Reset to original seed demo data
  const handleResetData = () => {
    if (window.confirm('Reset KaamConnect back to the original demo data and clear custom listings?')) {
      resetToDemoDefaults();
      const freshProviders = getStoredProviders();
      const freshEnquiries = getStoredEnquiries();
      const freshSession = getUserSession();

      setProviders(freshProviders);
      setEnquiries(freshEnquiries);
      setUserSession(freshSession);
      setFilters({
        searchQuery: '',
        category: '',
        locality: '',
        sortBy: 'recommended',
      });

      addToast('info', 'Demo Data Reset', 'Restored 14 default sample Indian providers.');
    }
  };

  const handleViewProviderById = (providerId: string) => {
    const target = providers.find((p) => p.id === providerId);
    if (target) {
      setIsEnquiriesDrawerOpen(false);
      setSelectedProviderForProfile(target);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-200 text-surface-dark">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openRegistrationModal={() => setIsRegistrationOpen(true)}
        openAuthModal={() => setIsAuthModalOpen(true)}
        openEnquiriesDrawer={() => setIsEnquiriesDrawerOpen(true)}
        enquiriesCount={enquiries.length}
        userSession={userSession}
        scrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          searchQuery={filters.searchQuery}
          setSearchQuery={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
          selectedLocality={filters.locality}
          setSelectedLocality={(loc) => setFilters((prev) => ({ ...prev, locality: loc }))}
          onSearchSubmit={handleHeroSearch}
          onQuickCategorySelect={handleQuickCategorySelect}
        />

        {/* 8 Categories Pills */}
        <CategoryPills
          selectedCategory={filters.category}
          onSelectCategory={(catName) => {
            setFilters((prev) => ({
              ...prev,
              category: catName,
              searchQuery: '', // clear old search so selected category items display cleanly
            }));
            const el = document.getElementById('explore-services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive Marketplace Section */}
        <Marketplace
          providers={providers}
          filters={filters}
          setFilters={setFilters}
          onViewProfile={(provider) => setSelectedProviderForProfile(provider)}
          onBookEnquiry={(provider) => setSelectedProviderForEnquiry(provider)}
          onOpenRegister={() => setIsRegistrationOpen(true)}
        />

        {/* How It Works */}
        <HowItWorks
          onExploreClick={() => {
            setActiveTab('explore');
            const el = document.getElementById('explore-services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Transparent Pricing & Trust Section */}
        <TrustSection />

        {/* Provider Recruitment CTA */}
        <ProviderCta onOpenRegister={() => setIsRegistrationOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onCategoryClick={(name) => {
          setFilters((prev) => ({ ...prev, category: name }));
          const el = document.getElementById('explore-services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onLocalityClick={(loc) => {
          setFilters((prev) => ({ ...prev, locality: loc }));
          const el = document.getElementById('explore-services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onResetData={handleResetData}
        onOpenRegister={() => setIsRegistrationOpen(true)}
      />

      {/* Detailed Profile Modal */}
      <ProviderModal
        provider={selectedProviderForProfile}
        onClose={() => setSelectedProviderForProfile(null)}
        onOpenEnquiry={(prov) => setSelectedProviderForEnquiry(prov)}
      />

      {/* Booking / Enquiry Form Modal */}
      <EnquiryModal
        provider={selectedProviderForEnquiry}
        onClose={() => setSelectedProviderForEnquiry(null)}
        onEnquirySuccess={handleEnquirySuccess}
        userSession={userSession}
      />

      {/* Become a Provider / Registration Modal */}
      <ProviderRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onProviderAdded={handleProviderAdded}
      />

      {/* My Enquiries Drawer */}
      <EnquiriesDrawer
        isOpen={isEnquiriesDrawerOpen}
        onClose={() => setIsEnquiriesDrawerOpen(false)}
        enquiries={enquiries}
        setEnquiries={setEnquiries}
        onViewProviderById={handleViewProviderById}
      />

      {/* Auth / Demo Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        userSession={userSession}
        setUserSession={setUserSession}
      />

      {/* Floating Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
