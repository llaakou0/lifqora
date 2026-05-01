import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Categories: React.FC = () => {
  const { categories, products } = useStore();

  const getCategoryProductCount = (categoryName: string) => {
    return products.filter(p => p.category === categoryName).length;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            التصنيفات
          </h1>
          <p className="text-gray-600">
            تصفح منتجاتنا حسب التصنيف الذي يناسبك
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{category.icon}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {getCategoryProductCount(category.name)} منتج
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-sm text-gray-500 mb-4">
                {category.description}
              </p>

              <div className="flex items-center gap-2 text-gray-600 group-hover:text-gray-900 transition-colors">
                <span className="text-sm font-medium">تصفح المنتجات</span>
                <ArrowLeft size={16} className="rtl-flip" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
