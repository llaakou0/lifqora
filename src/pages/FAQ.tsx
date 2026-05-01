import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { settings } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'ما هي المنتجات الرقمية؟',
      answer: 'المنتجات الرقمية هي منتجات غير ملموسة يتم تسليمها إلكترونياً، مثل الحسابات، الاشتراكات، الكتب الإلكترونية، القوالب، والكورسات التعليمية. يتم تسليمها عادة عبر البريد الإلكتروني أو رابط تحميل.'
    },
    {
      question: 'كيف يتم تسليم المنتج بعد الشراء؟',
      answer: 'بعد إتمام الطلب، يتم تسليم المنتج رقمياً إما عبر البريد الإلكتروني أو عبر واتساب. التسليم عادة يكون خلال دقائق من إتمام الطلب، وفي بعض الحالات قد يستغرق حتى 24 ساعة.'
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نوفر عدة طرق دفع مناسبة. يمكنك التواصل معنا عبر واتساب لمعرفة طرق الدفع المتاحة حالياً. نسعى لتقديم خيارات دفع متنوعة تناسب جميع العملاء.'
    },
    {
      question: 'هل المنتجات آمنة ومضمونة؟',
      answer: 'نعم، نحن نحرص على اختيار منتجاتنا بعناية ونضمن جودتها. إذا واجهت أي مشكلة مع المنتج، يرجى التواصل معنا وسنقوم بحلها في أقرب وقت.'
    },
    {
      question: 'هل يمكنني استرداد مالي بعد الشراء؟',
      answer: 'نظرًا لأن المنتجات رقمية يتم تسليمها فوراً، فإن سياسة الاسترجاع تختلف حسب نوع المنتج. يرجى مراجعة صفحة سياسة الاسترجاع لمزيد من التفاصيل، أو التواصل معنا قبل الشراء لأي استفسار.'
    },
    {
      question: 'كيف يمكنني التواصل معكم؟',
      answer: 'يمكنك التواصل معنا عبر واتساب للحصول على رد سريع، أو عبر البريد الإلكتروني للاستفسارات الرسمية. فريقنا متاح للمساعدة في أي وقت.'
    },
    {
      question: 'هل تقدمون عروض أو خصومات؟',
      answer: 'نعم، نقدم من وقت لآخر عروض وخصومات على منتجات محددة. تابعنا على وسائل التواصل الاجتماعي أو اشترك في نشرتنا البريدية لتصلك آخر العروض.'
    },
    {
      question: 'هل يمكنني طلب منتج غير متوفر في المتجر؟',
      answer: 'نعم، يمكنك التواصل معنا لطلب منتج معين غير متوفر حالياً. سنحاول توفيره لك إن أمكن أو نوجهك لمصدر مناسب.'
    },
    {
      question: 'هل المنتجات تأتي مع ضمان؟',
      answer: 'جميع منتجاتنا مضمونة للعمل كما هو موضح في الوصف. إذا واجهت أي مشكلة، يرجى التواصل معنا خلال أول 48 ساعة وسنقوم بحل المشكلة.'
    },
    {
      question: 'كم مرة يتم تحديث المنتجات؟',
      answer: 'نقوم بإضافة منتجات جديدة وتحديث القائمة بشكل مستمر. تأكد من زيارة المتجر بشكل داوم للاطلاع على آخر المنتجات.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsappNumber}?text=مرحباً، لدي سؤال`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            الأسئلة الشائعة
          </h1>
          <p className="text-gray-600">
            إجابات على الأسئلة الأكثر شيوعاً
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-gray-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <HelpCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            لم تجد إجابة لسؤالك؟
          </h3>
          <p className="text-gray-600 mb-6">
            لا تتردد في التواصل معنا. فريقنا جاهز للمساعدة.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors font-medium"
            >
              <MessageCircle size={20} />
              <span>تواصل عبر واتساب</span>
            </button>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              <span>صفحة التواصل</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
