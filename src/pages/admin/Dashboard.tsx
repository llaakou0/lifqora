import React from 'react';
import { Link } from 'react-router-dom';
import { Package, FolderOpen, ShoppingCart, Settings, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const Dashboard: React.FC = () => {
  const { products, categories, orders } = useStore();

  const stats = [
    {
      label: 'إجمالي المنتجات',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      label: 'التصنيفات',
      value: categories.length,
      icon: FolderOpen,
      color: 'bg-green-500',
      link: '/admin/categories'
    },
    {
      label: 'إجمالي الطلبات',
      value: orders.length,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      link: '/admin/orders'
    },
    {
      label: 'المنتجات المميزة',
      value: products.filter(p => p.featured).length,
      icon: TrendingUp,
      color: 'bg-orange-500',
      link: '/admin/products'
    }
  ];

  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            مكتمل
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <Clock size={12} />
            معلق
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <AlertCircle size={12} />
            ملغي
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          لوحة التحكم
        </h1>
        <p className="text-gray-600">
          مرحباً بك في لوحة إدارة متجر Lifqora
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">آخر الطلبات</h2>
          <Link
            to="/admin/orders"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            عرض الكل
          </Link>
        </div>
        
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-right border-b border-gray-200">
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">رقم الطلب</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">العميل</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">المنتج</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">الحالة</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{order.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.productName}</td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            لا توجد طلبات حالياً
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/products"
          className="bg-gray-900 text-white rounded-2xl p-6 hover:bg-gray-800 transition-colors"
        >
          <Package size={32} className="mb-4" />
          <h3 className="text-lg font-semibold mb-2">إدارة المنتجات</h3>
          <p className="text-sm text-gray-400">إضافة وتعديل وحذف المنتجات</p>
        </Link>
        
        <Link
          to="/admin/orders"
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
        >
          <ShoppingCart size={32} className="mb-4 text-gray-700" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900">إدارة الطلبات</h3>
          <p className="text-sm text-gray-600">متابعة وتحديث حالة الطلبات</p>
        </Link>
        
        <Link
          to="/admin/settings"
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
        >
          <Settings size={32} className="mb-4 text-gray-700" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900">إعدادات المتجر</h3>
          <p className="text-sm text-gray-600">تحديث بيانات التواصل والإعدادات</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
