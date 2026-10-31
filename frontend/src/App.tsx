// React is supplied by the application's configured runtime when dependencies are installed.
import { useState, useEffect } from "react";
import { INITIAL_PRODUCTS, Product, ProductCategory, StoreSettings, DEFAULT_STORE_SETTINGS } from "./data/products";
import { CartItem, CompletedOrder } from "./types/cart";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FeaturedCombos } from "./components/FeaturedCombos";
import { ShopCatalog } from "./components/ShopCatalog";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { AdminIntegrationsModal } from "./components/AdminIntegrationsModal";
import { BrandPhilosophy } from "./components/BrandPhilosophy";
import { Footer } from "./components/Footer";
import { Check } from "lucide-react";

export default function App() {
  // Centralized Products State (allows live editing in Admin modal)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("orionix_products_v3");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Configurable Store & Shipping Settings
  const [shippingSettings, setShippingSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem("orionix_shipping_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_STORE_SETTINGS;
      }
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // Cart Items State with LocalStorage Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("orionix_cart");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Orders State with LocalStorage Persistence
  const [orders, setOrders] = useState<CompletedOrder[]>(() => {
    const saved = localStorage.getItem("orionix_orders");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Modal & Drawer States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");

  // Coupon State
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    localStorage.setItem("orionix_products_v3", JSON.stringify(products));
  }, [products]);

  // Sync shipping settings to localStorage
  useEffect(() => {
    localStorage.setItem("orionix_shipping_settings", JSON.stringify(shippingSettings));
  }, [shippingSettings]);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("orionix_cart", JSON.stringify(cart));
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem("orionix_orders", JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ""}${product.name} to your bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Coupon handling
  const handleApplyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "GLOW10") {
      setCouponCode("GLOW10");
      setAppliedDiscount(10);
      return { success: true, message: "Coupon GLOW10 applied! 10% discount added." };
    }
    if (clean === "ORIONIX15") {
      setCouponCode("ORIONIX15");
      setAppliedDiscount(15);
      return { success: true, message: "Coupon ORIONIX15 applied! 15% discount added." };
    }
    return { success: false, message: "Invalid promo code. Use GLOW10 for 10% off." };
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setAppliedDiscount(0);
  };

  // Product Updates from Admin
  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    // Also update in cart if present
    setCart((prev) => prev.map((it) => (it.product.id === updated.id ? { ...it, product: updated } : it)));
    if (selectedProduct && selectedProduct.id === updated.id) {
      setSelectedProduct(updated);
    }
  };

  // Checkout transitions
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (newOrder: CompletedOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setCouponCode("");
    setAppliedDiscount(0);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  const discountAmount = appliedDiscount > 0 ? Math.round((subtotal * appliedDiscount) / 100) : 0;

  // Dynamic configurable shipping calculation
  const isFreeShipping = shippingSettings.freeShippingEnabled && subtotal >= shippingSettings.freeShippingThreshold;

  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : shippingSettings.standardShippingFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Filter combo kits specifically
  const comboKits = products.filter((p) => p.isComboKit);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181B1A] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181B1A] text-[#FAF9F5] px-4 py-3 rounded-md shadow-xl border border-[#303734] flex items-center gap-2 text-xs font-medium animate-slide-up">
          <Check className="w-4 h-4 text-[#8A9D8E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        shippingSettings={shippingSettings}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Editorial Hero Banner */}
        <Hero
          onShopCombos={() => {
            const el = document.getElementById("combos-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          onExploreAll={() => {
            setSelectedCategory("all");
            const el = document.getElementById("shop-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* Featured Combo Kits (Skin Glow Kit, Gold Foot-Care Duo, Sleep & Breathe Kit) */}
        <FeaturedCombos combos={comboKits} onAddToCart={(product) => handleAddToCart(product, 1)} onSelectProduct={(product) => setSelectedProduct(product)} />

        {/* Shop All Products Section with actual ORIONIX items */}
        <ShopCatalog
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* Brand Focus */}
        <BrandPhilosophy />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={(cat) => setSelectedCategory(cat)} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(prod, qty) => {
            handleAddToCart(prod, qty);
            setSelectedProduct(null);
            setIsCartOpen(true);
          }}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        couponCode={couponCode}
        appliedDiscount={appliedDiscount}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        shippingSettings={shippingSettings}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={subtotal}
        discount={discountAmount}
        shippingFee={shippingFee}
        total={grandTotal}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Admin / Integrations / Pricing Setup Modal */}
      <AdminIntegrationsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProduct={handleUpdateProduct}
        orders={orders}
        shippingSettings={shippingSettings}
        onUpdateShippingSettings={(newSettings) => setShippingSettings(newSettings)}
      />
    </div>
  );
}
