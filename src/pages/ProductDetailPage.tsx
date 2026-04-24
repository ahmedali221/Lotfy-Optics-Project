import { useParams, Link, useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductById, getProductsByCategory } from '../data/products';
import { Star, ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield, CheckCircle, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/products/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function ProductDetailPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const product = getProductById(id || '');

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">{language === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}</h2>
          <Button onClick={() => navigate('/')}>
            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Button>
        </div>
      </div>
    );
  }

  // Generate multiple images for gallery (in real app, these would come from product data)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  // Get similar products
  const similarProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      rating: 5,
      date: '2024-02-10',
      comment: language === 'ar' ? 'منتج ممتاز، جودة عالية جداً وسعر مناسب. أنصح به بشدة!' : 'Excellent product, very high quality and reasonable price. Highly recommend!',
      verified: true,
    },
    {
      id: 2,
      name: language === 'ar' ? 'سارة علي' : 'Sarah Ali',
      rating: 4,
      date: '2024-02-08',
      comment: language === 'ar' ? 'جيدة جداً، لكن التوصيل استغرق وقتاً أطل من المتوقع' : 'Very good, but delivery took longer than expected',
      verified: true,
    },
    {
      id: 3,
      name: language === 'ar' ? 'محمود حس' : 'Mahmoud Hassan',
      rating: 5,
      date: '2024-02-05',
      comment: language === 'ar' ? 'رائعة! تماماً كما في الصور، والإطار مريح جداً' : 'Amazing! Exactly as pictured, and the frame is very comfortable',
      verified: false,
    },
  ];

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name[language],
          text: product.description[language],
          url: url,
        });
        toast.success(language === 'ar' ? 'تمت المشاركة بنجاح' : 'Shared successfully');
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success(language === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard');
      } catch (error) {
        toast.error(language === 'ar' ? 'فشل نسخ الرابط' : 'Failed to copy link');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/${product.category}`} className="hover:text-primary">
              {language === 'ar' ? product.category === 'sunglasses' ? 'نظارات شمسية' : product.category === 'eyeglasses' ? 'نظارات طبية' : 'فلاتر ضوئية' : product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-secondary">{product.name[language]}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-lg border border-border overflow-hidden aspect-square flex items-center justify-center p-8">
              <ImageWithFallback
                src={productImages[selectedImage]}
                alt={product.name[language]}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Images */}
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
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            {product.brand && (
              <div className="text-sm text-primary">
                <Link to={`/${product.category}?brand=${product.brand}`} className="hover:underline">
                  {language === 'ar' ? 'زيارة متجر' : 'Visit'} {product.brand}
                </Link>
              </div>
            )}

            {/* Title */}
            <h1 className="">{product.name[language]}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${
                      idx < Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ms-2">{avgRating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviews.length} {language === 'ar' ? 'تقييم' : 'reviews'})
              </span>
            </div>

            {/* Price */}
            <div className="border-t border-b border-border py-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  {product.price} {language === 'ar' ? 'نيه' : 'EGP'}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {Math.round(product.price * 1.2)} {language === 'ar' ? 'جنيه' : 'EGP'}
                </span>
                <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                  {language === 'ar' ? 'خصم 17%' : '17% OFF'}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{language === 'ar' ? 'الماركة:' : 'Brand:'}</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              {product.frameShape && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{language === 'ar' ? 'شكل الإطار:' : 'Frame Shape:'}</span>
                  <span className="font-medium">{product.frameShape}</span>
                </div>
              )}
              {product.frameColor && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{language === 'ar' ? 'اللون:' : 'Color:'}</span>
                  <span className="font-medium">{product.frameColor}</span>
                </div>
              )}
              {product.lensType && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{language === 'ar' ? 'نوع العدسة:' : 'Lens Type:'}</span>
                  <span className="font-medium">{product.lensType}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{language === 'ar' ? 'حالة المخزون:' : 'Stock:'}</span>
                <span className={`font-medium ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                  {product.stock > 10 
                    ? language === 'ar' ? 'متوفر' : 'In Stock'
                    : `${language === 'ar' ? 'بقي' : 'Only'} ${product.stock} ${language === 'ar' ? 'فقط' : 'left'}`
                  }
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{language === 'ar' ? 'الكمية:' : 'Quantity:'}</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center border-x border-border">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? `الحد الأقصى: ${product.stock}` : `Max: ${product.stock}`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full h-12 text-base"
                size="lg"
                onClick={() => {
                  addItem(product, quantity);
                  toast.success(`${product.name[language]} ${language === 'ar' ? 'أضيف إلى السلة' : 'added to cart'}`);
                }}
                disabled={isInCart(product.id)}
              >
                <ShoppingCart className="w-5 h-5 me-2" />
                {language === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}
              </Button>
              <Button variant="outline" className="w-full h-12 text-base" size="lg" onClick={handleBuyNow}>
                {language === 'ar' ? 'اشترِ الآن' : 'Buy Now'}
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    toggleItem(product);
                    toast.success(`${product.name[language]} ${language === 'ar' ? 'أضيف إلى المفضلة' : 'added to wishlist'}`);
                  }}
                >
                  <Heart className={`w-5 h-5 me-2 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  {language === 'ar' ? 'المفضلة' : 'Wishlist'}
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="w-5 h-5 me-2" />
                  {language === 'ar' ? 'مشاركة' : 'Share'}
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-background border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{language === 'ar' ? 'توصيل مجاني' : 'Free Delivery'}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'للطلبات فوق 500 جنيه' : 'For orders over 500 EGP'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{language === 'ar' ? 'إرجاع مجاني' : 'Free Returns'}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'خلال 14 يوم من الاستلام' : 'Within 14 days of receipt'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{language === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee'}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'ضمان سنة على جميع المنتجات' : '1 year warranty on all products'}
                  </p>
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
                {language === 'ar' ? 'الوصف' : 'Description'}
              </TabsTrigger>
              <TabsTrigger 
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                {language === 'ar' ? 'المواصفات' : 'Specifications'}
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                {language === 'ar' ? 'التقييمات' : 'Reviews'} ({reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="mb-4">{language === 'ar' ? 'وصف المنتج' : 'Product Description'}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {product.description[language]}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{language === 'ar' ? 'حماية 100% من الأشعة فوق ابنفسجة' : '100% UV protection'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{language === 'ar' ? 'إطار خفيف ومريح للاستخدام اليومي' : 'Lightweight and comfortable frame for daily use'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{language === 'ar' ? 'تصميم أنيق يناسب جميع المناسبات' : 'Elegant design suitable for all occasions'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{language === 'ar' ? 'مصنوع من مواد عالية الجودة' : 'Made from high quality materials'}</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="mb-4">{language === 'ar' ? 'المواصفات التفصيلية' : 'Detailed Specifications'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{language === 'ar' ? 'الماركة' : 'Brand'}</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{language === 'ar' ? 'الفئة' : 'Category'}</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  {product.frameShape && (
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">{language === 'ar' ? 'شكل الإطار' : 'Frame Shape'}</span>
                      <span className="font-medium">{product.frameShape}</span>
                    </div>
                  )}
                  {product.frameColor && (
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">{language === 'ar' ? 'اللون' : 'Color'}</span>
                      <span className="font-medium">{product.frameColor}</span>
                    </div>
                  )}
                  {product.lensType && (
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">{language === 'ar' ? 'نوع العدسة' : 'Lens Type'}</span>
                      <span className="font-medium">{product.lensType}</span>
                    </div>
                  )}
                  {product.gender && (
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">{language === 'ar' ? 'الجنس' : 'Gender'}</span>
                      <span className="font-medium">
                        {product.gender === 'male' ? (language === 'ar' ? 'رجالي' : 'Men') :
                         product.gender === 'female' ? (language === 'ar' ? 'نسائي' : 'Women') :
                         product.gender === 'kids' ? (language === 'ar' ? 'أطفال' : 'Kids') :
                         (language === 'ar' ? 'للجنسين' : 'Unisex')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{language === 'ar' ? 'بلد المنشأ' : 'Country of Origin'}</span>
                    <span className="font-medium">{language === 'ar' ? 'إيطاليا' : 'Italy'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{language === 'ar' ? 'الضمان' : 'Warranty'}</span>
                    <span className="font-medium">{language === 'ar' ? 'سنة واحدة' : '1 Year'}</span>
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
                            className={`w-5 h-5 ${
                              idx < Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'بناءً على' : 'Based on'} {reviews.length} {language === 'ar' ? 'تقييمات' : 'reviews'}
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
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${percentage}%` }}
                              />
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
                                {language === 'ar' ? 'مشتري موثق' : 'Verified Purchase'}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-4 h-4 ${
                                  idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
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

                {/* Write Review Button */}
                <Button variant="outline" className="w-full">
                  {language === 'ar' ? 'اكتب تقييمك' : 'Write a Review'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="mb-6">{language === 'ar' ? 'منتجات مشابهة' : 'Similar Products'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}