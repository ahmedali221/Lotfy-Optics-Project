import { useLanguage } from '../context/LanguageContext';
import { Eye, Award, Users, MapPin, Target, Heart, Briefcase, CheckCircle } from 'lucide-react';
const storeImage = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop';
import { Glasses } from 'lucide-react';

export function AboutPage() {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Award,
      number: '15+',
      title: { ar: 'سنوات من الخبرة', en: '15+ Years Experience' },
    },
    {
      icon: Users,
      number: '50,000+',
      title: { ar: 'عميل راضٍ', en: '50,000+ Happy Clients' },
    },
    {
      icon: MapPin,
      number: '2',
      title: { ar: 'فروع في أسيوط', en: '2 Branches in Assiut' },
    },
    {
      icon: Eye,
      number: '10,000+',
      title: { ar: 'فحص طبي سنوياً', en: '10,000+ Medical Exams' },
    },
  ];

  const values = [
    {
      icon: Target,
      title: { ar: 'رؤيتنا', en: 'Our Vision' },
      desc: {
        ar: 'أن نكون الوجهة الأولى في صعيد مصر لكل ما يتعلق بصحة وجمال العيون، مع تقديم خدمات طبية وتجارية متكاملة بأعلى معايير الجودة.',
        en: 'To be the premier destination in Upper Egypt for everything related to eye health and beauty, providing comprehensive medical and commercial services with the highest quality standards.',
      },
    },
    {
      icon: Heart,
      title: { ar: 'مهمتنا', en: 'Our Mission' },
      desc: {
        ar: 'تقديم أفضل تجربة للعملاء من خلال الجمع بين أحدث التقنيات الطبية، أرقى الماركات العالمية، وفريق محترف متخصص.',
        en: 'Providing the best customer experience by combining the latest medical technologies, finest international brands, and a professional specialized team.',
      },
    },
    {
      icon: Award,
      title: { ar: 'قيمنا', en: 'Our Values' },
      desc: {
        ar: 'الجودة، الأمانة، الاحترافية، والاهتمام بكل تفاصيل خدمة العميل. نؤمن بأن رؤيتك الواضحة هي أولويتنا.',
        en: 'Quality, Integrity, Professionalism, and attention to every detail of customer service. We believe your clear vision is our priority.',
      },
    },
  ];

  const services = [
    {
      title: { ar: 'عيادات متخصصة', en: 'Specialized Clinics' },
      desc: {
        ar: 'مركز طبي مجهز بأحدث الأجهزة لفحوصات العيون الشامة',
        en: 'Medical center equipped with latest devices for comprehensive eye examinations',
      },
    },
    {
      title: { ar: 'نظارات طبية', en: 'Prescription Eyeglasses' },
      desc: {
        ar: 'نظارات طبية بأحدث التصاميم والعدسات',
        en: 'Prescription eyeglasses with latest designs and lenses',
      },
      icon: Glasses,
    },
    {
      title: { ar: 'عيون صناعية بالبصمة', en: 'Custom Artificial Eyes' },
      desc: {
        ar: 'تصميم وتركيب عيون صناعية بأحدث التقنيات',
        en: 'Design and installation of artificial eyes with latest technologies',
      },
    },
    {
      title: { ar: 'فلاتر لعمى الألوان', en: 'Color Blindness Filters' },
      desc: {
        ar: 'نظارات متخصصة لتصحيح رؤية الألوان',
        en: 'Specialized glasses for color vision correction',
      },
    },
  ];

  const features = [
    { ar: 'أكثر من 15 عاماً من الخبرة والتميز', en: 'Over 15 years of experience and excellence' },
    { ar: 'أحدث التقنيات الطبية في الفحوصات', en: 'Latest medical technologies in examinations' },
    { ar: 'فريق من الأطباء والفنيين المتخصصين', en: 'Team of specialized doctors and technicians' },
    { ar: 'أرقى الماركات اامية للنظارات', en: 'Finest international eyewear brands' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <div className="relative bg-secondary text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1758193017781-e3aee6c3e359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Lotfy Optical Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/75"></div>
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-6 py-2 bg-primary/30 backdrop-blur-sm rounded-full text-primary border border-primary/30 mb-6">
              <span className="text-sm font-medium">
                {language === 'ar' ? 'منذ عام 2011' : 'Since 2011'}
              </span>
            </div>

            <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl">
              {language === 'ar' ? 'محلات لطفي أوبتيكال' : 'LOTFY OPTICAL'}
            </h1>

            <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed drop-shadow-lg">
              {language === 'ar'
                ? 'رحلة من الثقة والتميز في خدمة العيون'
                : 'A journey of trust and excellence in eye care'
              }
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white/95 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature[language]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 mb-4">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-3xl font-bold text-secondary mb-2">{stat.number}</div>
                  <p className="text-muted-foreground font-medium">{stat.title[language]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Store Image Section - IMPROVED */}
      <div className="py-20 bg-gradient-to-b from-white to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-primary mb-4">
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'تعرف علينا' : 'Get To Know Us'}
                </span>
              </div>
              <h2 className="mb-4">
                {language === 'ar' ? 'فروعنا الحديثة والمتطورة' : 'Our Modern & Advanced Branches'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'تصميم عصري وأنيق يوفر لك تجربة تسوق استثنائية مع أحدث المعدات والتقنيات'
                  : 'Modern and elegant design providing exceptional shopping experience with latest equipment and technologies'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={storeImage}
                    alt="Lotfy Optical Store"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-secondary">
                      {language === 'ar' ? 'تشكيلة ضخمة ومتنوعة' : 'Huge & Diverse Collection'}
                    </h4>
                    <p className="text-muted-foreground">
                      {language === 'ar'
                        ? 'آلاف النماذج من أرقى الماركات العالمية مثل Ray-Ban وGucci Fendi وغي'
                        : 'Thousands of models from finest international brands like Ray-Ban, Gucci, Fendi and more'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-secondary">
                      {language === 'ar' ? 'خدمة عملاء متميزة' : 'Distinguished Customer Service'}
                    </h4>
                    <p className="text-muted-foreground">
                      {language === 'ar'
                        ? 'فريق متخصص ومدرب على أعلى مستوى لمساعدتك في الاختيار المثالي'
                        : 'Specialized team trained at the highest level to help you with the perfect choice'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-secondary">
                      {language === 'ar' ? 'بيئة تسوق راقية' : 'Elegant Shopping Environment'}
                    </h4>
                    <p className="text-muted-foreground">
                      {language === 'ar'
                        ? 'تصميم داخلي فاخر ومريح مع إضاءة مثالية لتجربة ألوان النظارات بوضوح'
                        : 'Luxurious comfortable interior design with perfect lighting to experience glasses colors clearly'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-secondary">
                      {language === 'ar' ? 'عيادات طبية متكاملة' : 'Complete Medical Clinics'}
                    </h4>
                    <p className="text-muted-foreground">
                      {language === 'ar'
                        ? 'أطباء متخصصون وأحدث الأجهزة الطبية للفحوصات والكشف الشامل'
                        : 'Specialized doctors and latest medical equipment for comprehensive examinations'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-primary mb-4">
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'رحلتنا' : 'Our Journey'}
                </span>
              </div>
              <h2 className="mb-6">
                {language === 'ar' ? 'قصتنا' : 'Our Story'}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {language === 'ar'
                  ? 'من البداية المتواضعة إلى الريادة في مجال البصريات'
                  : 'From humble beginnings to leadership in optics'
                }
              </p>
            </div>

            {/* Story Content - Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left - Images Collage */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {/* Large Image */}
                  <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl h-[300px] group">
                    <img
                      src="https://images.unsplash.com/photo-1760337871482-9dd93e75fa88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                      alt="Eyeglasses Collection"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-bold text-lg">
                        {language === 'ar' ? 'تشكيلة فاخرة' : 'Luxury Collection'}
                      </p>
                    </div>
                  </div>

                  {/* Small Image 1 */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl h-[200px] group">
                    <img
                      src="https://images.unsplash.com/photo-1766310549795-dd0fc75d499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                      alt="Eye Examination"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent"></div>
                  </div>

                  {/* Small Box with Stats */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 shadow-xl h-[200px] flex flex-col justify-center items-center text-white">
                    <div className="text-5xl font-bold mb-2">15+</div>
                    <div className="text-center text-sm">
                      {language === 'ar' ? 'عاا من التميز' : 'Years of Excellence'}
                    </div>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
              </div>

              {/* Right - Story Text */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mt-1">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-3">
                      {language === 'ar' ? 'البداية في 2011' : 'The Beginning in 1999'}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'ar'
                        ? 'بدأت قصة لطفي أوبتيكال في عام 1999 برؤية واضحة: تقديم أفضل خدمات العناية بالعيون في صعيد مصر. من البداية المواضعة مونا لنصبح واحدة من أبرز الوجهات في أسيوط لكل ما يتعلق بصحة وجمال العيون.'
                        : 'The story of LOTFY OPTICAL began in 2011 with a clear vision: to provide the best eye care services in Upper Egypt. From humble beginnings, we have grown to become one of the premier destinations in Assiut for everything related to eye health and beauty.'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mt-1">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-3">
                      {language === 'ar' ? 'التميز والجودة' : 'Excellence & Quality'}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'ar'
                        ? 'نفخر بتقديم تشكيلة واسعة من أرقى الماركات العالمية للنظارات، إلى جانب عيادات طبية متخصص مجهزة أحدث التقنيات. فريقنا من الأطباء والفنيين المتخصصين ملتزم بتقديم أعلى مستوى من الرعاية والخدمة.'
                        : 'We pride ourselves on offering a wide range of the finest international eyewear brands, alongside specialized medical clinics equipped with the latest technologies. Our team of specialized doctors and technicians is committed to providing the highest level of care and service.'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mt-1">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-3">
                      {language === 'ar' ? 'ثقة العملاء' : 'Customer Trust'}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'ar'
                        ? 'على مدار أكثر من 15 عاماً، خدمنا أكثر من 50,000 عميل راضٍ، وأصبحنا الخيار الأل لآلاف العائلات في صعيد مصر. ثقتكم بنا هي سر نجاحنا واستمراريتنا.'
                        : 'Over more than 15 years, we have served over 50,000 satisfied customers and become the first choice for thousands of families in Upper Egypt. Your trust in us is the secret of our success and continuity.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'ar' ? 'رحلة النجاح' : 'Success Journey'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl text-white font-bold text-xl mb-4">
                    2019
                  </div>
                  <h4 className="font-bold mb-2 text-secondary">
                    {language === 'ar' ? 'التأسيس' : 'Foundation'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'افتتاح أول فرع في أسيوط' : 'Opening first branch in Assiut'}
                  </p>
                </div>

                <div className="relative p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl border-2 border-secondary/20 hover:border-secondary hover:shadow-xl transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl text-white font-bold text-xl mb-4">
                    2021
                  </div>
                  <h4 className="font-bold mb-2 text-secondary">
                    {language === 'ar' ? 'الريادة' : 'Leadership'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'آلاف العملاء الراضين عن خدماتنا' : 'Thousands of customers satisfied with our services'}
                  </p>
                </div>

                <div className="relative p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl text-white font-bold text-xl mb-4">
                    2026
                  </div>
                  <h4 className="font-bold mb-2 text-secondary">
                    {language === 'ar' ? 'التوسع' : 'Expansion'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'افتتاح الفرع الثاني والعيادة الطبية' : 'Opening second branch and medical clinic'}
                  </p>
                </div>

                <div className="relative p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl border-2 border-secondary/20 hover:border-secondary hover:shadow-xl transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl text-white font-bold text-xl mb-4">
                    2026
                  </div>
                  <h4 className="font-bold mb-2 text-secondary">
                    {language === 'ar' ? 'التطوير' : 'Development'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'إضافة خدمات العيون الصناعية وإنشاء عيادات خاصة' : 'Adding artificial eyes services and establishing private clinics'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-background relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-primary mb-4">
              <span className="text-sm font-medium">
                {language === 'ar' ? 'مبادئنا' : 'Our Principles'}
              </span>
            </div>
            <h2 className="mb-4">
              {language === 'ar' ? 'رؤيتنا ومهمتنا وقيمنا' : 'Our Vision, Mission & Values'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar'
                ? 'نؤمن بالتميز والابتكار في كل ما نقدمه لعملائنا'
                : 'We believe in excellence and innovation in everything we offer to our customers'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-white rounded-2xl border-2 border-border hover:border-primary hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 mb-6">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="mb-4 text-xl">{value.title[language]}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.desc[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              {language === 'ar' ? 'خدماتنا المتكاملة' : 'Our Comprehensive Services'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-background rounded-xl border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <Briefcase className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="mb-2 font-bold">{service.title[language]}</h4>
                <p className="text-sm text-muted-foreground">
                  {service.desc[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589104759909-e355f8999f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Medical Team Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/92"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-primary mb-4">
              <span className="text-sm font-medium">
                {language === 'ar' ? 'خبرة واحترافية' : 'Expertise & Professionalism'}
              </span>
            </div>
            <h2 className="mb-6">
              {language === 'ar' ? 'فريقنا المتخصص' : 'Our Specialized Team'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {language === 'ar'
                ? 'نفتخر بفريق من الأطباء والفنيين المؤهلين تأهيلاً عالياً، الحاصلين على شهادات دولية معتمدة، والملتزمين بالتطوير المستمر لمهاراتهم لتقديم أفضل خدمة لعملائنا.'
                : 'We are proud of our team of highly qualified doctors and technicians, holding internationally accredited certifications, and committed to continuously developing their skills to provide the best service to our customers.'
              }
            </p>

            {/* Team Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-border hover:border-primary transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold mb-2 text-secondary">
                  {language === 'ar' ? 'أطباء معتمدون' : 'Certified Doctors'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'شهادات دولية معتمدة' : 'International certifications'}
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-border hover:border-primary transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold mb-2 text-secondary">
                  {language === 'ar' ? 'فريق متخصص' : 'Specialized Team'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'خبرة أكثر من 15 عاماً' : 'Over 15 years experience'}
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-border hover:border-primary transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold mb-2 text-secondary">
                  {language === 'ar' ? 'رعاية شاملة' : 'Comprehensive Care'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'اهتمام بكل التفاصيل' : 'Attention to every detail'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Simple & Clean */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-secondary rounded-3xl overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1768297087306-491d4d84ede1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
                  alt="Visit Us"
                  className="w-full h-full object-cover opacity-15"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
                <h2 className="text-white text-3xl md:text-4xl mb-4">
                  {language === 'ar' ? 'زورونا اليوم' : 'Visit Us Today'}
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  {language === 'ar'
                    ? 'نحن في انتظارك في أحد فروعنا لتجربة خدماتنا المتميزة والحصول على استشارة مجانية'
                    : 'We are waiting for you at one of our branches to experience our distinguished services and get free consultation'
                  }
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="/branches"
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 hover:scale-105 transition-all duration-200"
                  >
                    {language === 'ar' ? 'تعرف على فروعنا' : 'Our Branches'}
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-secondary rounded-xl font-medium hover:bg-white/90 hover:scale-105 transition-all duration-200"
                  >
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}