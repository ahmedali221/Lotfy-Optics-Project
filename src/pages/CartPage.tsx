import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CheckoutButton } from '../components/ui/checkout-button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CartPage() {
  const { language } = useLanguage();
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-16 px-4">
          <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="mb-4">{language === 'ar' ? 'السلة فارغة' : 'Your Cart is Empty'}</h2>
          <p className="text-muted-foreground mb-8">
            {language === 'ar'
              ? 'ابدأ التسوق الآن واضف منتجاتك المفضلة'
              : 'Start shopping now and add your favorite products'
            }
          </p>
          <Link to="/">
            <Button size="lg">
              {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2">
            {language === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' ? `لديك ${items.length} منتج في السلة` : `You have ${items.length} items in your cart`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-border p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-background">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name[language]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="line-clamp-2 hover:text-primary transition-colors">
                            {item.name[language]}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                          {item.brand && <span>{item.brand}</span>}
                          {item.frameColor && (
                            <>
                              <span>•</span>
                              <span>{language === 'ar' ? 'اللون:' : 'Color:'} {item.frameColor}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-background rounded-lg text-destructive transition-colors"
                        aria-label={language === 'ar' ? 'حذف' : 'Remove'}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 min-w-[60px] text-center border-x border-border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="p-2 hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-end">
                        <p className="text-lg font-bold text-primary">
                          {item.price * item.quantity} {language === 'ar' ? 'جنيه' : 'EGP'}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            {item.price} {language === 'ar' ? 'جنيه / قطعة' : 'EGP each'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Stock Warning */}
                    {item.stock < 10 && (
                      <p className="text-xs text-orange-600 mt-2">
                        {language === 'ar' 
                          ? `متبقي ${item.stock} فقط في المخزون`
                          : `Only ${item.stock} left in stock`
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (confirm(language === 'ar' ? 'هل تريد تفريغ السلة؟' : 'Clear all items from cart?')) {
                    clearCart();
                  }
                }}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 me-2" />
                {language === 'ar' ? 'تفريغ السلة' : 'Clear Cart'}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <h3 className="mb-4">{language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}
                  </span>
                  <span className="font-medium">
                    {subtotal} {language === 'ar' ? 'جنيه' : 'EGP'}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'ar' ? 'الشحن' : 'Shipping'}
                  </span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">{language === 'ar' ? 'مجاني' : 'Free'}</span>
                    ) : (
                      `${shipping} ${language === 'ar' ? 'جنيه' : 'EGP'}`
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar'
                      ? `أضف ${500 - subtotal} جنيه للحصول على شحن مجاني`
                      : `Add ${500 - subtotal} EGP for free shipping`
                    }
                  </p>
                )}

                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                    <span className="font-bold text-primary text-xl">
                      {total} {language === 'ar' ? 'جنيه' : 'EGP'}
                    </span>
                  </div>
                </div>
              </div>

              <CheckoutButton onClick={() => navigate('/checkout')} />

              <Link to="/">
                <Button variant="outline" className="w-full">
                  {language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{language === 'ar' ? 'دفع آمن ومشفر' : 'Secure & Encrypted Payment'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{language === 'ar' ? 'حق الاسترجاع مضمون خلال 14 يوم (العميل يتحمل مصاريف الشحن)' : '14-Day Return Guaranteed (Customer Pays Shipping)'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{language === 'ar' ? 'ضمان أصالة المنتجات' : 'Authentic Products Guarantee'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}