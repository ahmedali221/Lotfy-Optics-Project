import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check, Phone, Search, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import api from '../lib/axios';
import { ApiProduct, ApiProductPage, ApiBrand } from '../types/api';
import { ApiProductCard } from '../components/products/ApiProductCard';

export function ArtificialEyesPage() {
  const { language } = useLanguage();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  // Products state
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
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
    const params: Record<string, string | number> = { category: 'artificial_eyes', page_size: 100 };

    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (search) params.name = search;
    if (ordering) params.ordering = ordering;
    api.get<ApiProductPage>('/api/catalog/products/', { params })
      .then(({ data }) => {
        let results = data.results ?? (data as unknown as ApiProduct[]);
        if (selectedBrands.length > 0) results = results.filter(p => p.brand && selectedBrands.includes(p.brand.id));
        setProducts(results);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [selectedBrands, minPrice, maxPrice, search, ordering]);

  useEffect(() => {
    const t = setTimeout(fetchProducts, 300);
    return () => clearTimeout(t);
  }, [fetchProducts]);

  const toggleBrand = (id: number) =>
    setSelectedBrands(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  const resetFilters = () => {
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    setOrdering('');
  };

  const features = [
    {
      ar: 'تطابق تام مع العين السليمة',
      en: 'Perfect match with the healthy eye',
    },
    {
      ar: 'خامات طبية عالية الجودة (PMMA)',
      en: 'High-quality medical materials (PMMA)',
    },
    {
      ar: 'تصميم بتقنية البصمة لحركة طبيعية',
      en: 'Custom design for natural movement',
    },
    {
      ar: 'مقاومة للبكتيريا وسهلة التنظيف',
      en: 'Bacteria-resistant and easy to clean',
    },
    {
      ar: 'متوفرة بأكثر من 250 درجة لونية',
      en: 'Available in over 250 color shades',
    },
    {
      ar: 'متابعة دورية ودعم مستمر',
      en: 'Regular follow-up and continuous support',
    },
  ];

  const process = [
    {
      step: '1',
      title: { ar: 'استشارة مجانية', en: 'Free Consultation' },
      desc: { ar: 'فحص شامل وتقييم الحالة', en: 'Comprehensive examination and assessment' },
    },
    {
      step: '2',
      title: { ar: 'أخذ المقاسات والطبعة', en: 'Taking Measurements' },
      desc: { ar: 'أخذ طبعة دقيقة للتجويف', en: 'Accurate impression of the socket' },
    },
    {
      step: '3',
      title: { ar: 'تصميم وطلاء يدوي', en: 'Design & Hand Painting' },
      desc: { ar: 'تلوين دقيق لمطابقة العين الطبيعية', en: 'Precise coloring to match natural eye' },
    },
    {
      step: '4',
      title: { ar: 'تركيب ومتابعة', en: 'Fitting & Follow-up' },
      desc: { ar: 'تركيب العين ومتابعة دورية', en: 'Eye fitting and regular follow-up' },
    },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1663151064065-cb334788f77d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1761864293845-90f7ff41739b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1769414259128-bf8a66a41701?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1623998021736-282f53c4fc07?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1755869980879-1cc345f1980c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1593194777536-e155e6d100b2?w=400&h=400&fit=crop',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1663151064065-cb334788f77d?w=1200&h=400&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="mb-4 text-white">
              {language === 'ar' 
                ? 'عيون صناعية بتقنية الطبعة (البصمة)' 
                : 'Custom Ocular Prosthetics'
              }
            </h1>
            <p className="text-lg opacity-90">
              {language === 'ar'
                ? 'نقدم في لطفي أوبتيكال خدمة تصنيع وتركيب العيون الصناعية بأعلى دقة وجودة، حيث يتم تصنيعها خصيصاً لكل مريض لتطابق العين الطبيعية في اللون والحجم واللمعان'
                : 'At LOTFY OPTICAL, we provide the highest quality custom ocular prosthetics manufacturing and fitting service, specially crafted for each patient to match the natural eye in color, size, and shine'
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

      {/* Process Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">
            {language === 'ar' ? 'عملية التصنيع' : 'Manufacturing Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full items-center justify-center mb-4 text-white text-2xl">
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

      {/* CTA Section */}
      {/* Products Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8">{t('منتجاتنا', 'Our Products')}</h2>

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4 flex justify-end">
            <button onClick={() => setShowFilters(s => !s)} className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm">
              <Filter className="w-4 h-4" />
              {t('الفلاتر', 'Filters')}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-44 space-y-4">

                {/* Sort */}
                <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                  <h3 className="font-bold mb-3 text-sm">{t('ترتيب حسب', 'Sort By')}</h3>
                  <select value={ordering} onChange={e => setOrdering(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">{t('الافتراضي', 'Default')}</option>
                    <option value="price">{t('السعر: الأقل أولاً', 'Price: Low to High')}</option>
                    <option value="-price">{t('السعر: الأعلى أولاً', 'Price: High to Low')}</option>
                    <option value="name">{t('الاسم أ-ي', 'Name A-Z')}</option>
                  </select>
                </div>
                {/* Price Range */}
                <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                  <h3 className="font-bold mb-4 text-sm">{t('السعر', 'Price')}</h3>
                  
                  <div className="px-2 mb-6">
                    <div className="relative h-1.5 bg-gray-200 rounded-full">
                      <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary/30 rounded-full"></div>
                      <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md cursor-pointer ${language === 'ar' ? 'right-0' : 'left-0'}`}></div>
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] text-muted-foreground font-medium">
                      <span>{t('0 جنيه', '0 EGP')}</span>
                      <span>{t('5000 جنيه', '5000 EGP')}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={() => { setMinPrice(''); setMaxPrice('500'); }}
                      className={`w-full py-2.5 px-4 text-xs rounded-xl border transition-all ${minPrice === '' && maxPrice === '500' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-600'}`}
                    >
                      {t('أقل من 500 جنيه', 'Less than 500 EGP')}
                    </button>
                    <button 
                      onClick={() => { setMinPrice('500'); setMaxPrice('1000'); }}
                      className={`w-full py-2.5 px-4 text-xs rounded-xl border transition-all ${minPrice === '500' && maxPrice === '1000' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-600'}`}
                    >
                      {t('500 - 1000 جنيه', '500 - 1000 EGP')}
                    </button>
                    <button 
                      onClick={() => { setMinPrice('1000'); setMaxPrice('1500'); }}
                      className={`w-full py-2.5 px-4 text-xs rounded-xl border transition-all ${minPrice === '1000' && maxPrice === '1500' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-600'}`}
                    >
                      {t('1000 - 1500 جنيه', '1000 - 1500 EGP')}
                    </button>
                    <button 
                      onClick={() => { setMinPrice('1500'); setMaxPrice(''); }}
                      className={`w-full py-2.5 px-4 text-xs rounded-xl border transition-all ${minPrice === '1500' && maxPrice === '' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-600'}`}
                    >
                      {t('أكثر من 1500 جنيه', 'More than 1500 EGP')}
                    </button>
                  </div>
                </div>
                {/* Brands */}
                {brands.length > 0 && (
                  <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                    <h3 className="font-bold mb-3 text-sm">{t('الماركة', 'Brand')}</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.map(b => (
                        <label key={b.id} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" checked={selectedBrands.includes(b.id)} onChange={() => toggleBrand(b.id)} className="w-4 h-4 text-primary focus:ring-primary rounded" />
                          <span className="text-sm group-hover:text-primary transition-colors">{b.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={resetFilters} className="w-full py-2 border border-border rounded-xl text-sm hover:bg-gray-50 transition-colors">
                  {t('إعادة تعيين', 'Reset Filters')}
                </button>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={t('ابحث عن عيون صناعية...', 'Search for artificial eyes...')}
                    className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-white border border-border rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                  />
                </div>
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                  {loading ? t('جارٍ التحميل...', 'Loading...') : t(`${products.length} منتج`, `${products.length} product${products.length !== 1 ? 's' : ''}`)}
                </p>
              </div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg border border-border overflow-hidden animate-pulse">
                      <div className="aspect-square bg-gray-100" />
                      <div className="p-4 space-y-2"><div className="h-4 bg-gray-100 rounded w-3/4" /><div className="h-3 bg-gray-100 rounded w-1/2" /></div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map(p => <ApiProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">👁️</div>
                  <h3 className="mb-2">{t('لا توجد منتجات', 'No Products Found')}</h3>
                  <p className="text-muted-foreground mb-6">{t('جرب تغيير الفلاتر', 'Try changing the filters')}</p>
                  <button onClick={resetFilters} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm">
                    {t('إعادة تعيين', 'Reset Filters')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">
            {language === 'ar' ? 'احصل على استشارة مجانية' : 'Get a Free Consultation'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'تواصل معنا الآن لحجز موعد استشارة مجانية مع متخصصينا'
              : 'Contact us now to book a free consultation with our specialists'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/clinics"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg transition-colors duration-200"
            >
              {language === 'ar' ? 'احجز موعد' : 'Book Appointment'}
            </Link>
            <a
              href="tel:01037834311"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded-lg transition-colors duration-200"
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
