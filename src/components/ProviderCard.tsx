import React from 'react';
import {
  Star,
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
  ShieldAlert,
  Send,
} from 'lucide-react';
import { Provider } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface ProviderCardProps {
  provider: Provider;
  onViewProfile: (provider: Provider) => void;
  onBookEnquiry: (provider: Provider) => void;
}

// Generate pleasing consistent initials avatar color based on name
const getInitialsBg = (name: string) => {
  const colors = [
    'bg-emerald-700 text-cream-50',
    'bg-teal-700 text-cream-50',
    'bg-forest-800 text-cream-50',
    'bg-amber-700 text-cream-50',
    'bg-sky-800 text-cream-50',
    'bg-indigo-800 text-cream-50',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onViewProfile,
  onBookEnquiry,
}) => {
  const initials = provider.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <div
      onClick={() => onViewProfile(provider)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewProfile(provider);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View detailed profile for ${provider.name}, ${provider.category}`}
      className="group bg-cream-50 rounded-2xl border border-surface-border hover:border-forest-400 shadow-subtle hover:shadow-float transition-all duration-300 flex flex-col justify-between overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-forest-700 active:scale-[0.99]"
    >
      {/* Top Banner with Sample Demo Data Warning Badge */}
      <div className="bg-forest-50/70 border-b border-surface-border/60 px-4 py-2 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-forest-800 font-semibold">
          <CategoryIcon name={provider.category} className="w-3.5 h-3.5 text-forest-700" />
          <span>{provider.category}</span>
        </div>

        {/* Explicit Demo Data Label */}
        <span
          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-cream-300 text-forest-900 border border-surface-border"
          title="Sample demo listing - Not genuine verification"
        >
          <ShieldAlert className="w-3 h-3 text-amber-600" />
          <span>Demo Profile</span>
        </span>
      </div>

      {/* Main Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row: Avatar, Name, Rating */}
          <div className="flex items-start gap-3.5 mb-3">
            <div
              className={`w-13 h-13 min-w-[52px] rounded-2xl ${getInitialsBg(
                provider.name
              )} flex items-center justify-center font-display font-bold text-lg shadow-sm border border-black/10`}
            >
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h3 className="font-display font-bold text-lg text-forest-950 group-hover:text-forest-700 transition-colors truncate">
                  {provider.name}
                </h3>
              </div>

              {/* Locality */}
              <div className="flex items-center gap-1 text-xs text-surface-dark/75 mt-0.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                <span className="truncate">{provider.locality}</span>
              </div>

              {/* Badge if present */}
              {provider.badge && (
                <div className="mt-1.5">
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-lime/40 text-forest-950 border border-lime/80">
                    {provider.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Rating, Experience, Availability */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-2.5 my-2 border-y border-surface-border/50 text-xs">
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                <span className="ml-1 text-forest-950 font-extrabold">{provider.rating.toFixed(1)}</span>
              </div>
              <span className="text-surface-dark/50 text-[11px]">({provider.reviewCount})</span>
            </div>

            <span className="text-surface-border">•</span>

            <div className="flex items-center gap-1 text-surface-dark/75">
              <Briefcase className="w-3.5 h-3.5 text-forest-600" />
              <span>{provider.experienceYears} yrs exp</span>
            </div>

            <span className="text-surface-border">•</span>

            <div className="flex items-center gap-1 text-surface-dark/75 truncate">
              <Clock className="w-3.5 h-3.5 text-forest-600 shrink-0" />
              <span className="truncate">{provider.availability.split('•')[0]}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs text-surface-dark/80 line-clamp-2 leading-relaxed mb-3">
            {provider.shortDescription}
          </p>

          {/* Top services tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {provider.servicesOffered.slice(0, 2).map((srv, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-cream-200 text-surface-dark/85 border border-surface-border/60"
              >
                {srv.name}
              </span>
            ))}
            {provider.servicesOffered.length > 2 && (
              <span className="text-[11px] px-1.5 py-0.5 rounded-md text-surface-dark/50">
                +{provider.servicesOffered.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-surface-border/70">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-forest-700 tracking-wider block">
                Starting from
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-xl text-forest-900">
                  ₹{provider.priceStarting}
                </span>
                <span className="text-[11px] text-surface-dark/65 font-medium">
                  {provider.priceUnit}
                </span>
              </div>
            </div>

            {provider.priceRange && (
              <span className="text-[11px] font-medium text-surface-dark/60 text-right">
                Typical: {provider.priceRange}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onViewProfile(provider)}
              className="w-full py-2.5 px-3 rounded-xl border border-forest-800/30 hover:border-forest-800 text-forest-800 font-bold text-xs bg-transparent hover:bg-forest-50 transition-all flex items-center justify-center gap-1 active:scale-98"
            >
              <span>Profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBookEnquiry(provider);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-xs transition-all shadow-subtle flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Send className="w-3 h-3 text-lime" />
              <span>Book / Enquire</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
