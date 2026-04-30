import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'نظارات شمسية',
    desc: 'تشكيلة واسعة من النظارات الشمسية العصرية التي توفر حماية كاملة وتناسب جميع الأذواق.',
    link: '/sunglasses',
    gradient: 'from-yellow-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1764778055595-b641b067ab40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'نظارات طبية',
    desc: 'إطارات طبية أنيقة وعملية مع عدسات عالية الجودة لتوفير رؤية واضحة ومريحة طوال اليوم.',
    link: '/eyeglasses',
    gradient: 'from-blue-400 to-blue-600',
    image: 'https://images.unsplash.com/photo-1565428730183-830036459022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'عيون صناعية بالبصمة',
    desc: 'عيون صناعية مخصصة ومصنعة بدقة باستخدام أحدث التقنيات لتبدو طبيعية تماماً وتعيد الثقة.',
    link: '/artificial-eyes',
    gradient: 'from-purple-400 to-purple-600',
    image: 'https://images.unsplash.com/photo-1602573991396-fb69ee6d7a0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'فلاتر ضوئية (لعمى الألوان)',
    desc: 'فلاتر ضوئية متخصصة لتحسين الرؤية وتصحيح عمى الألوان لتجربة بصرية أكثر وضوحاً وتميزاً.',
    link: '/light-filters',
    gradient: 'from-green-400 to-teal-600',
    image: 'https://images.unsplash.com/photo-1715175430490-f71cbe98beb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    bgColor: 'bg-teal-50',
  },
];

export function CategoryGrid() {
  const { t, language } = useLanguage();

  return (
    <div className="py-20 bg-gradient-to-b from-background to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {language === 'ar' ? 'اكتشف مجموعتنا' : 'Discover Our Collection'}
            </span>
          </div>
          <h2 className="mb-4">
            {language === 'ar' ? 'منتجاتنا وخدماتنا' : 'Our Products & Services'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نقدم مجموعة متنوعة من المنتجات والخدمات البصرية عالية الجودة لتلبية جميع احتياجاتك'
              : 'We offer a diverse range of high-quality optical products and services to meet all your needs'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{categories.map((category) => {
            return (
              <Link
                key={category.link}
                to={category.link}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-transparent hover:border-primary/20"
              >
                {/* Image Container with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}></div>
                  
                  {/* Badge */}
                  <div className={`absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'} ${category.bgColor} backdrop-blur-sm px-3 py-1 rounded-full shadow-md`}>
                    <span className={`text-xs font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                      جديد
                    </span>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {category.desc}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm">عرض التفاصيل</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                  </div>
                </div>

                {/* Decorative Element */}
                <div className={`absolute bottom-0 ${language === 'ar' ? 'left-0' : 'right-0'} w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-10 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-700`}></div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {language === 'ar' 
              ? 'هل تحتاج إلى استشارة متخصصة؟'
              : 'Need specialized consultation?'
            }
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-light text-white rounded-lg transition-colors duration-300 font-medium"
          >
            {language === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Now'}
            <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>
    </div>
  );
}