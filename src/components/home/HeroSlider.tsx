import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Glasses, Calendar, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import hero from "../../assets/hero.png"
import api from '../../lib/axios';
import { resolveImageUrl } from '../products/ApiProductCard';

export function HeroSlider() {
  const { language } = useLanguage();
  // null while loading, so the bundled image does not flash before the uploaded one.
  const [heroUrl, setHeroUrl] = useState<string | null>(null);

  // Staff upload the header image in the dashboard; 404 means none was uploaded yet.
  useEffect(() => {
    api.get<{ image: string }>('/api/site/images/latest/', { params: { category: 'header' } })
      .then(({ data }) => setHeroUrl(data.image ? resolveImageUrl(data.image) : hero))
      .catch(() => setHeroUrl(hero));
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-secondary">
      {/* Background Image with Overlay */}
      {heroUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroUrl})`,
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/20" />

      {/* Content */}
      <div className="relative h-full flex items-center z-10">
        <div className="container mx-auto px-4">
          <div className={`max-w-2xl ${language === 'ar' ? 'mr-0' : 'ml-0'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              {language === 'ar'
                ? 'مركز لطفي للبصريات'
                : 'LOTFY OPTICAL CENTER'
              }
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {language === 'ar'
                ? 'رؤية واضحة... حياة أجمل'
                : 'Clear Vision... Better Life'
              }
            </p>

            <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {language === 'ar'
                ? 'متخصصون في النظارات الطبية، العيون الصناعية بالبصمة والفلاتر الضوئية لعمى الألوان | خبرة لمدة 15 عام'
                : 'Specialists in Medical Eyewear, Custom Artificial Eyes & Color Blindness Light Filters | 15 Years of Experience'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/eyeglasses"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Glasses className="w-5 h-5" />
                <span>{language === 'ar' ? 'تسوق النظارات الان' : 'Shop Glasses Now'}</span>
              </Link>
              <Link
                to="/clinics"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                <span>{language === 'ar' ? 'احجز موعدك' : 'Book Appointment'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </div>
  );
}