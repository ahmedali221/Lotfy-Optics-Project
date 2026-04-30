import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ApiProduct } from '../types/api';
import { resolveImageUrl, ApiProductCard } from '../components/products/ApiProductCard';
import { ShoppingCart, Heart, Share2, Truck, Shield, Minus, Plus, ChevronRight, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner@2.0.3';
import api from '../lib/axios';

const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  frame:     { ar: 'إطار',       en: 'Frame'     },
  lens:      { ar: 'عدسة',       en: 'Lens'      },
  accessory: { ar: 'إكسسوار',    en: 'Accessory' },
};

const GENDER_LABELS: Record<string, { ar: string; en: string }> = {
  male:   { ar: 'رجالي',    en: 'Men'    },
  female: { ar: 'نسائي',    en: 'Women'  },
  kids:   { ar: 'أطفال',    en: 'Kids'   },
  unisex: { ar: 'للجنسين',  en: 'Unisex' },
};

const FRAME_SHAPE_LABELS: Record<string, { ar: string; en: string }> = {
  square:    { ar: 'مربع',    en: 'Square'    },
  rectangle: { ar: 'مستطيل', en: 'Rectangle' },
  round:     { ar: 'دائري',  en: 'Round'     },
  cat_eye:   { ar: 'كات آي', en: 'Cat Eye'   },
  oval:      { ar: 'بيضاوي', en: 'Oval'      },
};

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [related, setRelated] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setQuantity(1);
    api.get<ApiProduct>(`/api/catalog/products/${id}/`)
      .then(({ data }) => {
        setProduct(data);
        // Fetch related products in same category
        return api.get('/api/catalog/products/', {
          params: { category: data.category, is_active: 'true', page_size: 4 },
        });
      })
      .then(({ data }) => {
        const results: ApiProduct[] = data.results ?? data;
        setRelated(results.filter((p: ApiProduct) => p.id !== Number(id)).slice(0, 4));
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            <div className="aspect-square bg-gray-100 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-100 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
              <div className="h-10 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const price = parseFloat(product.price);
  const isOutOfStock = product.stock_quantity === 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} ${t('أضيف إلى السلة', 'added to cart')}`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(t('تم نسخ الرابط', 'Link copied'));
      }
    } catch {}
  };

  const categoryLabel = CATEGORY_LABELS[product.category]?.[language] ?? product.category;
  const genderLabel = GENDER_LABELS[product.gender]?.[language] ?? product.gender;
  const shapeLabel = product.frame_shape ? (FRAME_SHAPE_LABELS[product.frame_shape]?.[language] ?? product.frame_shape) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary">{t('الرئيسية', 'Home')}</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link to="/eyeglasses" className="hover:text-primary">{categoryLabel}</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-secondary truncate max-w-xs">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-white rounded-xl border border-border overflow-hidden aspect-square flex items-center justify-center p-8">
            {product.image ? (
              <img
                src={resolveImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <Package className="w-32 h-32 text-gray-200" />
            )}
          </div>

          {/* Details */}
          <div className="space-y-5">
            {/* Brand */}
            {product.brand && (
              <p className="text-sm text-primary font-medium">{product.brand.name}</p>
            )}

            {/* Name */}
            <h1 className="text-3xl font-bold text-secondary">{product.name}</h1>

            {/* Price */}
            <div className="border-t border-b border-border py-4">
              <span className="text-3xl font-bold text-primary">
                {price.toLocaleString()} {t('جنيه', 'EGP')}
              </span>
            </div>

            {/* Specs */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-28">{t('الفئة:', 'Category:')}</span>
                <span className="font-medium">{categoryLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-28">{t('الجنس:', 'Gender:')}</span>
                <span className="font-medium">{genderLabel}</span>
              </div>
              {shapeLabel && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground w-28">{t('شكل الإطار:', 'Frame Shape:')}</span>
                  <span className="font-medium">{shapeLabel}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-28">{t('المخزون:', 'Stock:')}</span>
                <span className={`font-medium ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-green-600'}`}>
                  {isOutOfStock
                    ? t('غير متوفر', 'Out of stock')
                    : isLowStock
                    ? t(`متبقي ${product.stock_quantity} فقط`, `Only ${product.stock_quantity} left`)
                    : t('متوفر', 'In Stock')
                  }
                </span>
              </div>
            </div>

            {/* Quantity */}
            {!isOutOfStock && (
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('الكمية:', 'Quantity:')}</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1} className="p-2 hover:bg-background disabled:opacity-50">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[50px] text-center border-x border-border">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(product.stock_quantity, q + 1))} disabled={quantity >= product.stock_quantity} className="p-2 hover:bg-background disabled:opacity-50">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t(`الحد الأقصى: ${product.stock_quantity}`, `Max: ${product.stock_quantity}`)}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full h-12 text-base" size="lg" onClick={handleAddToCart} disabled={inCart || isOutOfStock}>
                <ShoppingCart className="w-5 h-5 me-2" />
                {inCart ? t('في السلة', 'In Cart') : t('أضف إلى السلة', 'Add to Cart')}
              </Button>
              {!isOutOfStock && (
                <Button variant="outline" className="w-full h-12 text-base" size="lg" onClick={handleBuyNow}>
                  {t('اشترِ الآن', 'Buy Now')}
                </Button>
              )}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => { toggleItem(product); toast.success(inWishlist ? t('أزيل من المفضلة', 'Removed from wishlist') : t('أضيف للمفضلة', 'Added to wishlist')); }}>
                  <Heart className={`w-5 h-5 me-2 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  {t('المفضلة', 'Wishlist')}
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="w-5 h-5 me-2" />
                  {t('مشاركة', 'Share')}
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-background border border-border rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{t('توصيل لجميع المحافظات', 'Delivery to all governorates')}</p>
                  <p className="text-xs text-muted-foreground">{t('من 3-7 أيام عمل', '3-7 business days')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{t('ضمان الجودة', 'Quality Guarantee')}</p>
                  <p className="text-xs text-muted-foreground">{t('ضمان سنة على جميع المنتجات', '1 year warranty')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="mb-6 text-xl font-bold">{t('منتجات مشابهة', 'Similar Products')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ApiProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
