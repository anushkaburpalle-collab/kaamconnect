import React from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  X,
  PlusCircle,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { Provider, FilterState } from '../types';
import { CATEGORIES, POPULAR_LOCALITIES } from '../data/categories';
import { ProviderCard } from './ProviderCard';

interface MarketplaceProps {
  providers: Provider[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onViewProfile: (provider: Provider) => void;
  onBookEnquiry: (provider: Provider) => void;
  onOpenRegister: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  providers,
  filters,
  setFilters,
  onViewProfile,
  onBookEnquiry,
  onOpenRegister,
}) => {
  // Filtering logic
  const filteredProviders = providers
    .filter((p) => {
      // Category filter
      if (filters.category && p.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // Locality filter (matches locality OR city substring)
      if (filters.locality && filters.locality.trim()) {
        const loc = filters.locality.toLowerCase().trim();
        const matchesLocality = p.locality.toLowerCase().includes(loc);
        const matchesCity = p.city.toLowerCase().includes(loc);
        if (!matchesLocality && !matchesCity) {
          return false;
        }
      }

      // Search query (matches name, category, shortDescription, servicesOffered, locality, city, and stems)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q) || q.includes(p.category.toLowerCase());
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);
        const matchesLocality = p.locality.toLowerCase().includes(q);
        const matchesCity = p.city.toLowerCase().includes(q);
        const matchesServices = p.servicesOffered.some((s) => s.name.toLowerCase().includes(q));

        // Category stemming / synonyms
        let matchesStem = false;
        if (q.startsWith('plumb') && p.category === 'Plumber') matchesStem = true;
        if (q.startsWith('electr') && p.category === 'Electrician') matchesStem = true;
        if (q.startsWith('cook') && p.category === 'Cook') matchesStem = true;
        if ((q.startsWith('clean') || q.startsWith('maid') || q.includes('sweep') || q.includes('mopping')) && p.category === 'Maid / House Cleaning') matchesStem = true;
        if ((q.startsWith('tutor') || q.startsWith('teach') || q.startsWith('tuit') || q.startsWith('math')) && p.category === 'Tutor') matchesStem = true;
        if (q.startsWith('carpent') && p.category === 'Carpenter') matchesStem = true;
        if (q.startsWith('paint') && p.category === 'Painter') matchesStem = true;
        if ((q.startsWith('appliance') || q.includes('ac') || q.includes('fridge') || q.includes('cool')) && p.category === 'Appliance Repair') matchesStem = true;

        if (!matchesName && !matchesCategory && !matchesDesc && !matchesLocality && !matchesCity && !matchesServices && !matchesStem) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating-desc':
          return b.rating - a.rating;
        case 'price-asc':
          return a.priceStarting - b.priceStarting;
        case 'price-desc':
          return b.priceStarting - a.priceStarting;
        case 'experience-desc':
          return b.experienceYears - a.experienceYears;
        case 'recommended':
        default:
          // Sort newly created / top rated first
          return (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.rating - a.rating;
      }
    });

  const hasActiveFilters = Boolean(filters.category || filters.locality || filters.searchQuery);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      locality: '',
      sortBy: 'recommended',
    });
  };

  return (
    <section id="explore-services" className="py-12 md:py-16 bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Marketplace Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-forest-700"></span>
              <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">
                Local Professionals
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-forest-900 tracking-tight">
              Explore Home Services
            </h2>
            <p className="text-sm text-surface-dark/75 mt-1">
              Find transparent rates and contact verified demo providers directly in your neighbourhood.
            </p>
          </div>

          <button
            onClick={onOpenRegister}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-800 border border-forest-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-subtle"
          >
            <PlusCircle className="w-4 h-4 text-forest-700" />
            <span>+ List as a Provider</span>
          </button>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-cream-50 p-4 rounded-2xl border border-surface-border shadow-subtle space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search 'plumber', cook, name..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-cream-100/70 border border-surface-border text-xs sm:text-sm text-surface-dark placeholder-surface-dark/45 focus:outline-none focus:ring-2 focus:ring-forest-700"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters({ ...filters, searchQuery: '' })}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-surface-dark/40 hover:text-surface-dark text-xs"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                <Briefcase className="w-4 h-4" />
              </div>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-100/70 border border-surface-border text-xs sm:text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700 cursor-pointer"
              >
                <option value="">All Categories ({CATEGORIES.length})</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Locality Filter - Editable with Autocomplete Datalist */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                list="marketplace-localities-list"
                placeholder="Enter locality / city..."
                value={filters.locality}
                onChange={(e) => setFilters({ ...filters, locality: e.target.value })}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-cream-100/70 border border-surface-border text-xs sm:text-sm text-surface-dark placeholder-surface-dark/45 focus:outline-none focus:ring-2 focus:ring-forest-700 truncate"
              />
              <datalist id="marketplace-localities-list">
                {POPULAR_LOCALITIES.filter((l) => l !== 'All Localities').map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
              {filters.locality && (
                <button
                  onClick={() => setFilters({ ...filters, locality: '' })}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-surface-dark/40 hover:text-surface-dark text-xs"
                  title="Clear locality"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                <ArrowUpDown className="w-4 h-4" />
              </div>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sortBy: e.target.value as FilterState['sortBy'],
                  })
                }
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-100/70 border border-surface-border text-xs sm:text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700 cursor-pointer"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-asc">Sort: Price: Low to High (₹)</option>
                <option value="price-desc">Sort: Price: High to Low (₹)</option>
                <option value="rating-desc">Sort: Rating: High to Low (★)</option>
                <option value="experience-desc">Sort: Most Experienced</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-surface-border/70 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-forest-900">
                {filteredProviders.length}{' '}
                {filteredProviders.length === 1 ? 'provider' : 'providers'} found
              </span>
              {hasActiveFilters && (
                <span className="text-surface-dark/50">with active filters</span>
              )}
            </div>

            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                {filters.category && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-forest-100 text-forest-800 font-semibold text-[11px]">
                    Category: {filters.category}
                    <button
                      onClick={() => setFilters({ ...filters, category: '' })}
                      className="hover:text-forest-950"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.locality && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-forest-100 text-forest-800 font-semibold text-[11px]">
                    Locality: {filters.locality.split(',')[0]}
                    <button
                      onClick={() => setFilters({ ...filters, locality: '' })}
                      className="hover:text-forest-950"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-forest-100 text-forest-800 font-semibold text-[11px]">
                    "{filters.searchQuery}"
                    <button
                      onClick={() => setFilters({ ...filters, searchQuery: '' })}
                      className="hover:text-forest-950"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-red-600 hover:text-red-700 underline ml-1"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Providers Grid or Empty State */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onViewProfile={onViewProfile}
                onBookEnquiry={onBookEnquiry}
              />
            ))}
          </div>
        ) : (
          /* Useful, Rich Empty State */
          <div className="bg-cream-50 p-8 sm:p-14 rounded-3xl border border-surface-border text-center space-y-6 max-w-2xl mx-auto shadow-card animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-forest-100 border border-forest-200 flex items-center justify-center text-forest-800 mx-auto">
              <Filter className="w-8 h-8 text-forest-700" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-forest-950">
                No Service Providers Found
              </h3>
              <p className="text-xs sm:text-sm text-surface-dark/75 max-w-md mx-auto leading-relaxed">
                We couldn't find any listings matching your specific combination of filters.
              </p>
            </div>

            {/* Breakdown of what caused 0 results */}
            <div className="bg-cream-100 p-4 rounded-2xl border border-surface-border/80 text-left text-xs space-y-2 max-w-lg mx-auto">
              <span className="font-bold text-forest-900 block text-[11px] uppercase tracking-wider">
                Current Filter Criteria:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {filters.searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-800 text-cream-50 font-medium">
                    <span>Search: "{filters.searchQuery}"</span>
                    <button
                      onClick={() => setFilters({ ...filters, searchQuery: '' })}
                      className="text-lime hover:text-white"
                      title="Remove search query"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-800 text-cream-50 font-medium">
                    <span>Category: {filters.category}</span>
                    <button
                      onClick={() => setFilters({ ...filters, category: '' })}
                      className="text-lime hover:text-white"
                      title="Remove category"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {filters.locality && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-800 text-cream-50 font-medium">
                    <span>Locality: {filters.locality}</span>
                    <button
                      onClick={() => setFilters({ ...filters, locality: '' })}
                      className="text-lime hover:text-white"
                      title="Remove locality"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions to Fix */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {filters.locality && (
                  <button
                    onClick={() => setFilters({ ...filters, locality: '' })}
                    className="px-4 py-2 rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-800 text-xs font-bold transition-colors"
                  >
                    Search in All Localities
                  </button>
                )}
                {filters.category && (
                  <button
                    onClick={() => setFilters({ ...filters, category: '' })}
                    className="px-4 py-2 rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-800 text-xs font-bold transition-colors"
                  >
                    Show All Categories
                  </button>
                )}
                {filters.searchQuery && (
                  <button
                    onClick={() => setFilters({ ...filters, searchQuery: '' })}
                    className="px-4 py-2 rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-800 text-xs font-bold transition-colors"
                  >
                    Clear Search Keyword
                  </button>
                )}
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-bold shadow-card transition-colors"
                >
                  Reset All Filters
                </button>
              </div>

              {/* Suggestions */}
              <div className="pt-4 border-t border-surface-border">
                <span className="text-[11px] font-semibold text-surface-dark/60 block mb-2">
                  Or browse popular services with available providers:
                </span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {CATEGORIES.slice(0, 5).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setFilters({
                          searchQuery: '',
                          locality: '',
                          category: cat.name,
                          sortBy: 'recommended',
                        });
                      }}
                      className="px-3 py-1 rounded-lg bg-cream-100 hover:bg-forest-100 border border-surface-border text-forest-900 text-xs font-medium transition-colors"
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenRegister}
                  className="text-xs font-bold text-forest-700 hover:text-forest-900 underline"
                >
                  Know a professional here? + Register a provider listing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
