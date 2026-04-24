import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, ArrowRight, Search, Clock, Eye, TrendingUp, Tag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface Article {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  author: { ar: string; en: string };
  date: { ar: string; en: string };
  category: { ar: string; en: string };
  categoryColor: string;
  image: string;
  readTime: { ar: string; en: string };
  views: number;
}

const articles: Article[] = [
  {
    id: '1',
    slug: 'digital-eye-strain-tips',
    title: {
      ar: 'نصائح مهمة للحفاظ على صحة عينيك في عصر الشاشات الرقمية',
      en: 'Essential Tips for Protecting Your Eyes in the Digital Age',
    },
    excerpt: {
      ar: 'مع قضاء ساعات طويلة أمام الشاشات، أصبح من الضروري اتباع نصائح محددة للحفاظ على صحة العيون وتجنب الإجهاد البصري.',
      en: 'With long hours spent in front of screens, it has become essential to follow specific tips to maintain eye health and avoid visual fatigue.',
    },
    author: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' },
    date: { ar: '15 فبراير 2026', en: 'February 15, 2026' },
    category: { ar: 'صحة العيون', en: 'Eye Health' },
    categoryColor: 'primary',
    image: 'https://images.unsplash.com/photo-1758656321505-95bf802f9a4c?w=800&h=600&fit=crop',
    readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
    views: 2345,
  },
  {
    id: '2',
    slug: 'eyewear-trends-2026',
    title: {
      ar: 'أحدث صيحات النظارات لعام 2026: اختر الإطار المثالي لشخصيتك',
      en: 'Latest Eyewear Trends 2026: Choose the Perfect Frame for Your Style',
    },
    excerpt: {
      ar: 'اكتشف أحدث صيحات النظارات لهذا العام وكيفية اختيار الإطار الذي يناسب شكل وجهك وأسلوبك الشخصي.',
      en: 'Discover the latest eyewear trends this year and how to choose the frame that suits your face shape and personal style.',
    },
    author: { ar: 'سارة أحمد', en: 'Sarah Ahmed' },
    date: { ar: '12 فبراير 2026', en: 'February 12, 2026' },
    category: { ar: 'موضة النظارات', en: 'Eyewear Fashion' },
    categoryColor: 'secondary',
    image: 'https://images.unsplash.com/photo-1761864293845-90f7ff41739b?w=800&h=600&fit=crop',
    readTime: { ar: '7 دقائق قراءة', en: '7 min read' },
    views: 3521,
  },
  {
    id: '3',
    slug: 'comprehensive-eye-exam-guide',
    title: {
      ar: 'متى يجب عليك إجراء فحص شامل للعيون؟ دليل كامل للفحوصات الدورية',
      en: 'When Should You Get a Comprehensive Eye Exam? Complete Guide',
    },
    excerpt: {
      ar: 'الفحوصات الدورية للعيون ضرورية للحفاظ على صحة بصرك واكتشاف أي مشاكل مبكراً.',
      en: 'Regular eye exams are essential for maintaining your vision health and detecting problems early.',
    },
    author: { ar: 'د. محمد علي', en: 'Dr. Mohamed Ali' },
    date: { ar: '10 فبراير 2026', en: 'February 10, 2026' },
    category: { ar: 'الفحوصات الطبية', en: 'Medical Exams' },
    categoryColor: 'primary',
    image: 'https://images.unsplash.com/photo-1758573467030-52481ea92007?w=800&h=600&fit=crop',
    readTime: { ar: '6 دقائق قراءة', en: '6 min read' },
    views: 1987,
  },
  {
    id: '4',
    slug: 'blue-light-protection-guide',
    title: {
      ar: 'نظارات الحماية من الضوء الأزر: هل تحتاج إليها حقاً؟',
      en: 'Blue Light Protection Glasses: Do You Really Need Them?',
    },
    excerpt: {
      ar: 'تعرف على فوائد نظارات الحماية من الضوء الأزرق وما إذا كانت ضرورية لك في ظل استخدامك المتزايد للأجهزة الرقمية.',
      en: 'Learn about the benefits of blue light protection glasses and whether they are necessary for you with your increasing use of digital devices.',
    },
    author: { ar: 'د. نورا حسن', en: 'Dr. Nora Hassan' },
    date: { ar: '8 فبراير 2026', en: 'February 8, 2026' },
    category: { ar: 'نظارات طبية', en: 'Prescription Glasses' },
    categoryColor: 'secondary',
    image: 'https://images.unsplash.com/photo-1717381272373-4295520d33ad?w=800&h=600&fit=crop',
    readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
    views: 2876,
  },
  {
    id: '5',
    slug: 'kids-eyewear-guide',
    title: {
      ar: 'دليل شامل لاختيار نظارات الأطفال: الأمان والراحة أولاً',
      en: 'Complete Guide to Choosing Kids Eyewear: Safety and Comfort First',
    },
    excerpt: {
      ar: 'نصائح عملية من خبرائنا لاختيار نظارات آمنة ومريحة لطفلك، مع مراعاة النمو السريع للأطفال.',
      en: 'Practical tips from our experts for choosing safe and comfortable glasses for your child, considering children\'s rapid growth.',
    },
    author: { ar: 'د. أمينة إبراهيم', en: 'Dr. Amina Ibrahim' },
    date: { ar: '5 فبراير 2026', en: 'February 5, 2026' },
    category: { ar: 'نظارات أطفال', en: 'Kids Eyewear' },
    categoryColor: 'primary',
    image: 'https://images.unsplash.com/photo-1593194777536-e155e6d100b2?w=800&h=600&fit=crop',
    readTime: { ar: '6 دقائق قراءة', en: '6 min read' },
    views: 1654,
  },
  {
    id: '6',
    slug: 'contact-lenses-care-tips',
    title: {
      ar: 'العدسات اللاصقة: دليل العناية الصحيحة والاستخدام الآمن',
      en: 'Contact Lenses: Proper Care Guide and Safe Use',
    },
    excerpt: {
      ar: 'كل ما تحتاج معرفته عن العناية بالعدسات اللاصقة، من التنظيف اليومي إلى مواعيد الاستبدال.',
      en: 'Everything you need to know about contact lens care, from daily cleaning to replacement schedules.',
    },
    author: { ar: 'د. خالد محمود', en: 'Dr. Khaled Mahmoud' },
    date: { ar: '2 فبراير 2026', en: 'February 2, 2026' },
    category: { ar: 'عدسات لاصقة', en: 'Contact Lenses' },
    categoryColor: 'secondary',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
    readTime: { ar: '8 دقائق قراءة', en: '8 min read' },
    views: 2134,
  },
  {
    id: '7',
    slug: 'color-blindness-solutions',
    title: {
      ar: 'عمى الألوان: الأسباب والحلول الحديثة بالفلاتر الضوئية',
      en: 'Color Blindness: Causes and Modern Solutions with Light Filters',
    },
    excerpt: {
      ar: 'اكتشف كيف يمكن للفلاتر الضوئية الحديثة أن تساعد المصابين بعمى الألوان على رؤية العالم بشكل أوضح.',
      en: 'Discover how modern light filters can help people with color blindness see the world more clearly.',
    },
    author: { ar: 'د. ياسر حسن', en: 'Dr. Yasser Hassan' },
    date: { ar: '28 يناير 2026', en: 'January 28, 2026' },
    category: { ar: 'فلاتر ضوئية', en: 'Light Filters' },
    categoryColor: 'primary',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&h=600&fit=crop',
    readTime: { ar: '9 دقائق قراءة', en: '9 min read' },
    views: 1432,
  },
  {
    id: '8',
    slug: 'artificial-eyes-technology',
    title: {
      ar: 'العيون الصناعية: التقنيات الحديثة والنتائج المذهلة',
      en: 'Artificial Eyes: Modern Technologies and Amazing Results',
    },
    excerpt: {
      ar: 'تعرف على أحدث التقنيات في تصميم وتركيب العيون الصناعية والنتائج الطبيعية التي نحققها في لطفي أوبتيكال.',
      en: 'Learn about the latest technologies in artificial eye design and installation and the natural results we achieve at Lotfy Optical.',
    },
    author: { ar: 'د. مصطفى عبدالله', en: 'Dr. Mostafa Abdullah' },
    date: { ar: '25 يناير 2026', en: 'January 25, 2026' },
    category: { ar: 'عيون صناعية بالبصمة', en: 'Custom Artificial Eyes' },
    categoryColor: 'secondary',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop',
    readTime: { ar: '10 دقائق قراءة', en: '10 min read' },
    views: 987,
  },
  {
    id: '9',
    slug: 'sunglasses-guide',
    title: {
      ar: 'كيف تختار النظارة الشمسية المناسبة: دليل شامل لحماية عينيك',
      en: 'How to Choose the Right Sunglasses: Complete Guide to Protecting Your Eyes',
    },
    excerpt: {
      ar: 'ليس�� كل النظارات الشمسية متساوية! تعرف على معايير الاختيار الصحيحة لحماية عينيك من الأشعة فوق البنفسجية.',
      en: 'Not all sunglasses are created equal! Learn the right selection criteria to protect your eyes from UV rays.',
    },
    author: { ar: 'فريق لطفي أوبتيكال', en: 'Lotfy Optical Team' },
    date: { ar: '22 يناير 2026', en: 'January 22, 2026' },
    category: { ar: 'نظارات شمسية', en: 'Sunglasses' },
    categoryColor: 'primary',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=600&fit=crop',
    readTime: { ar: '7 دقائق قراءة', en: '7 min read' },
    views: 3245,
  },
  {
    id: '10',
    slug: 'dry-eyes-treatment',
    title: {
      ar: 'جفاف العين: الأسباب والعلاج والوقاية',
      en: 'Dry Eyes: Causes, Treatment, and Prevention',
    },
    excerpt: {
      ar: 'دليل شامل لفهم أسباب جفاف العين وطرق العلاج الفعالة، من قطرات العين إلى تغييرات نمط الحياة.',
      en: 'Comprehensive guide to understanding dry eye causes and effective treatments, from eye drops to lifestyle changes.',
    },
    author: { ar: 'د. سارة محمد', en: 'Dr. Sarah Mohamed' },
    date: { ar: '18 يناير 2026', en: 'January 18, 2026' },
    category: { ar: 'صحة العيون', en: 'Eye Health' },
    categoryColor: 'primary',
    image: 'https://images.unsplash.com/photo-1601847932342-d52e6499cee3?w=800&h=600&fit=crop',
    readTime: { ar: '8 دقائق قراءة', en: '8 min read' },
    views: 2567,
  },
  {
    id: '11',
    slug: 'eyeglass-maintenance-tips',
    title: {
      ar: 'كيف تحافظ على نظارتك لأطول فترة ممكنة: نصائح عملية',
      en: 'How to Maintain Your Glasses for the Longest Time: Practical Tips',
    },
    excerpt: {
      ar: 'نصائح بسيطة وفعالة للعناية بنظارتك، من التنظيف الصحيح إلى التخزين الآمن.',
      en: 'Simple and effective tips for caring for your glasses, from proper cleaning to safe storage.',
    },
    author: { ar: 'فريق لطفي أوبتيكال', en: 'Lotfy Optical Team' },
    date: { ar: '15 يناير 2026', en: 'January 15, 2026' },
    category: { ar: 'نصائح عامة', en: 'General Tips' },
    categoryColor: 'secondary',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&h=600&fit=crop',
    readTime: { ar: '4 دقائق قراءة', en: '4 min read' },
    views: 1876,
  },
  {
    id: '12',
    slug: 'luxury-eyewear-brands',
    title: {
      ar: 'أفخم ماركات النظارات العالمية المتوفرة في لطفي أوبتيكال',
      en: 'Luxury International Eyewear Brands Available at Lotfy Optical',
    },
    excerpt: {
      ar: 'اكتشف مجموعتنا الحصرية من أرقى الماركات العالمية: Ray-Ban، Gucci، Fendi، وغيرها.',
      en: 'Discover our exclusive collection of the finest international brands: Ray-Ban, Gucci, Fendi, and more.',
    },
    author: { ar: 'فريق لطفي أوبتيكال', en: 'Lotfy Optical Team' },
    date: { ar: '12 يناير 2026', en: 'January 12, 2026' },
    category: { ar: 'موضة النظارات', en: 'Eyewear Fashion' },
    categoryColor: 'secondary',
    image: 'https://images.unsplash.com/photo-1768297087306-491d4d84ede1?w=800&h=600&fit=crop',
    readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
    views: 2987,
  },
  {
    id: '13',
    slug: 'sports-sunglasses-guide',
    title: {
      ar: 'نظارات شمسية للرياضيين: كيف تختار الأفضل لنشاطك',
      en: 'Sports Sunglasses: How to Choose the Best for Your Activity',
    },
    excerpt: {
      ar: 'دليل متخصص لاختيار نظارات شمسية رياضية توفر الحماية والأداء الأمثل لنشاطك المفضل.',
      en: 'Specialized guide to choosing sports sunglasses that provide optimal protection and performance for your favorite activity.',
    },
    author: { ar: 'أحمد سالم', en: 'Ahmed Salem' },
    date: { ar: '8 يناير 2026', en: 'January 8, 2026' },
    category: { ar: 'نظارات شمسية', en: 'Sunglasses' },
    categoryColor: 'primary',
    image: 'https://images.unsplash.com/photo-1770445912450-df0af2c0908f?w=800&h=600&fit=crop',
    readTime: { ar: '6 دقائق قراءة', en: '6 min read' },
    views: 1543,
  },
  {
    id: '14',
    slug: 'vintage-eyewear-comeback',
    title: {
      ar: 'عودة النظارات الكلاسيكية: الأناقة الخالدة في عام 2026',
      en: 'Vintage Eyewear Comeback: Timeless Elegance in 2026',
    },
    excerpt: {
      ar: 'النظارات الكلاسيكية والريترو تعود بقوة! اكتشف كيف تدمج الأناقة القديمة مع العصرية.',
      en: 'Classic and retro glasses are back with a vengeance! Discover how to blend old elegance with modern style.',
    },
    author: { ar: 'مريم أحمد', en: 'Mariam Ahmed' },
    date: { ar: '5 يناير 2026', en: 'January 5, 2026' },
    category: { ar: 'موضة النظارات', en: 'Eyewear Fashion' },
    categoryColor: 'secondary',
    image: 'https://images.unsplash.com/photo-1761896892087-7e36f6abb684?w=800&h=600&fit=crop',
    readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
    views: 2198,
  },
  {
    id: '15',
    slug: 'eyewear-face-shape-guide',
    title: {
      ar: 'دليل اختيار النظارة المثالية حسب شكل الوجه',
      en: 'Perfect Eyewear Selection Guide Based on Face Shape',
    },
    excerpt: {
      ar: 'تعرف على شكل وجهك واختر الإطار المثالي الذي يبرز جمال ملامحك ويخفي عيوبها.',
      en: 'Identify your face shape and choose the perfect frame that highlights your features and conceals flaws.',
    },
    author: { ar: 'د. ليلى حسن', en: 'Dr. Laila Hassan' },
    date: { ar: '1 يناير 2026', en: 'January 1, 2026' },
    category: { ar: 'نصائح عامة', en: 'General Tips' },
    categoryColor: 'secondary',
    image: 'https://images.unsplash.com/photo-1750390200298-3d5f30f670a1?w=800&h=600&fit=crop',
    readTime: { ar: '7 دقائق قراءة', en: '7 min read' },
    views: 3456,
  },
];

