import React, { useState } from 'react';
import { X, User, MapPin, CheckCircle2, ShieldCheck, LogOut } from 'lucide-react';
import { UserSession } from '../types';
import { saveUserSession, DEFAULT_USER } from '../utils/storage';
import { POPULAR_LOCALITIES } from '../data/categories';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSession: UserSession;
  setUserSession: React.Dispatch<React.SetStateAction<UserSession>>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userSession,
  setUserSession,
}) => {
  const [name, setName] = useState(userSession.name || '');
  const [phone, setPhone] = useState(userSession.phone?.replace('+91 ', '') || '');
  const [locality, setLocality] = useState(userSession.locality || 'Koramangala, Bengaluru');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserSession = {
      isLoggedIn: true,
      name: name.trim() || 'Demo Household User',
      phone: `+91 ${phone.trim() || '98450 12345'}`,
      locality: locality || 'Koramangala, Bengaluru',
    };
    saveUserSession(updated);
    setUserSession(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleLogout = () => {
    const guest: UserSession = {
      isLoggedIn: false,
      name: 'Guest User',
      phone: '',
      locality: '',
    };
    saveUserSession(guest);
    setUserSession(guest);
    onClose();
  };

  const handleRestoreDefault = () => {
    saveUserSession(DEFAULT_USER);
    setUserSession(DEFAULT_USER);
    setName(DEFAULT_USER.name);
    setPhone(DEFAULT_USER.phone.replace('+91 ', ''));
    setLocality(DEFAULT_USER.locality);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-cream-100 w-full max-w-md rounded-3xl shadow-float border border-surface-border overflow-hidden my-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-forest-900 text-cream-100 p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-forest-800 text-lime text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Prototype User Profile</span>
          </div>

          <h2 className="font-display text-xl font-bold text-cream-50">
            {userSession.isLoggedIn ? 'Manage Active Demo Session' : 'Quick Demo Sign-In'}
          </h2>
          <p className="text-xs text-cream-300 mt-1">
            No real password or credentials required. This information helps pre-fill your service booking enquiries.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {savedSuccess ? (
            <div className="text-center py-6 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-lime/40 text-forest-900 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-forest-800" />
              </div>
              <h3 className="font-display font-bold text-lg text-forest-900">
                Profile Updated!
              </h3>
              <p className="text-xs text-surface-dark/70">
                Enquiries will now be attributed to <strong>{name}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40 text-xs font-bold">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98450 12345"
                    className="w-full pl-11 pr-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Home Locality
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                  >
                    {POPULAR_LOCALITIES.filter((l) => l !== 'All Localities').map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-surface-border">
                {userSession.isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRestoreDefault}
                    className="text-xs font-semibold text-forest-700 hover:underline"
                  >
                    Use Sample User
                  </button>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-100 font-bold text-xs shadow-card"
                >
                  Save Active Session
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
