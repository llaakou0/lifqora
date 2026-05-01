import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Headphones, RefreshCw, Package, Download, CreditCard, MessageCircle, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products, categories, settings } = useStore();
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsappNumber}?text=مرحباً، أريد الاستفسار عن منتجاتكم`, '_blank');
  };

  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: 'منتجات رقمية متنوعة',
      description: 'نوفر مجموعة واسعة من المنتجات الرقمية لتلبية جميع احتياجاتك'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'شراء سريع وسهل',
      description: 'تجربة شراء بسيطة وسريعة مع تسليم فوري للمنتجات الرقمية'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'دعم عبر واتساب',
      description: 'فريق دعم متاح للرد على استفساراتك ومساعدتك في أي وقت'
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: 'تحديثات وعروض مستمرة',
      description: 'نقدم عروض حصرية ومنتجات جديدة بشكل مستمر'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'اختر المنتج المناسب',
      description: 'تصفح منتجاتنا واختر ما يناسب احتياجاتك'
    },
    {
      number: '02',
      title: 'تواصل معنا أو أكمل الطلب',
      description: 'يمكنك التواصل عبر واتساب أو إتمام الطلب مباشرة'
    },
    {
      number: '03',
      title: 'استلم المنتج رقمياً بسرعة',
      description: 'سيتم تسليم المنتج لك إلكترونياً خلال دقائق'
    }
  ];

  const trustItems = [
    { icon: <Headphones size={24} />, text: 'دعم متاح' },
    { icon: <Download size={24} />, text: 'منتجات رقمية جاهزة' },
    { icon: <Zap size={24} />, text: 'تجربة شراء بسيطة' },
    { icon: <Package size={24} />, text: 'تسليم رقمي' },
    { icon: <CreditCard size={24} />, text: 'طرق دفع مناسبة' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 md:py-24">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm mb-6">
              <Sparkles size={16} />
              <span>متجر المنتجات الرقمية الأول</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              منتجات رقمية جاهزة
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">بين يديك</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed animate-slide-up">
              اكتشف منتجات رقمية متنوعة تساعدك على البدء، التعلم، البيع، أو تطوير أعمالك بسهولة من مكان واحد.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/products"
                className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 text-lg font-medium hover:shadow-xl hover:-translate-y-1 btn-primary"
              >
                <span>تصفح المنتجات</span>
                <ArrowLeft size={20} />
              </Link>
              <button
                onClick={openWhatsApp}
                className="flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-lg font-medium hover:-translate-y-1"
              >
                <MessageCircle size={20} className="text-green-500" />
                <span>تواصل معنا</span>
              </button>
            </div>
          </div>

          {/* Product Type Cards */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: '👤', label: 'حسابات رقمية' },
              { icon: '📦', label: 'باقات رقمية' },
              { icon: '📚', label: 'كتب وكورسات' },
              { icon: '🎨', label: 'قوالب وتصاميم' },
              { icon: '🔧', label: 'أدوات وبرامج' },
              { icon: '🔑', label: 'اشتراكات' },
              { icon: '🎓', label: 'ملفات تعليمية' },
              { icon: '💼', label: 'منتجات لإعادة البيع' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 card-glass"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <span className="text-3xl mb-2 block">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lifqora Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا Lifqora؟
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نسعى لتقديم أفضل تجربة شراء للمنتجات الرقمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-800 hover:text-white transition-all duration-500 group hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-gray-700 shadow-sm group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm opacity-80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                التصنيفات
              </h2>
              <p className="text-gray-600">
                تصفح منتجاتنا حسب التصنيف
              </p>
            </div>
            <Link
              to="/categories"
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors hover-lift"
            >
              <span>عرض الكل</span>
              <ArrowLeft size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 group hover-lift card-glass"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.productCount} منتجات
                </p>
              </Link>
            ))}
          </div>

          <div className="md:hidden text-center mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>عرض كل التصنيفات</span>
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                المنتجات المميزة
              </h2>
              <p className="text-gray-600">
                أفضل المنتجات المختارة خصيصاً لك
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors hover-lift"
            >
              <span>عرض الكل</span>
              <ArrowLeft size={18} />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <Package size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد منتجات مميزة حالياً</p>
            </div>
          )}

          <div className="md:hidden text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>عرض كل المنتجات</span>
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              كيف تتم عملية الشراء؟
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ثلاث خطوات بسيطة للحصول على منتجك الرقمي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 h-full hover:shadow-xl transition-all duration-300 card-glass">
                  <span className="text-6xl font-bold bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent mb-4 block">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                    <ArrowLeft size={24} className="text-gray-300 rtl-flip" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="text-center mb-10 relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                يمكنك الوثوق بنا
              </h2>
              <p className="text-gray-400">
                نلتزم بتقديم أفضل تجربة شراء لعملائنا
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
              {trustItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-white text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ابدأ الآن مع Lifqora
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            اختر المنتج الرقمي المناسب لك واستلمه بطريقة سهلة وسريعة.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 text-lg font-medium hover:shadow-xl hover:-translate-y-1 btn-primary"
          >
            <span>تصفح جميع المنتجات</span>
            <ArrowLeft size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
