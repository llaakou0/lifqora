export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[]; // Multiple images support
  features: string[];
  deliveryMethod: string;
  notes: string[];
  featured: boolean;
  rating?: number;
  reviews?: number;
  salesCount?: number;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  notes?: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  email: string;
  instagramLink: string;
  tiktokLink: string;
}

// Default categories (empty - add your own from admin panel)
export const defaultCategories: Category[] = [];

// Default products (empty - add your own from admin panel)
export const defaultProducts: Product[] = [];

// Default settings
export const defaultSettings: StoreSettings = {
  whatsappNumber: '966500000000',
  email: 'support@lifqora.com',
  instagramLink: 'https://instagram.com/lifqora',
  tiktokLink: 'https://tiktok.com/@lifqora'
};

// Default orders (empty - no demo orders)
export const defaultOrders: Order[] = [];

// Admin credentials (in a real app, this would be on a server)
export const adminCredentials = {
  email: 'admin@lifqora.com',
  password: 'admin123'
};
