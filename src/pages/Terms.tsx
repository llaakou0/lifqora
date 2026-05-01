import React from 'react';
import { Scale, FileText, AlertTriangle, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Terms: React.FC = () => {
  const { settings } = useStore();

  const openWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsappNumber}?text=مرحباً، أريد الاستفسار عن الشروط والأحكام`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            الشروط والأحكام
          </h1>
          <p className="text-gray-600">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Scale size={24} className="text-gray-700 flex-shrink-0 mt-1" />
            <p className="text-gray-600 leading-relaxed">
              باستخدامك لمتجر Lifqora، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام الموقع أو الشراء.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={24} className="text-gray-700" />
              1. التعريفات
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-900">المتجر:</strong> يشير إلى موقع Lifqora وخدماته</li>
              <li><strong className="text-gray-900">المستخدم/العميل:</strong> أي شخص يصل إلى الموقع أو يشتري منتجات</li>
              <li><strong className="text-gray-900">المنتجات الرقمية:</strong> المنتجات غير الملموسة المُسلَّمة إلكترونياً</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              2. حسابات المستخدمين
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>يجب تقديم معلومات صحيحة وكاملة عند إتمام الطلبات</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>أنت مسؤول عن الحفاظ على سرية معلومات حسابك</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>يجب إخطارنا فوراً بأي استخدام غير مصرح به لحسابك</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              3. المنتجات والشراء
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>جميع المنتجات رقمية ويتم تسليمها إلكترونياً</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>الأسعار المعروضة هي بالريال السعودي ما لم يُذكر خلاف ذلك</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>نحتفظ بالحق في تغيير الأسعار دون إشعار مسبق</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>يجب قراءة وصف المنتج جيداً قبل الشراء</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              4. حقوق الملكية الفكرية
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-sm">
                  جميع المنتجات المباعة محمية بحقوق الملكية الفكرية. يُمنع إعادة البيع أو التوزيع إلا إذا كان المنتج يشمل صراحةً حقوق إعادة البيع.
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>المنتجات للاستخدام الشخصي فقط ما لم يُنص على خلاف ذلك</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>يُمنع نسخ أو إعادة إنتاج أو بيع المنتجات</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>جميع المحتويات والتصاميم مملوكة لمتجر Lifqora أو لموردينا</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              5. الاستخدام المقبول
            </h2>
            <p className="text-gray-600 mb-4">يُمنع استخدام الموقع أو المنتجات في:</p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>أي نشاط غير قانوني</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>انتهاك حقوق الآخرين</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>نشر محتوى ضار أو مسيء</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>محاولة اختراق أو تعطيل الموقع</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              6. المسؤولية والضمانات
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>نقدم المنتجات "كما هي" دون ضمانات صريحة أو ضمنية</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام المنتجات</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>مسؤوليتنا محدودة بقيمة المنتج المشترى</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              7. الخصوصية
            </h2>
            <p className="text-gray-600">
              نحترم خصوصيتك ونحمي بياناتك الشخصية. نستخدم المعلومات المقدمة فقط لمعالجة طلباتك وتحسين خدماتنا. لن نشارك بياناتك مع أطراف ثالثة دون موافقتك.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              8. التغييرات على الشروط
            </h2>
            <p className="text-gray-600">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التغييرات على هذه الصفحة. استمرارك في استخدام الموقع يعني موافقتك على الشروط المحدثة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              9. القانون المعمول به
            </h2>
            <p className="text-gray-600">
              تخضع هذه الشروط وتُفسر وفقاً للقوانين المعمول بها. أي نزاعات تنشأ عن هذه الشروط يتم حلها عبر التحكيم الودي أولاً.
            </p>
          </section>
        </div>

        {/* Contact */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            لديك استفسار؟
          </h3>
          <p className="text-gray-600 mb-6">
            إذا كان لديك أي سؤال حول الشروط والأحكام، يرجى التواصل معنا.
          </p>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors font-medium"
          >
            <MessageCircle size={20} />
            <span>تواصل عبر واتساب</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
