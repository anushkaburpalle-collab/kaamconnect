import React from 'react';
import { Search, FileSpreadsheet, Send, ThumbsUp, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onExploreClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExploreClick }) => {
  const steps = [
    {
      number: '01',
      title: 'Search in your locality',
      description: 'Enter your area or select from Koramangala, Bandra, Lajpat Nagar, and more to see nearby pros.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Compare transparent rates',
      description: 'Inspect verified profiles, upfront visit fees, customer feedback, and sample pricing cards with zero mystery.',
      icon: FileSpreadsheet,
    },
    {
      number: '03',
      title: 'Send direct enquiry',
      description: 'Choose your preferred date & time slot. The provider receives your contact directly with no call centre delays.',
      icon: Send,
    },
    {
      number: '04',
      title: 'Pay after satisfaction',
      description: 'The technician arrives at your door. Pay them directly via UPI or Cash after you inspect the finished work.',
      icon: ThumbsUp,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-cream-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 border border-forest-300 text-forest-800 text-xs font-bold mb-3">
            <span>Simple & Transparent</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-forest-900 tracking-tight">
            How KaamConnect Works
          </h2>
          <p className="text-sm sm:text-base text-surface-dark/75 mt-2">
            No middleman cuts, no complicated subscription packs. Just honest, direct local connections.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-cream-50 p-6 rounded-3xl border border-surface-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display font-extrabold text-2xl text-forest-700/40 group-hover:text-forest-700 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 group-hover:bg-lime group-hover:text-forest-950 flex items-center justify-center transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-forest-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-surface-dark/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-surface-border/60">
                  <span className="text-[11px] font-bold text-forest-800 flex items-center gap-1">
                    Step {idx + 1} of 4
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-100 font-bold text-sm shadow-card transition-all active:scale-98"
          >
            <span>Explore All 14+ Local Pros</span>
            <ArrowRight className="w-4 h-4 text-lime" />
          </button>
        </div>
      </div>
    </section>
  );
};
