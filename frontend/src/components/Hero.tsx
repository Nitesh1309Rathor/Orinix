import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';

interface HeroProps {
  onShopCombos: () => void;
  onExploreAll: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopCombos, onExploreAll }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] border-b border-[#EAE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Unboxed Metadata (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6B7C6E] font-medium">
              <span>Targeted Care Patches</span>
              <span aria-hidden="true">·</span>
              <span>Foot Pads</span>
              <span aria-hidden="true">·</span>
              <span>Breathing Essentials</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#181B1A] font-normal tracking-tight leading-[1.12] text-balance">
              Targeted personal care patches & breathing wellness essentials.
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-[#5A635E] leading-relaxed max-w-xl font-light">
              Practical solutions for your daily routine. Explore hydrocolloid pimple patches, under-eye gel pads, Kinoki foot pads, and nasal breathing strips designed for easy everyday use.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onShopCombos}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#181B1A] text-[#FAF9F5] hover:bg-[#303734] rounded-md text-xs uppercase tracking-[0.15em] font-semibold transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0 group"
              >
                <span>View Combo Kits</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onExploreAll}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#181B1A]/20 hover:border-[#181B1A] text-[#181B1A] bg-transparent hover:bg-[#FAF9F5] rounded-md text-xs uppercase tracking-[0.15em] font-semibold transition-all whitespace-nowrap shrink-0"
              >
                Shop All Products
              </button>
            </div>

            {/* Core Categories Overview */}
            <div className="pt-6 border-t border-[#EAE6DD] grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#6B7C6E] font-medium">Spot & Eye Care</p>
                <p className="text-sm font-semibold text-[#181B1A] mt-0.5">Pimple & Eye Patches</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#6B7C6E] font-medium">Night Breathing</p>
                <p className="text-sm font-semibold text-[#181B1A] mt-0.5">Strips & Dilators</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#6B7C6E] font-medium">Foot Pads</p>
                <p className="text-sm font-semibold text-[#181B1A] mt-0.5">Kinoki Gold Series</p>
              </div>
            </div>

          </div>

          {/* Right Column: Campaign Visual Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] lg:aspect-[16/11] rounded-lg overflow-hidden shadow-xl border border-[#EAE6DD] bg-[#F3EFE7]">
              <img
                src="/src/assets/images/hero_orionix_patches_1792057734435.jpg"
                alt="ORIONIX patches and wellness products"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-[#FAF9F5]/95 backdrop-blur-md p-4 rounded-md border border-[#EAE6DD] max-w-sm">
                <div className="flex items-center gap-1.5 text-xs text-[#6B7C6E] font-medium mb-1">
                  <Layers className="w-3.5 h-3.5 text-[#4B5B4E]" />
                  <span>Targeted Care Systems</span>
                </div>
                <p className="text-xs text-[#181B1A] font-medium leading-snug">
                  Designed for targeted spot application, overnight foot comfort, and open breathing.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
