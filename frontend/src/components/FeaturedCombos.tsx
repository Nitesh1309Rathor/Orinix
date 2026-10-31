import React from 'react';
import { Product } from '../data/products';
import { Plus, Check, Eye } from 'lucide-react';

interface FeaturedCombosProps {
  combos: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FeaturedCombos: React.FC<FeaturedCombosProps> = ({
  combos,
  onAddToCart,
  onSelectProduct,
}) => {
  return (
    <section id="combos-section" className="py-16 sm:py-24 bg-[#F3EFE7]/50 border-b border-[#EAE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6B7C6E] font-medium mb-3">
            <span>Official ORIONIX Bundles</span>
            <span aria-hidden="true">·</span>
            <span>Complete Care Sets</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#181B1A] font-normal tracking-tight">
            Featured Combo Kits
          </h2>
          <p className="mt-3 text-base text-[#5A635E] font-light leading-relaxed">
            Targeted product bundles curated for complete facial patch care, overnight foot routines, and nighttime breathing comfort.
          </p>
        </div>

        {/* 3-Column Combo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo) => {
            return (
              <div
                key={combo.id}
                className="bg-[#FAF9F5] rounded-lg border border-[#EAE6DD] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
              >
                {/* Image Container with 4:3 Aspect Ratio */}
                <div
                  className="relative aspect-[4/3] bg-[#EAE6DD]/40 cursor-pointer overflow-hidden"
                  onClick={() => onSelectProduct(combo)}
                >
                  <img
                    src={combo.image}
                    alt={combo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Unboxed Tag Overlay */}
                  <div className="absolute top-3 left-3 bg-[#FAF9F5]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium tracking-wider uppercase text-[#181B1A] border border-[#EAE6DD]">
                    {combo.badge || 'Curated Kit'}
                  </div>

                  {/* Hover Quick View affordance */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-[#FAF9F5] text-[#181B1A] text-xs uppercase tracking-wider font-medium px-4 py-2 rounded-md shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      View Kit Details
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-[#6B7C6E]">
                      <span className="uppercase tracking-wider font-medium">{combo.packSize}</span>
                      <span aria-hidden="true">·</span>
                      <span>Verified Bundle</span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onSelectProduct(combo)}
                      className="font-serif text-2xl text-[#181B1A] hover:text-[#4B5B4E] cursor-pointer transition-colors leading-snug"
                    >
                      {combo.name}
                    </h3>

                    {/* Subtitle / Tagline */}
                    <p className="text-xs text-[#5A635E] leading-relaxed line-clamp-2 font-light">
                      {combo.description}
                    </p>

                    {/* What's Inside Checklist */}
                    {combo.kitContents && combo.kitContents.length > 0 && (
                      <div className="pt-3 border-t border-[#EAE6DD]/70 space-y-1.5">
                        <p className="text-[11px] uppercase tracking-wider text-[#6B7C6E] font-semibold">Included in this combo:</p>
                        <ul className="space-y-1.5 text-xs text-[#303734]">
                          {combo.kitContents.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-tight">
                              <Check className="w-3.5 h-3.5 text-[#4B5B4E] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Price & Primary Buy Action */}
                  <div className="pt-4 border-t border-[#EAE6DD] flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-semibold text-[#181B1A] tabular-nums">
                          ₹{combo.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6B7C6E]">Inclusive of all taxes</span>
                    </div>

                    <button
                      onClick={() => onAddToCart(combo)}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-[#181B1A] hover:bg-[#303734] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm transition-all active:scale-95 shrink-0"
                      aria-label={`Add ${combo.name} to bag`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Kit</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
