/**
 * ORIONIX — Supabase Architecture & Integration Ready Module
 * 
 * To activate live Supabase integration:
 * 1. Create a project at https://supabase.com
 * 2. Set the following environment variables in .env:
 *    VITE_SUPABASE_URL=https://your-project.supabase.co
 *    VITE_SUPABASE_ANON_KEY=your-anon-public-key
 * 3. Run the schema script below in Supabase SQL Editor.
 */

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  isConfigured: boolean;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && url.startsWith('http'))
  };
};

/**
 * Production-ready PostgreSQL schema for ORIONIX e-commerce.
 * Includes Row-Level Security (RLS), products catalog, orders, and customer address records.
 */
export const SUPABASE_SCHEMA_SQL = `-- ORIONIX Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  tagline TEXT,
  category TEXT NOT NULL CHECK (category IN ('combos', 'skincare', 'footcare', 'wellness')),
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  is_price_estimated BOOLEAN DEFAULT FALSE,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  volume TEXT,
  image TEXT NOT NULL,
  description TEXT,
  benefits TEXT[],
  key_ingredients JSONB,
  ritual_how_to_use TEXT,
  is_combo_kit BOOLEAN DEFAULT FALSE,
  kit_contents TEXT[],
  badge TEXT,
  stock INTEGER DEFAULT 50,
  sku TEXT UNIQUE NOT NULL,
  dermatologically_tested BOOLEAN DEFAULT TRUE,
  ayurvedic_certified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cod', 'razorpay_card', 'razorpay_upi', 'razorpay_netbanking')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_fee NUMERIC(10, 2) DEFAULT 0,
  total_amount NUMERIC(10, 2) NOT NULL,
  order_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (order_status IN ('confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  tracking_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_price NUMERIC(10, 2) NOT NULL
);

-- 5. Enable Row-Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 6. Public Read Policy for Products
CREATE POLICY "Public products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

-- 7. Public Insert Policy for Orders (Customers placing orders)
CREATE POLICY "Customers can create orders" 
ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers can create order items" 
ON public.order_items FOR INSERT WITH CHECK (true);
`;