export function ArticlesPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: { ar: 'جميع المقالات', en: 'All Articles' } },
    { value: 'sunglasses', label: { ar: 'نظارات شمسية', en: 'Sunglasses' } },
    { value: 'eyehealth', label: { ar: 'صحة العيون', en: 'Eye Health' } },
    { value: 'contacts', label: { ar: 'عدسات لاصقة', en: 'Contact Lenses' } },
    { value: 'kids', label: { ar: 'نظارات أطفال', en: 'Kids Eyewear' } },
    { value: 'filters', label: { ar: 'فلاتر ضوئية', en: 'Light Filters' } },
    { value: 'tips', label: { ar: 'نصائح عامة', en: 'General Tips' } },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'all' ||
      article.category[language].toLowerCase().includes(categories.find(c => c.value === selectedCategory)?.label[language].toLowerCase() || '');
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <div className="relative bg-secondary text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1669858871612-68d2db085a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Articles Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary border border-primary/30 mb-6">
              <span className="text-sm font-medium">
                {language === 'ar' ? 'مدونة لطفي أوبتيكال' : 'LOTFY OPTICAL Blog'}
              </span>
            </div>
            <h1 className="mb-6 text-white">
              {language === 'ar' ? 'مقالات ونصائح' : 'Articles & Tips'}
            </h1>
            <p className="text-xl text-white/95 leading-relaxed">
              {language === 'ar'
                ? 'اكتشف أحدث المقالات والنصائح حول صحة العيون والنظارات'
                : 'Discover the latest articles and tips about eye health and eyewear'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-8 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5`} />
                <Input
                  placeholder={language === 'ar' ? 'ابحث في المقالات...' : 'Search articles...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={language === 'ar' ? 'pr-10' : 'pl-10'}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={language === 'ar' ? 'التصنيف' : 'Category'} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label[language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title[language]}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        {article.category[language]}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-3 group-hover:text-primary transition-colors duration-200">
                        {article.title[language]}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {article.excerpt[language]}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.author[language]}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date[language]}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                          <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                          <ArrowRight className={`w-4 h-4 group-hover:${language === 'ar' ? '-translate-x-1' : 'translate-x-1'} transition-transform duration-200`} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {language === 'ar' ? 'لا توجد مقالات تطابق بحثك' : 'No articles match your search'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-4 text-white">
              {language === 'ar' ? 'اشترك في نشرتنا البريدية' : 'Subscribe to Our Newsletter'}
            </h2>
            <p className="mb-8 opacity-90">
              {language === 'ar'
                ? 'احصل على أحدث المقالات والنصائح مباشرة في بريدك الإلكتروني'
                : 'Get the latest articles and tips directly in your email'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                className="bg-white text-secondary"
              />
              <button className="px-6 py-2 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap">
                {language === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}