import React from 'react';
import { CATEGORIES } from '../data/categories';
import { CategoryIcon } from './CategoryIcon';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-10 bg-cream-100 border-y border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-forest-700"></span>
              <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">
                Services Directory
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-forest-900 tracking-tight">
              Popular Service Categories
            </h2>
            <p className="text-sm text-surface-dark/70 mt-1">
              Select any category to filter verified local professionals in your area
            </p>
          </div>

          {selectedCategory && (
            <button
              onClick={() => onSelectCategory('')}
              className="text-xs font-bold text-forest-800 bg-forest-100 hover:bg-forest-200 px-3 py-1.5 rounded-lg border border-forest-300 self-start md:self-auto transition-colors"
            >
              Showing: {selectedCategory} • <span className="underline">View All Categories</span>
            </button>
          )}
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? '' : cat.name)}
                className={`group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-forest-800 text-cream-50 border-forest-800 shadow-float ring-2 ring-lime scale-102'
                    : 'bg-cream-50 text-surface-dark border-surface-border hover:border-forest-300 hover:bg-white shadow-subtle hover:shadow-card'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-lime text-forest-950 font-bold'
                      : 'bg-forest-50 text-forest-800 group-hover:bg-forest-100'
                  }`}
                >
                  <CategoryIcon name={cat.icon} className="w-6 h-6" />
                </div>

                <span
                  className={`text-xs sm:text-sm font-bold line-clamp-1 mb-1 transition-colors ${
                    isSelected ? 'text-cream-50' : 'text-surface-dark group-hover:text-forest-800'
                  }`}
                >
                  {cat.name}
                </span>

                <span
                  className={`text-[10px] font-medium leading-tight line-clamp-1 ${
                    isSelected ? 'text-cream-300' : 'text-surface-dark/60'
                  }`}
                >
                  Starts {cat.startingPrice}
                </span>

                <span
                  className={`mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-forest-900 text-lime'
                      : 'bg-cream-200 text-forest-800'
                  }`}
                >
                  {cat.count} listings
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
