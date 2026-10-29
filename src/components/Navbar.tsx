import React, { useState } from 'react';
import {
  Menu,
  X,
  PlusCircle,
  ClipboardList,
  User as UserIcon,
  Sparkles,
  Search,
} from 'lucide-react';
import { UserSession } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'explore' | 'my-enquiries';
  setActiveTab: (tab: 'home' | 'explore' | 'my-enquiries') => void;
  openRegistrationModal: () => void;
  openAuthModal: () => void;
  openEnquiriesDrawer: () => void;
  enquiriesCount: number;
  userSession: UserSession;
  scrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openRegistrationModal,
  openAuthModal,
  openEnquiriesDrawer,
  enquiriesCount,
  userSession,
  scrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream-200/95 backdrop-blur-md border-b border-surface-border transition-all">
      {/* Top Demo Banner */}
      <div className="bg-forest-900 text-cream-100 text-xs py-1.5 px-4 text-center border-b border-forest-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-lime text-forest-950 uppercase tracking-wide">
            Demo MVP
          </span>
          <span>
            KaamConnect sample prototype. Listings & enquiries are stored locally in your browser.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group text-left flex items-center gap-3 transition-transform active:scale-98"
            >
              <div className="w-11 h-11 rounded-2xl bg-forest-800 flex items-center justify-center shadow-card group-hover:bg-forest-900 transition-colors">
                <div className="w-6 h-6 rounded-lg bg-lime flex items-center justify-center font-bold text-forest-950 text-sm shadow-inner">
                  K
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-2xl tracking-tight text-forest-800">
                    Kaam<span className="text-forest-600">Connect</span>
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-lime animate-pulse"></span>
                </div>
                <p className="text-[11px] font-medium text-surface-dark/70 tracking-wide uppercase">
                  Local Services India
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'home'
                    ? 'text-forest-800 bg-forest-100/60 font-bold'
                    : 'text-surface-dark/80 hover:text-forest-800 hover:bg-forest-50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => {
                  setActiveTab('explore');
                  const el = document.getElementById('explore-services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'explore'
                    ? 'text-forest-800 bg-forest-100/60 font-bold'
                    : 'text-surface-dark/80 hover:text-forest-800 hover:bg-forest-50'
                }`}
              >
                <Search className="w-4 h-4 text-forest-600" />
                Explore Services
              </button>

              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-surface-dark/80 hover:text-forest-800 hover:bg-forest-50 transition-all"
              >
                How It Works
              </button>

              <button
                onClick={() => scrollToSection('trust-section')}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-surface-dark/80 hover:text-forest-800 hover:bg-forest-50 transition-all"
              >
                Transparent Pricing
              </button>
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* My Enquiries Button */}
            <button
              onClick={openEnquiriesDrawer}
              className="relative px-3.5 py-2 rounded-xl text-sm font-semibold text-forest-800 hover:bg-forest-50 border border-surface-border transition-all flex items-center gap-2"
              title="View your saved service enquiries"
            >
              <ClipboardList className="w-4 h-4 text-forest-700" />
              <span>My Enquiries</span>
              {enquiriesCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold bg-lime text-forest-950 shadow-sm">
                  {enquiriesCount}
                </span>
              )}
            </button>

            {/* Become a Provider Button */}
            <button
              onClick={openRegistrationModal}
              className="px-4 py-2.5 rounded-xl text-sm font-bold bg-forest-100 hover:bg-forest-200/80 text-forest-800 border border-forest-300 transition-all flex items-center gap-2 shadow-sm hover:shadow"
            >
              <PlusCircle className="w-4 h-4 text-forest-700" />
              <span>Become a Provider</span>
            </button>

            {/* Login / User Status */}
            <button
              onClick={openAuthModal}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-forest-800 hover:bg-forest-900 text-cream-100 transition-all flex items-center gap-2 shadow-card"
            >
              <UserIcon className="w-4 h-4 text-lime" />
              <span className="max-w-[120px] truncate">
                {userSession.isLoggedIn ? userSession.name.split(' ')[0] : 'Login'}
              </span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={openEnquiriesDrawer}
              className="relative p-2 rounded-xl text-forest-800 hover:bg-forest-50 border border-surface-border"
              aria-label="View enquiries"
            >
              <ClipboardList className="w-5 h-5" />
              {enquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime text-forest-950 text-[10px] font-bold flex items-center justify-center">
                  {enquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-forest-100 text-forest-800 hover:bg-forest-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-100 border-b border-surface-border px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-3 text-left rounded-xl bg-forest-50 font-semibold text-forest-800 text-sm"
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                setActiveTab('explore');
                setMobileMenuOpen(false);
                const el = document.getElementById('explore-services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-3 text-left rounded-xl bg-forest-50 font-semibold text-forest-800 text-sm"
            >
              🔍 Explore Services
            </button>
          </div>

          <div className="space-y-1 border-t border-surface-border pt-2">
            <button
              onClick={() => {
                scrollToSection('how-it-works');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-surface-dark/80 hover:text-forest-800"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                scrollToSection('trust-section');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-surface-dark/80 hover:text-forest-800"
            >
              Transparent Pricing & Trust
            </button>
          </div>

          <div className="pt-2 border-t border-surface-border space-y-2">
            <button
              onClick={() => {
                openRegistrationModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-lime text-forest-950 flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Become a Provider / List Service</span>
            </button>

            <button
              onClick={() => {
                openAuthModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm bg-forest-800 text-cream-100 flex items-center justify-center gap-2"
            >
              <UserIcon className="w-4 h-4 text-lime" />
              <span>{userSession.isLoggedIn ? `Account (${userSession.name})` : 'Login / Profile'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
