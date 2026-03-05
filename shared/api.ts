/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Product types for e-commerce
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: "dress" | "saree" | "accessories";
  inStock: boolean;
  sku: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  deliveryAddress: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}
