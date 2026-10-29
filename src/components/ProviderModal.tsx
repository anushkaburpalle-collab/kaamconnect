import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Clock,
  Briefcase,
  Phone,
  ShieldAlert,
  Calendar,
  Languages,
  CheckCircle2,
  Copy,
  Check,
  Send,
} from 'lucide-react';
import { Provider } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface ProviderModalProps {
  provider: Provider | null;
  onClose: () => void;
  onOpenEnquiry: (provider: Provider) => void;
}

export const ProviderModal: React.FC<ProviderModalProps> = ({
  provider,
  onClose,
  onOpenEnquiry,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!provider) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(provider.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-cream-100 w-full max-w-3xl rounded-3xl shadow-float border border-surface-border overflow-hidden my-6 max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Header */}
        <div className="bg-forest-900 text-cream-100 p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Sample Demo Data Notice */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-800 border border-forest-700 text-cream-200 text-xs font-semibold mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-lime" />
            <span>Sample Demo Profile • Prototype Data Only</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lime text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <CategoryIcon name={provider.category} className="w-3.5 h-3.5" />
                  {provider.category}
                </span>
                {provider.badge && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-lime/20 text-lime border border-lime/30">
                    {provider.badge}
                  </span>
                )}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-cream-50">
                {provider.name}
              </h2>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-cream-300 mt-1">
                <MapPin className="w-4 h-4 text-lime shrink-0" />
                <span>{provider.locality}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-forest-800/90 border border-forest-700 rounded-2xl p-3.5 sm:text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-cream-300 tracking-wider block">
                Standard Pricing
              </span>
              <div className="flex items-baseline sm:justify-end gap-1">
                <span className="font-display font-extrabold text-2xl text-lime">
                  ₹{provider.priceStarting}
                </span>
                <span className="text-xs text-cream-300 font-medium">
                  {provider.priceUnit}
                </span>
              </div>
              {provider.priceRange && (
                <span className="text-[11px] text-cream-300/80 block mt-0.5">
                  Range: {provider.priceRange}
                </span>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-forest-800 text-center">
            <div className="bg-forest-950/40 rounded-xl py-2 px-1">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm sm:text-base">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span>{provider.rating.toFixed(1)}</span>
              </div>
              <p className="text-[10px] text-cream-300 font-medium mt-0.5">
                {provider.reviewCount} Reviews
              </p>
            </div>

            <div className="bg-forest-950/40 rounded-xl py-2 px-1">
              <div className="flex items-center justify-center gap-1 text-cream-50 font-bold text-sm sm:text-base">
                <Briefcase className="w-4 h-4 text-lime" />
                <span>{provider.experienceYears}+ Yrs</span>
              </div>
              <p className="text-[10px] text-cream-300 font-medium mt-0.5">
                Local Experience
              </p>
            </div>

            <div className="bg-forest-950/40 rounded-xl py-2 px-1">
              <div className="flex items-center justify-center gap-1 text-cream-50 font-bold text-sm sm:text-base truncate px-1">
                <Clock className="w-4 h-4 text-lime shrink-0" />
                <span className="truncate">Open Today</span>
              </div>
              <p className="text-[10px] text-cream-300 font-medium mt-0.5 truncate">
                {provider.availability.split('•')[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* About Section */}
          <div>
            <h3 className="font-display font-bold text-base text-forest-950 mb-2">
              About {provider.name}
            </h3>
            <p className="text-sm text-surface-dark/80 leading-relaxed bg-cream-50 p-4 rounded-2xl border border-surface-border">
              {provider.about}
            </p>
          </div>

          {/* Availability & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-surface-border flex items-start gap-3">
              <div className="p-2 rounded-xl bg-forest-100 text-forest-800">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-forest-900">Working Hours & Availability</p>
                <p className="text-xs text-surface-dark/75 mt-0.5">{provider.availability}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cream-50 border border-surface-border flex items-start gap-3">
              <div className="p-2 rounded-xl bg-forest-100 text-forest-800">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-forest-900">Languages Spoken</p>
                <p className="text-xs text-surface-dark/75 mt-0.5">
                  {provider.languages.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Services & Rate Card */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-base text-forest-950">
                Transparent Rate Card & Services
              </h3>
              <span className="text-xs text-forest-700 font-semibold bg-forest-100 px-2 py-0.5 rounded-full">
                Standard Direct Rates
              </span>
            </div>

            <div className="divide-y divide-surface-border border border-surface-border rounded-2xl bg-cream-50 overflow-hidden">
              {provider.servicesOffered.map((srv, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-forest-950">
                      {srv.name}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-forest-800 bg-forest-100/80 px-2.5 py-1 rounded-lg shrink-0">
                    {srv.rate}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-surface-dark/60 mt-2 px-1">
              * Rates shown are standard ballpark benchmarks. Final quotation may vary depending on parts/materials required.
            </p>
          </div>

          {/* Sample Reviews */}
          {provider.reviews && provider.reviews.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-base text-forest-950">
                  Neighbourhood Feedback ({provider.reviews.length})
                </h3>
                <span className="text-[11px] text-surface-dark/50 italic">
                  Sample community reviews
                </span>
              </div>

              <div className="space-y-3">
                {provider.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-2xl bg-cream-50 border border-surface-border text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-forest-950">{rev.author}</span>
                        <span className="text-[10px] text-surface-dark/50">• {rev.locality}</span>
                      </div>
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        <span className="ml-1 font-bold text-forest-900">{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-surface-dark/80 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-surface-dark/50 mt-1 block">
                      Posted {rev.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Mock Contact Card */}
          <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-cream-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-forest-900">Direct Contact (Demo)</p>
                <p className="text-sm font-semibold text-surface-dark">{provider.phone}</p>
              </div>
            </div>

            <button
              onClick={handleCopyPhone}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cream-50 hover:bg-white text-forest-800 border border-forest-300 transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-forest-600" />
                  <span>Copied Number!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Number</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-5 bg-cream-50 border-t border-surface-border flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-surface-dark/70 hover:text-surface-dark hover:bg-cream-200 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenEnquiry(provider);
            }}
            className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-100 font-bold text-xs sm:text-sm shadow-card flex items-center gap-2 transition-all active:scale-98"
          >
            <Send className="w-4 h-4 text-lime" />
            <span>Send Enquiry / Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
