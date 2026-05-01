import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Star, X, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../data/store';

const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fullDescription: '',
    price: '',
    originalPrice: '',
    category: '',
    image: '',
    features: '',
    deliveryMethod: '',
    notes: '',
    featured: false
  });

  // Compress image before saving
  const compressImage = (file: File, maxSize = 500, quality = 0.9): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          
          // Get original dimensions
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions - keep aspect ratio
          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          
          // Enable high quality rendering
          ctx!.imageSmoothingEnabled = true;
          ctx!.imageSmoothingQuality = 'high';
          
          // Draw the image with new dimensions
          ctx!.drawImage(img, 0, 0, width, height);

          // Convert to compressed JPEG
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  // Handle single image upload (for main image)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً. الحد الأقصى 10 ميجا');
        return;
      }

      try {
        const compressedImage = await compressImage(file);
        setFormData({ ...formData, image: compressedImage });
        setImagePreview(compressedImage);
        // Also add to images array if not already there
        if (!images.includes(compressedImage)) {
          setImages(prev => [compressedImage, ...prev.filter(img => img !== compressedImage)]);
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('حدث خطأ أثناء معالجة الصورة');
      }
    }
  };

  // Handle multiple images upload
  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      
      for (let i = 0; i < Math.min(files.length, 5); i++) {
        const file = files[i];
        if (file.size > 10 * 1024 * 1024) {
          alert(`الصورة ${file.name} كبيرة جداً`);
          continue;
        }
        
        try {
          const compressed = await compressImage(file);
          newImages.push(compressed);
        } catch (error) {
          console.error('Error compressing image:', error);
        }
      }

      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
      
      // Set first image as main if no main image
      if (!formData.image && newImages.length > 0) {
        setFormData(prev => ({ ...prev, image: newImages[0] }));
        setImagePreview(newImages[0]);
      }
    }
  };

  // Remove image from array
  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    
    // Update main image if removed
    if (images[index] === formData.image) {
      setFormData(prev => ({ ...prev, image: newImages[0] || '' }));
      setImagePreview(newImages[0] || '');
    }
  };

  // Set image as main
  const setAsMainImage = (img: string) => {
    setFormData(prev => ({ ...prev, image: img }));
    setImagePreview(img);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      fullDescription: '',
      price: '',
      originalPrice: '',
      category: '',
      image: '',
      features: '',
      deliveryMethod: '',
      notes: '',
      featured: false
    });
    setEditingProduct(null);
    setImagePreview('');
    setImages([]);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      fullDescription: product.fullDescription,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      image: product.image,
      features: product.features.join('\n'),
      deliveryMethod: product.deliveryMethod,
      notes: product.notes.join('\n'),
      featured: product.featured
    });
    setImagePreview(product.image);
    setImages(product.images || [product.image]);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mainImage = formData.image || images[0] || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop';
    const allImages = images.length > 0 ? images : [mainImage];

    const productData = {
      name: formData.name,
      description: formData.description,
      fullDescription: formData.fullDescription,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      image: mainImage,
      images: allImages,
      features: formData.features.split('\n').filter(f => f.trim()),
      deliveryMethod: formData.deliveryMethod,
      notes: formData.notes.split('\n').filter(n => n.trim()),
      featured: formData.featured
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            المنتجات
          </h1>
          <p className="text-gray-600">
            إدارة جميع المنتجات في المتجر
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
        >
          <Plus size={20} />
          <span>إضافة منتج</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="بحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="">جميع التصنيفات</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-right border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-medium text-gray-500">المنتج</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">التصنيف</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">السعر</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">مميز</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="font-medium text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through block">${product.originalPrice}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.featured ? (
                      <Star size={18} className="text-yellow-500 fill-yellow-500" />
                    ) : (
                      <Star size={18} className="text-gray-300" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            لا توجد منتجات
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التصنيف *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر ($) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر الأصلي ($)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف المختصر *</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف الكامل *</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صور المنتج (الحد الأقصى 5 صور)
                </label>
                
                {/* Images Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <div className={`aspect-square bg-gray-100 rounded-xl border-2 overflow-hidden flex items-center justify-center ${
                          img === formData.image ? 'border-gray-900' : 'border-gray-200'
                        }`}>
                          <img
                            src={img}
                            alt={`صورة ${index + 1}`}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23f3f4f6" width="80" height="80"/%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                        
                        {/* Main Image Badge */}
                        {img === formData.image && (
                          <div className="absolute top-1 left-1 bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded">
                            رئيسية
                          </div>
                        )}
                        
                        {/* Actions */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                          {img !== formData.image && (
                            <button
                              type="button"
                              onClick={() => setAsMainImage(img)}
                              className="p-1.5 bg-white rounded-lg text-gray-700 hover:bg-gray-100"
                              title="تعيين كصورة رئيسية"
                            >
                              <Star size={14} />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600"
                            title="حذف"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Buttons */}
                {images.length < 5 && (
                  <div className="space-y-3">
                    <label className="flex items-center justify-center gap-2 px-4 py-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="text-gray-600 font-medium">
                        {images.length === 0 ? 'إضافة صور' : `إضافة المزيد (${5 - images.length} متبقية)`}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleMultipleImagesUpload}
                        className="hidden"
                      />
                    </label>
                    
                    <div className="text-center text-sm text-gray-400">أو</div>
                    
                    {/* URL Input */}
                    <div className="flex gap-2">
                      <input
                        type="url"
                        id="imageUrlInput"
                        placeholder="أدخل رابط الصورة https://..."
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            if (input.value) {
                              setImages(prev => [...prev, input.value].slice(0, 5));
                              if (!formData.image) {
                                setFormData(prev => ({ ...prev, image: input.value }));
                                setImagePreview(input.value);
                              }
                              input.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('imageUrlInput') as HTMLInputElement;
                          if (input.value) {
                            setImages(prev => [...prev, input.value].slice(0, 5));
                            if (!formData.image) {
                              setFormData(prev => ({ ...prev, image: input.value }));
                              setImagePreview(input.value);
                            }
                            input.value = '';
                          }
                        }}
                        className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        إضافة
                      </button>
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-3">
                  📐 المقاس المفضل: 500 × 500 بكسل | الحد الأقصى: 5 صور | اضغط على الصورة لتعيينها كصورة رئيسية
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المميزات (كل ميزة في سطر)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={3}
                  placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">طريقة الاستلام *</label>
                <input
                  type="text"
                  value={formData.deliveryMethod}
                  onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات (كل ملاحظة في سطر)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  placeholder="ملاحظة 1&#10;ملاحظة 2"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  منتج مميز (يظهر في الصفحة الرئيسية)
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
                >
                  <Check size={20} />
                  {editingProduct ? 'حفظ التغييرات' : 'إضافة المنتج'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">حذف المنتج</h3>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                حذف
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
