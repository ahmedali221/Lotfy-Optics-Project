import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/products/ProductCard';
import { AdvancedFilter } from '../components/products/AdvancedFilter';
import { getProductsByGender, getBrands, getMaxPrice } from '../data/products';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function EyeglassesSubPage() {
  const { category } = useParams();
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFrameShapes, setSelectedFrameShapes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Map category to gender
  const genderMap: Record<string, string> = {
    'men': 'male',
    'women': 'female',
    'kids': 'kids',
  };

  const gender = genderMap[category || 'men'];
  const allProducts = getProductsByGender('eyeglasses', gender);
  const brands = useMemo(() => {
    const brandCounts: Record<string, number> = {};
    allProducts.forEach(product => {
      if (product.brand) {
        brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
      }
    });
    return Object.entries(brandCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allProducts]);
  
  const maxPrice = Math.max(...allProducts.map(p => p.price), 2000);

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

  const categoryTitles: Record<string, { ar: string; en: string }> = {
    'men': { ar: 'نظارات طبية رجالي', en: 'Men\'s Prescription Glasses' },
    'women': { ar: 'نظارات طبية نسائي', en: 'Women\'s Prescription Glasses' },
    'kids': { ar: 'نظارات طبية للأطفال', en: 'Kids Prescription Glasses' },
  };

  const title = categoryTitles[category || 'men'][language];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2">{title}</h1>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'اختر من بين مجموعة متنوعة من الإطارات الطبية عالية الجودة'
              : 'Choose from a variety of high-quality prescription frames'
            }
          </p>
        </div>

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
  );
}
