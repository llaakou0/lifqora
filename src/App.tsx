import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Public Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import RefundPolicy from './pages/RefundPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

// Admin Pages
import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminSettings from './pages/admin/AdminSettings';

// Layout wrapper for public pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <WishlistProvider>
          <LanguageProvider>
            <NotificationProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin" element={<Login />} />
                  <Route path="/admin/dashboard" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                  </Route>
                  <Route path="/admin/products" element={<AdminLayout />}>
                    <Route index element={<AdminProducts />} />
                  </Route>
                  <Route path="/admin/categories" element={<AdminLayout />}>
                    <Route index element={<AdminCategories />} />
                  </Route>
                  <Route path="/admin/orders" element={<AdminLayout />}>
                    <Route index element={<AdminOrders />} />
                  </Route>
                  <Route path="/admin/settings" element={<AdminLayout />}>
                    <Route index element={<AdminSettings />} />
                  </Route>

                  {/* Public Routes */}
                  <Route
                    path="/"
                    element={
                      <PublicLayout>
                        <Home />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <PublicLayout>
                        <Products />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <PublicLayout>
                        <ProductDetail />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/categories"
                    element={
                      <PublicLayout>
                        <Categories />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <PublicLayout>
                        <About />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <PublicLayout>
                        <Contact />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/faq"
                    element={
                      <PublicLayout>
                        <FAQ />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/refund-policy"
                    element={
                      <PublicLayout>
                        <RefundPolicy />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <PublicLayout>
                        <Terms />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <PublicLayout>
                        <Cart />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <PublicLayout>
                        <Wishlist />
                      </PublicLayout>
                    }
                  />

                  {/* 404 Page */}
                  <Route
                    path="*"
                    element={
                      <PublicLayout>
                        <NotFound />
                      </PublicLayout>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </NotificationProvider>
          </LanguageProvider>
        </WishlistProvider>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
