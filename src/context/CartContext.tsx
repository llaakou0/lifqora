import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/store';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  itemCount: number;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Available coupons
const coupons: Record<string, number> = {
  'LIFQORA10': 10,
  'LIFQORA20': 20,
  'WELCOME15': 15,
  'SPECIAL30': 30
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lifqora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('lifqora_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  const getTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discount = subtotal * (couponDiscount / 100);
    return subtotal - discount;
  };

  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    if (coupons[upperCode]) {
      setCouponCode(upperCode);
      setCouponDiscount(coupons[upperCode]);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      itemCount,
      couponCode,
      couponDiscount,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};
