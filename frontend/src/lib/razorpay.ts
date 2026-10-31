/**
 * ORIONIX — Razorpay Payment Gateway Integration Prepared Module
 * 
 * In production:
 * 1. Set VITE_RAZORPAY_KEY_ID in your environment variables.
 * 2. When checkout is initiated, this script loads the official Razorpay Checkout SDK.
 * 3. In the current preview mode (without live keys), it provides a transparent sandbox/test
 *    and Cash on Delivery (COD) flow with realistic order confirmation receipts and clear notices.
 */

export interface RazorpayCustomerDetails {
  name: string;
  email: string;
  contact: string;
}

export interface RazorpayOrderPayload {
  amount: number; // in rupees
  orderId?: string;
  receiptNumber: string;
  customer: RazorpayCustomerDetails;
  description: string;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: (response: unknown) => void) => void;
    };
  }
}

export const getRazorpayConfig = () => {
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  return {
    keyId: keyId || '',
    isConfigured: Boolean(keyId && keyId.startsWith('rzp_')),
  };
};

/**
 * Dynamically loads the official Razorpay script if not already present.
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
