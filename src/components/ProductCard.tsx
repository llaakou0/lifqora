import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, MessageCircle, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../data/store';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { settings } = useStore();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useNotification();

  const inWishlist = isInWishlist(product.id);

  const openWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(`مرحباً، أريد شراء: ${product.name}`);
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addNotification('success', `تم إضافة ${product.name} للسلة`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      addNotification('info', 'تم إزالة المنتج من المفضلة');
    } else {
      addToWishlist(product.id);
      addNotification('success', 'تم إضافة المنتج للمفضلة');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden card-hover group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';
          }}
        />
        
        {/* Badges */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 left-3 p-2.5 rounded-full shadow-lg transition-all duration-300 ${
            inWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <Heart size={18} className={inWishlist ? 'fill-white' : ''} />
        </button>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Link
              to={`/product/${product.id}`}
              className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:scale-110 transform duration-200"
            >
              <Eye size={20} />
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-gray-900 text-white p-3 rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:scale-110 transform duration-200"
            >
              <ShoppingCart size={20} />
            </button>
            <button
              onClick={openWhatsApp}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors shadow-lg hover:scale-110 transform duration-200"
            >
              <MessageCircle size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            {product.category}
          </span>
          {product.featured && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
              ⭐ مميز
            </span>
          )}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-gray-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium ripple"
          >
            <ShoppingCart size={16} />
            <span>عرض التفاصيل</span>
          </Link>
          <button
            onClick={openWhatsApp}
            className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-lg hover:bg-green-600 transition-colors ripple"
          >
            <MessageCircle size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
