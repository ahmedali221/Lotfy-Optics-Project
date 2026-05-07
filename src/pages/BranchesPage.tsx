import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export function BranchesPage() {
  const { t, language } = useLanguage();

  const branches = [
    {
      id: 'ferial',
      name: t('branches.ferial'),
      address: {
        ar: 'أسيوط - فريال شارع الحسن و الحسين متفرع من العدلي امام مخبز قراقيش',
        en: 'Assiut - Ferial, El Hassan & El Hussein St., branching from El Adly, in front of Qaragish Bakery',
      },
      phone: '01118328666',
      hours: {
        ar: 'السبت - الخميس: 10:00 ص - 10:00 م\nالجمعة: 2:00 م - 10:00 م',
        en: 'Sat - Thu: 10:00 AM - 10:00 PM\nFriday: 2:00 PM - 10:00 PM',
      },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.1837!3d27.1809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzUxLjIiTiAzMcKwMTEnMDEuMyJF!5e0!3m2!1sen!2seg!4v1234567890',
    },
    {
      id: 'hoqoqyin',
      name: t('branches.hoqoqyin'),
      address: {
        ar: 'أسيوط - تقسيم الحقوقيين بج الفيروز خلف مساكن عزبه السجن بجوار برج الحريه',
        en: 'Assiut - Hoqoqyin Division, Al Fayrouz Building, behind Ezbet El Segn residences, next to El Horreya Tower',
      },
      phone: '01037839913',
      hours: {
        ar: 'السبت - الخميس: 10:00 ص - 10:00 م\nالجمعة: مغلق',
        en: 'Sat - Thu: 10:00 AM - 10:00 PM\nFriday: Closed',
      },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.1837!3d27.1809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzUxLjIiTiAzMcKwMTEnMDEuMyJF!5e0!3m2!1sen!2seg!4v1234567890',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-white">{t('branches.title')}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'قم بزيارتنا في أحد فروعنا في أسيوط للحصول على أفضل خدمة واستشارة'
              : 'Visit us at one of our branches in Assiut for the best service and consultation'
            }
          </p>
        </div>
      </div>

      {/* Branches */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12 max-w-6xl mx-auto">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Map */}
                  <div className="h-[400px] bg-gray-200">
                    <iframe
                      src={branch.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={branch.name}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <h2 className="mb-6">{branch.name}</h2>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm mb-1">{t('branches.address')}</p>
                          <p className="text-foreground">{branch.address[language]}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm mb-1">{t('branches.phone')}</p>
                          <a 
                            href={`tel:${branch.phone}`}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {branch.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm mb-1">{t('branches.hours')}</p>
                          <p className="text-foreground whitespace-pre-line">
                            {branch.hours[language]}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address.en)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors duration-200"
                        >
                          <Navigation className="w-5 h-5" />
                          {t('branches.getDirections')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">
            {language === 'ar' ? 'هل لديك أي استفسار؟' : 'Have any questions?'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'ar'
              ? 'تواصل معنا الآن وسنكون سعداء بمساعدتك'
              : 'Contact us now and we will be happy to help you'
            }
          </p>
          <a
            href="tel:01037834311"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded-lg transition-colors duration-200"
          >
            <Phone className="w-5 h-5" />
            01037834311
          </a>
        </div>
      </div>
    </div>
  );
}
