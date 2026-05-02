import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ApiProduct } from '../types/api';
import { resolveImageUrl, ApiProductCard } from '../components/products/ApiProductCard';
import {
  Star, ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield,
  CheckCircle, ChevronRight, Minus, Plus, Package,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner@2.0.3';
import api from '../lib/axios';

const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  glasses:        { ar: 'نظارات',     en: 'Glasses'       },
  lens:           { ar: 'عدسات',      en: 'Lenses'        },
  artificial_eyes:{ ar: 'عيون اصطناعية', en: 'Artificial Eyes' },
  light_filters:  { ar: 'فلاتر ضوئية', en: 'Light Filters' },
};

const GENDER_LABELS: Record<string, { ar: string; en: string }> = {
  male:   { ar: 'رجالي',   en: 'Men'    },
  female: { ar: 'نسائي',   en: 'Women'  },
  kids:   { ar: 'أطفال',   en: 'Kids'   },
  unisex: { ar: 'للجنسين', en: 'Unisex' },
};

const FRAME_SHAPE_LABELS: Record<string, { ar: string; en: string }> = {
  square:    { ar: 'مربع',    en: 'Square'    },
  rectangle: { ar: 'مستطيل', en: 'Rectangle' },
  round:     { ar: 'دائري',  en: 'Round'     },
  cat_eye:   { ar: 'كات آي', en: 'Cat Eye'   },
  oval:      { ar: 'بيضاوي', en: 'Oval'      },
};

