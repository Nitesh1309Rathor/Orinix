import React, { useState } from 'react';
import { CartItem, CustomerShippingAddress, PaymentMethod, CompletedOrder } from '../types/cart';
import { X, CheckCircle2, ShieldCheck, CreditCard, Banknote, Copy, Check } from 'lucide-react';
import { getRazorpayConfig } from '../lib/razorpay';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  onOrderCompleted: (order: CompletedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shippingFee,
  total,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState<CustomerShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const rzpConfig = getRazorpayConfig();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Form validations
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please fill in your name, email, and 10-digit mobile number.');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      setErrorMsg('Please enter a valid 10-digit Indian phone number.');
      return;
    }
    if (!formData.addressLine1.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      setErrorMsg('Please provide a complete shipping address and 6-digit PIN code.');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable order processing
    setTimeout(() => {
      const orderNumber = `ORX-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: CompletedOrder = {
        orderNumber,
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        items: [...items],
        shippingAddress: { ...formData },
        paymentMethod,
        subtotal,
        discount,
        shippingFee,
        total,
        estimatedDelivery: '3-4 Business Days',
        status: 'confirmed',
      };

      setCompletedOrder(newOrder);
      onOrderCompleted(newOrder);
      setIsSubmitting(false);
    }, 700);
  };

  const handleCopyOrderNumber = () => {
    if (!completedOrder) return;
    navigator.clipboard.writeText(completedOrder.orderNumber);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-[#FAF9F5] w-full max-w-2xl rounded-xl shadow-2xl border border-[#EAE6DD] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EAE6DD] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl text-[#181B1A] font-semibold">
              {completedOrder ? 'Order Confirmed' : 'Checkout & Dispatch'}
            </h3>
            <p className="text-xs text-[#6B7C6E] tracking-wider uppercase mt-0.5">
              {completedOrder ? 'Thank you for choosing ORIONIX' : 'Indian Express Delivery'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5A635E] hover:text-[#181B1A] rounded-md transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Completed Order Confirmation View */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[#EBF1EC] text-[#4B5B4E] rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl text-[#181B1A]">We have received your order!</h4>
              <p className="text-xs text-[#5A635E] max-w-md mx-auto">
                Your order has been recorded and is being prepared for dispatch.
              </p>
            </div>

            {/* Receipt Container */}
            <div className="bg-[#F3EFE7] rounded-lg p-5 border border-[#EAE6DD] space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAE6DD] pb-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#6B7C6E]">Order Number</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-base font-bold text-[#181B1A]">{completedOrder.orderNumber}</span>
                    <button
                      onClick={handleCopyOrderNumber}
                      className="text-[#5A635E] hover:text-[#181B1A] p-1 rounded transition-colors"
                      title="Copy order number"
                    >
                      {copiedOrder ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-[#6B7C6E]">Estimated Arrival</span>
                  <p className="text-xs font-semibold text-[#181B1A] mt-0.5">{completedOrder.estimatedDelivery}</p>
                </div>
              </div>

              {/* Shipping & Payment Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#6B7C6E] uppercase tracking-wider text-[10px] block">Deliver To</span>
                  <p className="font-medium text-[#181B1A]">{completedOrder.shippingAddress.fullName}</p>
                  <p className="text-[#5A635E]">{completedOrder.shippingAddress.addressLine1}</p>
                  <p className="text-[#5A635E]">{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} - {completedOrder.shippingAddress.pincode}</p>
                  <p className="text-[#5A635E]">Phone: +91 {completedOrder.shippingAddress.phone}</p>
                </div>

                <div>
                  <span className="text-[#6B7C6E] uppercase tracking-wider text-[10px] block">Payment Selected</span>
                  <p className="font-medium text-[#181B1A] capitalize">
                    {completedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Razorpay UPI / Online'}
                  </p>
                  <p className="text-[#5A635E] mt-1">Total Due: <strong className="text-[#181B1A]">₹{completedOrder.total.toLocaleString('en-IN')}</strong></p>
                  <span className="inline-block mt-2 text-[10px] bg-[#FAF9F5] text-[#4B5B4E] px-2 py-0.5 rounded border border-[#EAE6DD]">
                    Status: Preparing Shipment
                  </span>
                </div>
              </div>

              {/* Itemized Order Recap */}
              <div className="border-t border-[#EAE6DD] pt-3 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#6B7C6E]">Purchased Items</span>
                {completedOrder.items.map((it) => (
                  <div key={it.product.id} className="flex justify-between text-xs text-[#181B1A]">
                    <span className="truncate pr-4">{it.product.name} × {it.quantity}</span>
                    <span className="tabular-nums font-medium shrink-0">₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#181B1A] hover:bg-[#303734] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm transition-all"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Active Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
                {errorMsg}
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#6B7C6E]">
                1. Delivery Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#5A635E] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Kalpana Rathore"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] focus:outline-none focus:border-[#4B5B4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5A635E] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="kalpana@example.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] focus:outline-none focus:border-[#4B5B4E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#5A635E] mb-1">Mobile Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] focus:outline-none focus:border-[#4B5B4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5A635E] mb-1">6-Digit PIN Code *</label>
                  <input
                    type="text"
                    required
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400001"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] focus:outline-none focus:border-[#4B5B4E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#5A635E] mb-1">Street Address / House No. *</label>
                <input
                  type="text"
                  required
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Flat 4B, Lotus Residency, MG Road"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] focus:outline-none focus:border-[#4B5B4E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#5A635E] mb-1">City *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] focus:outline-none focus:border-[#4B5B4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5A635E] mb-1">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] focus:outline-none focus:border-[#4B5B4E]"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3 pt-4 border-t border-[#EAE6DD]">
              <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#6B7C6E]">
                2. Select Payment Mode
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-[#181B1A] bg-[#F3EFE7]'
                      : 'border-[#EAE6DD] bg-white hover:border-[#5A635E]'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#4B5B4E] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#181B1A]">Cash on Delivery (COD)</p>
                    <p className="text-[11px] text-[#5A635E] mt-0.5">
                      Pay cash or UPI to delivery agent at doorstep. Zero surcharge.
                    </p>
                  </div>
                </div>

                {/* Razorpay Online */}
                <div
                  onClick={() => setPaymentMethod('razorpay_upi')}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod !== 'cod'
                      ? 'border-[#181B1A] bg-[#F3EFE7]'
                      : 'border-[#EAE6DD] bg-white hover:border-[#5A635E]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#181B1A] shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-[#181B1A]">Razorpay Online (UPI/Cards)</p>
                    </div>
                    <p className="text-[11px] text-[#5A635E] mt-0.5">
                      {rzpConfig.isConfigured
                        ? 'Live gateway configured'
                        : 'Sandbox mode ready (Configure live Key in Admin Settings)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary Banner */}
            <div className="p-4 bg-[#F3EFE7]/80 rounded-lg border border-[#EAE6DD] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#5A635E]">Final Order Total</span>
                <p className="text-lg font-semibold text-[#181B1A] tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#4B5B4E]">
                <ShieldCheck className="w-4 h-4" />
                <span>SSL Encrypted Checkout</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-[#181B1A] hover:bg-[#303734] disabled:opacity-50 text-[#FAF9F5] text-xs uppercase tracking-[0.16em] font-semibold rounded-md shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>
                  {isSubmitting
                    ? 'Processing Order...'
                    : paymentMethod === 'cod'
                    ? `Confirm Cash on Delivery — ₹${total.toLocaleString('en-IN')}`
                    : `Complete Order (Test Gateway) — ₹${total.toLocaleString('en-IN')}`}
                </span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
