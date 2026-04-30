import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { resolveImageUrl } from '../components/products/ApiProductCard';

export function CartPage() {
  const { language } = useLanguage();
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-16 px-4">
          <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="mb-4">{t('السلة فارغة', 'Your Cart is Empty')}</h2>
          <p className="text-muted-foreground mb-8">
            {t('ابدأ التسوق الآن واضف منتجاتك المفضلة', 'Start shopping now and add your favorite products')}
          </p>
          <Link to="/eyeglasses">
            <Button size="lg">{t('تصفح المنتجات', 'Browse Products')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2">{t('سلة التسوق', 'Shopping Cart')}</h1>
          <p className="text-muted-foreground">
            {t(`لديك ${items.length} منتج في السلة`, `You have ${items.length} item${items.length !== 1 ? 's' : ''} in your cart`)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product: item, quantity }) => (
              <div key={item.id} className="bg-white rounded-lg border border-border p-4">
                <div className="flex gap-4">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-background">
                      {item.image ? (
                        <img src={resolveImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">👓</div>
                      )}
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="line-clamp-2 hover:text-primary transition-colors text-sm font-semibold">{item.name}</h3>
                        </Link>
                        {item.brand && (
                          <p className="text-xs text-muted-foreground mt-1">{item.brand.name}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-background rounded-lg text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQuantity(item.id, quantity - 1)} disabled={quantity <= 1} className="p-2 hover:bg-background disabled:opacity-50">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 min-w-[50px] text-center border-x border-border">{quantity}</span>
                        <button onClick={() => updateQuantity(item.id, quantity + 1)} disabled={quantity >= item.stock_quantity} className="p-2 hover:bg-background disabled:opacity-50">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-end">
                        <p className="text-lg font-bold text-primary">
                          {(parseFloat(item.price) * quantity).toLocaleString()} {t('جنيه', 'EGP')}
                        </p>
                        {quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            {parseFloat(item.price).toLocaleString()} {t('جنيه / قطعة', 'EGP each')}
                          </p>
                        )}
                      </div>
                    </div>

                    {item.stock_quantity <= 5 && item.stock_quantity > 0 && (
                      <p className="text-xs text-orange-600 mt-2">
                        {t(`متبقي ${item.stock_quantity} فقط`, `Only ${item.stock_quantity} left`)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Button
                variant="outline"
                onClick={() => { if (confirm(t('هل تريد تفريغ السلة؟', 'Clear all items from cart?'))) clearCart(); }}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 me-2" />
                {t('تفريغ السلة', 'Clear Cart')}
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <h3 className="mb-4">{t('ملخص الطلب', 'Order Summary')}</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('المجموع الفرعي', 'Subtotal')}</span>
                  <span className="font-medium">{subtotal.toLocaleString()} {t('جنيه', 'EGP')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('الشحن', 'Shipping')}</span>
                  <span className="font-medium">
                    {shipping === 0
                      ? <span className="text-green-600">{t('مجاني', 'Free')}</span>
                      : `${shipping} ${t('جنيه', 'EGP')}`
                    }
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t(`أضف ${500 - Math.round(subtotal)} جنيه للشحن المجاني`, `Add ${500 - Math.round(subtotal)} EGP for free shipping`)}
                  </p>
                )}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">{t('الإجمالي', 'Total')}</span>
                    <span className="font-bold text-primary text-xl">{total.toLocaleString()} {t('جنيه', 'EGP')}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mb-3" size="lg" onClick={() => navigate('/checkout')}>
                {t('إتمام الشراء', 'Proceed to Checkout')}
              </Button>
              <Link to="/eyeglasses">
                <Button variant="outline" className="w-full">{t('متابعة التسوق', 'Continue Shopping')}</Button>
              </Link>

              <div className="mt-6 pt-6 border-t border-border space-y-3 text-xs text-muted-foreground">
                {[
                  t('دفع آمن ومشفر', 'Secure & Encrypted Payment'),
                  t('حق الاسترجاع مضمون خلال 14 يوم', '14-Day Return Guaranteed'),
                  t('ضمان أصالة المنتجات', 'Authentic Products Guarantee'),
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{badge}</span>
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
