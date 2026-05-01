import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { useNotification } from '../context/NotificationContext';

const Wishlist: React.FC = () => {
  const { items: wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { products } = useStore();
  const { addNotification } = useNotification();

  // Get full product data from wishlist IDs
  const wishlistProducts = wishlistIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    addNotification('success', `تم إضافة ${product.name} للسلة`);
  };

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    addNotification('info', `تم إزالة ${productName} من المفضلة`);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">قائمة المفضلة فارغة</h2>
          <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات للمفضلة بعد</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            <span>تصفح المنتجات</span>
            <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            المفضلة
          </h1>
          <p className="text-gray-600">
            {wishlistProducts.length} منتجات في قائمة المفضلة
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product: any, index) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden card-hover animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <button
                  onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 transition-colors"
                >
                  <Heart size={18} className="text-red-500 fill-red-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
                >
                  <ShoppingCart size={18} />
                  <span>أضف للسلة</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Wishlist */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              clearWishlist();
              addNotification('info', 'تم مسح قائمة المفضلة');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Trash2 size={18} />
            <span>مسح القائمة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
