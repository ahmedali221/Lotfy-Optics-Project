import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/products/ProductCard';
import { Filter, ChevronDown, Users, UserRound, Baby } from 'lucide-react';
import { products } from '../data/products';
import clinicImage from 'figma:asset/15f43ebb3fb12cc8947711f39435b3887d701419.png';

export function EyeglassesPage() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'men' | 'women' | 'kids'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popular'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Get eyeglasses products from main products data
  const eyeglassesProducts = products.filter(p => p.category === 'eyeglasses');

  // Helper function to map gender to category
  const getGenderCategory = (gender?: string): 'men' | 'women' | 'kids' | 'all' => {
    if (gender === 'male') return 'men';
    if (gender === 'female') return 'women';
    if (gender === 'kids') return 'kids';
    return 'all';
  };

  const categories = [
    {
      id: 'all' as const,
      label: { ar: 'الكل', en: 'All' },
      icon: Filter,
      count: eyeglassesProducts.length,
      color: 'from-gray-400 to-gray-600',
    },
    {
      id: 'men' as const,
      label: { ar: 'رجالي', en: 'Men' },
      icon: UserRound,
      count: eyeglassesProducts.filter(p => p.gender === 'male').length,
      color: 'from-blue-500 to-blue-700',
    },
    {
      id: 'women' as const,
      label: { ar: 'نسائي', en: 'Women' },
      icon: Users,
      count: eyeglassesProducts.filter(p => p.gender === 'female').length,
      color: 'from-pink-500 to-purple-600',
    },
    {
      id: 'kids' as const,
      label: { ar: 'أطفال', en: 'Kids' },
      icon: Baby,
      count: eyeglassesProducts.filter(p => p.gender === 'kids').length,
      color: 'from-green-500 to-teal-600',
    },
  ];

  // Filter products
  const filteredProducts = eyeglassesProducts.filter((product) => {
    const productGenderCategory = getGenderCategory(product.gender);
    if (activeCategory !== 'all' && productGenderCategory !== activeCategory) return false;
    
    if (priceRange === 'low' && product.price > 500) return false;
    if (priceRange === 'mid' && (product.price <= 500 || product.price > 900)) return false;
    if (priceRange === 'high' && product.price <= 900) return false;
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'popular':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden bg-secondary">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1606811801193-e318c9a87ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)`,
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-secondary/75"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-block mb-6 px-6 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full">
              <span className="text-sm font-medium text-primary">
                {language === 'ar' ? '✨ نظارات طبية عالية الجودة' : '✨ Premium Prescription Eyewear'}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-white text-4xl md:text-6xl leading-tight">
              {language === 'ar' ? 'نظارات طبية للرؤية الواضحة' : 'Prescription Glasses for Clear Vision'}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              {language === 'ar'
                ? 'اختر من بين جموعة واسعة من الإطارات الطبية العصرية والكلاسيكية، مع إمكانية تركيب جميع أنواع العدسات'
                : 'Choose from a wide range of modern and classic prescription frames, with the option to install all types of lenses'
              }
            </p>

            {/* Features Badges */}
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg text-white hover:bg-white/15 transition-all duration-300">
                <span className="text-primary text-lg">✓</span>
                <span className="text-sm font-medium">{language === 'ar' ? 'عدسات طبية بجودة عالية' : 'High Quality Lenses'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg text-white hover:bg-white/15 transition-all duration-300">
                <span className="text-primary text-lg">✓</span>
                <span className="text-sm font-medium">{language === 'ar' ? 'ماركات عالمية' : 'International Brands'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg text-white hover:bg-white/15 transition-all duration-300">
                <span className="text-primary text-lg">✓</span>
                <span className="text-sm font-medium">{language === 'ar' ? 'ضمان شامل' : 'Full Warranty'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-20 z-40 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="py-6">
            {/* Tabs Container */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex flex-col items-center gap-2 px-8 py-4 rounded-2xl font-medium transition-all duration-300 min-w-[140px] ${
                      isActive
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-secondary border-2 border-border hover:border-primary/30'
                    }`}
                  >
                    {/* Icon */}
                    <Icon className={`w-8 h-8 ${
                      isActive ? 'text-white' : 'text-primary'
                    }`} />

                    {/* Label */}
                    <span className={`text-base font-bold ${
                      isActive ? 'text-white' : 'text-secondary'
                    }`}>
                      {cat.label[language]}
                    </span>
                    
                    {/* Count */}
                    <span className={`text-xs ${
                      isActive ? 'text-white/90' : 'text-muted-foreground'
                    }`}>
                      {cat.count} {language === 'ar' ? 'منتج' : 'products'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mt-4 flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">
                  {language === 'ar' ? 'الفلاتر' : 'Filters'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-40 space-y-6">
              {/* Price Range Filter */}
              <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span>{language === 'ar' ? 'نطاق السعر' : 'Price Range'}</span>
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'all' as const, label: { ar: 'الكل', en: 'All' } },
                    { id: 'low' as const, label: { ar: 'أقل من 500 جنيه', en: 'Under 500 EGP' } },
                    { id: 'mid' as const, label: { ar: '500 - 900 جنيه', en: '500 - 900 EGP' } },
                    { id: 'high' as const, label: { ar: 'أكثر من 900 جنيه', en: 'Above 900 EGP' } },
                  ].map((range) => (
                    <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRange === range.id}
                        onChange={() => setPriceRange(range.id)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {range.label[language]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                <h3 className="font-bold mb-4">
                  {language === 'ar' ? 'ترتيب حسب' : 'Sort By'}
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="newest">{language === 'ar' ? 'الأحدث' : 'Newest'}</option>
                  <option value="price-asc">{language === 'ar' ? 'السع: من الأقل للأعلى' : 'Price: Low to High'}</option>
                  <option value="price-desc">{language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                  <option value="popular">{language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}</option>
                </select>
              </div>

              {/* Info Card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
                <h4 className="font-bold mb-2 text-primary">
                  {language === 'ar' ? '💡 نصيحة' : '💡 Tip'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar'
                    ? 'جميع نظاراتنا الطبية تأتي مع إمكانية تركيب العدسات الطبية المناسبة لحالتك'
                    : 'All our prescription frames come with the option to install lenses suitable for your condition'
                  }
                </p>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? `عرض ${sortedProducts.length} منتج`
                  : `Showing ${sortedProducts.length} product${sortedProducts.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">👓</div>
                <h3 className="mb-2">
                  {language === 'ar' ? 'لا توجد منتجات' : 'No Products Found'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === 'ar' 
                    ? 'جرب تغيير خيارات الفلترة'
                    : 'Try changing the filter options'
                  }
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setPriceRange('all');
                  }}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {language === 'ar' ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center mb-12">
              {language === 'ar' ? 'أنواع العدسات المتوفرة' : 'Available Lens Types'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: { ar: 'عدسات أحادية البؤرة', en: 'Single Vision' },
                  desc: { ar: 'لتصحيح قصر أو طول النظر', en: 'For myopia or hyperopia' },
                  icon: '👁️',
                },
                {
                  title: { ar: 'عدسات متعددة البؤر', en: 'Progressive' },
                  desc: { ar: 'رؤية واضحة على جميع المسافات', en: 'Clear vision at all distances' },
                  icon: '🔍',
                },
                {
                  title: { ar: 'عدسات الكمبيوتر', en: 'Computer Lenses' },
                  desc: { ar: 'حماية من الضوء الأزرق', en: 'Blue light protection' },
                  icon: '💻',
                },
                {
                  title: { ar: 'عدسات القراءة', en: 'Reading Lenses' },
                  desc: { ar: 'مخصصة للقراءة والأعمال القريبة', en: 'For reading and close work' },
                  icon: '📖',
                },
              ].map((lens, index) => (
                <div
                  key={index}
                  className="group p-6 border border-border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-white to-background"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {lens.icon}
                  </div>
                  <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    {lens.title[language]}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {lens.desc[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}