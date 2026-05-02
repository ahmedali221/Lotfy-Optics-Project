import { Link } from 'react-router';
import { ShoppingCart, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ApiProduct } from '../../types/api';
import { toast } from 'sonner@2.0.3';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export function resolveImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

interface ApiProductCardProps {
  product: ApiProduct;
}

export function ApiProductCard({ product }: ApiProductCardProps) {
  const { language } = useLanguage();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const price = parseFloat(product.price);
  const isOutOfStock = product.stock_quantity === 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const formatPrice = (p: number) =>
    language === 'ar' ? `${p.toLocaleString()} جنيه` : `${p.toLocaleString()} EGP`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} ${language === 'ar' ? 'أضيف إلى السلة' : 'added to cart'}`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast.success(
      `${product.name} ${
        inWishlist
          ? (language === 'ar' ? 'أزيل من المفضلة' : 'removed from wishlist')
          : (language === 'ar' ? 'أضيف للمفضلة' : 'added to wishlist')
      }`
    );
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="block group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 relative"
    >
      {/* Wishlist */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 end-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md"
        aria-label={language === 'ar' ? 'المفضلة' : 'Wishlist'}
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
          }`}
        />
      </button>

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        {product.images?.[0]?.image ? (
          <img
            src={resolveImageUrl(product.images[0].image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <span className="text-6xl">👓</span>
          </div>
        )}
        {product.lens_type && (
          <div className="absolute bottom-2 start-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-primary text-white shadow-sm">
              {product.lens_type === 'medical' 
                ? (language === 'ar' ? 'طبية' : 'Medical') 
                : (language === 'ar' ? 'شمسية' : 'Sun')}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="line-clamp-2 mb-1 text-sm font-semibold group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {product.brand && (
          <p className="text-xs text-muted-foreground mb-2">{product.brand.name}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-primary">{formatPrice(price)}</span>
          <button
            onClick={handleAddToCart}
            disabled={inCart || isOutOfStock}
            className={`p-2 rounded-lg transition-colors ${
              inCart || isOutOfStock
                ? 'bg-gray-200 cursor-not-allowed text-gray-400'
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
            aria-label={language === 'ar' ? 'أضف للسلة' : 'Add to cart'}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {isLowStock && (
          <p className="text-xs text-orange-500 mt-1.5">
            {language === 'ar' ? `متبقي ${product.stock_quantity} فقط` : `Only ${product.stock_quantity} left`}
          </p>
        )}
        {isOutOfStock && (
          <p className="text-xs text-red-500 mt-1.5">
            {language === 'ar' ? 'غير متوفر حالياً' : 'Out of stock'}
          </p>
        )}
      </div>
    </Link>
  );
}
