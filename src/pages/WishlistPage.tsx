import { useLanguage } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function WishlistPage() {
  const { language } = useLanguage();
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: typeof items[0]) => {
    addItem(item);
    toast.success(language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to cart');
  };

  const handleAddAllToCart = () => {
    items.forEach(item => addItem(item));
    toast.success(language === 'ar' ? 'تمت إضافة جميع المنتجات إلى السلة' : 'All items added to cart');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <Heart className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="mb-4">{language === 'ar' ? 'قائمة المفضلة فارغة' : 'Your Wishlist is Empty'}</h1>
            <p className="text-muted-foreground mb-8">
              {language === 'ar'
                ? 'لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد'
                : "You haven't added any products to your wishlist yet"}
            </p>
            <Link to="/sunglasses">
              <Button size="lg">
                {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">
            {language === 'ar' ? 'قائمة المفضلة' : 'My Wishlist'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar'
              ? `لديك ${items.length} منتج في قائمة المفضلة`
              : `You have ${items.length} item${items.length !== 1 ? 's' : ''} in your wishlist`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-border p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.id}`}
                    className="flex-shrink-0 w-24 h-24 rounded overflow-hidden bg-background"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name[language]}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <Link to={`/product/${item.id}`} className="flex-1 min-w-0">
                        <h3 className="font-medium text-lg line-clamp-1 hover:text-primary transition-colors">
                          {item.name[language]}
                        </h3>
                        {item.brand && (
                          <p className="text-sm text-muted-foreground">
                            {item.brand}
                          </p>
                        )}
                      </Link>

                      {/* Remove Button */}
                      <button
                        onClick={() => {
                          removeFromWishlist(item.id);
                          toast.success(language === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from wishlist');
                        }}
                        className="p-2 hover:bg-background rounded-full transition-colors"
                        aria-label={language === 'ar' ? 'إزالة' : 'Remove'}
                      >
                        <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="font-bold text-xl text-primary mb-3">
                      {item.price} {language === 'ar' ? 'جنيه' : 'EGP'}
                    </p>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full sm:w-auto"
                      size="sm"
                    >
                      <ShoppingCart className={`w-4 h-4 ${language === 'ar' ? 'ms-2' : 'me-2'}`} />
                      {language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24 space-y-4">
              <h3 className="mb-4">{language === 'ar' ? 'الملخص' : 'Summary'}</h3>

              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'ar' ? 'عدد المنتجات' : 'Total Items'}
                  </span>
                  <span className="font-medium">{items.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-bold">{language === 'ar' ? 'القيمة الإجمالية' : 'Total Value'}</span>
                  <span className="font-bold text-xl text-primary">
                    {items.reduce((sum, item) => sum + item.price, 0)} {language === 'ar' ? 'جنيه' : 'EGP'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleAddAllToCart}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className={`w-5 h-5 ${language === 'ar' ? 'ms-2' : 'me-2'}`} />
                  {language === 'ar' ? 'إضافة الكل إلى السلة' : 'Add All to Cart'}
                </Button>

                <Button
                  onClick={() => {
                    if (confirm(language === 'ar' ? 'هل تريد حذف جميع المنتجات من المفضلة؟' : 'Remove all items from wishlist?')) {
                      clearWishlist();
                      toast.success(language === 'ar' ? 'تم حذف جميع المنتجات' : 'All items removed');
                    }
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <X className={`w-4 h-4 ${language === 'ar' ? 'ms-2' : 'me-2'}`} />
                  {language === 'ar' ? 'حذف الكل' : 'Clear All'}
                </Button>

                <Link to="/sunglasses" className="block">
                  <Button variant="ghost" className="w-full">
                    {language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
                  </Button>
                </Link>
              </div>

              {/* Info */}
              <div className="pt-4 border-t border-border text-xs text-muted-foreground space-y-2">
                <p className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>{language === 'ar' ? 'احتفظ بمنتجاتك المفضلة هنا' : 'Save your favorite items here'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                  <span>{language === 'ar' ? 'أضف إلى السلة متى شئت' : 'Add to cart whenever you want'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
