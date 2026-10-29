import React from 'react';
import { Sparkles, Users, IndianRupee, ShieldCheck, ArrowRight } from 'lucide-react';

interface ProviderCtaProps {
  onOpenRegister: () => void;
}

export const ProviderCta: React.FC<ProviderCtaProps> = ({ onOpenRegister }) => {
  return (
    <section className="py-14 md:py-20 bg-cream-100 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 rounded-3xl p-8 sm:p-12 text-cream-100 shadow-float relative overflow-hidden">
          {/* Subtle decor circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-lime/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 border border-forest-700 text-lime text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>For Electricians, Plumbers, Cooks & Tutors</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cream-50 leading-tight">
              Are you a local service expert? Get direct bookings in your locality.
            </h2>

            <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed">
              List your services on KaamConnect for free. Keep 100% of your earnings, set your own working hours, and build a loyal client base right in your neighborhood.
            </p>

            {/* Quick value props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-lime/20 text-lime flex items-center justify-center shrink-0">
                  <IndianRupee className="w-3.5 h-3.5" />
                </div>
                <span>Zero commission fee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-lime/20 text-lime flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span>Direct client calls</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-lime/20 text-lime flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Instant profile listing</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenRegister}
                className="px-7 py-3.5 rounded-2xl bg-lime hover:bg-lime-hover active:scale-98 text-forest-950 font-extrabold text-sm shadow-card flex items-center gap-2 transition-all"
              >
                <span>Register & List Your Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
