import { useState, useEffect } from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router';
import { ApiProductCard } from '../components/products/ApiProductCard';
import { ApiProduct } from '../types/api';
import { Calendar, Shield, Award, Truck, ArrowRight, Clock, BadgeCheck, Star } from 'lucide-react';
import api from '../lib/axios';
import pixxLogo from  '../assets/pix.png';
export function HomePage() {
  const { t, language } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandNames, setBrandNames] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    api.get('/api/catalog/products/', { params: { is_active: 'true', page_size: 8, ordering: '-id' } })
      .then(({ data }) => setFeaturedProducts(data.results ?? data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    api.get('/api/catalog/brands/', { params: { page_size: 100 } })
      .then(({ data }) => {
        const names: string[] = (data.results ?? data).map((b: { name: string }) => b.name).filter(Boolean);
        if (names.length > 0) setBrandNames(names);
      })
      .catch(() => {});
  }, []);

  const features = [
    {
      icon: Shield,
      title: language === 'ar' ? 'منتجات أصلية' : 'Authentic Products',
      desc: language === 'ar' ? 'جميع منتجاتنا أصلية 100%' : 'All our products are 100% authentic',
    },
    {
      icon: Truck,
      title: language === 'ar' ? 'توصيل سريع' : 'Fast Delivery',
      desc: language === 'ar' ? 'توصيل خلال 24 ساعة داخل أسيوط' : '24h delivery in Assiut',
    },
    {
      icon: Calendar,
      title: language === 'ar' ? 'حجز مواعيد سهل' : 'Easy Booking',
      desc: language === 'ar' ? 'احجز موعد�� في العيادة بسهولة' : 'Book your clinic appointment easily',
    },
    {
      icon: Award,
      title: language === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee',
      desc: language === 'ar' ? 'ضمان شامل على جميع المنتجات' : 'Full warranty on all products',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Clinic CTA Section */}
      <div className="py-24 bg-secondary relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1770220174562-be196295d0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Medical Clinic"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* Right Side - Content */}
              <div className="lg:col-span-3 text-center lg:text-right">
                <div className="inline-block px-5 py-2 bg-primary/20 rounded-full text-primary mb-6">
                  <span className="text-sm font-medium">
                    {language === 'ar' ? 'عيادات متخصصة' : 'Specialized Clinics'}
                  </span>
                </div>

                <h2 className="white mb-5" style={{ color: '#ffffff' }}>
                  {language === 'ar' ? 'مركز لطفي للبصريات الطبي' : 'LOTFY OPTICAL Medical Center'}
                </h2>

                <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {language === 'ar'
                    ? 'مركز طبي متكامل مجهز بأحدث التقنيات الطبية مع فريق من الأطباء المتخصصين'
                    : 'A comprehensive medical center equipped with the latest technologies and specialized doctors'
                  }
                </p>

                <Link
                  to="/clinics"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-lg font-medium transition-all duration-200 group"
                >
                  <span>{language === 'ar' ? 'احجز موعدك الآن' : 'Book Your Appointment'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
                </Link>
              </div>

              {/* Left Side - Stats */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <p className="text-white/70 text-sm">{language === 'ar' ? 'سنة خبرة' : 'Years'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                  <p className="text-white/70 text-sm">{language === 'ar' ? 'عميل راضٍ' : 'Happy Clients'}</p>
                </div>
                <div className="col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-white/70 text-sm">{language === 'ar' ? 'رضا العملاء' : 'Satisfaction'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              {language === 'ar' ? 'أحدث المنتجات' : 'Latest Products'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'تصفح أحدث إضافاتنا من النظارات والمنتجات البصرية'
                : 'Browse our latest additions of eyewear and optical products'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-border overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map(p => <ApiProductCard key={p.id} product={p} />)
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="text-5xl mb-4">✨</div>
                <p className="text-muted-foreground">
                  {language === 'ar' ? 'انتظروا تشكيلتنا الجديدة قريباً' : 'Stay tuned for our new collection soon'}
                </p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/sunglasses"
              className="inline-block bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {t('common.viewAll')}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              {language === 'ar' ? 'لماذا تختار لطفي للبصريات؟' : 'Why Choose LOTFY OPTICAL?'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar'
                ? 'نقدم لك تجربة متميزة في عالم البصريات مع ضمان الجودة والاحترافية'
                : 'We provide you with a distinguished experience in optics with quality and professionalism guarantee'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  {/* Icon */}
                  <div className="inline-flex p-6 rounded-2xl bg-primary/5 mb-5 group-hover:bg-primary transition-all duration-300">
                    <Icon className="w-12 h-12 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h4 className="mb-3 font-bold text-secondary">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Exclusive Agent Section - Pixx */}
      <div className="py-20 bg-background relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Content */}
            <div className="bg-white border-2 border-primary/20 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Right Side - Logo & Badge */}
                <div className="relative bg-white flex items-center justify-center p-12 lg:p-16">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                      backgroundSize: '30px 30px',
                      color: '#ECB273'
                    }}></div>
                  </div>

                  <div className="relative text-center">
                    {/* Exclusive Badge */}
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full mb-8 border border-primary/20">
                      <BadgeCheck className="w-5 h-5 text-primary" />
                      <span className="text-sm font-bold text-primary">
                        {language === 'ar' ? 'الوكيل الحصري' : 'EXCLUSIVE AGENT'}
                      </span>
                    </div>

                    {/* Logo */}
                    <div className="mb-8">
                      <img
                        src={pixxLogo}
                        alt="Pixx Logo"
                        className="w-full max-w-[280px] h-auto mx-auto"
                      />
                    </div>

                    {/* Stars Rating */}
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground font-medium">
                      {language === 'ar' ? 'ماركة عالمية رائدة' : 'Leading International Brand'}
                    </p>
                  </div>
                </div>

                {/* Left Side - Text Content */}
                <div className="bg-gradient-to-br from-secondary via-secondary to-secondary/95 text-white p-8 lg:p-12 flex flex-col justify-center">
                  {/* Title */}
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                    {language === 'ar'
                      ? 'الوكيل الحصري لماركة Pixx في مصر'
                      : 'Exclusive Agent for Pixx in Egypt'
                    }
                  </h2>

                  {/* Description */}
                  <p className="text-white/90 text-lg mb-8 leading-relaxed">
                    {language === 'ar'
                      ? 'نفتخر بكوننا الوكيل الحصري والوحيد لماركة Pixx ��لعالمية في مصر. نقدم لكم تشكيلة فاخرة من النظارات بأعلى معايير الجودة والتصميم العصري.'
                      : 'We are proud to be the exclusive and only agent for the international Pixx brand in Egypt. We offer you a luxurious collection of eyewear with the highest standards of quality and modern design.'
                    }
                  </p>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                        <BadgeCheck className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-white/95">
                        {language === 'ar'
                          ? 'منتجات أصلية 100% مستوردة مباشرة'
                          : '100% authentic products imported directly'
                        }
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                        <BadgeCheck className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-white/95">
                        {language === 'ar'
                          ? 'تصاميم عصرية وجودة عالمية مميزة'
                          : 'Modern designs and distinguished international quality'
                        }
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                        <BadgeCheck className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-white/95">
                        {language === 'ar'
                          ? 'ضمان رسمي على جميع المنتجات'
                          : 'Official warranty on all products'
                        }
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                        <BadgeCheck className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-white/95">
                        {language === 'ar'
                          ? 'تشكيلة واسعة ومتجددة باستمرار'
                          : 'Wide and constantly updated collection'
                        }
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/sunglasses"
                    className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  >
                    <span>{language === 'ar' ? 'تسوق الآن' : 'Shop Now'}</span>
                    <ArrowRight
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }}
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Indicator */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? '🏆 متوفر حصرياً في مراكز لطفي للبصريات - احذر التقليد'
                  : '🏆 Available exclusively at LOTFY OPTICAL - Beware of imitations'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges - Brands Section */}
      <div className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              {language === 'ar' ? 'الماركات المتوفرة لدينا' : 'Available Brands'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar'
                ? 'نفتخر بتوفير أرقى الماركات العالمية من النظارات الشمسية ونظارات النظر'
                : 'We are proud to offer the finest international brands of sunglasses and eyeglasses'
              }
            </p>
          </div>
        </div>

        {/* Scrolling Brands - full width infinite marquee */}
        {brandNames.length > 0 && (
          <div
            className="relative w-full overflow-hidden"
            style={{
              // GPU-accelerated layer — keeps the animation butter-smooth
              transform: 'translateZ(0)',
            }}
          >
            {/* Left fade */}
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32"
              style={{ background: 'linear-gradient(to right, var(--background), transparent)' }}
            />
            {/* Right fade */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32"
              style={{ background: 'linear-gradient(to left, var(--background), transparent)' }}
            />

            {/*
              The track holds TWO identical copies of the brand list side-by-side.
              The animation slides the track left by exactly 50% of its own width,
              which equals one full copy — then loops instantly back to 0.
              Because copy-A slides out just as copy-B slides in (both identical),
              the seam is invisible.

              Key rules that make this seamless:
                1. Each item uses padding-right (not gap) so the last item in
                   each copy also carries trailing space → both copies are the
                   same pixel-width → -50% lands on the exact seam.
                2. width: max-content stops the flex row from wrapping.
                3. will-change: transform hints the browser to promote the
                   element to its own compositor layer.
            */}
            <div
              className="marquee-track flex py-4"
              style={{ width: 'max-content', willChange: 'transform' }}
            >
              {/* Copy A */}
              {brandNames.map((brand, i) => (
                <span
                  key={`a-${i}`}
                  className="whitespace-nowrap text-2xl font-bold text-muted-foreground"
                  style={{ paddingRight: '4rem' }}   /* uniform spacing — including after last item */
                >
                  {brand}
                </span>
              ))}
              {/* Copy B — pixel-perfect clone so the loop is invisible */}
              {brandNames.map((brand, i) => (
                <span
                  key={`b-${i}`}
                  className="whitespace-nowrap text-2xl font-bold text-muted-foreground"
                  style={{ paddingRight: '4rem' }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {language === 'ar'
              ? 'وأكثر من 50 ماركة عالمية أخرى متوفرة في فروعنا'
              : 'And more than 50 other international brands available in our branches'
            }
          </p>
        </div>

        <style>{`
          /* Slide the track left by exactly one copy-width, then jump-reset.
             The jump is invisible because copy-A and copy-B are identical. */
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .marquee-track {
            animation: marquee 30s linear infinite;
          }

          /* Pause on hover — gives users a chance to read a brand name */
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      {/* Articles Section */}
      <div className="py-20 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
              <span className="text-sm font-medium text-primary">
                {language === 'ar' ? '📰 مدونة لطفي أوبتيكال' : '📰 Lotfy Optical Blog'}
              </span>
            </div>
            <h2 className="mb-4">
              {language === 'ar' ? 'أحدث المقالات والنصائح' : 'Latest Articles & Tips'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar'
                ? 'اكتشف أحدث النصائح والمعلومات حول العناية بالعيون، النظارات، والصحة البصرية'
                : 'Discover the latest tips and information about eye care, eyewear, and visual health'
              }
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Article 1 */}
            <article className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="relative overflow-hidden h-56">
                <img
                  src="https://images.unsplash.com/photo-1758656321505-95bf802f9a4c?w=800&h=600&fit=crop"
                  alt="Eye Health"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    {language === 'ar' ? 'صحة العيون' : 'Eye Health'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{language === 'ar' ? '15 فبراير 2026' : 'February 15, 2026'}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl mb-3 text-secondary group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {language === 'ar'
                    ? 'نصائح مهمة للحفاظ على صحة عينيك في عصر الشاشات الرقمية'
                    : 'Essential Tips for Protecting Your Eyes in the Digital Age'
                  }
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {language === 'ar'
                    ? 'مع قضاء ساعات طويلة أمام الشاشات، أصبح من الضروري اتباع نصائح محددة للحفاظ على صحة العيون وتجنب الإجهاد البصري. تعرف على أهم النصائح من خبرائنا.'
                    : 'With long hours spent in front of screens, it has become essential to follow specific tips to maintain eye health and avoid visual fatigue. Learn the most important tips from our experts.'
                  }
                </p>

                {/* Read More Link */}
                <Link
                  to="/article/1"
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 font-medium text-sm group/link"
                >
                  <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
                </Link>
              </div>
            </article>

            {/* Article 2 */}
            <article className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="relative overflow-hidden h-56">
                <img
                  src="https://images.unsplash.com/photo-1761864293845-90f7ff41739b?w=800&h=600&fit=crop"
                  alt="Eyeglasses Fashion"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-medium rounded-full">
                    {language === 'ar' ? 'موضة النظارات' : 'Eyewear Fashion'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{language === 'ar' ? '12 فبراير 2026' : 'February 12, 2026'}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl mb-3 text-secondary group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {language === 'ar'
                    ? 'أحدث صيحات النظارات لعام 2026: اختر الإطار المثالي لشخصيتك'
                    : 'Latest Eyewear Trends 2026: Choose the Perfect Frame for Your Style'
                  }
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {language === 'ar'
                    ? 'اكتشف أحدث صيحات النظارات لهذا العام وكيفية اختيار الإطار الذي يناسب شكل وجهك وأسلوبك الشخصي. دليل شامل من خبراء الموضة لدينا.'
                    : 'Discover the latest eyewear trends this year and how to choose the frame that suits your face shape and personal style. A comprehensive guide from our fashion experts.'
                  }
                </p>

                {/* Read More Link */}
                <Link
                  to="/article/2"
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 font-medium text-sm group/link"
                >
                  <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
                </Link>
              </div>
            </article>

            {/* Article 3 */}
            <article className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="relative overflow-hidden h-56">
                <img
                  src="https://images.unsplash.com/photo-1758573467030-52481ea92007?w=800&h=600&fit=crop"
                  alt="Eye Examination"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    {language === 'ar' ? 'الفحوصات الطبية' : 'Medical Exams'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{language === 'ar' ? '10 فبراير 2026' : 'February 10, 2026'}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl mb-3 text-secondary group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {language === 'ar'
                    ? 'متى يجب عليك إجراء فحص شامل للعيون؟ دليل كامل للفحوصات الدورية'
                    : 'When Should You Get a Comprehensive Eye Exam? Complete Guide'
                  }
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {language === 'ar'
                    ? 'الفحوصات الدورية للعيون ضرورية للحفاظ على صحة بصرك واكتشاف أي مشاكل مبكراً. تعرف على المواعيد الموصى بها والفحوصات المهمة.'
                    : 'Regular eye exams are essential for maintaining your vision health and detecting problems early. Learn about recommended schedules and important tests.'
                  }
                </p>

                {/* Read More Link */}
                <Link
                  to="/article/3"
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 font-medium text-sm group/link"
                >
                  <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
                </Link>
              </div>
            </article>
          </div>

          {/* View All Articles Button */}
          <div className="text-center">
            <Link
              to="/articles"
              className="group inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-medium"
            >
              <span>{language === 'ar' ? 'تصفح جميع المقالات' : 'Browse All Articles'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}