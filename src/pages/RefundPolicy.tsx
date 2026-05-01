import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const RefundPolicy: React.FC = () => {
  const { settings } = useStore();

  const openWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsappNumber}?text=مرحباً، أريد الاستفسار عن سياسة الاسترجاع`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            سياسة الاسترجاع
          </h1>
          <p className="text-gray-600">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">ملاحظة مهمة</h3>
              <p className="text-gray-700 text-sm">
                نظراً للطبيعة الرقمية لمنتجاتنا، تختلف سياسة الاسترجاع عن المنتجات المادية. يرجى قراءة هذه السياسة بعناية قبل إتمام الشراء.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield size={24} className="text-gray-700" />
              نظرة عامة
            </h2>
            <p className="text-gray-600 leading-relaxed">
              في Lifqora، نسعى لتقديم منتجات رقمية عالية الجودة وخدمة عملاء ممتازة. نظرًا لأن منتجاتنا رقمية يتم تسليمها إلكترونياً، فإن سياسة الاسترجاع الخاصة بنا تعكس هذه الطبيعة.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle size={24} className="text-green-500" />
              الحالات المؤهلة للاسترجاع
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>المنتج لا يعمل كما هو موضح في الوصف</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>المنتج المُسلَّم يختلف بشكل كبير عن الوصف</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>لم يتم استلام المنتج خلال 48 ساعة من إتمام الطلب</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>مشكلة تقنية من جانبنا تمنعك من استخدام المنتج</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <XCircle size={24} className="text-red-500" />
              الحالات غير المؤهلة للاسترجاع
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>تغيير رأيك بعد الشراء</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>عدم قراءة الوصف والمتطلبات قبل الشراء</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>عدم توافق المنتج مع نظامك (مع ذكر المتطلبات في الوصف)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>المنتجات التي تم استخدامها أو تحميلها بالكامل</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              إجراءات طلب الاسترجاع
            </h2>
            <ol className="space-y-4 text-gray-600">
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                <div>
                  <p className="font-medium text-gray-900">تواصل معنا</p>
                  <p className="text-sm">تواصل معنا عبر واتساب خلال 48 ساعة من استلام المنتج</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                <div>
                  <p className="font-medium text-gray-900">اشرح المشكلة</p>
                  <p className="text-sm">قدم تفصيلاً للمشكلة مع إرفاق أي أدلة (صور، لقطات شاشة)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                <div>
                  <p className="font-medium text-gray-900">مراجعة الطلب</p>
                  <p className="text-sm">سنراجع طلبك ونرد عليك خلال 24-48 ساعة</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
                <div>
                  <p className="font-medium text-gray-900">الحل</p>
                  <p className="text-sm">إما استبدال المنتج أو استرداد المبلغ حسب الحالة</p>
                </div>
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              أنواع الاسترداد
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">استرداد كامل</h4>
                <p className="text-sm text-gray-600">في حال عدم استلام المنتج أو وجود مشكلة جوهرية</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">استبدال المنتج</h4>
                <p className="text-sm text-gray-600">نقدم منتج بديل يعمل بشكل صحيح</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">رصيد المتجر</h4>
                <p className="text-sm text-gray-600">يمكن تحويل المبلغ كرصيد لاستخدامه في مشتريات مستقبلية</p>
              </div>
            </div>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            لديك استفسار عن سياسة الاسترجاع؟
          </h3>
          <p className="text-gray-600 mb-6">
            تواصل معنا وسنرد على جميع استفساراتك
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

export default RefundPolicy;
