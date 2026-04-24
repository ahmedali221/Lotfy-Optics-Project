import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Product } from '../../data/products';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const formatPrice = (price: number) => {
    return language === 'ar' 
      ? `${price} جنيه`
      : `${price} EGP`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(
      `${product.name[language]} ${language === 'ar' ? 'أضيف إلى السلة' : 'added to cart'}`
    );
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    const isNowInWishlist = !isInWishlist(product.id);
    toast.success(
      `${product.name[language]} ${
        isNowInWishlist
          ? language === 'ar' ? 'أضيف إلى المفضلة' : 'added to wishlist'
          : language === 'ar' ? 'أزيل من المفضلة' : 'removed from wishlist'
      }`
    );
  };

  return (
    <Link to={`/product/${product.id}`} className="block group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 relative">
      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-md"
        aria-label={language === 'ar' ? 'المفضلة' : 'Wishlist'}
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            isInWishlist(product.id)
              ? 'fill-red-500 text-red-500'
              : 'text-gray-600 hover:text-red-500'
          }`}
        />
      </button>

      <div className="aspect-square overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name[language]}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name[language]}
        </h3>
        
        {product.brand && (
          <p className="text-xs text-muted-foreground mb-2">
            {product.brand}
          </p>
        )}
        
        <div className="flex items-center gap-1 mb-3">
          {renderStars(product.rating)}
          <span className="text-sm text-muted-foreground ms-1">
            ({product.rating})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg text-primary">
            {formatPrice(product.price)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isInCart(product.id) || product.stock === 0}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isInCart(product.id) || product.stock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
            aria-label={t('products.addToCart')}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-xs text-orange-500 mt-2">
            {language === 'ar' 
              ? `متبقي ${product.stock} فقط`
              : `Only ${product.stock} left`
            }
          </p>
        )}
        
        {product.stock === 0 && (
          <p className="text-xs text-destructive mt-2">
            {language === 'ar' ? 'غير متوفر حالياً' : 'Out of stock'}
          </p>
        )}
      </div>
    </Link>
  );
}