const LENS_TYPE_LABELS: Record<string, { ar: string; en: string }> = {
  medical:    { ar: 'طبية',   en: 'Medical'    },
  sunglasses: { ar: 'شمسية', en: 'Sunglasses' },
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setQuantity(1);
    setSelectedImage(0);
    api.get<ApiProduct>(`/api/catalog/products/${id}/`)
      .then(({ data }) => {
        setProduct(data);
        return api.get('/api/catalog/products/', {
          params: { category: data.category, is_active: 'true', page_size: 5 },
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
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg" />
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-lg" />)}
              </div>
            </div>
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
  const prevPrice = product.previous_price ? parseFloat(product.previous_price) : Math.round(price * 1.2);
  const discountPct = prevPrice > price ? Math.round(((prevPrice - price) / prevPrice) * 100) : null;
  const isOutOfStock = product.stock_quantity === 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  // Build image list from images array; fallback to placeholder
  const productImages = product.images.length > 0
    ? [...product.images].sort((a, b) => a.sort_order - b.sort_order).map(img => resolveImageUrl(img.image))
    : [];

  const categoryLabel = CATEGORY_LABELS[product.category]?.[language] ?? product.category;
  const genderLabel = GENDER_LABELS[product.gender]?.[language] ?? product.gender;
  const shapeLabel = product.frame_shape ? (FRAME_SHAPE_LABELS[product.frame_shape]?.[language] ?? product.frame_shape) : null;
  const lensTypeLabel = product.lens_type ? (LENS_TYPE_LABELS[product.lens_type]?.[language] ?? product.lens_type) : null;

  // Mock reviews (no reviews API yet)
  const reviews = [
    {
      id: 1,
      name: t('أحمد محمد', 'Ahmed Mohamed'),
      rating: 5,
      date: '2024-02-10',
      comment: t('منتج ممتاز، جودة عالية جداً وسعر مناسب. أنصح به بشدة!', 'Excellent product, very high quality and reasonable price. Highly recommend!'),
      verified: true,
    },
    {
      id: 2,
      name: t('سارة علي', 'Sarah Ali'),
      rating: 4,
      date: '2024-02-08',
      comment: t('جيدة جداً، لكن التوصيل استغرق وقتاً أطول من المتوقع', 'Very good, but delivery took longer than expected'),
      verified: true,
    },
    {
      id: 3,
      name: t('محمود حسن', 'Mahmoud Hassan'),
      rating: 5,
      date: '2024-02-05',
      comment: t('رائعة! تماماً كما في الصور، والإطار مريح جداً', 'Amazing! Exactly as pictured, and the frame is very comfortable'),
      verified: false,
    },
  ];
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} ${t('أضيف إلى السلة', 'added to cart')}`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
        toast.success(t('تمت المشاركة بنجاح', 'Shared successfully'));
      } else {
        await navigator.clipboard.writeText(url);
        toast.success(t('تم نسخ الرابط', 'Link copied to clipboard'));
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary">{t('الرئيسية', 'Home')}</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link to={`/${product.category}`} className="hover:text-primary">{categoryLabel}</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-secondary truncate max-w-xs">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-lg border border-border overflow-hidden aspect-square flex items-center justify-center p-8">
              {productImages.length > 0 ? (
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Package className="w-32 h-32 text-gray-200" />
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`bg-white rounded-lg border-2 overflow-hidden aspect-square p-2 hover:border-primary transition-colors ${
                      selectedImage === idx ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            {product.brand && (
              <div className="text-sm text-primary">
                <Link to={`/${product.category}?brand=${product.brand.id}`} className="hover:underline">
                  {t('زيارة متجر', 'Visit')} {product.brand.name}
                </Link>
              </div>
            )}

            {/* Title */}
            <h1 className="">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${idx < Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ms-2">{avgRating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviews.length} {t('تقييم', 'reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="border-t border-b border-border py-4">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-bold text-primary">
                  {price.toLocaleString()} {t('جنيه', 'EGP')}
                </span>
                {discountPct && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      {prevPrice.toLocaleString()} {t('جنيه', 'EGP')}
                    </span>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                      {t(`خصم ${discountPct}%`, `${discountPct}% OFF`)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              {product.brand && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{t('الماركة:', 'Brand:')}</span>
                  <span className="font-medium">{product.brand.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{t('الفئة:', 'Category:')}</span>
                <span className="font-medium">{categoryLabel}</span>
              </div>
              {shapeLabel && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{t('شكل الإطار:', 'Frame Shape:')}</span>
                  <span className="font-medium">{shapeLabel}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{t('اللون:', 'Colour:')}</span>
                <span className="font-medium">{product.colour || t('غير محدد', 'Not specified')}</span>
              </div>
              {lensTypeLabel && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">
                    {product.category === 'glasses' ? t('نوع النظارة:', 'Eyewear Type:') : t('نوع العدسة:', 'Lens Type:')}
                  </span>
                  <span className="font-medium">{lensTypeLabel}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{t('الجنس:', 'Gender:')}</span>
                <span className="font-medium">{genderLabel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{t('حالة المخزون:', 'Stock:')}</span>
                <span className={`font-medium ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-green-600'}`}>
                  {isOutOfStock
                    ? t('غير متوفر', 'Out of Stock')
                    : isLowStock
                    ? t(`بقي ${product.stock_quantity} فقط`, `Only ${product.stock_quantity} left`)
                    : t('متوفر', 'In Stock')
                  }
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('الكمية:', 'Quantity:')}</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center border-x border-border">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock_quantity, q + 1))}
                      disabled={quantity >= product.stock_quantity}
                      className="p-2 hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t(`الحد الأقصى: ${product.stock_quantity}`, `Max: ${product.stock_quantity}`)}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full h-12 text-base"
                size="lg"
                onClick={handleAddToCart}
                disabled={inCart || isOutOfStock}
              >
                <ShoppingCart className="w-5 h-5 me-2" />
                {inCart ? t('في السلة', 'In Cart') : t('أضف إلى السلة', 'Add to Cart')}
              </Button>
              {!isOutOfStock && (
                <Button variant="outline" className="w-full h-12 text-base" size="lg" onClick={handleBuyNow}>
                  {t('اشترِ الآن', 'Buy Now')}
                </Button>
              )}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    toggleItem(product);
                    toast.success(inWishlist ? t('أزيل من المفضلة', 'Removed from wishlist') : t('أضيف للمفضلة', 'Added to wishlist'));
                  }}
                >
                  <Heart className={`w-5 h-5 me-2 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  {t('المفضلة', 'Wishlist')}
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="w-5 h-5 me-2" />
                  {t('مشاركة', 'Share')}
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-background border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t('توصيل مجاني', 'Free Delivery')}</p>
                  <p className="text-sm text-muted-foreground">{t('للطلبات فوق 500 جنيه', 'For orders over 500 EGP')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t('إرجاع مجاني', 'Free Returns')}</p>
                  <p className="text-sm text-muted-foreground">{t('خلال 14 يوم من الاستلام', 'Within 14 days of receipt')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t('ضمان الجودة', 'Quality Guarantee')}</p>
                  <p className="text-sm text-muted-foreground">{t('ضمان سنة على جميع المنتجات', '1 year warranty on all products')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                {t('الوصف', 'Description')}
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                {t('المواصفات', 'Specifications')}
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                {t('التقييمات', 'Reviews')} ({reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="mb-4">{t('وصف المنتج', 'Product Description')}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t(
                    `${product.name} — نظارة عالية الجودة من ${product.brand?.name ?? 'لطفي أوبتيكال'}، مصممة للأناقة والراحة في الاستخدام اليومي.`,
                    `${product.name} — a high-quality frame from ${product.brand?.name ?? 'Lotfy Optical'}, designed for elegance and everyday comfort.`,
                  )}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('حماية 100% من الأشعة فوق البنفسجية', '100% UV protection')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('إطار خفيف ومريح للاستخدام اليومي', 'Lightweight and comfortable frame for daily use')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('تصميم أنيق يناسب جميع المناسبات', 'Elegant design suitable for all occasions')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('مصنوع من مواد عالية الجودة', 'Made from high quality materials')}</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="mb-4">{t('المواصفات التفصيلية', 'Detailed Specifications')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.brand && (
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">{t('الماركة', 'Brand')}</span>
                      <span className="font-medium">{product.brand.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{t('الفئة', 'Category')}</span>
                    <span className="font-medium">{categoryLabel}</span>
                  </div>
                  {shapeLabel && (
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">{t('شكل الإطار', 'Frame Shape')}</span>
                      <span className="font-medium">{shapeLabel}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{t('اللون', 'Colour')}</span>
                    <span className="font-medium">{product.colour || t('—', '—')}</span>
                  </div>
                  {lensTypeLabel && (
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">
                        {product.category === 'glasses' ? t('نوع النظارة', 'Eyewear Type') : t('نوع العدسة', 'Lens Type')}
                      </span>
                      <span className="font-medium">{lensTypeLabel}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{t('الجنس', 'Gender')}</span>
                    <span className="font-medium">{genderLabel}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{t('المخزون', 'Stock')}</span>
                    <span className="font-medium">{product.stock_quantity}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{t('الضمان', 'Warranty')}</span>
                    <span className="font-medium">{t('سنة واحدة', '1 Year')}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center md:text-start">
                      <div className="text-5xl font-bold text-primary mb-2">{avgRating.toFixed(1)}</div>
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-5 h-5 ${idx < Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('بناءً على', 'Based on')} {reviews.length} {t('تقييمات', 'reviews')}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter(r => r.rating === star).length;
                        const percentage = (count / reviews.length) * 100;
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-sm w-8">{star} ★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-lg border border-border p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{review.name}</span>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                {t('مشتري موثق', 'Verified Purchase')}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-4 h-4 ${idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Write Review */}
                <Button variant="outline" className="w-full">
                  {t('اكتب تقييمك', 'Write a Review')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        {related.length > 0 && (
          <div>
            <h2 className="mb-6">{t('منتجات مشابهة', 'Similar Products')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ApiProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
