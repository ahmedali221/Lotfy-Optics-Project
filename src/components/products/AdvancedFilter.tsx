import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface AdvancedFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedBrands: string[];
  onBrandsChange: (brands: string[]) => void;
  selectedGenders: string[];
  onGendersChange: (genders: string[]) => void;
  selectedFrameShapes: string[];
  onFrameShapesChange: (shapes: string[]) => void;
  selectedColors: string[];
  onColorsChange: (colors: string[]) => void;
  brands: { name: string; count: number }[];
  maxPrice: number;
  showGenderFilter?: boolean;
  showFrameShapeFilter?: boolean;
  showColorFilter?: boolean;
}

export function AdvancedFilter({
  priceRange,
  onPriceRangeChange,
  selectedBrands,
  onBrandsChange,
  selectedGenders,
  onGendersChange,
  selectedFrameShapes,
  onFrameShapesChange,
  selectedColors,
  onColorsChange,
  brands,
  maxPrice,
  showGenderFilter = true,
  showFrameShapeFilter = true,
  showColorFilter = true,
}: AdvancedFilterProps) {
  const { language } = useLanguage();
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const priceRanges = [
    { min: 0, max: 500, label: language === 'ar' ? 'أقل من 500 جنيه' : 'Less than 500 EGP' },
    { min: 500, max: 1000, label: language === 'ar' ? '500 - 1000 جنيه' : '500 - 1000 EGP' },
    { min: 1000, max: 1500, label: language === 'ar' ? '1000 - 1500 جنيه' : '1000 - 1500 EGP' },
    { min: 1500, max: maxPrice, label: language === 'ar' ? 'أكثر من 1500 جنيه' : 'More than 1500 EGP' },
  ];

  const genderOptions = [
    { value: 'male', label: language === 'ar' ? 'رجالي' : 'Men' },
    { value: 'female', label: language === 'ar' ? 'نسائي' : 'Women' },
    { value: 'kids', label: language === 'ar' ? 'أطفال' : 'Kids' },
    { value: 'unisex', label: language === 'ar' ? 'للجنسين' : 'Unisex' },
  ];

  const frameShapes = [
    { value: 'Aviator', label: language === 'ar' ? 'طيار' : 'Aviator' },
    { value: 'Round', label: language === 'ar' ? 'دائري' : 'Round' },
    { value: 'Square', label: language === 'ar' ? 'مربع' : 'Square' },
    { value: 'Rectangular', label: language === 'ar' ? 'مستطيل' : 'Rectangular' },
    { value: 'Cat Eye', label: language === 'ar' ? 'عين القطة' : 'Cat Eye' },
    { value: 'Wayfarer', label: language === 'ar' ? 'ويفرر' : 'Wayfarer' },
  ];

  const colors = [
    { value: 'Black', label: language === 'ar' ? 'أسود' : 'Black' },
    { value: 'Brown', label: language === 'ar' ? 'بني' : 'Brown' },
    { value: 'Gold', label: language === 'ar' ? 'ذهبي' : 'Gold' },
    { value: 'Silver', label: language === 'ar' ? 'فضي' : 'Silver' },
    { value: 'Blue', label: language === 'ar' ? 'أزرق' : 'Blue' },
    { value: 'Red', label: language === 'ar' ? 'أحمر' : 'Red' },
    { value: 'Pink', label: language === 'ar' ? 'وردي' : 'Pink' },
    { value: 'White', label: language === 'ar' ? 'أبيض' : 'White' },
  ];

  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandsChange(selectedBrands.filter(b => b !== brand));
    } else {
      onBrandsChange([...selectedBrands, brand]);
    }
  };

  const handleGenderToggle = (gender: string) => {
    if (selectedGenders.includes(gender)) {
      onGendersChange(selectedGenders.filter(g => g !== gender));
    } else {
      onGendersChange([...selectedGenders, gender]);
    }
  };

  const handleFrameShapeToggle = (shape: string) => {
    if (selectedFrameShapes.includes(shape)) {
      onFrameShapesChange(selectedFrameShapes.filter(s => s !== shape));
    } else {
      onFrameShapesChange([...selectedFrameShapes, shape]);
    }
  };

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      onColorsChange(selectedColors.filter(c => c !== color));
    } else {
      onColorsChange([...selectedColors, color]);
    }
  };

  const handlePriceRangeClick = (min: number, max: number) => {
    setLocalPriceRange([min, max]);
    onPriceRangeChange([min, max]);
  };

  const clearAllFilters = () => {
    setLocalPriceRange([0, maxPrice]);
    onPriceRangeChange([0, maxPrice]);
    onBrandsChange([]);
    onGendersChange([]);
    onFrameShapesChange([]);
    onColorsChange([]);
  };

  const hasActiveFilters = selectedBrands.length > 0 || 
    selectedGenders.length > 0 || 
    selectedFrameShapes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] !== 0 || 
    priceRange[1] !== maxPrice;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="">{language === 'ar' ? 'الفلاتر' : 'Filters'}</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-primary hover:text-primary-dark"
          >
            <X className="w-4 h-4 me-1" />
            {language === 'ar' ? 'مسح الكل' : 'Clear All'}
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Filter */}
        <div>
          <h4 className="mb-4">{language === 'ar' ? 'السعر' : 'Price'}</h4>
          
          {/* Price Slider */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={localPriceRange[1]}
              onChange={(e) => {
                const newMax = parseInt(e.target.value);
                setLocalPriceRange([localPriceRange[0], newMax]);
              }}
              onMouseUp={() => onPriceRangeChange(localPriceRange)}
              onTouchEnd={() => onPriceRangeChange(localPriceRange)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{language === 'ar' ? '0 جنيه' : '0 EGP'}</span>
              <span>{language === 'ar' ? `${localPriceRange[1]} جنيه` : `${localPriceRange[1]} EGP`}</span>
            </div>
          </div>

          {/* Price Range Buttons */}
          <div className="space-y-2">
            {priceRanges.map((range, index) => {
              const isActive = priceRange[0] === range.min && priceRange[1] === range.max;
              return (
                <button
                  key={index}
                  onClick={() => handlePriceRangeClick(range.min, range.max)}
                  className={`w-full px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-foreground hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gender Filter */}
        {showGenderFilter && (
          <div>
            <h4 className="mb-3">{language === 'ar' ? 'الجنس' : 'Gender'}</h4>
            <div className="space-y-2">
              {genderOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGenders.includes(option.value)}
                    onChange={() => handleGenderToggle(option.value)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Brand Filter */}
        <div>
          <h4 className="mb-3">{language === 'ar' ? 'الماركة' : 'Brand'}</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand.name} className="flex items-center justify-between gap-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.name)}
                    onChange={() => handleBrandToggle(brand.name)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm">{brand.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">({brand.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Frame Shape Filter */}
        {showFrameShapeFilter && (
          <div>
            <h4 className="mb-3">{language === 'ar' ? 'شكل الإطار' : 'Frame Shape'}</h4>
            <div className="space-y-2">
              {frameShapes.map((shape) => (
                <label key={shape.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFrameShapes.includes(shape.value)}
                    onChange={() => handleFrameShapeToggle(shape.value)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm">{shape.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Color Filter */}
        {showColorFilter && (
          <div>
            <h4 className="mb-3">{language === 'ar' ? 'اللون' : 'Color'}</h4>
            <div className="space-y-2">
              {colors.map((color) => (
                <label key={color.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color.value)}
                    onChange={() => handleColorToggle(color.value)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm">{color.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
