import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ApiProductCard } from '../components/products/ApiProductCard';
import { Check, Phone, CheckCircle, Search, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import api from '../lib/axios';
import { ApiProduct, ApiProductPage, ApiBrand } from '../types/api';

const heroImage = 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=1600&h=900&fit=crop';

const FRAME_SHAPES = [
  { value: 'square',    ar: 'مربع',    en: 'Square'    },
  { value: 'rectangle', ar: 'مستطيل', en: 'Rectangle' },
  { value: 'round',     ar: 'دائري',  en: 'Round'     },
  { value: 'cat_eye',   ar: 'كات آي', en: 'Cat Eye'   },
  { value: 'oval',      ar: 'بيضاوي', en: 'Oval'      },
];

export function LightFiltersPage() {
  const { language } = useLanguage();
  const tl = (ar: string, en: string) => language === 'ar' ? ar : en;

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('');

  useEffect(() => {
    api.get('/api/catalog/brands/', { params: { page_size: 100 } })
      .then(({ data }) => setBrands(data.results ?? data))
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params: Record<string, string | number> = { category: 'light_filters', page_size: 100 };

    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (search) params.name = search;
    if (ordering) params.ordering = ordering;
    api.get<ApiProductPage>('/api/catalog/products/', { params })
      .then(({ data }) => {
        let results = data.results ?? (data as unknown as ApiProduct[]);
        if (selectedBrands.length > 0) results = results.filter(p => p.brand && selectedBrands.includes(p.brand.id));
        if (selectedShapes.length > 0) results = results.filter(p => p.frame_shape && selectedShapes.includes(p.frame_shape));
        setProducts(results);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [selectedBrands, selectedShapes, minPrice, maxPrice, search, ordering]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const toggleBrand = (id: number) =>
    setSelectedBrands(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  const toggleShape = (v: string) =>
    setSelectedShapes(prev => prev.includes(v) ? prev.filter(s => s !== v) : [...prev, v]);
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedShapes([]);
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    setOrdering('');
  };

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
            {tl('منتجاتنا', 'Our Products')}
          </h2>

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(v => !v)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg shadow-sm text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              {tl('الفلاتر', 'Filters')}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-lg shadow-md p-4 space-y-6 sticky top-4">


                {/* Sort */}
                <div>
                  <label className="block text-sm font-semibold mb-2">{tl('الترتيب', 'Sort By')}</label>
                  <select
                    value={ordering}
                    onChange={e => setOrdering(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">{tl('الافتراضي', 'Default')}</option>
                    <option value="price">{tl('السعر: الأقل أولاً', 'Price: Low to High')}</option>
                    <option value="-price">{tl('السعر: الأعلى أولاً', 'Price: High to Low')}</option>
                    <option value="name">{tl('الاسم: أ-ي', 'Name: A-Z')}</option>
                    <option value="-name">{tl('الاسم: ي-أ', 'Name: Z-A')}</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                  <h3 className="font-bold mb-4 text-sm">{tl('السعر', 'Price')}</h3>
                  
                  <div className="px-2 mb-6">
                    <div className="relative h-1.5 bg-gray-200 rounded-full">
                      <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary/30 rounded-full"></div>
                      <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md cursor-pointer ${language === 'ar' ? 'right-0' : 'left-0'}`}></div>
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] text-muted-foreground font-medium">
                      <span>{tl('0 جنيه', '0 EGP')}</span>
                      <span>{tl('5000 جنيه', '5000 EGP')}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={() => { setMinPrice(''); setMaxPrice('500'); }}
                      className={`w-full py-2.5 px-4 text-xs rounded-xl border transition-all ${minPrice === '' && maxPrice === '500' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-600'}`}
                    >
                      {tl('أقل من 500 جنيه', 'Less than 500 EGP')}
                    </button>
                    <button 
                      onClick={() => { setMinPrice('500'); setMaxPrice('1000'); }}
                      className={`w-full py-2.5 px-4 text-xs rounded-xl border transition-all ${minPrice === '500' && maxPrice === '1000' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-600'}`}
                    >
                      {tl('500 - 1000 جنيه', '500 - 1000 EGP')}
                    </button>
                    <button 
                      onClick={() => { setMinPrice('1000'); setMaxPrice('1500'); }}
                      className={`w-full py-2.5 px-4 text-xs rounded-xl border transition-all ${minPrice === '1000' && maxPrice === '1500' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-600'}`}
                    >
                      {tl('1000 - 1500 جنيه', '1000 - 1500 EGP')}
                    </button>
                    <button 
                      onClick={() => { setMinPrice('1500'); setMaxPrice(''); }}
                      className={`w-full py-2.5 px-4 text-xs rounded-xl border transition-all ${minPrice === '1500' && maxPrice === '' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-600'}`}
                    >
                      {tl('أكثر من 1500 جنيه', 'More than 1500 EGP')}
                    </button>
                  </div>
                </div>

                {/* Brands */}
                {brands.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">{tl('الماركة', 'Brand')}</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.map(b => (
                        <label key={b.id} className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(b.id)}
                            onChange={() => toggleBrand(b.id)}
                            className="rounded text-primary"
                          />
                          {b.name}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Frame Shapes */}
                <div>
                  <label className="block text-sm font-semibold mb-2">{tl('شكل الإطار', 'Frame Shape')}</label>
                  <div className="space-y-2">
                    {FRAME_SHAPES.map(s => (
                      <label key={s.value} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={selectedShapes.includes(s.value)}
                          onChange={() => toggleShape(s.value)}
                          className="rounded text-primary"
                        />
                        {language === 'ar' ? s.ar : s.en}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={resetFilters}
                  className="w-full text-sm text-primary underline hover:no-underline"
                >
                  {tl('إعادة ضبط الفلاتر', 'Reset Filters')}
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                      <div className="aspect-square bg-gray-200" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
                      <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder={tl('ابحث عن الفلاتر الضوئية...', 'Search for light filters...')}
                        className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-white border border-border rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {tl(`${products.length} منتج`, `${products.length} products`)}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(p => (
                      <ApiProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                  <p className="text-muted-foreground text-lg">
                    {tl('لا توجد منتجات مطابقة', 'No products found')}
                  </p>
                  <button onClick={resetFilters} className="mt-4 text-primary underline text-sm">
                    {tl('إعادة ضبط الفلاتر', 'Reset Filters')}
                  </button>
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
              href="tel:01037834311"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-semibold"
            >
              <Phone className="w-5 h-5" />
              01037834311
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}