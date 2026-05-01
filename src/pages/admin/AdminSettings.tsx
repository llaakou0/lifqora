import React, { useState } from 'react';
import { Save, MessageCircle, Mail, Check, Download, Upload, RefreshCw, Cloud, CloudOff, Copy } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { exportData, importData, getLastSyncTime, StoreData } from '../../services/dataSync';
import { isCloudConfigured, getBinId, setBinId, loadFromCloud } from '../../services/cloudStorage';

const AdminSettings: React.FC = () => {
  const { products, categories, orders, settings, updateSettings } = useStore();
  const [formData, setFormData] = useState({
    whatsappNumber: settings.whatsappNumber,
    email: settings.email,
    instagramLink: settings.instagramLink,
    tiktokLink: settings.tiktokLink
  });
  const [saved, setSaved] = useState(false);
  const [importing, setImporting] = useState(false);
  const [syncingBinId, setSyncingBinId] = useState('');
  const [syncMessage, setSyncMessage] = useState('');

  const cloudEnabled = isCloudConfigured();
  const currentBinId = getBinId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExport = () => {
    const data: StoreData = {
      products,
      categories,
      orders,
      settings,
      exportedAt: new Date().toISOString()
    };
    exportData(data);
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      const data = await importData();
      if (data) {
        if (data.products) localStorage.setItem('lifqora_products', JSON.stringify(data.products));
        if (data.categories) localStorage.setItem('lifqora_categories', JSON.stringify(data.categories));
        if (data.orders) localStorage.setItem('lifqora_orders', JSON.stringify(data.orders));
        if (data.settings) localStorage.setItem('lifqora_settings', JSON.stringify(data.settings));
        
        alert('تم استيراد البيانات بنجاح! سيتم إعادة تحميل الصفحة.');
        window.location.reload();
      }
    } catch (error) {
      alert('حدث خطأ أثناء استيراد البيانات');
    }
    setImporting(false);
  };

  const handleCopyBinId = () => {
    if (currentBinId) {
      navigator.clipboard.writeText(currentBinId);
      setSyncMessage('تم نسخ المعرف!');
      setTimeout(() => setSyncMessage(''), 3000);
    }
  };

  const handleConnectToBin = async () => {
    if (!syncingBinId.trim()) {
      setSyncMessage('يرجى إدخال المعرف');
      setTimeout(() => setSyncMessage(''), 3000);
      return;
    }

    setBinId(syncingBinId.trim());
    const cloudData = await loadFromCloud();
    
    if (cloudData) {
      localStorage.setItem('lifqora_products', JSON.stringify(cloudData.products));
      localStorage.setItem('lifqora_categories', JSON.stringify(cloudData.categories));
      localStorage.setItem('lifqora_orders', JSON.stringify(cloudData.orders));
      localStorage.setItem('lifqora_settings', JSON.stringify(cloudData.settings));
      
      setSyncMessage('تم الاتصال بنجاح! سيتم إعادة التحميل.');
      setTimeout(() => window.location.reload(), 1500);
    } else {
      setSyncMessage('لم يتم العثور على البيانات');
      setTimeout(() => setSyncMessage(''), 3000);
    }
  };

  const lastSync = getLastSyncTime();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          الإعدادات
        </h1>
        <p className="text-gray-600">
          تحديث بيانات التواصل وإعدادات المتجر
        </p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Cloud Sync Status */}
        <div className={`rounded-2xl border p-6 ${cloudEnabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            {cloudEnabled ? (
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Cloud size={22} className="text-white" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-400 rounded-xl flex items-center justify-center">
                <CloudOff size={22} className="text-white" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">مزامنة سحابية</h2>
              <p className={`text-sm ${cloudEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                {cloudEnabled ? 'مفعلة ✅' : 'غير مفعلة'}
              </p>
            </div>
          </div>

          {cloudEnabled && (
            <div className="space-y-4">
              {/* Current Bin ID */}
              {currentBinId && (
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-2">معرف التخزين الخاص بك:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono truncate">
                      {currentBinId}
                    </code>
                    <button
                      onClick={handleCopyBinId}
                      className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      title="نسخ"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Connect to existing bin */}
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">لربط جهاز آخر بالمزامنة:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={syncingBinId}
                    onChange={(e) => setSyncingBinId(e.target.value)}
                    placeholder="الصق المعرف هنا"
                    className="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button
                    onClick={handleConnectToBin}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    اتصال
                  </button>
                </div>
              </div>

              {syncMessage && (
                <p className="text-sm text-center text-green-600 font-medium">{syncMessage}</p>
              )}
            </div>
          )}
        </div>

        {/* Backup & Restore */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">النسخ الاحتياطي</h2>
          <p className="text-sm text-gray-600 mb-6">
            صدّر بياناتك لحفظها أو انقلها لجهاز آخر
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExport}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              <Download size={20} />
              تصدير البيانات
            </button>
            
            <button
              onClick={handleImport}
              disabled={importing}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              {importing ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  جاري الاستيراد...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  استيراد البيانات
                </>
              )}
            </button>
          </div>

          {lastSync && (
            <p className="text-xs text-gray-500 mt-4">
              آخر تحديث: {new Date(lastSync).toLocaleString('ar-SA')}
            </p>
          )}
        </div>

        {/* Contact Settings */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">بيانات التواصل</h2>

          <div className="space-y-6">
            {/* WhatsApp */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MessageCircle size={18} className="text-green-500" />
                رقم واتساب
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="966500000000"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                أدخل الرقم مع رمز الدولة بدون +
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail size={18} className="text-gray-500" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="support@lifqora.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
        </form>

        {/* Social Media Settings */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">روابط التواصل الاجتماعي</h2>

          <div className="space-y-6">
            {/* Instagram */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                رابط انستغرام
              </label>
              <input
                type="url"
                value={formData.instagramLink}
                onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
                placeholder="https://instagram.com/username"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            {/* TikTok */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                رابط تيك توك
              </label>
              <input
                type="url"
                value={formData.tiktokLink}
                onChange={(e) => setFormData({ ...formData, tiktokLink: e.target.value })}
                placeholder="https://tiktok.com/@username"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              <Save size={20} />
              حفظ الإعدادات
            </button>
            {saved && (
              <span className="flex items-center gap-2 text-green-600">
                <Check size={20} />
                تم الحفظ بنجاح
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
