export interface Article {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  excerpt: {
    ar: string;
    en: string;
  };
  content: {
    ar: string;
    en: string;
  };
  image: string;
  category: string;
  date: string;
  author: {
    ar: string;
    en: string;
  };
}

export const articles: Article[] = [
  {
    id: '1',
    title: {
      ar: 'كيفية اختيار النظارة المناسبة لشكل وجهك',
      en: 'How to Choose the Right Glasses for Your Face Shape'
    },
    excerpt: {
      ar: 'دليلك الشامل لاختيار إطار النظارة الذي يناسب شكل وجهك ويبرز ملامحك بشكل أفضل',
      en: 'Your complete guide to choosing the frame that suits your face shape and enhances your features'
    },
    content: {
      ar: `# كيفية اختيار النظارة المناسبة لشكل وجهك

اختيار النظارة المناسبة ليس مجرد قرار طبي، بل هو أيضاً قرار أزياء يؤثر على مظهرك العام. إليك دليل شامل لمساعدتك:

## أشكال الوجوه المختلفة

### الوجه البيضاوي
يعتبر الوجه البيضاوي الشكل المثالي، حيث يناسبه معظم أشكال النظارات. يمكنك تجربة:
- النظارات المربعة
- النظارات الدائرية
- نظارات عين القطة

### الوجه المستدير
للوجه المستدير، اختر إطارات:
- مربعة أو مستطيلة لإضافة زوايا
- إطارات عريضة من الأعلى
- تجنب الإطارات الدائرية

### الوجه المربع
للوجه المربع، ننصح بـ:
- إطارات دائرية أو بيضاوية
- إطارات رفيعة
- تجنب الإطارات المربعة الكبيرة

## نصائح إضافية

1. **لون البشرة**: اختر ألوان إطارات تتناسب مع لون بشرتك
2. **حجم الإطار**: يجب أن يتناسب مع حجم وجهك
3. **الراحة**: الأهم هو أن تكون مرتاحاً عند ارتدائها

زورنا في لطفي للبصريات للحصول على استشارة مجانية من خبرائنا!`,
      en: `# How to Choose the Right Glasses for Your Face Shape

Choosing the right glasses is not just a medical decision, but also a fashion choice that affects your overall appearance. Here's a comprehensive guide to help you:

## Different Face Shapes

### Oval Face
The oval face is considered the ideal shape, as most glasses shapes suit it. You can try:
- Square glasses
- Round glasses
- Cat-eye glasses

### Round Face
For round faces, choose frames that:
- Are square or rectangular to add angles
- Are wider at the top
- Avoid round frames

### Square Face
For square faces, we recommend:
- Round or oval frames
- Thin frames
- Avoid large square frames

## Additional Tips

1. **Skin Tone**: Choose frame colors that match your skin tone
2. **Frame Size**: Should be proportional to your face size
3. **Comfort**: Most importantly, you should feel comfortable wearing them

Visit us at LOTFY OPTICAL for a free consultation with our experts!`
    },
    image: 'https://images.unsplash.com/photo-1761864293845-90f7ff41739b?w=800&h=600&fit=crop',
    category: 'tips',
    date: '2024-02-10',
    author: {
      ar: 'د. أحمد لطفي',
      en: 'Dr. Ahmed Lotfy'
    }
  },
  {
    id: '2',
    title: {
      ar: 'أعراض إجهاد العين الرقمية وكيفية الوقاية منها',
      en: 'Digital Eye Strain Symptoms and Prevention'
    },
    excerpt: {
      ar: 'تعرف على أعراض إجهاد العين الناتج عن الشاشات الرقمية وطرق الوقاية الفعالة',
      en: 'Learn about digital eye strain symptoms and effective prevention methods'
    },
    content: {
      ar: `# أعراض إجهاد العين الرقمية

في عصر التكنولوجيا، أصبح إجهاد العين الرقمي مشكلة شائعة تؤثر على ملايين الأشخاص.

## الأعراض الشائعة

- جفاف العين
- صداع متكرر
- عدم وضوح الرؤية
- ألم في الرقبة والكتفين
- صعوبة في التركيز

## طرق الوقاية

### قاعدة 20-20-20
كل 20 دقيقة، انظر لشيء على بعد 20 قدماً لمدة 20 ثانية.

### إضاءة مناسبة
تأكد من أن الإضاءة المحيطة بك مناسبة وليست قوية جداً.

### نظارات حماية
استخدم نظارات تحجب الضوء الأزرق الضار.

### راحة منتظمة
خذ استراحات منتظمة من الشاشات.

في لطفي للبصريات، نوفر نظارات خاصة للحماية من الضوء الأزرق!`,
      en: `# Digital Eye Strain

In the technology age, digital eye strain has become a common problem affecting millions.

## Common Symptoms

- Dry eyes
- Frequent headaches
- Blurred vision
- Neck and shoulder pain
- Difficulty focusing

## Prevention Methods

### The 20-20-20 Rule
Every 20 minutes, look at something 20 feet away for 20 seconds.

### Proper Lighting
Ensure your surrounding lighting is appropriate and not too strong.

### Protective Glasses
Use glasses that block harmful blue light.

### Regular Breaks
Take regular breaks from screens.

At LOTFY OPTICAL, we offer special blue light protection glasses!`
    },
    image: 'https://images.unsplash.com/photo-1663151064065-cb334788f77d?w=800&h=600&fit=crop',
    category: 'health',
    date: '2024-02-08',
    author: {
      ar: 'د. سارة محمد',
      en: 'Dr. Sara Mohamed'
    }
  },
  {
    id: '3',
    title: {
      ar: 'دليل العناية بنظاراتك للحفاظ عليها لأطول فترة',
      en: 'Eyewear Care Guide for Longevity'
    },
    excerpt: {
      ar: 'نصائح عملية للعناية بنظاراتك والحفاظ عليها في أفضل حالة',
      en: 'Practical tips for caring for your glasses and keeping them in top condition'
    },
    content: {
      ar: `# دليل العناية بالنظارات

نظارتك استثمار في صحة عينيك، إليك كيفية الحفاظ عليها:

## التنظيف اليومي

- استخدم محلول تنظيف خاص بالنظارات
- امسح العدسات بقطعة قماش من الألياف الدقيقة
- تجنب استخدام الملابس أو لمناديل الورقية

## التخزين الصحيح

- احفظ النظارة في علبة واقية
- تجنب وضعها في جيبك بدون حماية
- لا تضعها بالمقلوب على العدسات

## نصائح هامة

- افحص المسامير بانتظام
- نظف الإطار كذلك وليس العدسات فقط
- زر فرعنا لفحص مجاني كل 6 أشهر

نقدم في لطفي للبصريات خدمة التنظيف والصيانة المجانية!`,
      en: `# Eyewear Care Guide

Your glasses are an investment in your eye health, here's how to maintain them:

## Daily Cleaning

- Use special glasses cleaning solution
- Wipe lenses with microfiber cloth
- Avoid using clothes or paper tissues

## Proper Storage

- Keep glasses in a protective case
- Avoid putting them in your pocket unprotected
- Don't place them lens-down

## Important Tips

- Check screws regularly
- Clean the frame too, not just the lenses
- Visit our branch for free check-up every 6 months

At LOTFY OPTICAL, we offer free cleaning and maintenance service!`
    },
    image: 'https://images.unsplash.com/photo-1769414259128-bf8a66a41701?w=800&h=600&fit=crop',
    category: 'tips',
    date: '2024-02-05',
    author: {
      ar: 'فريق لطفي للبصريات',
      en: 'LOTFY OPTICAL Team'
    }
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}