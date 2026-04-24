import { useLanguage } from '../context/LanguageContext';
import { Check, Phone } from 'lucide-react';
import { Link } from 'react-router';

export function ArtificialEyesPage() {
  const { language } = useLanguage();

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
              href="tel:01012115763"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded-lg transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
              01012115763
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
