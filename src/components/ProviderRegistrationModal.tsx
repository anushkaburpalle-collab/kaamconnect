import React, { useState } from 'react';
import {
  X,
  Briefcase,
  User,
  MapPin,
  IndianRupee,
  Clock,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
} from 'lucide-react';
import { ServiceCategory, Provider } from '../types';
import { CATEGORIES, POPULAR_LOCALITIES } from '../data/categories';
import { saveNewProvider } from '../utils/storage';

interface ProviderRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProviderAdded: (newProvider: Provider) => void;
}

export const ProviderRegistrationModal: React.FC<ProviderRegistrationModalProps> = ({
  isOpen,
  onClose,
  onProviderAdded,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Plumber');
  const [locality, setLocality] = useState('Koramangala, Bengaluru');
  const [customLocality, setCustomLocality] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [priceStarting, setPriceStarting] = useState('299');
  const [priceUnit, setPriceUnit] = useState('per visit');
  const [availability, setAvailability] = useState('Mon - Sat • 9:00 AM - 7:00 PM');
  const [phone, setPhone] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [about, setAbout] = useState('');
  const [services, setServices] = useState<{ name: string; rate: string }[]>([
    { name: 'Standard Inspection & Diagnostic', rate: '₹299' },
    { name: 'Minor Repair / Service', rate: '₹499' },
  ]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdProvider, setCreatedProvider] = useState<Provider | null>(null);

  if (!isOpen) return null;

  const handleAddServiceRow = () => {
    setServices([...services, { name: '', rate: '₹' }]);
  };

  const handleRemoveServiceRow = (index: number) => {
    if (services.length <= 1) return;
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index: number, field: 'name' | 'rate', value: string) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) errs.name = 'Full name is required';
    if (!experienceYears || isNaN(Number(experienceYears)) || Number(experienceYears) < 0) {
      errs.experienceYears = 'Valid years of experience is required';
    }
    if (!priceStarting || isNaN(Number(priceStarting)) || Number(priceStarting) <= 0) {
      errs.priceStarting = 'Valid starting price is required';
    }

    const effectiveLocality = locality === 'Other' ? customLocality.trim() : locality;
    if (!effectiveLocality) {
      errs.locality = 'Locality is required';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number is required';
    }

    if (!shortDescription.trim() || shortDescription.trim().length < 15) {
      errs.shortDescription = 'Brief summary must be at least 15 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const effectiveLocality = locality === 'Other' ? customLocality.trim() : locality;
    const city = effectiveLocality.includes(',')
      ? effectiveLocality.split(',').pop()?.trim() || 'India'
      : 'India';

    const validServices = services
      .filter((s) => s.name.trim().length > 0)
      .map((s) => ({
        name: s.name.trim(),
        rate: s.rate.trim() || '₹299',
      }));

    setTimeout(() => {
      const newProvider = saveNewProvider({
        name: name.trim(),
        category,
        locality: effectiveLocality,
        city,
        experienceYears: Number(experienceYears),
        priceStarting: Number(priceStarting),
        priceUnit,
        priceRange: `₹${priceStarting} - ₹${Number(priceStarting) * 2 + 150}`,
        availability,
        shortDescription: shortDescription.trim(),
        about:
          about.trim() ||
          `${name.trim()} has ${experienceYears} years of experience providing quality ${category} services in ${effectiveLocality}. Dedicated to punctual, reliable home services.`,
        servicesOffered:
          validServices.length > 0
            ? validServices
            : [{ name: 'Standard Service & Inspection', rate: `₹${priceStarting}` }],
        phone: `+91 ${phone.trim()}`,
        languages: ['Hindi', 'English'],
      });

      setIsSubmitting(false);
      setCreatedProvider(newProvider);
      onProviderAdded(newProvider);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-cream-100 w-full max-w-2xl rounded-3xl shadow-float border border-surface-border overflow-hidden my-6 max-h-[92vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-forest-900 text-cream-100 p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-800 border border-forest-700 text-lime text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Local KaamConnect Network</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-cream-50">
            List Your Service as a Partner
          </h2>
          <p className="text-xs sm:text-sm text-cream-300 mt-1">
            Publish your profile to your local neighbourhood. Listings are added instantly and saved in browser storage.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {createdProvider ? (
            /* Registration Success */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-lime/30 border border-lime text-forest-900 mx-auto flex items-center justify-center shadow-subtle">
                <CheckCircle2 className="w-10 h-10 text-forest-800" />
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-lime/40 text-forest-950 text-[11px] font-bold mb-2">
                  🎉 Profile Live in Marketplace
                </span>
                <h3 className="font-display font-extrabold text-2xl text-forest-900">
                  Welcome to KaamConnect, {createdProvider.name}!
                </h3>
                <p className="text-xs sm:text-sm text-surface-dark/75 mt-1 max-w-md mx-auto">
                  Your listing for <strong>{createdProvider.category}</strong> in{' '}
                  <strong>{createdProvider.locality}</strong> is now visible to customers in the marketplace.
                </p>
              </div>

              {/* Preview mini card */}
              <div className="bg-cream-50 p-4 rounded-2xl border border-surface-border text-left max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-forest-900">{createdProvider.name}</span>
                  <span className="text-xs font-bold text-lime-dark bg-lime/40 px-2 py-0.5 rounded">
                    Starts ₹{createdProvider.priceStarting}
                  </span>
                </div>
                <p className="text-xs text-surface-dark/75">{createdProvider.shortDescription}</p>
                <div className="text-[11px] text-surface-dark/60">
                  📍 {createdProvider.locality} • ⏱ {createdProvider.availability}
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-100 font-bold text-sm shadow-card"
                >
                  View Marketplace & My Listing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Anand Kulkarni"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-surface-dark focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-surface-border focus:ring-forest-700'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Service Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Locality Selector */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Primary Operating Locality <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                      <option value="Other">Other / Custom Locality</option>
                    </select>
                  </div>

                  {locality === 'Other' && (
                    <input
                      type="text"
                      placeholder="e.g. Jayanagar 4th Block, Bengaluru"
                      value={customLocality}
                      onChange={(e) => setCustomLocality(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                    />
                  )}
                </div>
                {errors.locality && (
                  <p className="text-[11px] text-red-600 font-medium mt-1">{errors.locality}</p>
                )}
              </div>

              {/* Experience, Starting Price & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Experience (Years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="45"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                  {errors.experienceYears && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">
                      {errors.experienceYears}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Starting Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                      <IndianRupee className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      min="50"
                      step="50"
                      value={priceStarting}
                      onChange={(e) => setPriceStarting(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                    />
                  </div>
                  {errors.priceStarting && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">
                      {errors.priceStarting}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Price Unit
                  </label>
                  <select
                    value={priceUnit}
                    onChange={(e) => setPriceUnit(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                  >
                    <option value="per visit">per visit</option>
                    <option value="per hour">per hour</option>
                    <option value="per session">per session</option>
                    <option value="per month">per month</option>
                    <option value="per sq. ft">per sq. ft</option>
                  </select>
                </div>
              </div>

              {/* Phone & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40 text-xs font-bold">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="98765 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-surface-dark focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-surface-border focus:ring-forest-700'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Availability / Hours
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                      <Clock className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Mon-Sat • 8:00 AM - 8:00 PM"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                    />
                  </div>
                </div>
              </div>

              {/* Short summary */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Card Headline / Short Summary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Certified home technician specializing in quick leak repairs & emergency visits."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-surface-dark focus:outline-none focus:ring-2 ${
                    errors.shortDescription
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-surface-border focus:ring-forest-700'
                  }`}
                />
                {errors.shortDescription && (
                  <p className="text-[11px] text-red-600 font-medium mt-1">
                    {errors.shortDescription}
                  </p>
                )}
              </div>

              {/* Services & Rates */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-forest-900">
                    Services & Sample Rates
                  </label>
                  <button
                    type="button"
                    onClick={handleAddServiceRow}
                    className="text-xs font-bold text-forest-700 hover:text-forest-900 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {services.map((srv, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Service name (e.g. Tap Leak Repair)"
                        value={srv.name}
                        onChange={(e) => handleServiceChange(idx, 'name', e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-cream-50 border border-surface-border text-xs text-surface-dark focus:outline-none focus:ring-1 focus:ring-forest-700"
                      />
                      <input
                        type="text"
                        placeholder="Rate (e.g. ₹299)"
                        value={srv.rate}
                        onChange={(e) => handleServiceChange(idx, 'rate', e.target.value)}
                        className="w-24 px-3 py-2 rounded-xl bg-cream-50 border border-surface-border text-xs text-surface-dark focus:outline-none focus:ring-1 focus:ring-forest-700"
                      />
                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveServiceRow(idx)}
                          className="p-2 text-surface-dark/40 hover:text-red-600 transition-colors"
                          aria-label="Remove service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed About */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Detailed Bio / Experience Background (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share your tools, certifications, safety practices, and background for local customers..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full p-3 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark placeholder-surface-dark/40 focus:outline-none focus:ring-2 focus:ring-forest-700"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-surface-dark/70 hover:bg-cream-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 active:scale-98 text-cream-100 font-bold text-xs sm:text-sm shadow-card flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Publishing Listing...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-lime" />
                      <span>Publish Listing to Marketplace</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
