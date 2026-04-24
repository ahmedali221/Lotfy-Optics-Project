import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle, Award } from 'lucide-react';
import pixxBanner from 'figma:asset/7fe19227599961c777a6a1edf02123c3836e9bca.png';

export function ExclusiveBrands() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award style={{ color: '#ECB273' }} className="w-8 h-8" />
            <h2 
              style={{ color: '#2C3E50' }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              {language === 'ar' ? 'الوكيل الحصري' : 'Exclusive Agent'}
            </h2>
          </div>
          <p 
            style={{ color: '#2C3E50' }}
            className="text-lg opacity-70 max-w-2xl mx-auto"
          >
            {language === 'ar' 
              ? 'فخورون بكوننا الوكيل الحصري لأرقى الماركات العالمية في مصر'
              : 'Proud to be the exclusive agent for premium international brands in Egypt'}
          </p>
        </div>

        {/* Main Brand Showcase - Pixx */}
        <div 
          className="border-2 p-12 md:p-16 transition-all duration-300 hover:shadow-2xl"
          style={{ 
            borderColor: '#ECB273',
            backgroundColor: '#f9f9f9'
          }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Logo Side */}
            <div className="text-center">
              <img 
                src={pixxBanner}
                alt="Pixx Eyewear"
                className="w-full max-w-md mx-auto object-contain"
              />
            </div>

            {/* Info Side */}
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 mb-6"
                style={{ 
                  backgroundColor: '#ECB273',
                  color: '#ffffff'
                }}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">
                  {language === 'ar' ? 'وكيل حصري' : 'EXCLUSIVE AGENT'}
                </span>
              </div>

              <h3 
                style={{ color: '#2C3E50' }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                {language === 'ar' ? 'نظارات Pixx' : 'Pixx Eyewear'}
              </h3>

              <p 
                style={{ color: '#2C3E50' }}
                className="text-lg leading-relaxed mb-6 opacity-80"
              >
                {language === 'ar'
                  ? 'تشكيلة استثنائية من النظارات الطبية والشمسية بتصاميم عصرية وجودة عالمية. نحن الوكيل الوحيد المعتمد في مصر.'
                  : 'Exceptional collection of prescription and sunglasses with modern designs and international quality. We are the only authorized agent in Egypt.'}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {[
                  language === 'ar' ? 'جودة أوروبية معتمدة' : 'Certified European Quality',
                  language === 'ar' ? 'ضمان شامل على جميع المنتجات' : 'Comprehensive Warranty',
                  language === 'ar' ? 'تصاميم حصرية وعصرية' : 'Exclusive Modern Designs',
                  language === 'ar' ? 'خدمة ما بعد البيع المميزة' : 'Premium After-Sales Service'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle 
                      style={{ color: '#ECB273' }} 
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span style={{ color: '#2C3E50' }} className="text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <a
                  href="#products"
                  className="inline-block px-8 py-4 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#ECB273' }}
                >
                  {language === 'ar' ? 'استكشف المجموعة' : 'EXPLORE COLLECTION'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="text-center">
              <div style={{ color: '#2C3E50' }} className="text-2xl font-bold">100%</div>
              <div style={{ color: '#2C3E50' }} className="text-sm">
                {language === 'ar' ? 'أصلي ومضمون' : 'Authentic'}
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div style={{ color: '#2C3E50' }} className="text-2xl font-bold">
                {language === 'ar' ? '+10,000' : '10,000+'}
              </div>
              <div style={{ color: '#2C3E50' }} className="text-sm">
                {language === 'ar' ? 'عميل راضي' : 'Happy Clients'}
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div style={{ color: '#2C3E50' }} className="text-2xl font-bold">
                {language === 'ar' ? 'منذ 1985' : 'Since 1985'}
              </div>
              <div style={{ color: '#2C3E50' }} className="text-sm">
                {language === 'ar' ? 'خبرة وثقة' : 'Trust & Experience'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}