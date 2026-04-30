import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { ArrowRight, ArrowLeft, CreditCard, Smartphone, Banknote, MapPin, User, Phone, Mail, Home, CheckCircle, Loader2, Upload, X, ImageIcon } from 'lucide-react';
import { resolveImageUrl } from '../components/products/ApiProductCard';
import { AuthModal } from '../components/auth/AuthModal';
import { toast } from 'sonner@2.0.3';
import api from '../lib/axios';

const SHIPPING_PRICES: Record<string, number> = {
  'القاهرة': 50, 'الجيزة': 50, 'القليوبية': 50,
  'الإسكندرية': 70, 'الدقهلية': 70, 'الشرقية': 70,
  'المنوفية': 70, 'الغربية': 70, 'كفر الشيخ': 80,
  'دمياط': 80, 'بورسعيد': 80, 'الإسماعيلية': 80,
  'السويس': 80, 'البحيرة': 80, 'الفيوم': 80,
  'بني سويف': 80, 'المنيا': 90, 'أسيوط': 90,
  'سوهاج': 100, 'قنا': 100, 'الأقصر': 100,
  'أسوان': 110, 'البحر الأحمر': 110, 'الوادي الجديد': 110,
  'مطروح': 110, 'شمال سيناء': 120, 'جنوب سيناء': 120,
};

const GOVERNORATES = Object.keys(SHIPPING_PRICES);

