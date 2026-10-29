import React from 'react';
import { Search, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { POPULAR_LOCALITIES } from '../data/categories';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedLocality: string;
  setSelectedLocality: (loc: string) => void;
  onSearchSubmit: () => void;
  onQuickCategorySelect: (cat: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLocality,
  setSelectedLocality,
  onSearchSubmit,
  onQuickCategorySelect,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 bg-cream-200">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-forest-200/40 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 border border-forest-300 text-forest-800 text-xs sm:text-sm font-semibold shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-forest-700"></span>
            <span>Hyperlocal Home Services Across India</span>
            <span className="text-forest-400">•</span>
            <span className="text-forest-700 font-bold">100% Upfront Pricing</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-900 tracking-tight leading-[1.15]">
            Your neighbourhood.{' '}
            <span className="relative inline-block text-forest-800">
              <span className="relative z-10 underline decoration-lime decoration-4 underline-offset-8">
                Your services.
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-surface-dark/75 max-w-2xl mx-auto font-normal leading-relaxed pt-1">
            Connect directly with verified-style local plumbers, cooks, electricians, cleaners, and tutors right in your pincode. No surprise charges, no middlemen commission.
          </p>
        </div>

        {/* Search & Locality Input Card */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-cream-50 p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-card border border-surface-border">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 divide-y md:divide-y-0 md:divide-x divide-surface-border">
              {/* Locality Input / Autocomplete */}
              <div className="flex-1 flex items-center px-3 py-2 gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-forest-100 text-forest-800 shrink-0">
                  <MapPin className="w-5 h-5 text-forest-700" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <label htmlFor="locality-input" className="block text-[11px] font-bold text-forest-700 uppercase tracking-wider">
                    Locality / City
                  </label>
                  <input
                    id="locality-input"
                    list="hero-popular-localities"
                    type="text"
                    placeholder="e.g. Koramangala, Bandra, Delhi..."
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-sm font-medium text-surface-dark placeholder-surface-dark/45 focus:outline-none truncate"
                  />
                  <datalist id="hero-popular-localities">
                    {POPULAR_LOCALITIES.filter((l) => l !== 'All Localities').map((loc) => (
                      <option key={loc} value={loc} />
                    ))}
                  </datalist>
                </div>
                {selectedLocality && (
                  <button
                    onClick={() => setSelectedLocality('')}
                    className="text-xs font-semibold text-surface-dark/50 hover:text-surface-dark px-2 shrink-0"
                    title="Clear locality"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Service Search Input */}
              <div className="flex-[1.5] flex items-center px-3 py-2 gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-forest-100 text-forest-800 shrink-0">
                  <Search className="w-5 h-5 text-forest-700" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <label htmlFor="service-search-input" className="block text-[11px] font-bold text-forest-700 uppercase tracking-wider">
                    Service or Provider
                  </label>
                  <input
                    id="service-search-input"
                    type="text"
                    placeholder="e.g. Plumber, Deep Cleaning, Cook, AC repair..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-sm font-medium text-surface-dark placeholder-surface-dark/45 focus:outline-none"
                  />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-semibold text-surface-dark/50 hover:text-surface-dark px-2"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 md:pt-0 pl-0 md:pl-2">
                <button
                  onClick={onSearchSubmit}
                  className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 active:scale-98 text-cream-100 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-subtle group"
                >
                  <span>Find Help</span>
                  <ArrowRight className="w-4 h-4 text-lime group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick popular tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-surface-dark/70">
            <span className="font-semibold text-forest-800">Popular right now:</span>
            {['Plumber', 'Cook', 'Electrician', 'Maid / House Cleaning', 'Appliance Repair'].map((cat) => (
              <button
                key={cat}
                onClick={() => onQuickCategorySelect(cat)}
                className="px-2.5 py-1 rounded-lg bg-cream-50 hover:bg-forest-100 border border-surface-border text-surface-dark/85 font-medium transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Points Banner */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-surface-border/70">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-cream-100/80 border border-surface-border/50">
            <div className="w-9 h-9 rounded-lg bg-forest-100 flex items-center justify-center text-forest-800 shrink-0">
              <ShieldCheck className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-surface-dark">Transparent Standard Rates</p>
              <p className="text-[11px] text-surface-dark/65">Inspection & hourly charges shown upfront</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-cream-100/80 border border-surface-border/50">
            <div className="w-9 h-9 rounded-lg bg-forest-100 flex items-center justify-center text-forest-800 shrink-0">
              <CheckCircle2 className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-surface-dark">Direct Local Communication</p>
              <p className="text-[11px] text-surface-dark/65">Talk directly to the professional in your area</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-cream-100/80 border border-surface-border/50">
            <div className="w-9 h-9 rounded-lg bg-lime/40 flex items-center justify-center text-forest-900 shrink-0">
              <span className="text-sm font-bold">₹0</span>
            </div>
            <div>
              <p className="text-xs font-bold text-surface-dark">Zero Commission Surcharge</p>
              <p className="text-[11px] text-surface-dark/65">Pay directly via UPI/Cash after work is done</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
