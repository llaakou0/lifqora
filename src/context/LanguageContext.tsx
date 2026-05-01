import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { ar: 'الرئيسية', en: 'Home' },
  products: { ar: 'المنتجات', en: 'Products' },
  categories: { ar: 'التصنيفات', en: 'Categories' },
  about: { ar: 'من نحن', en: 'About Us' },
  contact: { ar: 'تواصل معنا', en: 'Contact' },
  faq: { ar: 'الأسئلة الشائعة', en: 'FAQ' },
  
  // Actions
  addToCart: { ar: 'أضف للسلة', en: 'Add to Cart' },
  buyNow: { ar: 'اشتري الآن', en: 'Buy Now' },
  viewDetails: { ar: 'عرض التفاصيل', en: 'View Details' },
  addToWishlist: { ar: 'أضف للمفضلة', en: 'Add to Wishlist' },
  removeFromWishlist: { ar: 'إزالة من المفضلة', en: 'Remove from Wishlist' },
  
  // Cart
  cart: { ar: 'السلة', en: 'Cart' },
  emptyCart: { ar: 'السلة فارغة', en: 'Your cart is empty' },
  total: { ar: 'الإجمالي', en: 'Total' },
  checkout: { ar: 'إتمام الشراء', en: 'Checkout' },
  clearCart: { ar: 'تفريغ السلة', en: 'Clear Cart' },
  
  // Wishlist
  wishlist: { ar: 'المفضلة', en: 'Wishlist' },
  emptyWishlist: { ar: 'قائمة المفضلة فارغة', en: 'Your wishlist is empty' },
  
  // Coupons
  coupon: { ar: 'كود الخصم', en: 'Coupon Code' },
  applyCoupon: { ar: 'تطبيق', en: 'Apply' },
  couponApplied: { ar: 'تم تطبيق الكوبون', en: 'Coupon applied' },
  invalidCoupon: { ar: 'كود غير صالح', en: 'Invalid coupon code' },
  
  // Products
  featured: { ar: 'مميز', en: 'Featured' },
  new: { ar: 'جديد', en: 'New' },
  sale: { ar: 'خصم', en: 'Sale' },
  outOfStock: { ar: 'نفد المخزون', en: 'Out of Stock' },
  
  // Hero
  heroTitle: { ar: 'منتجات رقمية جاهزة بين يديك', en: 'Digital Products Ready for You' },
  heroSubtitle: { ar: 'اكتشف منتجات رقمية متنوعة تساعدك على البدء، التعلم، البيع، أو تطوير أعمالك بسهولة', en: 'Discover diverse digital products to help you start, learn, sell, or grow your business easily' },
  browseProducts: { ar: 'تصفح المنتجات', en: 'Browse Products' },
  
  // Why Us
  whyLifqora: { ar: 'لماذا Lifqora؟', en: 'Why Lifqora?' },
  diverseProducts: { ar: 'منتجات رقمية متنوعة', en: 'Diverse Digital Products' },
  fastPurchase: { ar: 'شراء سريع وسهل', en: 'Fast & Easy Purchase' },
  whatsappSupport: { ar: 'دعم عبر واتساب', en: 'WhatsApp Support' },
  continuousUpdates: { ar: 'تحديثات وعروض مستمرة', en: 'Continuous Updates & Offers' },
  
  // Footer
  quickLinks: { ar: 'روابط سريعة', en: 'Quick Links' },
  refundPolicy: { ar: 'سياسة الاسترجاع', en: 'Refund Policy' },
  terms: { ar: 'الشروط والأحكام', en: 'Terms & Conditions' },
  allRightsReserved: { ar: 'جميع الحقوق محفوظة', en: 'All Rights Reserved' },
  
  // Common
  search: { ar: 'بحث', en: 'Search' },
  filter: { ar: 'تصفية', en: 'Filter' },
  sort: { ar: 'ترتيب', en: 'Sort' },
  loading: { ar: 'جاري التحميل...', en: 'Loading...' },
  error: { ar: 'حدث خطأ', en: 'An error occurred' },
  success: { ar: 'تم بنجاح', en: 'Success' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('lifqora_language');
    return (saved as Language) || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('lifqora_language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};
