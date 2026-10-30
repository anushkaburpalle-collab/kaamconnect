
import React, { useState } from 'react';
import {
  X,
  User,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  LogOut,
  BriefcaseBusiness,
  House,
  Phone,
} from 'lucide-react';

import { UserSession, ServiceCategory } from '../types';
import { saveUserSession, DEFAULT_USER } from '../utils/storage';
import { POPULAR_LOCALITIES} from '../data/categories';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSession: UserSession;
  setUserSession: React.Dispatch<React.SetStateAction<UserSession>>;
}

type AccountRole = 'customer' | 'provider';

const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Plumber',
  'Electrician',
  'Cook',
  'Maid / House Cleaning',
  'Tutor',
  'Carpenter',
  'Painter',
  'Appliance Repair',
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userSession,
  setUserSession,
}) => {
  const [role, setRole] = useState<AccountRole>(
    userSession.role || 'customer'
  );
  const [name, setName] = useState(userSession.name || '');
  const [phone, setPhone] = useState(
    userSession.phone?.replace('+91 ', '') || ''
  );
  const [locality, setLocality] = useState(
    userSession.locality || ''
  );
  const [serviceCategory, setServiceCategory] =
    useState<ServiceCategory>('Electrician');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!locality) {
      setError('Please select your locality.');
      return;
    }

    const updated: UserSession = {
      isLoggedIn: true,
      name: name.trim(),
      phone: `+91 ${cleanPhone}`,
      locality,
      role,
    };

    saveUserSession(updated);
    setUserSession(updated);
    setSavedSuccess(true);

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleLogout = () => {
    const guest: UserSession = {
      isLoggedIn: false,
      name: 'Guest User',
      phone: '',
      locality: '',
      role: 'customer',
    };

    saveUserSession(guest);
    setUserSession(guest);
    onClose();
  };

  const handleRestoreDefault = () => {
    const sampleUser: UserSession = {
      ...DEFAULT_USER,
      role: 'customer',
    };

    saveUserSession(sampleUser);
    setUserSession(sampleUser);
    setName(sampleUser.name);
    setPhone(sampleUser.phone.replace('+91 ', ''));
    setLocality(sampleUser.locality);
    setRole('customer');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-cream-100 w-full max-w-md rounded-3xl shadow-float border border-surface-border overflow-hidden my-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-forest-900 text-cream-100 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-forest-800 hover:bg-forest-700"
            aria-label="Close signup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-forest-800 text-lime text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4" />
            KaamConnect Accounts
          </div>

          <h2 className="font-display text-2xl font-bold">
            {savedSuccess
              ? 'You’re all set!'
              : userSession.isLoggedIn
                ? 'Your Profile'
                : 'Join KaamConnect'}
          </h2>

          <p className="text-sm text-cream-300 mt-2">
            {savedSuccess
              ? 'Your demo profile has been saved.'
              : 'Connect with trusted people in your neighbourhood.'}
          </p>
        </div>

        <div className="p-6">
          {savedSuccess ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-14 h-14 text-forest-800 mx-auto" />

              <h3 className="font-display font-bold text-xl text-forest-900">
                Welcome, {name}!
              </h3>

              <p className="text-sm text-surface-dark/70">
                Your {role === 'customer' ? 'customer' : 'service provider'} demo profile is ready.
              </p>

              {role === 'provider' && (
                <p className="text-xs text-surface-dark/70">
                  Selected service: {serviceCategory}. Your profile is not
                  yet published as a provider listing.
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-2">
                  I want to join as a
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`p-4 rounded-2xl border text-left transition ${
                      role === 'customer'
                        ? 'border-forest-800 bg-lime/20 ring-1 ring-forest-800'
                        : 'border-surface-border bg-cream-50'
                    }`}
                  >
                    <House className="w-6 h-6 mb-2 text-forest-800" />
                    <span className="block text-sm font-bold text-forest-900">
                      Customer
                    </span>
                    <span className="text-xs text-surface-dark/70">
                      Find local services
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('provider')}
                    className={`p-4 rounded-2xl border text-left transition ${
                      role === 'provider'
                        ? 'border-forest-800 bg-lime/20 ring-1 ring-forest-800'
                        : 'border-surface-border bg-cream-50'
                    }`}
                  >
                    <BriefcaseBusiness className="w-6 h-6 mb-2 text-forest-800" />
                    <span className="block text-sm font-bold text-forest-900">
                      Service Provider
                    </span>
                    <span className="text-xs text-surface-dark/70">
                      Offer your services
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-surface-dark/40" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-surface-dark/40" />
                  <span className="absolute left-9 top-3 text-sm text-surface-dark/60">
                    +91
                  </span>
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder="10-digit mobile number"
                    className="w-full pl-16 pr-3 py-3 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {role === 'customer' ? 'Your Locality' : 'Service Location'}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-surface-dark/40" />
                  <select
                    required
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                  >
                    <option value="">Select your locality</option>
                    {POPULAR_LOCALITIES.filter(
                      (item) => item !== 'All Localities'
                    ).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {role === 'provider' && (
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Service You Provide
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) =>
                      setServiceCategory(e.target.value as ServiceCategory)
                    }
                    className="w-full px-3 py-3 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                  >
                    {SERVICE_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-surface-dark/60 mt-2">
                    You can add your rates, experience, and service details when
                    we set up your provider listing.
                  </p>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <div className="pt-3 flex items-center justify-between gap-3 border-t border-surface-border">
                {userSession.isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-xs font-semibold text-red-600 flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRestoreDefault}
                    className="text-xs font-semibold text-forest-700 hover:underline"
                  >
                    Sample User
                  </button>
                )}

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-100 font-bold text-sm shadow-card"
                >
                  {userSession.isLoggedIn ? 'Save Profile' : 'Create Demo Account'}
                </button>
              </div>

              <p className="text-xs text-center text-surface-dark/60">
                Demo mode: no password or OTP verification is enabled yet.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
