import React from 'react';
import { Layers, Wind, Footprints, ShieldCheck } from 'lucide-react';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section id="philosophy-section" className="py-16 sm:py-24 bg-[#F3EFE7] border-b border-[#EAE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6B7C6E] font-medium">
            <span>The ORIONIX Focus</span>
            <span aria-hidden="true">·</span>
            <span>Targeted Personal Care</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#181B1A] font-normal tracking-tight">
            Targeted Care for Everyday Living
          </h2>
          <p className="text-sm text-[#5A635E] font-light leading-relaxed">
            Practical patches, cleansing pads, and breathing wellness essentials designed for straightforward, targeted results.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-[#FAF9F5] p-6 rounded-lg border border-[#EAE6DD] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#EBF1EC] flex items-center justify-center text-[#4B5B4E]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#181B1A]">Targeted Patches</h3>
            <p className="text-xs text-[#5A635E] leading-relaxed font-light">
              Hydrocolloid pimple patches, pore-cleansing blackhead strips, and under-eye hydrogel pads for direct spot care.
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-6 rounded-lg border border-[#EAE6DD] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#EBF1EC] flex items-center justify-center text-[#4B5B4E]">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#181B1A]">Breathing Support</h3>
            <p className="text-xs text-[#5A635E] leading-relaxed font-light">
              Drug-free nasal strips and reusable magnetic dilators designed to physically open nasal passages for sleep or sport.
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-6 rounded-lg border border-[#EAE6DD] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#EBF1EC] flex items-center justify-center text-[#4B5B4E]">
              <Footprints className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#181B1A]">Overnight Foot Pads</h3>
            <p className="text-xs text-[#5A635E] leading-relaxed font-light">
              Kinoki Gold Series and general foot-care adhesive pads created for comfortable overnight application to soles.
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-6 rounded-lg border border-[#EAE6DD] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#EBF1EC] flex items-center justify-center text-[#4B5B4E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#181B1A]">Clear Specifications</h3>
            <p className="text-xs text-[#5A635E] leading-relaxed font-light">
              Accurate piece counts, clear application directions, transparent pricing, and zero exaggerated claims.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
