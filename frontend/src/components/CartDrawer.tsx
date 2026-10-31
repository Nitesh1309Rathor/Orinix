import React, { useState } from 'react';
import { CartItem } from '../types/cart';
import { StoreSettings } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, Truck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  appliedDiscount: number;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  shippingSettings: StoreSettings;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  couponCode,
  appliedDiscount,
  onApplyCoupon,
  onRemoveCoupon,
  shippingSettings,
}) => {
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isFreeShippingApplicable =
    shippingSettings.freeShippingEnabled &&
    subtotal >= shippingSettings.freeShippingThreshold;

  const amountNeededForFreeShipping = shippingSettings.freeShippingEnabled
    ? Math.max(0, shippingSettings.freeShippingThreshold - subtotal)
    : 0;

  const shippingProgress = shippingSettings.freeShippingEnabled
    ? Math.min(100, (subtotal / shippingSettings.freeShippingThreshold) * 100)
    : 0;

  const shippingFee = subtotal === 0 || isFreeShippingApplicable ? 0 : shippingSettings.standardShippingFee;
  const discountAmount = appliedDiscount > 0 ? Math.round((subtotal * appliedDiscount) / 100) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    const prefix = cleanPin.substring(0, 2);
    let region = 'Standard Dispatch (3-5 business days)';
    if (['11', '12', '20'].includes(prefix)) {
      region = 'Delhi NCR Hub (1-2 business days)';
    } else if (['40', '41'].includes(prefix)) {
      region = 'Mumbai & Maharashtra Zone (2 business days)';
    } else if (['56', '57'].includes(prefix)) {
      region = 'Bengaluru Hub (2 business days)';
    } else if (['60', '61'].includes(prefix)) {
      region = 'Chennai Metro (2-3 business days)';
    } else if (['70', '71'].includes(prefix)) {
      region = 'Kolkata Hub (2-3 business days)';
    }
    setPincodeStatus(`PIN Verified: ${region}`);
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = onApplyCoupon(inputCoupon.trim());
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) {
      setInputCoupon('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div
        className="w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#EAE6DD]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#EAE6DD] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl text-[#181B1A] font-semibold">Your Shopping Bag</h2>
            <span className="text-xs text-[#6B7C6E] tabular-nums font-medium">
              ({items.reduce((acc, curr) => acc + curr.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5A635E] hover:text-[#181B1A] rounded-md transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configurable Shipping Progress Banner */}
        {shippingSettings.freeShippingEnabled && (
          <div className="bg-[#F3EFE7] px-6 py-3 border-b border-[#EAE6DD]">
            <div className="flex items-center justify-between text-xs text-[#181B1A] font-medium mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#4B5B4E]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-[#4B5B4E] font-semibold">Free Delivery Threshold Reached!</span>
                ) : (
                  <span>Add ₹{amountNeededForFreeShipping} more for Free Shipping</span>
                )}
              </div>
              <span className="text-[11px] text-[#6B7C6E] font-medium">₹{shippingSettings.freeShippingThreshold} Goal</span>
            </div>
            <div className="w-full bg-[#EAE6DD] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4B5B4E] h-full rounded-full transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items Scrollable List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EAE6DD]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
              <p className="font-serif text-xl text-[#181B1A]">Your bag is empty</p>
              <p className="text-xs text-[#5A635E] max-w-xs font-light">
                Discover pimple patches, nasal strips, Kinoki foot pads, and curated combo kits.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#181B1A] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium rounded-md"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-4 items-center">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-md bg-[#F3EFE7] overflow-hidden shrink-0 border border-[#EAE6DD]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-sm font-medium text-[#181B1A] truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-[#6B7C6E] truncate">
                    {item.product.packSize}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#EAE6DD] rounded bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[#5A635E] hover:text-[#181B1A]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold tabular-nums text-[#181B1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#5A635E] hover:text-[#181B1A]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#181B1A] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#5A635E] hover:text-rose-600 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Calculations & Actions */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-[#EAE6DD] bg-[#FAF9F5] space-y-3">
            
            {/* Indian Pincode Delivery Estimator */}
            <form onSubmit={handleCheckPincode} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN code"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] placeholder-[#5A635E]/50 focus:outline-none focus:border-[#4B5B4E]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#F3EFE7] hover:bg-[#EAE6DD] text-[#181B1A] text-xs font-medium rounded border border-[#EAE6DD]"
                >
                  Check PIN
                </button>
              </div>
              {pincodeStatus && (
                <p className="text-[11px] text-[#4B5B4E] font-medium">{pincodeStatus}</p>
              )}
            </form>

            {/* Coupon Code Section */}
            <div className="pt-2">
              {couponCode ? (
                <div className="flex items-center justify-between p-2 bg-[#EBF1EC] text-[#4B5B4E] rounded text-xs">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{couponCode}</strong> applied ({appliedDiscount}% off)</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-xs text-rose-700 underline font-semibold ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (try GLOW10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] placeholder-[#5A635E]/50 focus:outline-none focus:border-[#4B5B4E]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#181B1A] text-[#FAF9F5] text-xs font-medium rounded hover:bg-[#303734]"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMsg && !couponCode && (
                <p className={`text-[11px] mt-1 ${couponMsg.isError ? 'text-rose-600' : 'text-[#4B5B4E]'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Summary Breakdown */}
            <div className="pt-2 border-t border-[#EAE6DD] space-y-1.5 text-xs text-[#5A635E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#181B1A] tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#4B5B4E]">
                  <span>Discount ({couponCode})</span>
                  <span className="font-medium tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium text-[#181B1A] tabular-nums">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#181B1A] pt-2 border-t border-[#EAE6DD]">
                <span>Total Amount</span>
                <span className="text-base tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 bg-[#181B1A] hover:bg-[#303734] text-[#FAF9F5] text-xs uppercase tracking-[0.16em] font-semibold rounded-md shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
