import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ApiProductCard } from '../components/products/ApiProductCard';
import { Filter, Search } from 'lucide-react';
import { Slider } from '../components/ui/slider';
import api from '../lib/axios';
import { ApiProduct, ApiProductPage, ApiBrand } from '../types/api';

export function LensesPage() {
  const { language } = useLanguage();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/catalog/brands/', { params: { page_size: 100 } })
      .then(({ data }) => setBrands(data.results ?? data))
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params: Record<string, string | number> = {
      category: 'lens',
      page_size: 100,
      is_active: 'true',
    };

    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (search) params.name = search;
    if (ordering) params.ordering = ordering;

    api.get<ApiProductPage>('/api/catalog/products/', { params })
      .then(({ data }) => setProducts(data.results ?? (data as unknown as ApiProduct[])))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [selectedBrands, minPrice, maxPrice, search, ordering]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const uniqueColours = [...new Set(products.map(p => p.colour).filter(Boolean))].sort();

  const filtered = products.filter(p => {
    if (selectedBrands.length > 0 && !(p.brand && selectedBrands.includes(p.brand.id))) return false;
    if (selectedColours.length > 0 && !selectedColours.includes(p.colour)) return false;
    return true;
  });

  const toggleBrand = (id: number) =>
    setSelectedBrands(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  const toggleColour = (v: string) =>
    setSelectedColours(prev => prev.includes(v) ? prev.filter(c => c !== v) : [...prev, v]);

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedColours([]);
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    setOrdering('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[360px] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920&q=80)` }} />
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-block mb-4 px-5 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-sm text-primary">
            {t('✨ تشكيلة العدسات', '✨ Lenses Collection')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('عدسات لرؤية أوضح', 'Lenses for Clearer Vision')}
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            {t('اكتشف تشكيلتنا الواسعة من العدسات الطبية والتجميلية بأعلى جودة', 'Explore our wide range of prescription and cosmetic lenses with the highest quality')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button onClick={() => setShowFilters(s => !s)} className="flex items-center gap-2 px-5 py-2 bg-secondary text-white rounded-lg text-sm">
            <Filter className="w-4 h-4" />
            {t('الفلاتر', 'Filters')}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-28 space-y-5">



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
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={50}
                    value={[Number(minPrice) || 0, Number(maxPrice) || 5000]}
                    onValueChange={([min, max]) => {
                      setMinPrice(min === 0 ? '' : min.toString());
                      setMaxPrice(max === 5000 ? '' : max.toString());
                    }}
                    className="my-6"
                  />
                  <div className="flex justify-between mt-3 text-[10px] text-muted-foreground font-medium">
                    <span>{t(`${minPrice || 0} جنيه`, `${minPrice || 0} EGP`)}</span>
                    <span>{t(`${maxPrice || 5000} جنيه`, `${maxPrice || 5000} EGP`)}</span>
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

              {/* Colour */}
              {uniqueColours.length > 0 && (
                <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                  <h3 className="font-bold mb-3 text-sm">{t('اللون', 'Colour')}</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uniqueColours.map(colour => (
                      <label key={colour} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" checked={selectedColours.includes(colour)} onChange={() => toggleColour(colour)} className="w-4 h-4 text-primary focus:ring-primary rounded" />
                        <span className="text-sm group-hover:text-primary transition-colors">{colour}</span>
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

          {/* Products */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('ابحث عن عدساتك...', 'Search for your lenses...')}
                  className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-white border border-border rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                />
              </div>
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                {loading ? t('جارٍ التحميل...', 'Loading...') : t(`${filtered.length} منتج`, `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`)}
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
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(p => <ApiProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔭</div>
                <h3 className="mb-2">{t('لا توجد منتجات', 'No Products Found')}</h3>
                <p className="text-muted-foreground mb-6">{t('جرب تغيير الفلاتر', 'Try changing the filters')}</p>
                <button onClick={resetFilters} className="px-6 py-2 bg-primary text-white rounded-lg text-sm">
                  {t('إعادة تعيين', 'Reset Filters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
