import React, { useState } from "react";
import { ShoppingBag, SlidersHorizontal, Menu, X } from "lucide-react";
import { ProductCategory, StoreSettings } from "../data/products";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  shippingSettings: StoreSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenAdmin, onSelectCategory, shippingSettings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    if (cat === "combos") {
      const combosSection = document.getElementById("combos-section");
      if (combosSection) {
        combosSection.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EAE6DD] transition-all">
      {/* Configurable Top Banner */}
      <div className="bg-[#181B1A] text-[#FAF9F5] text-xs py-2 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2">
        {shippingSettings.freeShippingEnabled ? (
          <span>Complimentary Delivery across India on orders over ₹{shippingSettings.freeShippingThreshold}</span>
        ) : (
          <span>Standard Delivery across India (₹{shippingSettings.standardShippingFee})</span>
        )}
        <span className="text-[#8A9D8E] hidden sm:inline">·</span>
        <span className="text-[#DFC794] hidden sm:inline">Use code GLOW10 for 10% off</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20 ">
          {/* Zone 1: Brand wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.2em] text-[#181B1A] uppercase whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            ORIONIX
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.16em] font-medium text-[#5A635E]">
            <button
              onClick={() => handleNavClick("combos")}
              className="hover:text-[#181B1A] transition-colors whitespace-nowrap shrink-0 py-1 text-[#4B5B4E] font-semibold"
            >
              Combo Kits
            </button>
            <button onClick={() => handleNavClick("all")} className="hover:text-[#181B1A] transition-colors whitespace-nowrap shrink-0 py-1">
              Shop All Products
            </button>
            <button onClick={() => handleNavClick("skincare-patches")} className="hover:text-[#181B1A] transition-colors whitespace-nowrap shrink-0 py-1">
              Facial Patches
            </button>
            <button onClick={() => handleNavClick("breathing")} className="hover:text-[#181B1A] transition-colors whitespace-nowrap shrink-0 py-1">
              Nasal & Breathing
            </button>
            <button onClick={() => handleNavClick("footcare")} className="hover:text-[#181B1A] transition-colors whitespace-nowrap shrink-0 py-1">
              Foot Pads
            </button>
            <button onClick={() => handleNavClick("body-patches")} className="hover:text-[#181B1A] transition-colors whitespace-nowrap shrink-0 py-1">
              Comfort Patches
            </button>
            <button onClick={() => scrollToSection("philosophy-section")} className="hover:text-[#181B1A] transition-colors whitespace-nowrap shrink-0 py-1">
              About ORIONIX
            </button>
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-3 sm:gap-2 shrink-0 ">
            {/* Admin / Integration Drawer Trigger */}
            <button
              onClick={onOpenAdmin}
              title="Admin & Catalog (Configure Prices & Shipping)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#5A635E] hover:text-[#181B1A] hover:bg-[#EAE6DD]/60 rounded-md transition-colors whitespace-nowrap shrink-0 border border-transparent hover:border-[#DCD5C6]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin & Catalog</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#181B1A] text-[#FAF9F5] hover:bg-[#303734] rounded-md text-xs uppercase tracking-wider font-medium transition-all shadow-sm active:scale-95 shrink-0"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="tabular-nums font-semibold bg-[#FAF9F5] text-[#181B1A] px-1.5 py-0.5 rounded text-[11px] min-w-[20px] text-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#181B1A] hover:bg-[#EAE6DD]/60 rounded-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE6DD] bg-[#FAF9F5] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm tracking-wider uppercase font-medium text-[#181B1A]">
            <button
              onClick={() => handleNavClick("combos")}
              className="text-left py-2 text-[#4B5B4E] font-semibold hover:text-[#6B7C6E] transition-colors flex items-center justify-between"
            >
              <span>Featured Combo Kits</span>
              <span className="text-xs text-[#6B7C6E] tracking-normal font-normal">3 Official Sets</span>
            </button>
            <button onClick={() => handleNavClick("all")} className="text-left py-2 hover:text-[#6B7C6E] transition-colors">
              Shop All Products
            </button>
            <button onClick={() => handleNavClick("skincare-patches")} className="text-left py-2 hover:text-[#6B7C6E] transition-colors">
              Facial Patches & Masks
            </button>
            <button onClick={() => handleNavClick("breathing")} className="text-left py-2 hover:text-[#6B7C6E] transition-colors">
              Nasal Strips & Dilators
            </button>
            <button onClick={() => handleNavClick("footcare")} className="text-left py-2 hover:text-[#6B7C6E] transition-colors">
              Foot Pads
            </button>
            <button onClick={() => handleNavClick("body-patches")} className="text-left py-2 hover:text-[#6B7C6E] transition-colors">
              Knee & Varicose Patches
            </button>
            <button onClick={() => scrollToSection("philosophy-section")} className="text-left py-2 hover:text-[#6B7C6E] transition-colors text-[#5A635E]">
              About ORIONIX
            </button>
          </div>

          <div className="pt-4 border-t border-[#EAE6DD] flex items-center justify-between">
            <span className="text-xs text-[#5A635E]">Currency: INR (₹)</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs text-[#4B5B4E] underline font-medium"
            >
              Catalog & Store Settings
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
