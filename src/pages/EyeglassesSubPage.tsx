import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { ApiProductCard } from '../components/products/ApiProductCard';
import { Search } from 'lucide-react';
import api from '../lib/axios';
import { ApiProduct, ApiProductPage, ApiBrand } from '../types/api';

const GENDER_MAP: Record<string, string> = {
  men: 'male',
  women: 'female',
  kids: 'kids',
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
};

export function EyeglassesSubPage() {
  const { category = 'men' } = useParams<{ category: string }>();
  const { language } = useLanguage();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('');

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
    const mappedGender = GENDER_MAP[category];
    if (mappedGender) params.gender = mappedGender;
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
  }, [category, selectedBrands, selectedShapes, minPrice, maxPrice, search, ordering]);

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">

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
              <select value={ordering} onChange={e => setOrdering(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">{t('الافتراضي', 'Default')}</option>
                <option value="price">{t('السعر: الأقل', 'Price: Low to High')}</option>
                <option value="-price">{t('السعر: الأعلى', 'Price: High to Low')}</option>
                <option value="name">{t('الاسم', 'Name A-Z')}</option>
              </select>
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
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {loading ? t('جارٍ التحميل...', 'Loading...') : t(`${filtered.length} منتج`, `${filtered.length} products`)}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-border overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-100" />
                    <div className="p-4 space-y-2"><div className="h-4 bg-gray-100 rounded w-3/4" /><div className="h-3 bg-gray-100 rounded w-1/2" /></div>
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(p => <ApiProductCard key={p.id} product={p} />)}
              </div>
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
