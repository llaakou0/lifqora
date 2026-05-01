import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  Order,
  StoreSettings,
  defaultProducts,
  defaultCategories,
  defaultSettings,
  defaultOrders,
  adminCredentials
} from '../data/store';
import { saveToCloud, loadFromCloud, isCloudConfigured } from '../services/cloudStorage';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  settings: StoreSettings;
  isAdmin: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lifqora_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('lifqora_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lifqora_orders');
    return saved ? JSON.parse(saved) : defaultOrders;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('lifqora_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('lifqora_admin') === 'true';
  });

  const [cloudSynced, setCloudSynced] = useState<boolean>(false);

  // Load data from cloud on mount
  useEffect(() => {
    const loadCloudData = async () => {
      if (isCloudConfigured()) {
        const cloudData = await loadFromCloud();
        if (cloudData) {
          if (cloudData.products?.length > 0) setProducts(cloudData.products);
          if (cloudData.categories?.length > 0) setCategories(cloudData.categories);
          if (cloudData.orders) setOrders(cloudData.orders);
          if (cloudData.settings) setSettings(cloudData.settings);
          console.log('✅ Data loaded from cloud');
        }
        setCloudSynced(true);
      }
    };
    loadCloudData();
  }, []);

  // Save to localStorage and cloud whenever data changes
  useEffect(() => {
    localStorage.setItem('lifqora_products', JSON.stringify(products));
    
    // Save to cloud after initial load
    if (cloudSynced && isCloudConfigured()) {
      saveToCloud({ products, categories, orders, settings });
    }
  }, [products, categories, orders, settings, cloudSynced]);

  useEffect(() => {
    localStorage.setItem('lifqora_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('lifqora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lifqora_settings', JSON.stringify(settings));
  }, [settings]);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...product } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...category } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const login = (email: string, password: string): boolean => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      setIsAdmin(true);
      localStorage.setItem('lifqora_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('lifqora_admin');
  };

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      orders,
      settings,
      isAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      updateSettings,
      login,
      logout
    }}>
      {children}
    </StoreContext.Provider>
  );
};
