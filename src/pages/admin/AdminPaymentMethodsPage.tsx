import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';
import { Plus, Edit, Trash2, CreditCard, DollarSign, Smartphone, X, ToggleLeft, ToggleRight } from 'lucide-react';

export function AdminPaymentMethodsPage() {
  const { language } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'pm-1',
      nameAr: 'بطاقة ائتمان',
      nameEn: 'Credit Card',
      type: 'credit_card',
      icon: 'CreditCard',
      enabled: true,
      processingFee: 2.5,
      description: { ar: 'الدفع بواسطة البطاقات الائتمانية', en: 'Pay using credit cards' },
    },
    {
      id: 'pm-2',
      nameAr: 'فودافون كاش',
      nameEn: 'Vodafone Cash',
      type: 'vodafone_cash',
      icon: 'Smartphone',
      enabled: true,
      processingFee: 0,
      phone: '01012345678',
      description: { ar: 'الدفع عبر محفظة فودافون كاش', en: 'Pay via Vodafone Cash wallet' },
    },
    {
      id: 'pm-3',
      nameAr: 'الدفع عند الاستلام',
      nameEn: 'Cash on Delivery',
      type: 'cash',
      icon: 'DollarSign',
      enabled: true,
      processingFee: 0,
      description: { ar: 'الدفع نقداً عند استلام المنتج', en: 'Pay cash when receiving the product' },
    },
    {
      id: 'pm-4',
      nameAr: 'إنستا باي',
      nameEn: 'InstaPay',
      type: 'instapay',
      icon: 'Smartphone',
      enabled: false,
      processingFee: 1.5,
      description: { ar: 'الدفع عبر إنستا باي', en: 'Pay via InstaPay' },
    },
  ]);

  const handleToggleMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => 
      method.id === id ? { ...method, enabled: !method.enabled } : method
    ));
  };

  const handleDeleteMethod = (id: string) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف طريقة الدفع هذه؟' : 'Are you sure you want to delete this payment method?')) {
      setPaymentMethods(paymentMethods.filter(m => m.id !== id));
    }
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      CreditCard,
      Smartphone,
      DollarSign,
    };
    const Icon = icons[iconName] || CreditCard;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              {language === 'ar' ? 'إدارة طرق الدفع' : 'Payment Methods Management'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'إدارة وتفعيل طرق الدفع المتاحة' : 'Manage and activate available payment methods'}
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>{language === 'ar' ? 'إضافة طريقة دفع' : 'Add Payment Method'}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {paymentMethods.filter(m => m.enabled).length}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary">
                  {paymentMethods.filter(m => m.enabled).length}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'طرق دفع نشطة' : 'Active Methods'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {paymentMethods.filter(m => !m.enabled).length}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary">
                  {paymentMethods.filter(m => !m.enabled).length}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'طرق دفع معطلة' : 'Disabled Methods'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary">
                  {paymentMethods.length}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إجمالي الطرق' : 'Total Methods'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all duration-300 ${
                method.enabled 
                  ? 'border-primary/30 hover:shadow-lg' 
                  : 'border-border opacity-60'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    method.enabled ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {getIcon(method.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-secondary">
                      {language === 'ar' ? method.nameAr : method.nameEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {method.description[language]}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleMethod(method.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    method.enabled 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {method.enabled ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between py-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'رسوم المعالجة' : 'Processing Fee'}
                  </span>
                  <span className="text-sm font-medium text-secondary">
                    {method.processingFee > 0 ? `${method.processingFee}%` : language === 'ar' ? 'مجاناً' : 'Free'}
                  </span>
                </div>
                
                {method.phone && (
                  <div className="flex items-center justify-between py-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </span>
                    <span className="text-sm font-medium text-secondary">{method.phone}</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    method.enabled 
                      ? 'bg-green-100 text-green-700 border-green-200' 
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {method.enabled 
                      ? (language === 'ar' ? 'مفعل' : 'Active') 
                      : (language === 'ar' ? 'معطل' : 'Disabled')
                    }
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors font-medium">
                  <Edit className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                </button>
                <button
                  onClick={() => handleDeleteMethod(method.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{language === 'ar' ? 'حذف' : 'Delete'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between rounded-t-xl">
              <h2 className="text-2xl font-bold text-secondary">
                {language === 'ar' ? 'إضافة طريقة دفع جديدة' : 'Add New Payment Method'}
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-secondary">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
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
                  {language === 'ar' ? 'نوع طريقة الدفع' : 'Payment Type'}
                </label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="credit_card">{language === 'ar' ? 'بطاقة ائتمان' : 'Credit Card'}</option>
                  <option value="wallet">{language === 'ar' ? 'محفظة إلكترونية' : 'E-Wallet'}</option>
                  <option value="cash">{language === 'ar' ? 'نقداً' : 'Cash'}</option>
                  <option value="bank_transfer">{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  {language === 'ar' ? 'رسوم المعالجة (%)' : 'Processing Fee (%)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
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
                  {language === 'ar' ? 'إضافة' : 'Add Method'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
