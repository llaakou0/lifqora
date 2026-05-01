import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const WhatsAppButton: React.FC = () => {
  const { settings } = useStore();

  const openWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsappNumber}?text=مرحباً، أريد الاستفسار عن منتجاتكم`, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whatsapp-pulse"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle size={28} />
    </button>
  );
};

export default WhatsAppButton;
