import { useLanguage } from '../../context/LanguageContext';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useState } from 'react';

interface ProductFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedGender?: string;
  onGenderChange?: (value: string) => void;
  selectedBrand?: string;
  onBrandChange?: (value: string) => void;
  brands?: string[];
  showGenderFilter?: boolean;
}

export function ProductFilter({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedGender,
  onGenderChange,
  selectedBrand,
  onBrandChange,
  brands = [],
  showGenderFilter = false,
}: ProductFilterProps) {
  const { t, language } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4`} />
          <Input
            placeholder={t('filter.search')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={language === 'ar' ? 'pr-10' : 'pl-10'}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-4 h-4 me-2" />
          {language === 'ar' ? 'الفلاتر' : 'Filters'}
        </Button>

        {/* Desktop Filters */}
        <div className={`flex flex-col md:flex-row gap-3 ${showFilters ? 'flex' : 'hidden md:flex'}`}>
          {/* Sort */}
          <Select value={sortBy} onValueChange={onSortChange}>
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

          {/* Gender Filter */}
          {showGenderFilter && onGenderChange && selectedGender !== undefined && (
            <Select value={selectedGender} onValueChange={onGenderChange}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder={t('filter.gender')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filter.allCategories')}</SelectItem>
                <SelectItem value="male">{t('filter.male')}</SelectItem>
                <SelectItem value="female">{t('filter.female')}</SelectItem>
                <SelectItem value="kids">{t('filter.kids')}</SelectItem>
                <SelectItem value="unisex">{t('filter.unisex')}</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Brand Filter */}
          {brands.length > 0 && onBrandChange && selectedBrand !== undefined && (
            <Select value={selectedBrand} onValueChange={onBrandChange}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder={t('filter.brand')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filter.allCategories')}</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Clear Filters */}
          {(searchTerm || (selectedGender && selectedGender !== 'all') || (selectedBrand && selectedBrand !== 'all')) && (
            <Button
              variant="outline"
              onClick={() => {
                onSearchChange('');
                onGenderChange?.('all');
                onBrandChange?.('all');
              }}
              className="w-full md:w-auto"
            >
              <X className="w-4 h-4 me-2" />
              {t('filter.clearFilters')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
