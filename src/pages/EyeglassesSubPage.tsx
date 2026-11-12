import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Dropdown } from '../components/Dropdown';
import { ApiProductCard } from '../components/products/ApiProductCard';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { ApiProduct, ApiBrand } from '../types/api';
import api from '../lib/axios';
import { fetchAllPages, useInfiniteList } from '../lib/pagination';
import { LoadMoreSentinel } from '../components/products/LoadMoreSentinel';
import { useRestoreScroll } from '../components/layout/ScrollToTop';
import { readList, readNumberList, useSyncSearchParams } from '../hooks/useUrlFilters';

const GENDER_MAP: Record<string, string> = {
  men: 'male',
  women: 'female',
  kids: 'kids',
  unisex: 'unisex',
};

const FRAME_SHAPES = [
  { value: 'square',    ar: 'مربع',    en: 'Square'    },
  { value: 'rectangle', ar: 'مستطيل', en: 'Rectangle' },
  { value: 'round',     ar: 'دائري',  en: 'Round'     },
  { value: 'cat_eye',   ar: 'كات آي', en: 'Cat Eye'   },
  { value: 'oval',      ar: 'بيضاوي', en: 'Oval'      },
];

const TITLES: Record<string, { ar: string; en: string }> = {
  men:   { ar: 'نظارات طبية رجالي',    en: "Men's Prescription Glasses"   },
  women: { ar: 'نظارات طبية نسائي',    en: "Women's Prescription Glasses" },
  kids:  { ar: 'نظارات طبية للأطفال',  en: 'Kids Prescription Glasses'    },
  unisex: { ar: 'نظارات طبية للجنسين', en: 'Unisex Prescription Glasses' },
};

