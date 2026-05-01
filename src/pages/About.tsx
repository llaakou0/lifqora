import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Target, Eye, Heart, ArrowLeft } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'الجودة',
      description: 'نختار منتجاتنا بعناية لنضمن لك أعلى مستوى من الجودة'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'الشفافية',
      description: 'نوفر لك كل التفاصيل والמידע اللازم قبل الشراء'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'الدعم',
      description: 'فريقنا متاح دائماً لمساعدتك والإجابة على استفساراتك'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            من نحن
          </h1>
          <p className="text-gray-600">
            تعرف على Lifqora وقصتنا
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            متجرك الموثوق للمنتجات الرقمية
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Lifqora متجر رقمي يقدم منتجات رقمية متنوعة بطريقة سهلة ومنظمة. نسعى لتقديم تجربة شراء بسيطة وموثوقة، مع التركيز على الجودة والدعم المستمر لعملائنا.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                مهمتنا
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                نهدف إلى تسهيل الوصول للمنتجات الرقمية عالية الجودة. نؤمن بأن التكنولوجيا يجب أن تكون متاحة للجميع، لذلك نوفر منتجات متنوعة تناسب مختلف الاحتياجات والميزانيات.
              </p>
              <ul className="space-y-3">
                {[
                  'توفير منتجات رقمية متنوعة وعالية الجودة',
                  'تسهيل عملية الشراء والتسليم',
                  'تقديم دعم متميز لعملائنا',
                  'التحديث المستمر بالمنتجات الجديدة'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <span className="text-6xl mb-4 block">🎯</span>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                رؤيتنا
              </h4>
              <p className="text-gray-600">
                أن نكون الوجهة الأولى للمنتجات الرقمية في المنطقة، نقدم تجربة شراء استثنائية ومنتجات تلبي توقعات عملائنا.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            قيمنا
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-gray-700">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            ما نقدمه
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '👤', title: 'حسابات رقمية' },
              { icon: '📦', title: 'باقات رقمية' },
              { icon: '📚', title: 'كتب إلكترونية' },
              { icon: '🎨', title: 'قوالب وتصاميم' },
              { icon: '🔧', title: 'أدوات وبرامج' },
              { icon: '🔑', title: 'اشتراكات' },
              { icon: '🎓', title: 'كورسات تعليمية' },
              { icon: '💼', title: 'منتجات لإعادة البيع' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <span className="text-3xl mb-2 block">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            جاهز للبدء؟
          </h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            تصفح منتجاتنا الآن واختر ما يناسبك. نحن هنا لمساعدتك في كل خطوة.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-medium"
          >
            <span>تصفح المنتجات</span>
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
