import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          الصفحة غير موجودة
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            <Home size={20} />
            <span>الصفحة الرئيسية</span>
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-2 border border-gray-200 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            <span>تصفح المنتجات</span>
            <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
