import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  MoreVertical,
  X
} from 'lucide-react';

export function AdminProductsPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Sample products data
  const [products, setProducts] = useState([
    {
      id: 'P001',
      nameAr: 'نظارة شمسية Ray-Ban كلاسيك',
      nameEn: 'Ray-Ban Classic Sunglasses',
      category: 'sunglasses',
      brand: 'Ray-Ban',
      price: 850,
      stock: 25,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop',
    },
    {
      id: 'P002',
      nameAr: 'نظارة طبية Gucci فاخرة',
      nameEn: 'Gucci Luxury Eyeglasses',
      category: 'eyeglasses',
      brand: 'Gucci',
      price: 1200,
      stock: 15,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=200&fit=crop',
    },
    {
      id: 'P003',
      nameAr: 'عدسات لاصقة يومية',
      nameEn: 'Daily Contact Lenses',
      category: 'contacts',
      brand: 'Acuvue',
      price: 350,
      stock: 100,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=200&h=200&fit=crop',
    },
    {
      id: 'P004',
      nameAr: 'نظارة أطفال Disney',
      nameEn: 'Disney Kids Glasses',
      category: 'eyeglasses',
      brand: 'Disney',
      price: 380,
      stock: 30,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1593194777536-e155e6d100b2?w=200&h=200&fit=crop',
    },
  ]);

  const categories = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'sunglasses', labelAr: 'نظارات شمسية', labelEn: 'Sunglasses' },
    { id: 'eyeglasses', labelAr: 'نظارات طبية', labelEn: 'Eyeglasses' },
    { id: 'contacts', labelAr: 'عدسات لاصقة', labelEn: 'Contact Lenses' },
  ];

  const handleDeleteProduct = (id: string) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              {language === 'ar' ? 'إدارة المنتجات' : 'Products Management'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'إدارة جميع المنتجات والمخزون' : 'Manage all products and inventory'}
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>{language === 'ar' ? 'إضافة منتج' : 'Add Product'}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'ar' ? 'البحث عن منتج...' : 'Search products...'}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-64">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {language === 'ar' ? cat.labelAr : cat.labelEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'المنتج' : 'Product'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'التصنيف' : 'Category'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'الماركة' : 'Brand'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'السعر' : 'Price'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'المخزون' : 'Stock'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={language === 'ar' ? product.nameAr : product.nameEn}
                          className="w-12 h-12 rounded-lg object-cover border border-border"
                        />
                        <div>
                          <p className="font-medium text-secondary">
                            {language === 'ar' ? product.nameAr : product.nameEn}
                          </p>
                          <p className="text-xs text-muted-foreground">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      {categories.find(c => c.id === product.category)?.[language === 'ar' ? 'labelAr' : 'labelEn']}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">{product.brand}</td>
                    <td className="px-6 py-4 text-sm font-medium text-secondary">
                      {product.price} {language === 'ar' ? 'ج.م' : 'EGP'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        product.stock > 20 
                          ? 'bg-green-100 text-green-700' 
                          : product.stock > 10 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 border border-green-200">
                        {language === 'ar' ? 'نشط' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowEditModal(true);
                          }}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title={language === 'ar' ? 'تعديل' : 'Edit'}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title={language === 'ar' ? 'حذف' : 'Delete'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                {language === 'ar' ? 'لا توجد منتجات' : 'No products found'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? `عرض ${filteredProducts.length} من ${products.length} منتج`
              : `Showing ${filteredProducts.length} of ${products.length} products`
            }
          </p>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary">
                {language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-secondary">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    {language === 'ar' ? 'الاسم بالعربية' : 'Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    {language === 'ar' ? 'الاسم بالإنجليزية' : 'Name (English)'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    {language === 'ar' ? 'التصنيف' : 'Category'}
                  </label>
                  <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {language === 'ar' ? cat.labelAr : cat.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    {language === 'ar' ? 'الماركة' : 'Brand'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    {language === 'ar' ? 'السعر' : 'Price'}
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    {language === 'ar' ? 'الكمية' : 'Stock'}
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {language === 'ar' ? 'إضافة' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
