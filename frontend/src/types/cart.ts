import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = 'cod' | 'razorpay_upi' | 'razorpay_card' | 'razorpay_netbanking';

export interface CompletedOrder {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: CustomerShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  estimatedDelivery: string;
  status: 'confirmed' | 'processing' | 'shipped';
}
