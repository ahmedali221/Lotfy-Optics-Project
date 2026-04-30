import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/products/ProductCard';
import { AdvancedFilter } from '../components/products/AdvancedFilter';
import { getProductsByCategory, getBrands, getMaxPrice } from '../data/products';
import { Check, Phone, Info, CheckCircle, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Link } from 'react-router';
const heroImage = 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=1600&h=900&fit=crop';

export function LightFiltersPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFrameShapes, setSelectedFrameShapes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const allProducts = getProductsByCategory('filters');
  const brands = getBrands('filters');
  const maxPrice = getMaxPrice('filters');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = 
        product.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
      const matchesShape = selectedFrameShapes.length === 0 || (product.frameShape && selectedFrameShapes.includes(product.frameShape));
      const matchesColor = selectedColors.length === 0 || (product.frameColor && selectedColors.some(color => product.frameColor?.includes(color)));
      
      return matchesSearch && matchesPrice && matchesBrand && matchesShape && matchesColor;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name[language].localeCompare(b.name[language]);
        case 'name-desc':
          return b.name[language].localeCompare(a.name[language]);
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return a.rating - b.rating;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProducts, searchTerm, priceRange, selectedBrands, selectedFrameShapes, selectedColors, sortBy, language]);

  const features = [
    {
      ar: 'تحسين قدرة تمييز الألوان بشكل ملحوظ',
      en: 'Significantly improves color discrimination',
    },
    {
      ar: 'عدسات معتمدة طبياً بأعلى جودة',
      en: 'Medically certified lenses of highest quality',
    },
    {
      ar: 'تصميمات عصرية مريحة للارتداء اليومي',
      en: 'Modern designs comfortable for daily wear',
    },
    {
      ar: 'حماية من الأشعة فوق البنفسجية',
      en: 'UV protection included',
    },
    {
      ar: 'مناسبة للاستخدام الداخلي والخارجي',
      en: 'Suitable for indoor and outdoor use',
    },
    {
      ar: 'فحص مجاني لتحديد نوع عمى الألوان',
      en: 'Free examination to determine color blindness type',
    },
  ];

  const colorBlindnessTypes = [
    {
      title: { ar: 'صعوبة تمييز الأحمر/لأخضر', en: 'Red/Green Color Blindness' },
      desc: { ar: 'النوع الأكثر شيوعاً من عمى الألوان', en: 'The most common type of color blindness' },
    },
    {
      title: { ar: 'صعوبة تمييز الأزرق/الأصفر', en: 'Blue/Yellow Color Blindness' },
      desc: { ar: 'نوع أقل شيوعاً لكنه قابل للتحسين', en: 'Less common but improvable' },
    },
    {
      title: { ar: 'عمى الألوان الكلي', en: 'Complete Color Blindness' },
      desc: { ar: 'نادر جداً ويتطلب فحص متخصص', en: 'Very rare and requires specialist examination' },
    },
  ];

  const process = [
    {
      step: '1',
      title: { ar: 'فحص مجاني', en: 'Free Examination' },
      desc: { ar: 'اختبار شامل لتحديد نوع عمى الألوان', en: 'Comprehensive test to determine color blindness type' },
    },
    {
      step: '2',
      title: { ar: 'اختيار الفلتر المناسب', en: 'Select Suitable Filter' },
      desc: { ar: 'اختيار العدسة الأنسب لحالتك', en: 'Choose the most suitable lens for your condition' },
    },
    {
      step: '3',
      title: { ar: 'تجربة المنتج', en: 'Product Trial' },
      desc: { ar: 'تجربة النظارة ورؤية الفرق', en: 'Try the glasses and see the difference' },
    },
    {
      step: '4',
      title: { ar: 'متابعة دورية', en: 'Regular Follow-up' },
      desc: { ar: 'متابعة مستمرة وتعديلات إن لزم', en: 'Continuous follow-up and adjustments if needed' },
    },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=400&h=400&fit=crop',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="mb-4 text-white">
              {language === 'ar' 
                ? 'فلاتر ضوئية لعمى الألوان' 
                : 'Light Filters for Color Blindness'
              }
            </h1>
            <p className="text-lg opacity-90">
              {language === 'ar'
                ? 'نظارات مزودة بعدسات خاصة تعمل على تصحيح رؤية الألوان للأشخاص الذين يعانون من عمى الألوان'
                : 'Glasses equipped with special lenses that correct color vision for people with color blindness'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">
              {language === 'ar' ? 'المميزات' : 'Features'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-foreground">{language === 'ar' ? feature.ar : feature.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">
            {language === 'ar' ? 'معرض الصور' : 'Gallery'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {galleryImages.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img 
                  src={image} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Types Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">
            {language === 'ar' ? 'أنواع عمى الألوان التي نعالجها' : 'Types of Color Blindness We Address'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {colorBlindnessTypes.map((type, index) => (
              <div key={index} className="text-center p-6 border border-border rounded-lg">
                <div className="inline-flex w-16 h-16 bg-primary/10 rounded-full items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h4 className="mb-2">{type.title[language]}</h4>
                <p className="text-sm text-muted-foreground">
                  {type.desc[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">
            {language === 'ar' ? 'كيف نساعدك' : 'How We Help You'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex w-16 h-16 bg-primary rounded-full items-center justify-center mb-4 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h4 className="mb-2">{item.title[language]}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.desc[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8">
            {language === 'ar' ? 'منتجاتنا' : 'Our Products'}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <AdvancedFilter
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedBrands={selectedBrands}
                onBrandsChange={setSelectedBrands}
                selectedGenders={[]}
                onGendersChange={() => {}}
                selectedFrameShapes={selectedFrameShapes}
                onFrameShapesChange={setSelectedFrameShapes}
                selectedColors={selectedColors}
                onColorsChange={setSelectedColors}
                brands={brands}
                maxPrice={maxPrice}
                showGenderFilter={false}
                showFrameShapeFilter={true}
                showColorFilter={true}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Search and Sort Bar */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4`} />
                    <Input
                      placeholder={t('filter.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder={t('filter.sortBy')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">{t('filter.sortName')}</SelectItem>
                      <SelectItem value="name-desc">{t('filter.sortNameDesc')}</SelectItem>
                      <SelectItem value="price">{t('filter.sortPriceLow')}</SelectItem>
                      <SelectItem value="price-desc">{t('filter.sortPriceHigh')}</SelectItem>
                      <SelectItem value="rating">{t('filter.sortRatingLow')}</SelectItem>
                      <SelectItem value="rating-desc">{t('filter.sortRatingHigh')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  {t('products.showing')} {filteredProducts.length} {t('products.of')} {allProducts.length} {t('products.products')}
                </p>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    {t('products.noResults')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">
            {language === 'ar' ? 'تجارب عملائنا' : 'Customer Testimonials'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-background rounded-lg">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  {language === 'ar'
                    ? '"تجربة رائعة! أصبحت أرى الألوان بشكل أوضح بكثير. شكراً لفريق لطفي أوبتيكال"'
                    : '"Amazing experience! I can now see colors much more clearly. Thanks to LOTFY OPTICAL team"'
                  }
                </p>
                <p className="">
                  {language === 'ar' ? `عميل ${i}` : `Customer ${i}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">
            {language === 'ar' ? 'احصل على فحص مجاني' : 'Get a Free Examination'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'تواصل معنا الآن لحجز موعد فحص مجاني وتجربة الفلاتر الضوئية'
              : 'Contact us now to book a free examination and try our light filters'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/clinics"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg transition-colors duration-200 font-semibold"
            >
              {language === 'ar' ? 'احجز موعد' : 'Book Appointment'}
            </Link>
            <a
              href="tel:01012115763"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-semibold"
            >
              <Phone className="w-5 h-5" />
              01012115763
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}