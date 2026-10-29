import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  IndianRupee,
  BadgeAlert,
  Lock,
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust-section" className="py-16 md:py-24 bg-forest-900 text-cream-100 relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest-700/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Mission & Trust */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 border border-forest-700 text-lime text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust & Fair Work Marketplace</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream-50 leading-tight">
              Fair rates for households.{' '}
              <span className="text-lime">100% earnings</span> for local workers.
            </h2>

            <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed">
              Traditional aggregator apps charge 20% to 30% commission from hard-working technicians, inflating what you pay. KaamConnect operates on a community-first local directory model: transparent benchmarks, direct customer contact, and zero hidden surcharge.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-forest-800 text-lime shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream-50">Standardized Inspection Benchmarks</h4>
                  <p className="text-xs text-cream-300">
                    Know the visit & diagnostic fee before the technician steps out. No awkward doorstep haggling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-forest-800 text-lime shrink-0 mt-0.5">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream-50">Direct UPI or Cash to Technician</h4>
                  <p className="text-xs text-cream-300">
                    100% of your payment goes to the provider’s family, not corporate shareholders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-forest-800 text-lime shrink-0 mt-0.5">
                  <BadgeAlert className="w-4 h-4 text-lime" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream-50">Honest Demo Prototype Notice</h4>
                  <p className="text-xs text-cream-300">
                    Sample data is clearly labeled. We do not claim fabricated background checks or artificial lock-ins.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transparent Benchmark Rate Card */}
          <div className="bg-forest-800/80 rounded-3xl p-6 sm:p-8 border border-forest-700 shadow-float backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-forest-700 mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-cream-50">
                  Standard City Rate Guide (Indicative)
                </h3>
                <p className="text-xs text-cream-300">
                  Average verified estimates across Tier 1 & Tier 2 Indian cities
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-lime text-forest-950 uppercase">
                2026 Index
              </span>
            </div>

            <div className="space-y-3">
              {[
                { service: 'Plumber Inspection / Minor Tap Leak', rate: '₹199 – ₹299' },
                { service: 'Electrician Fuse / MCB / Switch Fix', rate: '₹199 – ₹349' },
                { service: 'Home Cook Trial Meal (Family of 4)', rate: '₹400 – ₹550' },
                { service: 'Bathroom Deep Chemical Scrubbing', rate: '₹499 – ₹699' },
                { service: 'Split AC Deep Jet Foam Servicing', rate: '₹499 – ₹699' },
                { service: 'Door Lock / Carpenter Hinge Fix', rate: '₹349 – ₹499' },
                { service: 'School Subject Home Tutoring (1 hr)', rate: '₹450 – ₹650' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-forest-900/60 border border-forest-700/60 text-xs sm:text-sm"
                >
                  <span className="text-cream-100 font-medium">{item.service}</span>
                  <span className="font-display font-bold text-lime shrink-0">{item.rate}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-xl bg-forest-950/60 border border-forest-700/50 text-[11px] text-cream-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-lime shrink-0" />
              <span>
                Providers set their own rates independently based on travel distance and complexity.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
