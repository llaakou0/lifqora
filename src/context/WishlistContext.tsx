import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextType {
  items: string[]; // Store only product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lifqora_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Handle old format (array of products) and new format (array of IDs)
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (typeof parsed[0] === 'object' && parsed[0].id) {
            // Old format - convert to IDs only
            return parsed.map((p: any) => p.id);
          }
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lifqora_wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (productId: string) => {
    setItems(prev => {
      if (prev.includes(productId)) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems(prev => prev.filter(id => id !== productId));
  };

  const isInWishlist = (productId: string): boolean => {
    return items.includes(productId);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      itemCount: items.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
