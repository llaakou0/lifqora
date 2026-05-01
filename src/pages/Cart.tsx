import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Tag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { useNotification } from '../context/NotificationContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, clearCart, getTotal, couponCode, couponDiscount, applyCoupon, removeCoupon } = useCart();
  const { settings } = useStore();
  const { addNotification } = useNotification();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      addNotification('success', `تم تطبيق الكوبون! خصم ${couponDiscount}%`);
      setCouponInput('');
    } else {
      addNotification('error', 'كود الخصم غير صالح');
    }
  };

  const openWhatsApp = () => {
    let message = 'مرحباً، أريد شراء المنتجات التالية:\n\n';
    items.forEach(item => {
      message += `• ${item.product.name} - $${item.product.price} × ${item.quantity}\n`;
    });
    message += `\nالإجمالي: $${getTotal().toFixed(2)}`;
    if (couponCode) {
      message += `\n(شامل خصم ${couponDiscount}%)`;
    }
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">السلة فارغة</h2>
          <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات بعد</p>
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
            سلة التسوق
          </h1>
          <p className="text-gray-600">
            {items.length} منتجات في السلة
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={item.product.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-1 hover:text-gray-700 transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-3">{item.product.category}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">${item.product.price}</span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${item.product.originalPrice}</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => {
                          removeFromCart(item.product.id);
                          addNotification('info', 'تم إزالة المنتج من السلة');
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={() => {
                clearCart();
                addNotification('info', 'تم تفريغ السلة');
              }}
              className="w-full py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium"
            >
              تفريغ السلة
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">ملخص الطلب</h3>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كود الخصم
                </label>
                {couponCode ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <Tag size={18} className="text-green-600" />
                      <span className="text-sm font-medium text-green-700">{couponCode}</span>
                      <span className="text-xs text-green-600">(-{couponDiscount}%)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      إزالة
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="أدخل الكود"
                      className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      تطبيق
                    </button>
                  </div>
                )}
              </div>

              {/* Prices */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium text-gray-900">
                    ${items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">الخصم ({couponDiscount}%)</span>
                    <span className="font-medium text-green-600">
                      -${(items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * couponDiscount / 100).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">الإجمالي</span>
                    <span className="text-lg font-bold text-gray-900">${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-xl hover:bg-green-600 transition-colors font-medium text-lg"
              >
                <MessageCircle size={22} />
                <span>إتمام الطلب عبر واتساب</span>
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                سيتم إرسال تفاصيل طلبك عبر واتساب للتأكيد
              </p>

              {/* Available Coupons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">أكواد خصم متاحة:</p>
                <div className="flex flex-wrap gap-2">
                  {['LIFQORA10', 'WELCOME15', 'LIFQORA20'].map(code => (
                    <span
                      key={code}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-mono"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
