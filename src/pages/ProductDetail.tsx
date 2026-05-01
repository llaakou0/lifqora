import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, MessageCircle, CheckCircle, Package, Download, 
  AlertCircle, ShoppingCart, Heart, Star, Shield, Truck, 
  RefreshCw, ChevronRight, Share2, Clock, Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, settings } = useStore();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useNotification();

  const product = products.find(p => p.id === id);
  const inWishlist = product ? isInWishlist(product.id) : false;
  
  // Get all images (support old single image and new multiple images)
  const allImages = product 
    ? (product.images && product.images.length > 0 
        ? product.images 
        : [product.image])
    : [];
  
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      addNotification('success', `تم إضافة ${product.name} للسلة`);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      if (inWishlist) {
        removeFromWishlist(product.id);
        addNotification('info', 'تم إزالة المنتج من المفضلة');
      } else {
        addToWishlist(product.id);
        addNotification('success', 'تم إضافة المنتج للمفضلة');
      }
    }
  };

  const openWhatsApp = () => {
    if (product) {
      const message = encodeURIComponent(`مرحباً، أريد شراء: ${product.name} - السعر: $${product.price}`);
      window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
    }
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addNotification('success', 'تم نسخ الرابط');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">المنتج غير موجود</h1>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800"
          >
            <ArrowRight size={18} />
            <span>العودة للمنتجات</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">الرئيسية</Link>
            <ChevronRight size={14} className="text-gray-300 rtl-flip" />
            <Link to="/products" className="text-gray-400 hover:text-gray-600 transition-colors">المنتجات</Link>
            <ChevronRight size={14} className="text-gray-300 rtl-flip" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Images Section */}
          <div className="space-y-4 animate-fade-in">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="aspect-square flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
                <img
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f9fafb" width="400" height="400"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              
              {/* Badges */}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  خصم {discount}%
                </div>
              )}
              
              {product.featured && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <Star size={14} fill="white" />
                  <span>مميز</span>
                </div>
              )}

              {/* Share Button */}
              <button
                onClick={shareProduct}
                className="absolute bottom-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
              >
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-gray-900 shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-contain bg-white"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23f3f4f6" width="80" height="80"/%3E%3C/svg%3E';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-6 animate-slide-up">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Package size={14} />
                {product.category}
              </Link>
              
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-2 rounded-full">
                <Star size={16} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-amber-700">4.9</span>
                <span className="text-xs text-amber-600">(128 تقييم)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  {discount > 0 && (
                    <p className="text-green-400 text-sm mt-1">
                      وفرت ${(product.originalPrice! - product.price).toFixed(2)} ({discount}%)
                    </p>
                  )}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 text-green-400">
                    <Zap size={18} />
                    <span className="text-sm font-medium">تسليم فوري</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl">
                <Shield size={24} className="text-green-600 mb-2" />
                <span className="text-xs text-green-700 font-medium">منتج مضمون</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl">
                <Truck size={24} className="text-blue-600 mb-2" />
                <span className="text-xs text-blue-700 font-medium">تسليم سريع</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-xl">
                <RefreshCw size={24} className="text-purple-600 mb-2" />
                <span className="text-xs text-purple-700 font-medium">دعم مستمر</span>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  ماذا ستحصل؟
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 bg-gray-900 text-white py-5 rounded-2xl hover:bg-gray-800 transition-all duration-300 text-lg font-bold hover:shadow-xl hover:-translate-y-0.5 btn-primary"
                >
                  <ShoppingCart size={24} />
                  <span>أضف للسلة</span>
                </button>
                
                <button
                  onClick={handleToggleWishlist}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 ${
                    inWishlist 
                      ? 'bg-red-50 border-red-500 text-red-500 shadow-lg' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'
                  }`}
                >
                  <Heart size={24} className={inWishlist ? 'fill-red-500' : ''} />
                </button>
              </div>

              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white py-5 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle size={24} />
                <span>اشتري الآن عبر واتساب</span>
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Download size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">طريقة الاستلام</h4>
                  <p className="text-gray-600">{product.deliveryMethod}</p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            {product.notes && product.notes.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">ملاحظات مهمة</h4>
                    <ul className="space-y-2">
                      {product.notes.map((note, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                          <span className="text-amber-500">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Extra Info */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Package size={16} />
                <span>منتج رقمي</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>تسليم فوري</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span>مضمون 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">وصف المنتج</h2>
          <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
            {product.fullDescription}
          </p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">منتجات مشابهة</h2>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>عرض الكل</span>
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
