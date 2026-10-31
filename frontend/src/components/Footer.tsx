import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ProductCategory } from '../data/products';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    if (cat === 'combos') {
      const el = document.getElementById('combos-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181B1A] text-[#FAF9F5] border-t border-[#303734]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-3xl font-normal tracking-[0.2em] uppercase text-[#FAF9F5]">
              ORIONIX
            </h3>
            <p className="text-xs text-[#8A9D8E] leading-relaxed max-w-sm font-light">
              Modern Indian skincare essentials, personal care rituals, and breathing & wellness accessories crafted for everyday self-care.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-[#FAF9F5] font-medium mb-2">
                Join the ORIONIX Society
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#242826] border border-[#303734] rounded-l text-[#FAF9F5] placeholder-[#8A9D8E]/50 focus:outline-none focus:border-[#8A9D8E]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8A9D8E] hover:bg-[#6B7C6E] text-[#181B1A] text-xs font-semibold uppercase tracking-wider rounded-r transition-colors flex items-center justify-center shrink-0"
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? <Check className="w-4 h-4 text-[#181B1A]" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-[#8A9D8E] mt-1.5">
                  Thank you for subscribing. Use code GLOW10 for 10% off your order.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links 1: Collections */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#8A9D8E]">
              Collections
            </p>
            <ul className="space-y-2 text-xs text-[#FAF9F5]/80">
              <li>
                <button
                  onClick={() => handleCategoryClick('combos')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  Featured Combo Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('skincare-patches')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  Facial Patches & Masks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('breathing')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  Nasal & Breathing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('footcare')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  Foot Pads
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('body-patches')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  Comfort Patches
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Customer Care */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#8A9D8E]">
              Customer Care
            </p>
            <ul className="space-y-2 text-xs text-[#FAF9F5]/80">
              <li>Shipping & Delivery Policy</li>
              <li>Track Order Across India</li>
              <li>Packaging & Ingredient Standards</li>
              <li>Customer Support FAQ</li>
              <li>Returns & Damaged Shipments</li>
            </ul>
          </div>

          {/* Quick Links 3: Architecture & Admin */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#8A9D8E]">
              Store Systems
            </p>
            <ul className="space-y-2 text-xs text-[#FAF9F5]/80">
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-left text-[#DFC794] hover:underline"
                >
                  Admin & Price Catalog
                </button>
              </li>
              <li>Supabase Database Schema</li>
              <li>Razorpay Payment Gateway</li>
              <li>Cash on Delivery (COD)</li>
              <li>Privacy & Terms</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-[#303734] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A9D8E]">
          <p>© 2026 ORIONIX India. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Complimentary Pan-India Shipping over ₹499</span>
            <span aria-hidden="true">·</span>
            <span>Modern Skincare & Mindful Wellness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