export function EyeglassesSubPage() {
  const { category = 'men' } = useParams<{ category: string }>();
  const { language } = useLanguage();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const [searchParams] = useSearchParams();

  // Filters start from the URL so Back from a product page restores them.
  const [selectedBrands, setSelectedBrands] = useState<number[]>(() => readNumberList(searchParams, 'brands'));
  const [selectedShapes, setSelectedShapes] = useState<string[]>(() => readList(searchParams, 'shapes'));
  const [selectedColours, setSelectedColours] = useState<string[]>(() => readList(searchParams, 'colours'));
  const [minPrice, setMinPrice] = useState(() => searchParams.get('min') ?? '');
  const [maxPrice, setMaxPrice] = useState(() => searchParams.get('max') ?? '');
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '');
  const [ordering, setOrdering] = useState(() => searchParams.get('sort') ?? '');
  const [showFilters, setShowFilters] = useState(false);

  const list = useInfiniteList<ApiProduct>();
  const { items: products, loading, load } = list;
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [colours, setColours] = useState<string[]>([]);

  useRestoreScroll(!loading);

  useSyncSearchParams({
    brands: selectedBrands.join(','),
    shapes: selectedShapes.join(','),
    colours: selectedColours.join(','),
    min: minPrice,
    max: maxPrice,
    q: search,
    sort: ordering,
  });

  useEffect(() => {
    fetchAllPages<ApiBrand>('/api/catalog/brands/')
      .then(setBrands)
      .catch(() => {});
  }, []);

  // Colour options cover the whole category, not just the loaded batch.
  useEffect(() => {
    const params: Record<string, string> = { category: 'glasses' };
    if (GENDER_MAP[category]) params.gender = GENDER_MAP[category];
    api.get<string[]>('/api/catalog/products/colours/', { params })
      .then(r => setColours(r.data))
      .catch(() => setColours([]));
  }, [category]);

  const fetchProducts = useCallback(() => {
    const params: Record<string, string> = {
      category: 'glasses',
      is_active: 'true',
    };
    const mappedGender = GENDER_MAP[category];
    if (mappedGender) params.gender = mappedGender;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (search) params.name = search;
    // Lists are sent comma-separated; the API matches any listed value.
    if (selectedBrands.length) params.brand = selectedBrands.join(',');
    if (selectedShapes.length) params.frame_shape = selectedShapes.join(',');
    if (selectedColours.length) params.colour = selectedColours.join(',');
    params.ordering = ordering || '-id'; // newest first by default

    load('/api/catalog/products/', params).catch(() => {});
  }, [load, category, minPrice, maxPrice, search, selectedBrands, selectedShapes, selectedColours, ordering]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  // No total count from the API: "+" means more products load on scroll.
  const countLabel = `${products.length}${list.hasMore ? '+' : ''}`;

  const toggleBrand = (id: number) =>
    setSelectedBrands(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  const toggleShape = (v: string) =>
    setSelectedShapes(prev => prev.includes(v) ? prev.filter(s => s !== v) : [...prev, v]);

  const toggleColour = (v: string) =>
    setSelectedColours(prev => prev.includes(v) ? prev.filter(c => c !== v) : [...prev, v]);

  const title = TITLES[category]?.[language] ?? TITLES.men[language];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">{title}</h1>
          <p className="text-muted-foreground text-sm">
            {t('اختر من بين مجموعة متنوعة من الإطارات الطبية عالية الجودة', 'Choose from a variety of high-quality prescription frames')}
          </p>
        </div>

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button onClick={() => setShowFilters(s => !s)} className="flex items-center gap-2 px-5 py-2 bg-secondary text-white rounded-lg text-sm">
            <Filter className="w-4 h-4" />
            {t('الفلاتر', 'Filters')}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`lg:col-span-1 space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>

            <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
              <h3 className="font-bold mb-3 text-sm">{t('بحث', 'Search')}</h3>
              <div className="relative">
                <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('اسم المنتج...', 'Product name...')}
                  className={`w-full ${language === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary`} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
              <h3 className="font-bold mb-3 text-sm">{t('ترتيب', 'Sort')}</h3>
              <Dropdown
                value={ordering}
                onChange={setOrdering}
                options={[
                  { value: '', label: t('الأحدث', 'Newest') },
                  { value: 'price', label: t('السعر: الأقل', 'Price: Low to High') },
                  { value: '-price', label: t('السعر: الأعلى', 'Price: High to Low') },
                  { value: 'name', label: t('الاسم', 'Name A-Z') },
                ]}
                triggerClassName="py-2"
              />
            </div>

            <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
              <h3 className="font-bold mb-3 text-sm">{t('نطاق السعر', 'Price Range')}</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder={t('من', 'Min')} value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full px-2 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <span className="text-muted-foreground">-</span>
                <input type="number" placeholder={t('إلى', 'Max')} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full px-2 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            {brands.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
                <h3 className="font-bold mb-3 text-sm">{t('الماركة', 'Brand')}</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map(b => (
                    <label key={b.id} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={selectedBrands.includes(b.id)} onChange={() => toggleBrand(b.id)} className="w-4 h-4 text-primary focus:ring-primary rounded" />
                      <span className="text-sm group-hover:text-primary transition-colors">{b.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
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

            {colours.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
                <h3 className="font-bold mb-3 text-sm">{t('اللون', 'Colour')}</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {colours.map(colour => (
                    <label key={colour} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={selectedColours.includes(colour)} onChange={() => toggleColour(colour)} className="w-4 h-4 text-primary focus:ring-primary rounded" />
                      <span className="text-sm group-hover:text-primary transition-colors">{colour}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {loading ? t('جارٍ التحميل...', 'Loading...') : t(`${countLabel} منتج`, `${countLabel} products`)}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-border overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-100" />
                    <div className="p-4 space-y-2"><div className="h-4 bg-gray-100 rounded w-3/4" /><div className="h-3 bg-gray-100 rounded w-1/2" /></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {products.map(p => <ApiProductCard key={p.id} product={p} />)}
                </div>
                <LoadMoreSentinel hasMore={list.hasMore} loading={list.loadingMore} failed={list.loadMoreFailed} onLoadMore={list.loadMore} />
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t('لا توجد منتجات', 'No products found')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