export function CheckoutPage() {
  const { language } = useLanguage();
  const { items, getTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const [step, setStep] = useState<'info' | 'payment' | 'confirm'>('info');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'vodafone' | 'cash'>('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', phone: '', phone2: '', email: '',
    governorate: '', city: '', address: '', notes: '',
  });

  const [paymentData, setPaymentData] = useState({
    vodafoneNumber: '', depositPaid: false,
  });

  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);

  const subtotal = getTotal();
  const shippingCost = formData.governorate ? (SHIPPING_PRICES[formData.governorate] ?? 0) : 0;
  const total = subtotal + shippingCost;
  const amountOnDelivery = paymentMethod === 'cash' ? total - 100 : 0;

  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items.length, navigate]);

  if (items.length === 0) return null;

  const isInfoValid = () =>
    formData.fullName.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.governorate !== '' &&
    formData.city.trim() !== '' &&
    formData.address.trim() !== '';

  const isPaymentValid = () => {
    if (!proofFile) return false;
    if (paymentMethod === 'vodafone') return paymentData.vodafoneNumber.trim() !== '';
    if (paymentMethod === 'cash') return paymentData.depositPaid;
    return true;
  };

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
  };

  const removeProof = () => {
    setProofFile(null);
    if (proofPreview) URL.revokeObjectURL(proofPreview);
    setProofPreview(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step === 'info') {
      if (!isInfoValid()) {
        toast.error(t('يرجى إكمال جميع الحقول المطلوبة', 'Please complete all required fields'));
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      if (!isPaymentValid()) {
        toast.error(t('يرجى إكمال معلومات الدفع', 'Please complete payment information'));
        return;
      }
      setStep('confirm');
    }
  };

  // Build notes string containing all shipping / payment info
  const buildNotes = () => {
    const lines = [
      `الاسم: ${formData.fullName}`,
      `الهاتف: ${formData.phone}`,
      formData.phone2 ? `هاتف بديل: ${formData.phone2}` : null,
      formData.email ? `البريد: ${formData.email}` : null,
      `العنوان: ${formData.address}، ${formData.city}، ${formData.governorate}`,
      `الشحن: ${shippingCost} جنيه`,
      `طريقة الدفع: ${paymentMethod === 'cash' ? 'كاش عند الاستلام' : paymentMethod === 'vodafone' ? `فودافون كاش (${paymentData.vodafoneNumber})` : 'تحويل بنكي'}`,
      formData.notes ? `ملاحظات: ${formData.notes}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const placeOrder = async () => {
    setIsProcessing(true);
    try {
      // 1. Sync cart items to BE
      for (const { product, quantity } of items) {
        await api.post('/api/orders/cart-items/', { product: product.id, quantity });
      }
      // 2. Place order
      const { data: order } = await api.post('/api/orders/', { notes: buildNotes() });

      // 3. Upload payment proof
      if (proofFile) {
        const formData = new FormData();
        formData.append('payment_proof', proofFile);
        await api.post(`/api/orders/${order.id}/upload-payment-proof/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      clearCart();
      toast.success(t('تم تأكيد طلبك بنجاح!', 'Your order has been confirmed!'));
      navigate('/');
    } catch {
      toast.error(t('حدث خطأ. يرجى المحاولة مرة أخرى.', 'Something went wrong. Please try again.'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitOrder = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    await placeOrder();
  };

  return (
    <div className="min-h-screen bg-background py-8">
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => { setShowAuthModal(false); placeOrder(); }}
        />
      )}

      <div className="container mx-auto px-4">
        {/* Header + Steps */}
        <div className="mb-8">
          <h1 className="mb-4">{t('إتمام الشراء', 'Checkout')}</h1>
          <div className="flex items-center gap-4">
            {(['info', 'payment', 'confirm'] as const).map((s, idx) => (
              <div key={s} className="flex items-center gap-2">
                {idx > 0 && <div className="flex-1 h-px bg-gray-300 w-8" />}
                <div className={`flex items-center gap-2 ${step === s ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === s ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    {idx + 1}
                  </div>
                  <span className="text-sm hidden sm:inline">
                    {s === 'info' ? t('معلومات الشحن', 'Shipping') : s === 'payment' ? t('الدفع', 'Payment') : t('التأكيد', 'Confirmation')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1: Shipping Info */}
            {step === 'info' && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="mb-6">{t('معلومات الشحن', 'Shipping Information')}</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2"><User className="w-4 h-4 inline me-1" />{t('الاسم بالكامل', 'Full Name')} *</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2"><Phone className="w-4 h-4 inline me-1" />{t('رقم الهاتف', 'Phone Number')} *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="01xxxxxxxxx" required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2"><Phone className="w-4 h-4 inline me-1" />{t('رقم هاتف آخر', 'Alternative Phone')} ({t('اختياري', 'optional')})</label>
                    <input type="tel" name="phone2" value={formData.phone2} onChange={handleInputChange} placeholder="01xxxxxxxxx" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2"><Mail className="w-4 h-4 inline me-1" />{t('البريد الإلكتروني', 'Email')} ({t('اختياري', 'optional')})</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2"><MapPin className="w-4 h-4 inline me-1" />{t('المحافظة', 'Governorate')} *</label>
                      <select name="governorate" value={formData.governorate} onChange={handleInputChange} required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                        <option value="">{t('اختر المحافظة', 'Select Governorate')}</option>
                        {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                      {formData.governorate && (
                        <p className="text-xs text-muted-foreground mt-1">{t('رسوم الشحن:', 'Shipping:')} {SHIPPING_PRICES[formData.governorate]} {t('جنيه', 'EGP')}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2"><Home className="w-4 h-4 inline me-1" />{t('المدينة', 'City')} *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('العنوان بالتفصيل', 'Detailed Address')} *</label>
                    <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} placeholder={t('الشارع، رقم المبنى...', 'Street, Building No...')} required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('ملاحظات', 'Notes')} ({t('اختياري', 'optional')})</label>
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="mb-6">{t('طريقة الدفع', 'Payment Method')}</h2>
                <div className="space-y-4">
                  {/* Cash */}
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <div className="flex items-start gap-3">
                      <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1"><Banknote className="w-5 h-5 text-primary" /><span className="font-medium">{t('الدفع عند الاستلام', 'Cash on Delivery')}</span></div>
                        <p className="text-sm text-muted-foreground">{t('ادفع عربون 100 جنيه الآن، والباقي عند الاستلام', 'Pay 100 EGP deposit now, remaining on delivery')}</p>
                        {paymentMethod === 'cash' && (
                          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>{t('العربون المطلوب:', 'Required Deposit:')}</span>
                              <span className="font-bold text-primary">100 {t('جنيه', 'EGP')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>{t('المتبقي عند الاستلام:', 'Remaining on Delivery:')}</span>
                              <span className="font-bold">{amountOnDelivery} {t('جنيه', 'EGP')}</span>
                            </div>
                            <div className="pt-3 border-t border-amber-200 text-xs space-y-2">
                              <p className="text-muted-foreground">{t('يرجى تحويل العربون إلى:', 'Please transfer the deposit to:')}</p>
                              <div className="bg-white rounded p-2"><strong>{t('فودافون كاش:', 'Vodafone Cash:')} </strong>01012345678</div>
                              <div className="bg-white rounded p-2"><strong>{t('البنك الأهلي:', 'National Bank:')} </strong>1234567890123456</div>
                            </div>
                            <label className="flex items-center gap-2 mt-2">
                              <input type="checkbox" checked={paymentData.depositPaid} onChange={e => setPaymentData({ ...paymentData, depositPaid: e.target.checked })} className="w-4 h-4" />
                              <span className="text-sm">{t('تم دفع العربون', 'Deposit has been paid')}</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>

                  {/* Vodafone */}
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'vodafone' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <div className="flex items-start gap-3">
                      <input type="radio" name="paymentMethod" value="vodafone" checked={paymentMethod === 'vodafone'} onChange={() => setPaymentMethod('vodafone')} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1"><Smartphone className="w-5 h-5 text-red-600" /><span className="font-medium">{t('فودافون كاش', 'Vodafone Cash')}</span></div>
                        <p className="text-sm text-muted-foreground">{t('ادفع المبلغ كاملاً عبر فودافون كاش', 'Pay full amount via Vodafone Cash')}</p>
                        {paymentMethod === 'vodafone' && (
                          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
                            <p className="text-sm text-muted-foreground">{t(`حوّل ${total} جنيه إلى: 01012345678`, `Transfer ${total} EGP to: 01012345678`)}</p>
                            <div>
                              <label className="block text-sm font-medium mb-2">{t('رقم فودافون كاش الخاص بك', 'Your Vodafone Cash Number')}</label>
                              <input type="tel" value={paymentData.vodafoneNumber} onChange={e => setPaymentData({ ...paymentData, vodafoneNumber: e.target.value })} placeholder="01xxxxxxxxx" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>

                  {/* Bank */}
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <div className="flex items-start gap-3">
                      <input type="radio" name="paymentMethod" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1"><CreditCard className="w-5 h-5 text-blue-600" /><span className="font-medium">{t('تحويل بنكي', 'Bank Transfer')}</span></div>
                        <p className="text-sm text-muted-foreground">{t('ادفع المبلغ كاملاً عبر التحويل البنكي', 'Pay full amount via bank transfer')}</p>
                        {paymentMethod === 'bank' && (
                          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1 text-sm">
                            <p><strong>{t('البنك:', 'Bank:')} </strong>{t('البنك الأهلي المصري', 'National Bank of Egypt')}</p>
                            <p><strong>{t('رقم الحساب:', 'Account:')} </strong>1234567890123456</p>
                            <p><strong>{t('المبلغ:', 'Amount:')} </strong>{total} {t('جنيه', 'EGP')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>

                {/* Payment Proof Upload */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-semibold text-secondary mb-1 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-primary" />
                    {t('إثبات الدفع', 'Proof of Payment')}
                    <span className="text-red-500">*</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    {t('يرجى رفع صورة إيصال التحويل أو الدفع لتتمكن من متابعة طلبك', 'Upload a screenshot or photo of your payment receipt to proceed with your order')}
                  </p>

                  {proofPreview ? (
                    <div className="relative inline-block">
                      <img
                        src={proofPreview}
                        alt="proof"
                        className="w-full max-w-xs h-48 object-cover rounded-xl border border-border"
                      />
                      <button
                        type="button"
                        onClick={removeProof}
                        className="absolute -top-2 -end-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow hover:bg-red-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                      <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        {t('اضغط لرفع الصورة', 'Click to upload image')}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProofChange}
                      />
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 'confirm' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3>{t('معلومات الشحن', 'Shipping Info')}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setStep('info')}>{t('تعديل', 'Edit')}</Button>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>{t('الاسم:', 'Name:')} </strong>{formData.fullName}</p>
                    <p><strong>{t('الهاتف:', 'Phone:')} </strong>{formData.phone}</p>
                    {formData.phone2 && <p><strong>{t('هاتف آخر:', 'Alt Phone:')} </strong>{formData.phone2}</p>}
                    <p><strong>{t('العنوان:', 'Address:')} </strong>{formData.address}، {formData.city}، {formData.governorate}</p>
                    {formData.notes && <p><strong>{t('ملاحظات:', 'Notes:')} </strong>{formData.notes}</p>}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3>{t('طريقة الدفع', 'Payment')}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setStep('payment')}>{t('تعديل', 'Edit')}</Button>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {paymentMethod === 'cash' && <><Banknote className="w-5 h-5 text-primary" /><span>{t('كاش عند الاستلام — عربون 100 جنيه', 'Cash on Delivery — 100 EGP deposit')}</span></>}
                    {paymentMethod === 'vodafone' && <><Smartphone className="w-5 h-5 text-red-600" /><span>{t('فودافون كاش', 'Vodafone Cash')} — {paymentData.vodafoneNumber}</span></>}
                    {paymentMethod === 'bank' && <><CreditCard className="w-5 h-5 text-blue-600" /><span>{t('تحويل بنكي', 'Bank Transfer')}</span></>}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="mb-4">{t('المنتجات', 'Items')} ({items.length})</h3>
                  <div className="space-y-4">
                    {items.map(({ product: item, quantity }) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="w-14 h-14 rounded overflow-hidden bg-background flex-shrink-0">
                          {item.image ? (
                            <img src={resolveImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">👓</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{t('الكمية:', 'Qty:')} {quantity}</p>
                        </div>
                        <p className="font-medium text-sm text-primary">{(parseFloat(item.price) * quantity).toLocaleString()} {t('جنيه', 'EGP')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Proof of Payment summary */}
                {proofPreview && (
                  <div className="bg-white rounded-lg border border-border p-6">
                    <h3 className="font-medium text-secondary mb-3 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-primary" />
                      {t('إثبات الدفع', 'Proof of Payment')}
                    </h3>
                    <img src={proofPreview} alt="proof" className="w-40 h-28 object-cover rounded-lg border border-border" />
                  </div>
                )}

                {/* Auth notice */}
                {!isAuthenticated && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                    <p className="font-medium mb-1">{t('تسجيل الدخول مطلوب', 'Login Required')}</p>
                    <p className="text-muted-foreground">{t('ستحتاج إلى تسجيل الدخول أو إنشاء حساب لإتمام الطلب.', 'You will need to sign in or create an account to place your order.')}</p>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                  <p className="font-medium mb-2">{t('ملاحظات هامة:', 'Important Notes:')}</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>{t('سيتم التواصل معك خلال 24 ساعة لتأكيد الطلب', 'We will contact you within 24 hours to confirm')}</li>
                    <li>{t('مدة التوصيل من 3-7 أيام عمل', 'Delivery: 3-7 business days')}</li>
                    {paymentMethod === 'cash' && <li>{t('سيتم خصم العربون من المبلغ الإجمالي عند الاستلام', 'Deposit deducted from total on delivery')}</li>}
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4">
              {step !== 'info' && (
                <Button variant="outline" onClick={() => setStep(step === 'payment' ? 'info' : 'payment')} className="flex-1">
                  <ArrowLeft className={`w-5 h-5 ${language === 'ar' ? 'ms-2 rotate-180' : 'me-2'}`} />
                  {t('السابق', 'Previous')}
                </Button>
              )}
              {step !== 'confirm' ? (
                <Button onClick={handleNextStep} className="flex-1">
                  {t('التالي', 'Next')}
                  <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'me-2 rotate-180' : 'ms-2'}`} />
                </Button>
              ) : (
                <button
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  className="flex-1 relative flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-white font-semibold text-base shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                  style={{ background: isProcessing ? '#8a5010' : 'linear-gradient(135deg, #C07A1A 0%, #A06415 100%)' }}
                >
                  {/* Shimmer animation while processing */}
                  {isProcessing && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
                  )}
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('جارٍ تأكيد الطلب...', 'Placing Order...')}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {t('تأكيد الطلب', 'Confirm Order')}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <h3 className="mb-4">{t('ملخص الطلب', 'Order Summary')}</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t(`المنتجات (${items.length})`, `Items (${items.length})`)}</span>
                  <span className="font-medium">{subtotal.toLocaleString()} {t('جنيه', 'EGP')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('الشحن', 'Shipping')}</span>
                  <span className="font-medium">{shippingCost > 0 ? `${shippingCost} ${t('جنيه', 'EGP')}` : '-'}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">{t('الإجمالي', 'Total')}</span>
                    <span className="font-bold text-xl text-primary">{total.toLocaleString()} {t('جنيه', 'EGP')}</span>
                  </div>
                  {paymentMethod === 'cash' && step !== 'info' && (
                    <div className="mt-3 pt-3 border-t border-border space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('المطلوب الآن:', 'Pay Now:')}</span>
                        <span className="font-bold text-green-600">100 {t('جنيه', 'EGP')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('عند الاستلام:', 'On Delivery:')}</span>
                        <span className="font-bold">{amountOnDelivery} {t('جنيه', 'EGP')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                {[t('دفع آمن 100%', '100% Secure Payment'), t('ضمان أصالة المنتجات', 'Authentic Products')].map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
