import React from 'react';
import { ShieldAlert, RotateCcw, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface FooterProps {
  onCategoryClick: (name: string) => void;
  onLocalityClick: (loc: string) => void;
  onResetData: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onCategoryClick,
  onLocalityClick,
  onResetData,
  onOpenRegister,
}) => {
  return (
    <footer className="bg-forest-950 text-cream-200 border-t border-forest-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-800 flex items-center justify-center">
                <div className="w-5 h-5 rounded-md bg-lime flex items-center justify-center font-bold text-forest-950 text-xs">
                  K
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-cream-50">
                  Kaam<span className="text-lime">Connect</span>
                </span>
                <p className="text-[11px] text-cream-300/70 uppercase tracking-wider font-semibold">
                  Hyperlocal Home Services India
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-300/80 leading-relaxed max-w-sm">
              Your neighbourhood marketplace connecting trustworthy local tradespeople, cooks, tutors, and cleaners directly with Indian households.
            </p>

            {/* Demo prototype callout */}
            <div className="p-3.5 rounded-2xl bg-forest-900/80 border border-forest-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-lime font-bold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Prototype Transparency Notice</span>
              </div>
              <p className="text-[11px] text-cream-300 leading-normal">
                All provider profiles, reviews, and rates presented are realistic demonstration data. No real background checks or commercial payments are transacted through this app.
              </p>
            </div>
          </div>

          {/* Service Categories */}
          <div>
            <h4 className="font-display font-bold text-sm text-cream-50 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onCategoryClick(c.name);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="text-cream-300/80 hover:text-lime transition-colors"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Localities */}
          <div>
            <h4 className="font-display font-bold text-sm text-cream-50 uppercase tracking-wider mb-3">
              Popular Localities
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Koramangala, Bengaluru',
                'Indiranagar, Bengaluru',
                'HSR Layout, Bengaluru',
                'Bandra West, Mumbai',
                'Powai, Mumbai',
                'Lajpat Nagar, New Delhi',
                'Gachibowli, Hyderabad',
              ].map((loc) => (
                <li key={loc}>
                  <button
                    onClick={() => {
                      onLocalityClick(loc);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="text-cream-300/80 hover:text-lime transition-colors"
                  >
                    {loc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions & Demo Reset */}
          <div>
            <h4 className="font-display font-bold text-sm text-cream-50 uppercase tracking-wider mb-3">
              Marketplace Tools
            </h4>
            <div className="space-y-3 text-xs">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-100 font-bold text-left flex items-center justify-between border border-forest-700 transition-colors"
              >
                <span>+ List Your Service</span>
                <span className="text-lime text-[10px]">Free</span>
              </button>

              <button
                onClick={onResetData}
                className="w-full py-2.5 px-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-300 hover:text-cream-100 text-left flex items-center gap-2 border border-forest-800 transition-colors"
                title="Clears localStorage and restores initial 14 demo seed listings"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cream-400" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-300/60">
          <p>© 2026 KaamConnect India MVP. Built with React, Vite & Tailwind CSS.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for Indian neighbourhoods</span>
            <Heart className="w-3.5 h-3.5 text-lime fill-lime inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
