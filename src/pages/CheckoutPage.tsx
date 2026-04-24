import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { ArrowRight, ArrowLeft, CreditCard, Smartphone, Banknote, MapPin, User, Phone, Mail, Home } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

// Shipping prices by governorate
const SHIPPING_PRICES: { [key: string]: number } = {
  'القاهرة': 50,
  'الجيزة': 50,
  'القليوبية': 50,
  'الإسكندرية': 70,
  'الدقهلية': 70,
  'الشرقية': 70,
  'المنوفية': 70,
  'الغربية': 70,
  'كفر الشيخ': 80,
  'دمياط': 80,
  'بورسعيد': 80,
  'الإسماعيلية': 80,
  'السويس': 80,
  'البحيرة': 80,
  'الفيوم': 80,
  'بني سويف': 80,
  'المنيا': 90,
  'أسيوط': 90,
  'سوهاج': 100,
  'قنا': 100,
  'الأقصر': 100,
  'أسوان': 110,
  'البحر الأحمر': 110,
  'الوادي الجديد': 110,
  'مطروح': 110,
  'شمال سيناء': 120,
  'جنوب سيناء': 120,
};

const GOVERNORATES = Object.keys(SHIPPING_PRICES);

export function CheckoutPage() {
  const { language } = useLanguage();
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<'info' | 'payment' | 'confirm'>('info');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'vodafone' | 'cash'>('cash');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    phone2: '',
    email: '',
    governorate: '',
    city: '',
    address: '',
    notes: '',
  });

  // Payment state
  const [paymentData, setPaymentData] = useState({
    vodafoneNumber: '',
    depositPaid: false,
  });

  // Calculate totals
  const subtotal = getTotal();
  const shippingCost = formData.governorate ? SHIPPING_PRICES[formData.governorate] : 0;
  const deposit = paymentMethod === 'cash' ? 100 : 0;
  const total = subtotal + shippingCost;
  const amountToPay = paymentMethod === 'cash' ? deposit : total;
  const amountOnDelivery = paymentMethod === 'cash' ? total - deposit : 0;

  // Validation
  const isInfoValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.governorate !== '' &&
      formData.city.trim() !== '' &&
      formData.address.trim() !== ''
    );
  };

  const isPaymentValid = () => {
    if (paymentMethod === 'vodafone') {
      return paymentData.vodafoneNumber.trim() !== '';
    }
    if (paymentMethod === 'cash') {
      return paymentData.depositPaid;
    }
    return true; // Bank transfer
  };

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (step === 'info') {
      if (!isInfoValid()) {
        toast.error(language === 'ar' ? 'يرجى إكمال جميع الحقول المطلوبة' : 'Please complete all required fields');
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      if (!isPaymentValid()) {
        toast.error(language === 'ar' ? 'يرجى إكمال معلومات الدفع' : 'Please complete payment information');
        return;
      }
      setStep('confirm');
    }
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and show success
    clearCart();
    toast.success(language === 'ar' ? 'تم تأكيد طلبك بنجاح!' : 'Your order has been confirmed successfully!');
    
    setIsProcessing(false);
    navigate('/');
  };

  // Redirect to cart if no items
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  // Don't render if cart is empty
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">{language === 'ar' ? 'إتمام الشراء' : 'Checkout'}</h1>
          <div className="flex items-center gap-4 mt-4">
            <div className={`flex items-center gap-2 ${step === 'info' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'info' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="text-sm hidden sm:inline">{language === 'ar' ? 'معلومات الشحن' : 'Shipping Info'}</span>
            </div>
            <div className="flex-1 h-px bg-gray-300" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm hidden sm:inline">{language === 'ar' ? 'طريقة الدفع' : 'Payment'}</span>
            </div>
            <div className="flex-1 h-px bg-gray-300" />
            <div className={`flex items-center gap-2 ${step === 'confirm' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirm' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="text-sm hidden sm:inline">{language === 'ar' ? 'تأكيد الطلب' : 'Confirmation'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            {step === 'info' && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="mb-6">{language === 'ar' ? 'معلومات الشحن' : 'Shipping Information'}</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <User className="w-4 h-4 inline me-1" />
                        {language === 'ar' ? 'الاسم بالكامل' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Phone className="w-4 h-4 inline me-1" />
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="01xxxxxxxxx"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Phone className="w-4 h-4 inline me-1" />
                      {language === 'ar' ? 'رقم هاتف آخر' : 'Alternative Phone Number'} ({language === 'ar' ? 'اختياري' : 'optional'})
                    </label>
                    <input
                      type="tel"
                      name="phone2"
                      value={formData.phone2}
                      onChange={handleInputChange}
                      placeholder="01xxxxxxxxx"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 inline me-1" />
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} ({language === 'ar' ? 'اختياري' : 'optional'})
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <MapPin className="w-4 h-4 inline me-1" />
                        {language === 'ar' ? 'المحافظة' : 'Governorate'} *
                      </label>
                      <select
                        name="governorate"
                        value={formData.governorate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">{language === 'ar' ? 'اختر المحافظة' : 'Select Governorate'}</option>
                        {GOVERNORATES.map((gov) => (
                          <option key={gov} value={gov}>
                            {gov}
                          </option>
                        ))}
                      </select>
                      {formData.governorate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {language === 'ar' ? 'رسوم الشحن:' : 'Shipping:'} {SHIPPING_PRICES[formData.governorate]} {language === 'ar' ? 'جنيه' : 'EGP'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Home className="w-4 h-4 inline me-1" />
                        {language === 'ar' ? 'المدينة' : 'City'} *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'ar' ? 'العنوان بالتفصيل' : 'Detailed Address'} *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder={language === 'ar' ? 'الشارع، رقم المبنى، الدور، الشقة...' : 'Street, Building No., Floor, Apartment...'}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'} ({language === 'ar' ? 'اختياري' : 'optional'})
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 'payment' && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="mb-6">{language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</h2>

                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <label
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Banknote className="w-5 h-5 text-primary" />
                          <span className="font-medium">{language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {language === 'ar'
                            ? 'ادفع عربون 100 جنيه الآن، والباقي عند استلام المنتج'
                            : 'Pay 100 EGP deposit now, remaining on delivery'}
                        </p>
                        {paymentMethod === 'cash' && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>{language === 'ar' ? 'العربون المطلوب:' : 'Required Deposit:'}</span>
                              <span className="font-bold text-primary">100 {language === 'ar' ? 'جنيه' : 'EGP'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>{language === 'ar' ? 'المتبقي عند الاستلام:' : 'Remaining on Delivery:'}</span>
                              <span className="font-bold">{amountOnDelivery} {language === 'ar' ? 'جنيه' : 'EGP'}</span>
                            </div>
                            <div className="pt-3 border-t border-amber-200">
                              <p className="text-xs text-muted-foreground mb-3">
                                {language === 'ar'
                                  ? 'يرجى تحويل العربون إلى أحد الحسابات التالية:'
                                  : 'Please transfer the deposit to one of the following accounts:'}
                              </p>
                              <div className="space-y-2 text-xs">
                                <div className="bg-white rounded p-2">
                                  <strong>{language === 'ar' ? 'فودافون كاش:' : 'Vodafone Cash:'}</strong> 01012345678
                                </div>
                                <div className="bg-white rounded p-2">
                                  <strong>{language === 'ar' ? 'البنك الأهلي المصري:' : 'National Bank of Egypt:'}</strong> 1234567890123456
                                </div>
                              </div>
                              <label className="flex items-center gap-2 mt-4">
                                <input
                                  type="checkbox"
                                  checked={paymentData.depositPaid}
                                  onChange={(e) => setPaymentData({ ...paymentData, depositPaid: e.target.checked })}
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">
                                  {language === 'ar' ? 'تم دفع العربون' : 'Deposit has been paid'}
                                </span>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>

                  {/* Vodafone Cash */}
                  <label
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'vodafone' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="vodafone"
                        checked={paymentMethod === 'vodafone'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Smartphone className="w-5 h-5 text-red-600" />
                          <span className="font-medium">{language === 'ar' ? 'فودافون كاش' : 'Vodafone Cash'}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {language === 'ar' ? 'ادفع المبلغ كاملاً عبر فودافون كاش' : 'Pay full amount via Vodafone Cash'}
                        </p>
                        {paymentMethod === 'vodafone' && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
                            <p className="text-sm text-muted-foreground">
                              {language === 'ar'
                                ? `قم بتحويل ${total} جنيه إلى: 01012345678`
                                : `Transfer ${total} EGP to: 01012345678`}
                            </p>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {language === 'ar' ? 'رقم فودافون كاش الخاص بك' : 'Your Vodafone Cash Number'}
                              </label>
                              <input
                                type="tel"
                                value={paymentData.vodafoneNumber}
                                onChange={(e) => setPaymentData({ ...paymentData, vodafoneNumber: e.target.value })}
                                placeholder="01xxxxxxxxx"
                                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {language === 'ar' ? 'ادفع المبلغ كاملاً عبر التحويل البنكي' : 'Pay full amount via bank transfer'}
                        </p>
                        {paymentMethod === 'bank' && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
                            <p className="font-medium">{language === 'ar' ? 'بيانات الحساب البنكي:' : 'Bank Account Details:'}</p>
                            <div className="space-y-1">
                              <p><strong>{language === 'ar' ? 'البنك:' : 'Bank:'}</strong> {language === 'ar' ? 'البنك الأهلي المصري' : 'National Bank of Egypt'}</p>
                              <p><strong>{language === 'ar' ? 'رقم الحساب:' : 'Account Number:'}</strong> 1234567890123456</p>
                              <p><strong>{language === 'ar' ? 'اسم صاحب الحساب:' : 'Account Name:'}</strong> LOTFY OPTICAL</p>
                              <p><strong>{language === 'ar' ? 'المبلغ المطلوب:' : 'Required Amount:'}</strong> {total} {language === 'ar' ? 'جنيه' : 'EGP'}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 'confirm' && (
              <div className="space-y-6">
                {/* Shipping Info Review */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3>{language === 'ar' ? 'معلومات الشحن' : 'Shipping Information'}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setStep('info')}>
                      {language === 'ar' ? 'تعديل' : 'Edit'}
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>{language === 'ar' ? 'الاسم:' : 'Name:'}</strong> {formData.fullName}</p>
                    <p><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong> {formData.phone}</p>
                    {formData.phone2 && <p><strong>{language === 'ar' ? 'هاتف آخر:' : 'Alternative Phone:'}</strong> {formData.phone2}</p>}
                    {formData.email && <p><strong>{language === 'ar' ? 'البريد:' : 'Email:'}</strong> {formData.email}</p>}
                    <p><strong>{language === 'ar' ? 'العنوان:' : 'Address:'}</strong> {formData.address}, {formData.city}, {formData.governorate}</p>
                    {formData.notes && <p><strong>{language === 'ar' ? 'ملاحظات:' : 'Notes:'}</strong> {formData.notes}</p>}
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3>{language === 'ar' ? 'طريقة الدع' : 'Payment Method'}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setStep('payment')}>
                      {language === 'ar' ? 'تعديل' : 'Edit'}
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    {paymentMethod === 'cash' && (
                      <>
                        <Banknote className="w-6 h-6 text-primary" />
                        <div>
                          <p className="font-medium">{language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</p>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? `عربون: 100 جنيه | المتبقي: ${amountOnDelivery} جنيه` : `Deposit: 100 EGP | Remaining: ${amountOnDelivery} EGP`}
                          </p>
                        </div>
                      </>
                    )}
                    {paymentMethod === 'vodafone' && (
                      <>
                        <Smartphone className="w-6 h-6 text-red-600" />
                        <div>
                          <p className="font-medium">{language === 'ar' ? 'فودافون كاش' : 'Vodafone Cash'}</p>
                          <p className="text-sm text-muted-foreground">{paymentData.vodafoneNumber}</p>
                        </div>
                      </>
                    )}
                    {paymentMethod === 'bank' && (
                      <>
                        <CreditCard className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-medium">{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</p>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'البنك الأهلي المصري' : 'National Bank of Egypt'}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="mb-4">{language === 'ar' ? 'المنتجات' : 'Order Items'} ({items.length})</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="w-16 h-16 rounded overflow-hidden bg-background flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name[language]}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium line-clamp-1">{item.name[language]}</p>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'الكمية:' : 'Qty:'} {item.quantity}
                          </p>
                        </div>
                        <div className="text-end">
                          <p className="font-medium text-primary">{item.price * item.quantity} {language === 'ar' ? 'جنيه' : 'EGP'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">{language === 'ar' ? 'ملاحظات هامة:' : 'Important Notes:'}</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>{language === 'ar' ? 'سيتم التواصل معك خلال 24 ساعة لتأكيد الطلب' : 'We will contact you within 24 hours to confirm your order'}</li>
                    <li>{language === 'ar' ? 'مدة التوصيل من 3-7 أيام عمل حسب المحافظة' : 'Delivery time is 3-7 business days depending on governorate'}</li>
                    {paymentMethod === 'cash' && (
                      <li>{language === 'ar' ? 'سيتم خصم العربون من المبلغ الإجمالي عند الاستلام' : 'Deposit will be deducted from total amount on delivery'}</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {step !== 'info' && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step === 'payment' ? 'info' : 'payment')}
                  className="flex-1"
                >
                  <ArrowLeft className={`w-5 h-5 ${language === 'ar' ? 'ms-2 rotate-180' : 'me-2'}`} />
                  {language === 'ar' ? 'السابق' : 'Previous'}
                </Button>
              )}
              
              {step !== 'confirm' ? (
                <Button onClick={handleNextStep} className="flex-1">
                  {language === 'ar' ? 'التالي' : 'Next'}
                  <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'me-2 rotate-180' : 'ms-2'}`} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  className="flex-1"
                  size="lg"
                >
                  {isProcessing
                    ? (language === 'ar' ? 'جاري المعالجة...' : 'Processing...')
                    : (language === 'ar' ? 'تأكيد الطلب' : 'Confirm Order')
                  }
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <h3 className="mb-4">{language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'ar' ? `المنتجات (${items.length})` : `Items (${items.length})`}
                  </span>
                  <span className="font-medium">{subtotal} {language === 'ar' ? 'جنيه' : 'EGP'}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{language === 'ar' ? 'الشحن' : 'Shipping'}</span>
                  <span className="font-medium">
                    {shippingCost > 0 ? `${shippingCost} ${language === 'ar' ? 'جنيه' : 'EGP'}` : '-'}
                  </span>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                    <span className="font-bold text-xl text-primary">{total} {language === 'ar' ? 'جنيه' : 'EGP'}</span>
                  </div>

                  {paymentMethod === 'cash' && step !== 'info' && (
                    <div className="mt-3 pt-3 border-t border-border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{language === 'ar' ? 'المطلوب الآن:' : 'Pay Now:'}</span>
                        <span className="font-bold text-green-600">100 {language === 'ar' ? 'جنيه' : 'EGP'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{language === 'ar' ? 'عند الاستلام:' : 'On Delivery:'}</span>
                        <span className="font-bold">{amountOnDelivery} {language === 'ar' ? 'جنيه' : 'EGP'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{language === 'ar' ? 'دفع آمن 100%' : '100% Secure Payment'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{language === 'ar' ? 'حق الاسترجاع مضمون خلال 14 يوم (العميل يتحمل مصاريف الشحن)' : '14-Day Return Guaranteed (Customer Pays Shipping)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{language === 'ar' ? 'ضمان أصالة المنتجات' : 'Authentic Products'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}