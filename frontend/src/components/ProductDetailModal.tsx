import React, { useState } from 'react';
import { Product } from '../data/products';
import { X, Plus, Minus, Check, AlertCircle, Package } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'directions'>('specs');

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-[#FAF9F5] w-full max-w-4xl rounded-xl shadow-2xl border border-[#EAE6DD] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#5A635E] hover:text-[#181B1A] hover:bg-[#EAE6DD]/60 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Packaging Representation */}
          <div className="md:col-span-6 bg-[#F3EFE7] p-6 sm:p-8 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-r border-[#EAE6DD]">
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-sm border border-[#EAE6DD]">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Product Format Meta */}
            <div className="w-full mt-4 p-3 bg-[#FAF9F5] rounded-md border border-[#EAE6DD] flex items-center justify-between text-xs text-[#5A635E]">
              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#4B5B4E]" />
                <span className="font-medium text-[#181B1A]">{product.packSize}</span>
              </div>
              <span className="font-mono text-[11px]">SKU: {product.sku}</span>
            </div>

            {product.isComboKit && product.kitContents && (
              <div className="w-full mt-3 p-4 bg-[#FAF9F5] rounded-lg border border-[#EAE6DD] space-y-2">
                <p className="text-xs uppercase tracking-wider text-[#6B7C6E] font-semibold">Included in this combo:</p>
                <ul className="space-y-1.5 text-xs text-[#181B1A]">
                  {product.kitContents.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#4B5B4E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module & Details */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category */}
              <div className="flex items-center justify-between text-xs text-[#6B7C6E]">
                <div className="flex items-center gap-2 uppercase tracking-wider font-medium">
                  <span>{product.packSize}</span>
                  <span aria-hidden="true">·</span>
                  <span>ORIONIX Collection</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#181B1A] font-medium leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-[#6B7C6E] tracking-wider uppercase mt-1 font-medium">
                  {product.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="p-3 bg-[#F3EFE7]/60 rounded-md border border-[#EAE6DD] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-[#181B1A] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6B7C6E]">
                    Inclusive of all taxes
                  </span>
                </div>

                {product.isProvisionalPrice && (
                  <span className="bg-[#EBF1EC] text-[#4B5B4E] text-xs font-semibold px-2.5 py-1 rounded border border-[#8A9D8E]/30">
                    Provisional Price
                  </span>
                )}
              </div>

              {/* Notice for Provisional price */}
              {product.isProvisionalPrice && (
                <div className="flex items-start gap-2 p-2.5 bg-[#EBF1EC] text-[#4B5B4E] rounded text-xs border border-[#8A9D8E]/30">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Provisional Catalog Price:</strong> This price is currently provisional and can be adjusted anytime in the Admin Catalog.
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-[#5A635E] leading-relaxed font-light">
                {product.description}
              </p>

              {/* Segmented Information Tabs */}
              <div className="pt-2">
                <div className="flex border-b border-[#EAE6DD] text-xs uppercase tracking-wider font-medium">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 mr-4 transition-colors relative ${
                      activeTab === 'specs'
                        ? 'text-[#181B1A] font-semibold border-b-2 border-[#181B1A]'
                        : 'text-[#5A635E] hover:text-[#181B1A]'
                    }`}
                  >
                    Product Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('directions')}
                    className={`pb-2 mr-4 transition-colors relative ${
                      activeTab === 'directions'
                        ? 'text-[#181B1A] font-semibold border-b-2 border-[#181B1A]'
                        : 'text-[#5A635E] hover:text-[#181B1A]'
                    }`}
                  >
                    Directions for Use
                  </button>
                </div>

                <div className="pt-3 text-xs leading-relaxed text-[#303734] min-h-[90px]">
                  {activeTab === 'specs' && (
                    <ul className="space-y-1.5">
                      {product.specifications.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#4B5B4E] shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'directions' && (
                    <div className="space-y-2">
                      <p className="text-[#5A635E]">{product.directionsForUse}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Contiguous Purchase Action (Bottom Module) */}
            <div className="pt-4 border-t border-[#EAE6DD] flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#EAE6DD] rounded-md bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-[#5A635E] hover:text-[#181B1A] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-semibold tabular-nums text-[#181B1A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 text-[#5A635E] hover:text-[#181B1A] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary Buy CTA */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-6 bg-[#181B1A] hover:bg-[#303734] text-[#FAF9F5] text-xs uppercase tracking-[0.16em] font-semibold rounded-md shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Add to Bag — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
