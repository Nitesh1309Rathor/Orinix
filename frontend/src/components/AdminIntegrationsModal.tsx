import React, { useState } from 'react';
import { Product, StoreSettings } from '../data/products';
import { CompletedOrder } from '../types/cart';
import { getSupabaseConfig, SUPABASE_SCHEMA_SQL } from '../lib/supabase';
import { getRazorpayConfig } from '../lib/razorpay';
import { X, Database, CreditCard, Edit3, Copy, Check, Save, Package, Settings, AlertCircle } from 'lucide-react';

interface AdminIntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProduct: (updatedProduct: Product) => void;
  orders: CompletedOrder[];
  shippingSettings: StoreSettings;
  onUpdateShippingSettings: (newSettings: StoreSettings) => void;
}

export const AdminIntegrationsModal: React.FC<AdminIntegrationsModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProduct,
  orders,
  shippingSettings,
  onUpdateShippingSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'shipping' | 'supabase' | 'razorpay' | 'orders'>('catalog');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [editIsProvisional, setEditIsProvisional] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Local state for shipping settings editing
  const [localShipping, setLocalShipping] = useState<StoreSettings>({ ...shippingSettings });
  const [shippingSavedMsg, setShippingSavedMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const supabaseConfig = getSupabaseConfig();
  const razorpayConfig = getRazorpayConfig();

  const handleStartEdit = (prod: Product) => {
    setEditingId(prod.id);
    setEditPrice(prod.price);
    setEditStock(prod.stock);
    setEditIsProvisional(Boolean(prod.isProvisionalPrice));
    setSaveSuccessMsg(null);
  };

  const handleSaveEdit = (originalProd: Product) => {
    const updated: Product = {
      ...originalProd,
      price: Number(editPrice),
      stock: Number(editStock),
      isProvisionalPrice: editIsProvisional,
    };
    onUpdateProduct(updated);
    setEditingId(null);
    setSaveSuccessMsg(`Updated "${originalProd.name}" price to ₹${editPrice}!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateShippingSettings(localShipping);
    setShippingSavedMsg('Shipping settings updated successfully!');
    setTimeout(() => setShippingSavedMsg(null), 3000);
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-[#FAF9F5] w-full max-w-4xl rounded-xl shadow-2xl border border-[#EAE6DD] overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EAE6DD] flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-serif text-2xl text-[#181B1A] font-semibold">
              ORIONIX Store Management & Architecture
            </h3>
            <p className="text-xs text-[#6B7C6E] tracking-wider uppercase mt-0.5">
              Live Catalog Prices · Configurable Shipping · Backend Readiness
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5A635E] hover:text-[#181B1A] rounded-md transition-colors"
            aria-label="Close admin modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-[#EAE6DD] bg-[#F3EFE7]/50 flex gap-4 text-xs uppercase tracking-wider font-medium overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'border-[#181B1A] text-[#181B1A] font-semibold'
                : 'border-transparent text-[#5A635E] hover:text-[#181B1A]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Catalog & Prices ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'shipping'
                ? 'border-[#181B1A] text-[#181B1A] font-semibold'
                : 'border-transparent text-[#5A635E] hover:text-[#181B1A]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Shipping Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'supabase'
                ? 'border-[#181B1A] text-[#181B1A] font-semibold'
                : 'border-transparent text-[#5A635E] hover:text-[#181B1A]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('razorpay')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'razorpay'
                ? 'border-[#181B1A] text-[#181B1A] font-semibold'
                : 'border-transparent text-[#5A635E] hover:text-[#181B1A]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Razorpay Gateway</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#181B1A] text-[#181B1A] font-semibold'
                : 'border-transparent text-[#5A635E] hover:text-[#181B1A]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: PRODUCT CATALOG & PRICES */}
          {activeTab === 'catalog' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#EBF1EC] rounded-lg text-xs text-[#4B5B4E] leading-relaxed">
                <strong>Centralized Catalog Editor:</strong> Edit prices and stock for all 12 items and 3 combo kits. Provisional prices (such as Lip Patch Mask, Hydrating Sheet Mask, Knee Patch, and Varicose Veins Patch) can be finalized or revised here anytime. Changes immediately update across the storefront.
              </div>

              {saveSuccessMsg && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md">
                  {saveSuccessMsg}
                </div>
              )}

              <div className="border border-[#EAE6DD] rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F3EFE7] text-[#5A635E] uppercase tracking-wider border-b border-[#EAE6DD]">
                    <tr>
                      <th className="py-3 px-3">Product Name</th>
                      <th className="py-3 px-3">Format / Size</th>
                      <th className="py-3 px-3">Price (₹)</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Stock</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE6DD]">
                    {products.map((p) => {
                      const isEditing = editingId === p.id;
                      return (
                        <tr key={p.id} className="hover:bg-[#FAF9F5]/70 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-medium text-[#181B1A]">{p.name}</div>
                            <span className="text-[10px] text-[#5A635E] font-mono">{p.sku}</span>
                          </td>
                          <td className="py-3 px-3 text-[#5A635E]">{p.packSize}</td>
                          <td className="py-3 px-3 font-semibold text-[#181B1A] tabular-nums">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-20 px-2 py-1 border border-[#181B1A] rounded bg-white text-xs"
                              />
                            ) : (
                              `₹${p.price.toLocaleString('en-IN')}`
                            )}
                          </td>
                          <td className="py-3 px-3">
                            {isEditing ? (
                              <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editIsProvisional}
                                  onChange={(e) => setEditIsProvisional(e.target.checked)}
                                  className="rounded text-[#4B5B4E]"
                                />
                                <span>Provisional Price</span>
                              </label>
                            ) : p.isProvisionalPrice ? (
                              <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                Provisional
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-[#4B5B4E] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Finalized
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 tabular-nums">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editStock}
                                onChange={(e) => setEditStock(Number(e.target.value))}
                                className="w-16 px-2 py-1 border border-[#181B1A] rounded bg-white text-xs"
                              />
                            ) : (
                              `${p.stock} units`
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleSaveEdit(p)}
                                  className="px-2.5 py-1 bg-[#181B1A] text-[#FAF9F5] rounded text-[11px] font-medium flex items-center gap-1"
                                >
                                  <Save className="w-3 h-3" />
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="px-2 py-1 bg-neutral-200 text-neutral-800 rounded text-[11px]"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleStartEdit(p)}
                                className="px-2.5 py-1 text-[#4B5B4E] hover:bg-[#EBF1EC] rounded text-[11px] font-medium border border-[#8A9D8E]/30"
                              >
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CONFIGURABLE SHIPPING SETTINGS */}
          {activeTab === 'shipping' && (
            <div className="space-y-6 text-xs text-[#303734]">
              <div className="p-4 bg-white rounded-lg border border-[#EAE6DD] space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#181B1A]">Configure Store Shipping Policy</h4>
                  <p className="text-xs text-[#5A635E] mt-1">
                    Configure your delivery fees and free-shipping minimum instead of a hardcoded threshold.
                  </p>
                </div>

                {shippingSavedMsg && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md">
                    {shippingSavedMsg}
                  </div>
                )}

                <form onSubmit={handleSaveShipping} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enableFreeShipping"
                      checked={localShipping.freeShippingEnabled}
                      onChange={(e) =>
                        setLocalShipping((prev) => ({ ...prev, freeShippingEnabled: e.target.checked }))
                      }
                      className="rounded text-[#4B5B4E]"
                    />
                    <label htmlFor="enableFreeShipping" className="text-xs font-medium text-[#181B1A] cursor-pointer">
                      Enable Free Shipping on qualifying orders
                    </label>
                  </div>

                  {localShipping.freeShippingEnabled && (
                    <div>
                      <label className="block text-xs text-[#5A635E] mb-1">
                        Free Shipping Minimum Cart Subtotal (₹)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={10}
                        value={localShipping.freeShippingThreshold}
                        onChange={(e) =>
                          setLocalShipping((prev) => ({
                            ...prev,
                            freeShippingThreshold: Number(e.target.value),
                          }))
                        }
                        className="w-48 px-3 py-2 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] focus:outline-none focus:border-[#4B5B4E]"
                      />
                      <span className="text-[11px] text-[#6B7C6E] block mt-1">
                        Cart items above ₹{localShipping.freeShippingThreshold} will receive free delivery.
                      </span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-[#5A635E] mb-1">
                      Standard Shipping Fee (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={5}
                      value={localShipping.standardShippingFee}
                      onChange={(e) =>
                        setLocalShipping((prev) => ({
                          ...prev,
                          standardShippingFee: Number(e.target.value),
                        }))
                      }
                      className="w-48 px-3 py-2 text-xs bg-white border border-[#EAE6DD] rounded text-[#181B1A] focus:outline-none focus:border-[#4B5B4E]"
                    />
                    <span className="text-[11px] text-[#6B7C6E] block mt-1">
                      Applied when the cart subtotal is below the free shipping threshold.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#181B1A] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm"
                  >
                    Save Shipping Policy
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: SUPABASE INTEGRATION ARCHITECTURE */}
          {activeTab === 'supabase' && (
            <div className="space-y-6 text-xs text-[#303734]">
              <div className="p-4 bg-white rounded-lg border border-[#EAE6DD] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#4B5B4E]" />
                    <span className="text-sm font-semibold text-[#181B1A]">Supabase Database Architecture</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Not Configured Yet (Client-Side Mock Mode)
                  </span>
                </div>

                <p className="text-[#5A635E] leading-relaxed">
                  The client application is running locally. To activate a persistent cloud database, create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="underline text-[#181B1A]">supabase.com</a> and add your credentials to <code className="bg-[#FAF9F5] px-1 py-0.5 rounded border border-[#EAE6DD]">.env</code>:
                </p>

                <div className="bg-[#FAF9F5] p-3 rounded border border-[#EAE6DD] space-y-1 font-mono text-[11px]">
                  <p><strong>VITE_SUPABASE_URL:</strong> {supabaseConfig.url || '(Not connected)'}</p>
                  <p><strong>VITE_SUPABASE_ANON_KEY:</strong> {supabaseConfig.anonKey ? '••••••••••••' : '(Not connected)'}</p>
                </div>
              </div>

              {/* Ready-to-run PostgreSQL Schema */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#181B1A]">
                    PostgreSQL Schema & Security Rules (Ready to Run)
                  </span>
                  <button
                    onClick={handleCopySchema}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#181B1A] text-[#FAF9F5] rounded text-xs font-medium"
                  >
                    {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSchema ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
                  </button>
                </div>

                <p className="text-[#5A635E]">
                  Run this in Supabase SQL Editor once your project is created to provision the <code className="bg-white px-1 border border-[#EAE6DD] rounded">products</code>, <code className="bg-white px-1 border border-[#EAE6DD] rounded">orders</code>, and <code className="bg-white px-1 border border-[#EAE6DD] rounded">order_items</code> tables with Row-Level Security:
                </p>

                <pre className="p-4 bg-[#181B1A] text-[#8A9D8E] rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed max-h-52">
                  {SUPABASE_SCHEMA_SQL}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: RAZORPAY PAYMENTS SETUP */}
          {activeTab === 'razorpay' && (
            <div className="space-y-6 text-xs text-[#303734]">
              <div className="p-4 bg-white rounded-lg border border-[#EAE6DD] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#181B1A]" />
                    <span className="text-sm font-semibold text-[#181B1A]">Razorpay Payment Gateway</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Sandbox / Test Mode (No Live Key)
                  </span>
                </div>

                <p className="text-[#5A635E] leading-relaxed">
                  Cash on Delivery (COD) is functional for receiving customer addresses and orders. Razorpay online payment is in sandbox/testing mode until you add your live merchant API key:
                </p>

                <div className="bg-[#FAF9F5] p-3 rounded border border-[#EAE6DD] space-y-1 font-mono text-[11px]">
                  <p><strong>VITE_RAZORPAY_KEY_ID:</strong> {razorpayConfig.keyId || '(Pending configuration in .env)'}</p>
                </div>
              </div>

              <div className="p-4 bg-[#F3EFE7] rounded-lg border border-[#EAE6DD] space-y-2">
                <h4 className="font-semibold text-sm text-[#181B1A]">Live Gateway Setup Steps:</h4>
                <ol className="list-decimal pl-4 space-y-1.5 text-[#5A635E]">
                  <li>Register/Sign in at <a href="https://dashboard.razorpay.com" target="_blank" rel="noreferrer" className="underline text-[#181B1A]">dashboard.razorpay.com</a>.</li>
                  <li>Navigate to <strong>Account & Settings &rarr; API Keys</strong>.</li>
                  <li>Generate your <code className="bg-white px-1 py-0.5 rounded text-[#181B1A]">Key ID</code> and place it in <code className="bg-white px-1 py-0.5 rounded text-[#181B1A]">.env</code> as <code className="bg-white px-1 py-0.5 rounded text-[#181B1A]">VITE_RAZORPAY_KEY_ID</code>.</li>
                  <li>Live payments via UPI (PhonePe, GPay, Paytm) and debit/credit cards will then execute natively.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 5: RECENT ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-[#EAE6DD] p-6 space-y-2">
                  <Package className="w-8 h-8 text-[#6B7C6E] mx-auto" />
                  <p className="text-sm font-medium text-[#181B1A]">No orders recorded yet</p>
                  <p className="text-xs text-[#5A635E]">
                    Complete a test checkout to see order records, customer details, and item breakdowns here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.orderNumber} className="p-4 bg-white rounded-lg border border-[#EAE6DD] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#181B1A]">{order.orderNumber}</span>
                          <span className="text-[#6B7C6E]">· {order.createdAt}</span>
                        </div>
                        <span className="font-semibold text-[#181B1A] tabular-nums">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="text-xs text-[#5A635E]">
                        <p>Customer: {order.shippingAddress.fullName} (+91 {order.shippingAddress.phone})</p>
                        <p>Address: {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} ({order.shippingAddress.pincode})</p>
                        <p className="capitalize">Method: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay Online'}</p>
                      </div>

                      <div className="text-[11px] text-[#181B1A] pt-1 border-t border-[#EAE6DD]/60">
                        {order.items.map((it) => `${it.product.name} (×${it.quantity})`).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#EAE6DD] bg-[#FAF9F5] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#181B1A] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded-md"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
