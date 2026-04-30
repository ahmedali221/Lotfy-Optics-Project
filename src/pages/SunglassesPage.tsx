import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ApiProductCard } from '../components/products/ApiProductCard';
import { Filter, Search } from 'lucide-react';
import api from '../lib/axios';
import { ApiProduct, ApiProductPage, ApiBrand } from '../types/api';

const GENDERS = [
  { value: '', ar: 'الكل', en: 'All' },
  { value: 'male', ar: 'رجالي', en: 'Men' },
  { value: 'female', ar: 'نسائي', en: 'Women' },
  { value: 'kids', ar: 'أطفال', en: 'Kids' },
  { value: 'unisex', ar: 'للجنسين', en: 'Unisex' },
];

const FRAME_SHAPES = [
  { value: 'square',    ar: 'مربع',    en: 'Square'    },
  { value: 'rectangle', ar: 'مستطيل', en: 'Rectangle' },
  { value: 'round',     ar: 'دائري',  en: 'Round'     },
  { value: 'cat_eye',   ar: 'كات آي', en: 'Cat Eye'   },
  { value: 'oval',      ar: 'بيضاوي', en: 'Oval'      },
];

export function SunglassesPage() {
  const { language } = useLanguage();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const [gender, setGender] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
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
      category: 'frame',
      page_size: 100,
      is_active: 'true',
    };
    if (gender) params.gender = gender;
    if (selectedBrands.length === 1) params.brand = selectedBrands[0];
    if (selectedShapes.length === 1) params.frame_shape = selectedShapes[0];
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (search) params.name = search;
    if (ordering) params.ordering = ordering;

    api.get<ApiProductPage>('/api/catalog/products/', { params })
      .then(({ data }) => setProducts(data.results ?? (data as unknown as ApiProduct[])))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [gender, selectedBrands, selectedShapes, minPrice, maxPrice, search, ordering]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const filtered = products.filter(p => {
    if (selectedBrands.length > 1 && !(p.brand && selectedBrands.includes(p.brand.id))) return false;
    if (selectedShapes.length > 1 && !(p.frame_shape && selectedShapes.includes(p.frame_shape))) return false;
    return true;
  });

  const toggleBrand = (id: number) =>
    setSelectedBrands(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  const toggleShape = (v: string) =>
    setSelectedShapes(prev => prev.includes(v) ? prev.filter(s => s !== v) : [...prev, v]);

  const resetFilters = () => {
    setGender('');
    setSelectedBrands([]);
    setSelectedShapes([]);
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    setOrdering('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[360px] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1920&q=80)` }} />
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-block mb-4 px-5 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-sm text-primary">
            {t('✨ تشكيلة النظارات', '✨ Eyewear Collection')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('نظارات لكل أسلوب', 'Glasses for Every Style')}
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            {t('اكتشف تشكيلتنا المتنوعة بأحدث التصاميم والماركات العالمية', 'Discover our diverse collection with the latest designs and global brands')}
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

              {/* Search */}
              <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                <h3 className="font-bold mb-3 text-sm">{t('بحث', 'Search')}</h3>
                <div className="relative">
                  <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={t('اسم المنتج...', 'Product name...')}
                    className={`w-full ${language === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                </div>
              </div>

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

              {/* Gender */}
              <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                <h3 className="font-bold mb-3 text-sm">{t('الجنس', 'Gender')}</h3>
                <div className="space-y-2">
                  {GENDERS.map(g => (
                    <label key={g.value} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="gender" checked={gender === g.value} onChange={() => setGender(g.value)} className="w-4 h-4 text-primary focus:ring-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">{language === 'ar' ? g.ar : g.en}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                <h3 className="font-bold mb-3 text-sm">{t('نطاق السعر', 'Price Range')}</h3>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder={t('من', 'Min')} value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full px-2 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <span className="text-muted-foreground">-</span>
                  <input type="number" placeholder={t('إلى', 'Max')} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full px-2 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
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

              {/* Frame Shape */}
              <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                <h3 className="font-bold mb-3 text-sm">{t('شكل الإطار', 'Frame Shape')}</h3>
                <div className="space-y-2">
                  {FRAME_SHAPES.map(s => (
                    <label key={s.value} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={selectedShapes.includes(s.value)} onChange={() => toggleShape(s.value)} className="w-4 h-4 text-primary focus:ring-primary rounded" />
                      <span className="text-sm group-hover:text-primary transition-colors">{language === 'ar' ? s.ar : s.en}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={resetFilters} className="w-full py-2 border border-border rounded-xl text-sm hover:bg-gray-50 transition-colors">
                {t('إعادة تعيين', 'Reset Filters')}
              </button>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="mb-5">
              <p className="text-sm text-muted-foreground">
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
                <div className="text-6xl mb-4">👓</div>
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
