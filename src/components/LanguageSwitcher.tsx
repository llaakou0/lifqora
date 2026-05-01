import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Globe size={20} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {language === 'ar' ? 'العربية' : 'English'}
        </span>
      </button>
      
      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[120px] z-50">
        <button
          onClick={() => setLanguage('ar')}
          className={`w-full px-4 py-3 text-right text-sm hover:bg-gray-50 transition-colors ${
            language === 'ar' ? 'bg-gray-100 font-medium' : ''
          }`}
        >
          🇸🇦 العربية
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors ${
            language === 'en' ? 'bg-gray-100 font-medium' : ''
          }`}
        >
          🇺🇸 English
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
