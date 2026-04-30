import { useLanguage } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { resolveImageUrl } from '../components/products/ApiProductCard';
import { toast } from 'sonner@2.0.3';

export function WishlistPage() {
  const { language } = useLanguage();
  const { items, removeItem, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const handleAddToCart = (item: typeof items[0]) => {
    addItem(item);
    toast.success(t('تمت الإضافة إلى السلة', 'Added to cart'));
  };

  const handleAddAllToCart = () => {
    items.forEach(item => addItem(item));
    toast.success(t('تمت إضافة جميع المنتجات إلى السلة', 'All items added to cart'));
  };

  const totalValue = items.reduce((sum, item) => sum + parseFloat(item.price), 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <Heart className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="mb-4">{t('قائمة المفضلة فارغة', 'Your Wishlist is Empty')}</h1>
            <p className="text-muted-foreground mb-8">
              {t("لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد", "You haven't added any products to your wishlist yet")}
            </p>
            <Link to="/eyeglasses">
              <Button size="lg">{t('تصفح المنتجات', 'Browse Products')}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2">{t('قائمة المفضلة', 'My Wishlist')}</h1>
          <p className="text-muted-foreground">
            {t(`لديك ${items.length} منتج في قائمة المفضلة`, `You have ${items.length} item${items.length !== 1 ? 's' : ''} in your wishlist`)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0 w-24 h-24 rounded overflow-hidden bg-background">
                    {item.image ? (
                      <img src={resolveImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">👓</div>
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <Link to={`/product/${item.id}`} className="flex-1 min-w-0">
                        <h3 className="font-medium line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
                        {item.brand && <p className="text-sm text-muted-foreground">{item.brand.name}</p>}
                      </Link>
                      <button
                        onClick={() => { toggleItem(item); toast.success(t('تمت الإزالة من المفضلة', 'Removed from wishlist')); }}
                        className="p-2 hover:bg-background rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>

                    <p className="font-bold text-xl text-primary mb-3">
                      {parseFloat(item.price).toLocaleString()} {t('جنيه', 'EGP')}
                    </p>

                    <Button onClick={() => handleAddToCart(item)} size="sm" disabled={item.stock_quantity === 0}>
                      <ShoppingCart className={`w-4 h-4 ${language === 'ar' ? 'ms-2' : 'me-2'}`} />
                      {item.stock_quantity === 0 ? t('غير متوفر', 'Out of Stock') : t('أضف إلى السلة', 'Add to Cart')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24 space-y-4">
              <h3 className="mb-4">{t('الملخص', 'Summary')}</h3>

              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('عدد المنتجات', 'Total Items')}</span>
                  <span className="font-medium">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">{t('القيمة الإجمالية', 'Total Value')}</span>
                  <span className="font-bold text-xl text-primary">{totalValue.toLocaleString()} {t('جنيه', 'EGP')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleAddAllToCart} className="w-full" size="lg">
                  <ShoppingCart className={`w-5 h-5 ${language === 'ar' ? 'ms-2' : 'me-2'}`} />
                  {t('إضافة الكل إلى السلة', 'Add All to Cart')}
                </Button>
                <Button
                  onClick={() => { if (confirm(t('حذف جميع المنتجات من المفضلة؟', 'Remove all from wishlist?'))) { items.forEach(i => removeItem(i.id)); toast.success(t('تم حذف جميع المنتجات', 'All items removed')); } }}
                  variant="outline" className="w-full"
                >
                  <X className={`w-4 h-4 ${language === 'ar' ? 'ms-2' : 'me-2'}`} />
                  {t('حذف الكل', 'Clear All')}
                </Button>
                <Link to="/eyeglasses" className="block">
                  <Button variant="ghost" className="w-full">{t('متابعة التسوق', 'Continue Shopping')}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
