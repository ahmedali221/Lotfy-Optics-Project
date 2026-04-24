import { useParams, Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Facebook, Twitter, Linkedin, Eye, TrendingUp } from 'lucide-react';

export function ArticleDetailPage() {
  const { id } = useParams();
  const { language } = useLanguage();

  // All articles with full content
  const articles = [
    {
      id: '1',
      slug: 'digital-eye-strain-tips',
      category: { ar: 'صحة العيون', en: 'Eye Health' },
      categoryColor: 'primary',
      title: {
        ar: 'نصائح مهمة للحفاظ على صحة عينيك في عصر الشاشات الرقمية',
        en: 'Essential Tips for Protecting Your Eyes in the Digital Age',
      },
      excerpt: {
        ar: 'مع قضاء ساعات طويلة أمام الشاشات، أصبح من الضروري اتباع نصائح محددة للحفاظ على صحة العيون وتجنب الإجهاد البصري.',
        en: 'With long hours spent in front of screens, it has become essential to follow specific tips to maintain eye health and avoid visual fatigue.',
      },
      image: 'https://images.unsplash.com/photo-1758656321505-95bf802f9a4c?w=1200&h=600&fit=crop',
      author: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' },
      date: { ar: '15 فبراير 2026', en: 'February 15, 2026' },
      readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
      views: 2345,
      content: {
        ar: `
          <p class="lead">في عصرنا الحالي، أصبحت الشاشات الرقمية جزءاً لا يتجزأ من حياتنا اليومية. سواء كنت تعمل على الكمبيوتر، أو تتصفح هاتفك الذكي، أو تشاهد التلفزيون، فإن عينيك تتعرض لساعات طويلة من الضوء الأزرق والإجهاد البصري.</p>

          <h2>ما هو إجهاد العين الرقمي؟</h2>
          <p>إجهاد العين الرقمي (Digital Eye Strain) أو متلازمة رؤية الكمبيوتر هي حالة شائعة تحدث عند استخدام الأجهزة الرقمية لفترات طويلة. تشمل الأعراض:</p>
          <ul>
            <li>جفاف وحرقة في العين</li>
            <li>عدم وضوح الرؤية</li>
            <li>صداع متكرر</li>
            <li>آلام في الرقبة والكتفين</li>
            <li>صعوبة في التركيز</li>
          </ul>

          <h2>قاعدة 20-20-20 الذهبية</h2>
          <p>واحدة من أهم النصائح للحفاظ على صحة عينيك هي اتباع <strong>قاعدة 20-20-20</strong>:</p>
          <div class="highlight-box">
            <p><strong>كل 20 دقيقة</strong> من استخدام الشاشة، انظر إلى شيء يبعد <strong>20 قدماً</strong> (6 أمتار) لمدة <strong>20 ثانية</strong> على الأقل.</p>
          </div>

          <h2>نصائح عملية للحماية من إجهاد العين</h2>
          <h3>1. ضبط إضاءة الشاشة</h3>
          <p>تأكد من أن سطوع شاشتك يتناسب مع الإضاءة المحيطة.</p>

          <h3>2. استخدم نظارات الحماية من الضوء الأزرق</h3>
          <p>في لطفي أوبتيكال، نوفر مجموعة واسعة من النظارات المخصصة للحماية من الضوء الأزرق.</p>

          <div class="cta-box">
            <h3>احجز فحصاً شاملاً للعيون الآن</h3>
            <p>في عيادات لطفي أوبتيكال، نوفر فحوصات شاملة بأحدث الأجهزة الطبية.</p>
          </div>
        `,
        en: `
          <p class="lead">In our current era, digital screens have become an integral part of our daily lives. Whether you're working on a computer, browsing your smartphone, or watching TV, your eyes are exposed to long hours of blue light and visual strain.</p>

          <h2>What is Digital Eye Strain?</h2>
          <p>Digital Eye Strain or Computer Vision Syndrome is a common condition that occurs when using digital devices for extended periods. Symptoms include:</p>
          <ul>
            <li>Dry and burning eyes</li>
            <li>Blurred vision</li>
            <li>Frequent headaches</li>
            <li>Neck and shoulder pain</li>
            <li>Difficulty focusing</li>
          </ul>

          <h2>The Golden 20-20-20 Rule</h2>
          <p>One of the most important tips for maintaining your eye health is following the <strong>20-20-20 rule</strong>:</p>
          <div class="highlight-box">
            <p>Every <strong>20 minutes</strong> of screen use, look at something <strong>20 feet</strong> (6 meters) away for at least <strong>20 seconds</strong>.</p>
          </div>

          <h2>Practical Tips for Eye Strain Protection</h2>
          <h3>1. Adjust Screen Brightness</h3>
          <p>Make sure your screen brightness matches the ambient lighting.</p>

          <h3>2. Use Blue Light Protection Glasses</h3>
          <p>At Lotfy Optical, we offer a wide range of glasses designed for blue light protection.</p>

          <div class="cta-box">
            <h3>Book a Comprehensive Eye Exam Now</h3>
            <p>At Lotfy Optical Clinics, we provide comprehensive exams with the latest medical equipment.</p>
          </div>
        `,
      },
    },
    {
      id: '2',
      slug: 'eyewear-trends-2026',
      category: { ar: 'موضة النظارات', en: 'Eyewear Fashion' },
      categoryColor: 'secondary',
      title: {
        ar: 'أحدث صيحات النظارات لعام 2026: اختر الإطار المثالي لشخصيتك',
        en: 'Latest Eyewear Trends 2026: Choose the Perfect Frame for Your Style',
      },
      excerpt: {
        ar: 'اكتشف أحدث صيحات النظارات لهذا العام وكيفية اختيار الإطار الذي يناسب شكل وجهك وأسلوبك الشخصي.',
        en: 'Discover the latest eyewear trends this year and how to choose the frame that suits your face shape and personal style.',
      },
      image: 'https://images.unsplash.com/photo-1761864293845-90f7ff41739b?w=1200&h=600&fit=crop',
      author: { ar: 'سارة أحمد', en: 'Sarah Ahmed' },
      date: { ar: '12 فبراير 2026', en: 'February 12, 2026' },
      readTime: { ar: '7 دقائق قراءة', en: '7 min read' },
      views: 3521,
      content: {
        ar: `
          <p class="lead">عالم النظارات يشهد تطوراً مستمراً، ولعام 2026، نرى عودة الأساليب الكلاسيكية ممزوجة بلمسات عصرية مبتكرة.</p>

          <h2>الصيحات الرائجة لعام 2026</h2>
          <h3>1. الإطارات الشفافة والملونة</h3>
          <p>الإطارات الشفافة أو الملونة بألوان الباستيل أصبحت من أكثر الصيحات شعبية.</p>

          <h3>2. الإطارات العريضة (Oversized)</h3>
          <p>الإطارات الكبيرة والعريضة عادت بقوة، خاصة مع الأشكال الهندسية المميزة.</p>

          <h2>كيف تختار الإطار المناسب لشكل وجهك؟</h2>
          <h3>الوجه البيضاوي</h3>
          <p>معظم أشكال الإطارات تناسبك. جرب الإطارات المربعة أو المستطيلة.</p>

          <h3>الوجه المستدير</h3>
          <p>الإطارات المربعة أو المستطيلة تساعد على إضافة زوايا وتحديد للوجه المستدير.</p>

          <div class="cta-box">
            <h3>زر أحد فروعنا اليوم</h3>
            <p>جرب أحدث التصاميم واحصل على استشارة مجانية من خبرائنا!</p>
          </div>
        `,
        en: `
          <p class="lead">The eyewear world is constantly evolving, and for 2026, we see a return of classic styles mixed with innovative modern touches.</p>

          <h2>Trending Styles for 2026</h2>
          <h3>1. Clear and Colored Frames</h3>
          <p>Clear frames or pastel-colored frames have become one of the most popular trends.</p>

          <h3>2. Oversized Frames</h3>
          <p>Large, wide frames are back with a vengeance, especially with distinctive geometric shapes.</p>

          <h2>How to Choose the Right Frame for Your Face Shape?</h2>
          <h3>Oval Face</h3>
          <p>Most frame shapes suit you. Try square or rectangular frames.</p>

          <h3>Round Face</h3>
          <p>Square or rectangular frames help add angles and definition to a round face.</p>

          <div class="cta-box">
            <h3>Visit One of Our Branches Today</h3>
            <p>Try the latest designs and get free consultation from our experts!</p>
          </div>
        `,
      },
    },
    {
      id: '3',
      slug: 'comprehensive-eye-exam-guide',
      category: { ar: 'الفحوصات الطبية', en: 'Medical Exams' },
      categoryColor: 'primary',
      title: {
        ar: 'متى يجب عليك إجراء فحص شامل للعيون؟ دليل كامل للفحوصات الدورية',
        en: 'When Should You Get a Comprehensive Eye Exam? Complete Guide',
      },
      excerpt: {
        ar: 'الفحوصات الدورية للعيون ضرورية للحفاظ على صحة بصرك واكتشاف أي مشاكل مبكراً.',
        en: 'Regular eye exams are essential for maintaining your vision health and detecting problems early.',
      },
      image: 'https://images.unsplash.com/photo-1758573467030-52481ea92007?w=1200&h=600&fit=crop',
      author: { ar: 'د. محمد علي', en: 'Dr. Mohamed Ali' },
      date: { ar: '10 فبراير 2026', en: 'February 10, 2026' },
      readTime: { ar: '6 دقائق قراءة', en: '6 min read' },
      views: 1987,
      content: {
        ar: `
          <p class="lead">الفحص الدوري للعيون ليس فقط لمن يعانون من مشاكل في الرؤية. حتى إذا كنت تشعر أن رؤيتك جيدة، فإن الفحوصات المنتظمة ضرورية.</p>

          <h2>لماذا الفحص الدوري مهم؟</h2>
          <p>العديد من أمراض العيون، مثل الجلوكوما والضمور البقعي، تتطور بصمت دون أعراض واضحة في البداية.</p>

          <h2>��تى يجب إجراء الفحص؟</h2>
          <h3>الأطفال</h3>
          <ul>
            <li><strong>6 أشهر:</strong> الفحص الأول</li>
            <li><strong>3 سنوات:</strong> فحص شامل</li>
            <li><strong>سنوياً:</strong> طوال سنوات الدراسة</li>
          </ul>

          <h3>البالغون (20-39 سنة)</h3>
          <p>كل 2-3 سنوات إذا لم تكن هناك عوامل خطر.</p>

          <div class="cta-box">
            <h3>احجز فحصك الدوري الآن</h3>
            <p>في عيادات لطفي أوبتيكال، نستخدم أحدث الأجهزة والتقنيات.</p>
          </div>
        `,
        en: `
          <p class="lead">Regular eye exams aren't just for people with vision problems. Even if you feel your vision is fine, regular checkups are essential.</p>

          <h2>Why Are Regular Exams Important?</h2>
          <p>Many eye diseases, such as glaucoma and macular degeneration, develop silently without obvious symptoms initially.</p>

          <h2>When Should You Get an Exam?</h2>
          <h3>Children</h3>
          <ul>
            <li><strong>6 months:</strong> First exam</li>
            <li><strong>3 years:</strong> Comprehensive exam</li>
            <li><strong>Annually:</strong> Throughout school years</li>
          </ul>

          <h3>Adults (20-39 years)</h3>
          <p>Every 2-3 years if there are no risk factors.</p>

          <div class="cta-box">
            <h3>Book Your Regular Exam Now</h3>
            <p>At Lotfy Optical Clinics, we use the latest equipment and technologies.</p>
          </div>
        `,
      },
    },
    {
      id: '4',
      slug: 'blue-light-protection-guide',
      category: { ar: 'نظارات طبية', en: 'Prescription Glasses' },
      categoryColor: 'secondary',
      title: {
        ar: 'نظارات الحماية من الضوء الأزرق: هل تحتاج إليها حقاً؟',
        en: 'Blue Light Protection Glasses: Do You Really Need Them?',
      },
      excerpt: {
        ar: 'تعرف على فوائد نظارات الحماية من الضوء الأزرق وما إذا كانت ضرورية لك في ظل استخدامك المتزايد للأجهزة الرقمية.',
        en: 'Learn about the benefits of blue light protection glasses and whether they are necessary for you with your increasing use of digital devices.',
      },
      image: 'https://images.unsplash.com/photo-1717381272373-4295520d33ad?w=1200&h=600&fit=crop',
      author: { ar: 'د. نورا حسن', en: 'Dr. Nora Hassan' },
      date: { ar: '8 ��براير 2026', en: 'February 8, 2026' },
      readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
      views: 2876,
      content: {
        ar: `
          <p class="lead">مع تزايد استخدامنا للأجهزة الرقمية، أصبح الضوء الأزرق مصدر قلق متزايد لصحة العيون. فهل تحتاج فعلاً إلى نظارات للحماية منه؟</p>

          <h2>ما هو الضوء الأزرق؟</h2>
          <p>الضوء الأزرق هو جزء من الطيف الضوئي المرئي، ويتميز بطول موجي قصير وطاقة عالية. مصادره الرئيسية:</p>
          <ul>
            <li>ضوء الشمس (المصدر الطبيعي الأكبر)</li>
            <li>شاشات الكمبيوتر والهواتف الذكية</li>
            <li>أجهزة التلفزيون والتابلت</li>
            <li>مصابيح LED وCFL</li>
          </ul>

          <h2>التأثيرات المحتملة للضوء الأزرق</h2>
          <h3>1. إجهاد العين الرقمي</h3>
          <p>التعرض المطول للضوء الأزرق قد يسبب إجهاد العين، خاصة عند استخدام الأجهزة لساعات طويلة.</p>

          <h3>2. اضطراب النوم</h3>
          <p>الضوء الأزرق يثبط إفراز الميلاتونين، الهرمون المسؤول عن تنظيم النوم.</p>

          <h2>هل تحتاج إلى نظارات الحماية؟</h2>
          <p>نظارات الحماية من الضوء الأزرق قد تكون مفيدة إذا كنت:</p>
          <ul>
            <li>تقضي أكثر من 6 ساعات يومياً أمام الشاشات</li>
            <li>تعاني من إجهاد العين المتكرر</li>
            <li>تواجه صعوبة في النوم بعد استخدام الأجهزة الرقمية</li>
            <li>تعمل في بيئة مكتبية بإضاءة LED قوية</li>
          </ul>

          <div class="highlight-box">
            <p><strong>نصيحة مهمة:</strong> نظارات الحماية من الضوء الأزرق ليست بديلاً عن العادات الصحية الجيدة في استخدام الأجهزة الرقمية!</p>
          </div>

          <h2>مجموعتنا في لطفي أوبتيكال</h2>
          <p>نوفر في لطفي أوبتيكال مجموعة واسعة من نظارات الحماية من الضوء الأزرق بتصاميم عصرية وعدسات عالية الجودة تفلتر حتى 90% من الضوء الأزرق الضار.</p>

          <div class="cta-box">
            <h3>جرب نظارات الحماية من الضوء الأزرق</h3>
            <p>زر أحد فروعنا واحصل على استشارة مجانية واختبر الفرق بنفسك!</p>
          </div>
        `,
        en: `
          <p class="lead">With our increasing use of digital devices, blue light has become a growing concern for eye health. Do you really need glasses to protect against it?</p>

          <h2>What is Blue Light?</h2>
          <p>Blue light is part of the visible light spectrum, characterized by short wavelengths and high energy. Main sources:</p>
          <ul>
            <li>Sunlight (the largest natural source)</li>
            <li>Computer and smartphone screens</li>
            <li>TVs and tablets</li>
            <li>LED and CFL lights</li>
          </ul>

          <h2>Potential Effects of Blue Light</h2>
          <h3>1. Digital Eye Strain</h3>
          <p>Prolonged exposure to blue light may cause eye strain, especially when using devices for long hours.</p>

          <h3>2. Sleep Disruption</h3>
          <p>Blue light suppresses melatonin production, the hormone responsible for regulating sleep.</p>

          <h2>Do You Need Protection Glasses?</h2>
          <p>Blue light protection glasses may be beneficial if you:</p>
          <ul>
            <li>Spend more than 6 hours daily in front of screens</li>
            <li>Experience frequent eye strain</li>
            <li>Have difficulty sleeping after using digital devices</li>
            <li>Work in an office environment with strong LED lighting</li>
          </ul>

          <div class="highlight-box">
            <p><strong>Important note:</strong> Blue light protection glasses are not a substitute for good digital device usage habits!</p>
          </div>

          <h2>Our Collection at Lotfy Optical</h2>
          <p>At Lotfy Optical, we offer a wide range of blue light protection glasses with modern designs and high-quality lenses that filter up to 90% of harmful blue light.</p>

          <div class="cta-box">
            <h3>Try Blue Light Protection Glasses</h3>
            <p>Visit one of our branches and get a free consultation and test the difference yourself!</p>
          </div>
        `,
      },
    },
    {
      id: '5',
      slug: 'kids-eyewear-guide',
      category: { ar: 'نظارات أطفال', en: 'Kids Eyewear' },
      categoryColor: 'primary',
      title: {
        ar: 'دليل شامل لاختيار نظارات الأطفال: الأمان والراحة أولاً',
        en: 'Complete Guide to Choosing Kids Eyewear: Safety and Comfort First',
      },
      excerpt: {
        ar: 'نصائح عملية من خبرائنا لاختيار نظارات آمنة ومريحة لطفلك، مع مراعاة النمو السريع للأطفال.',
        en: 'Practical tips from our experts for choosing safe and comfortable glasses for your child, considering children\'s rapid growth.',
      },
      image: 'https://images.unsplash.com/photo-1593194777536-e155e6d100b2?w=1200&h=600&fit=crop',
      author: { ar: 'د. أمينة إبراهيم', en: 'Dr. Amina Ibrahim' },
      date: { ar: '5 فبراير 2026', en: 'February 5, 2026' },
      readTime: { ar: '6 دقائق قراءة', en: '6 min read' },
      views: 1654,
      content: {
        ar: `
          <p class="lead">اختيار النظارة المناسبة لطفلك ليس مجرد مسألة أسلوب - إنه يتعلق بالصحة والأمان والراحة. إليك دليلنا الشامل.</p>

          <h2>معايير الأمان الأساسية</h2>
          <h3>1. المواد المتينة والآمنة</h3>
          <p>اختر إطارات من مواد مرنة ومقاومة للكسر مثل:</p>
          <ul>
            <li><strong>TR90:</strong> بلاستيك مرن وخفيف الوزن</li>
            <li><strong>السيليكون:</strong> مثا��ي للأطفال الصغار</li>
            <li><strong>الأسيتات المرن:</strong> متين وآمن</li>
          </ul>

          <h3>2. العدسات المقاومة للصدمات</h3>
          <p>يجب أن تكون العدسات من البولي كربونات، فهي أقوى 10 مرات من البلاستيك العادي.</p>

          <h2>الراحة والملاءمة</h2>
          <h3>الحجم المناسب</h3>
          <p>النظارة يجب أن تكون:</p>
          <ul>
            <li>لا تضغط على جانبي الرأس</li>
            <li>لا تنزلق من على الأنف</li>
            <li>خفيفة الوزن</li>
          </ul>

          <div class="highlight-box">
            <p><strong>نصيحة الخبراء:</strong> يحتاج الأطفال لتغيير النظارة كل 1-2 سنة بسبب نموهم السريع وتغير قياس النظر.</p>
          </div>

          <h2>التصميم والأسلوب</h2>
          <p>دع طفلك يشارك في اختيار التصميم! الأطفال الذين يحبون نظاراتهم أكثر احتمالاً لارتدائها.</p>

          <div class="cta-box">
            <h3>قسم نظارات الأطفال في لطفي أوبتيكال</h3>
            <p>نوفر مجموعة واسعة من نظارات الأطفال الآمنة والعصرية، مع فريق متخصص في التعامل مع الأطفال.</p>
          </div>
        `,
        en: `
          <p class="lead">Choosing the right glasses for your child isn't just about style - it's about health, safety, and comfort. Here's our comprehensive guide.</p>

          <h2>Essential Safety Criteria</h2>
          <h3>1. Durable and Safe Materials</h3>
          <p>Choose frames from flexible and break-resistant materials like:</p>
          <ul>
            <li><strong>TR90:</strong> Flexible and lightweight plastic</li>
            <li><strong>Silicone:</strong> Ideal for young children</li>
            <li><strong>Flexible Acetate:</strong> Durable and safe</li>
          </ul>

          <h3>2. Impact-Resistant Lenses</h3>
          <p>Lenses should be polycarbonate, which is 10 times stronger than regular plastic.</p>

          <h2>Comfort and Fit</h2>
          <h3>Right Size</h3>
          <p>Glasses should:</p>
          <ul>
            <li>Not press on the sides of the head</li>
            <li>Not slip off the nose</li>
            <li>Be lightweight</li>
          </ul>

          <div class="highlight-box">
            <p><strong>Expert tip:</strong> Children need to change glasses every 1-2 years due to rapid growth and prescription changes.</p>
          </div>

          <h2>Design and Style</h2>
          <p>Let your child participate in choosing the design! Children who love their glasses are more likely to wear them.</p>

          <div class="cta-box">
            <h3>Kids Eyewear Section at Lotfy Optical</h3>
            <p>We offer a wide range of safe and stylish kids glasses, with a team specialized in dealing with children.</p>
          </div>
        `,
      },
    },
    {
      id: '6',
      slug: 'contact-lenses-care-tips',
      category: { ar: 'عدسات لاصقة', en: 'Contact Lenses' },
      categoryColor: 'secondary',
      title: {
        ar: 'العدسات اللاصقة: دليل العناية الصحيحة والاستخدام الآمن',
        en: 'Contact Lenses: Proper Care Guide and Safe Use',
      },
      excerpt: {
        ar: 'كل ما تحتاج معرفته عن العناية بالعدسات اللاصقة، من التنظيف اليومي إلى مواعيد الاستبدال.',
        en: 'Everything you need to know about contact lens care, from daily cleaning to replacement schedules.',
      },
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=600&fit=crop',
      author: { ar: 'د. خالد محم��د', en: 'Dr. Khaled Mahmoud' },
      date: { ar: '2 فبراير 2026', en: 'February 2, 2026' },
      readTime: { ar: '8 دقائق قراءة', en: '8 min read' },
      views: 2134,
      content: {
        ar: `
          <p class="lead">العدسات اللاصقة توفر بديلاً رائعاً للنظارات، لكنها تتطلب عناية خاصة للحفاظ على صحة عينيك. إليك دليلك الشامل.</p>

          <h2>خطوات التنظيف اليومية</h2>
          <h3>1. غسل اليدين</h3>
          <p>اغسل يديك جيداً بالماء والصابون قبل لمس العدسات.</p>

          <h3>2. تنظيف العدسات</h3>
          <p>ضع العدسة على راحة يدك، وأضف بضع قطرات من المحلول، وافركها بلطف لمدة 20 ثانية.</p>

          <h3>3. الشطف والتخزين</h3>
          <p>اشطف العدسة بمحلول جديد وضعها في حافظة نظيفة مملوءة بمحلول جديد.</p>

          <h2>الأخطاء الشائعة التي يجب تجنبها</h2>
          <div class="warning-box">
            <ul>
              <li>النوم بالعدسات (إلا إذا كانت مصممة للنوم)</li>
              <li>استخدام ماء الصنبور ��تنظيف العدسات</li>
              <li>إعادة استخدام المحلول القديم</li>
              <li>تجاوز مدة صلاحية العدسات</li>
            </ul>
          </div>

          <h2>جدول الاستبدال</h2>
          <ul>
            <li><strong>عدسات يومية:</strong> استخدام واحد فقط</li>
            <li><strong>عدسات أسبوعية:</strong> استبدال كل أسبوع</li>
            <li><strong>عدسات شهرية:</strong> استبدال كل شهر</li>
          </ul>

          <div class="cta-box">
            <h3>استشر خبراءنا في العدسات اللاصقة</h3>
            <p>احجز موعداً للحصول على استشارة مجانية واختيار العدسات المناسبة لك.</p>
          </div>
        `,
        en: `
          <p class="lead">Contact lenses offer a great alternative to glasses, but they require special care to maintain your eye health. Here's your comprehensive guide.</p>

          <h2>Daily Cleaning Steps</h2>
          <h3>1. Wash Your Hands</h3>
          <p>Wash your hands thoroughly with soap and water before touching the lenses.</p>

          <h3>2. Clean the Lenses</h3>
          <p>Place the lens on your palm, add a few drops of solution, and gently rub for 20 seconds.</p>

          <h3>3. Rinse and Store</h3>
          <p>Rinse the lens with fresh solution and place in a clean case filled with fresh solution.</p>

          <h2>Common Mistakes to Avoid</h2>
          <div class="warning-box">
            <ul>
              <li>Sleeping with lenses (unless designed for sleeping)</li>
              <li>Using tap water to clean lenses</li>
              <li>Reusing old solution</li>
              <li>Exceeding lens expiration dates</li>
            </ul>
          </div>

          <h2>Replacement Schedule</h2>
          <ul>
            <li><strong>Daily lenses:</strong> Single use only</li>
            <li><strong>Weekly lenses:</strong> Replace every week</li>
            <li><strong>Monthly lenses:</strong> Replace every month</li>
          </ul>

          <div class="cta-box">
            <h3>Consult Our Contact Lens Experts</h3>
            <p>Book an appointment for free consultation and choose the right lenses for you.</p>
          </div>
        `,
      },
    },
    {
      id: '7',
      slug: 'color-blindness-solutions',
      category: { ar: 'فلاتر ضوئية', en: 'Light Filters' },
      categoryColor: 'primary',
      title: {
        ar: 'عمى الألوان: الأسباب والحلول الحديثة بالفلاتر الضوئية',
        en: 'Color Blindness: Causes and Modern Solutions with Light Filters',
      },
      excerpt: {
        ar: 'اكتشف كيف يمكن للفلاتر الضوئية الحديثة أن تساعد المصابين بعمى الألوان على رؤية العالم بشكل أوضح.',
        en: 'Discover how modern light filters can help people with color blindness see the world more clearly.',
      },
      image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1200&h=600&fit=crop',
      author: { ar: 'د. ياسر حسن', en: 'Dr. Yasser Hassan' },
      date: { ar: '28 يناير 2026', en: 'January 28, 2026' },
      readTime: { ar: '9 دقائق قراءة', en: '9 min read' },
      views: 1432,
      content: {
        ar: `
          <p class="lead">عمى الألوان يؤثر على حوالي 8% من الرجال و0.5% من النساء. التقنيات الحديثة توفر الآن حلولاً فعالة لهذه الحالة.</p>

          <h2>ما هو عمى الألوان؟</h2>
          <p>عمى الألوان هو عدم القدرة على رؤية بعض الألوان أو التمييز بينها بشكل صحيح. الأنواع الرئيسية:</p>
          <ul>
            <li><strong>الأحمر-الأخضر:</strong> النوع الأكثر شيوعاً</li>
            <li><strong>الأزرق-الأصفر:</strong> نادر نسبياً</li>
            <li><strong>الكامل:</strong> نادر جداً (رؤية بالأبيض والأسود)</li>
          </ul>

          <h2>كيف تعمل الفلاتر الضوئية؟</h2>
          <p>الفلاتر الضوئية المتقدمة تستخدم تقنية خاصة لتعزيز التباين بين الألوان، مما يسهل على الدماغ التمييز بينها.</p>

          <h2>فوائد الفلاتر الضوئية</h2>
          <ul>
            <li>تحسين القدرة على التمييز بين الألوان</li>
            <li>زيادة الوضوح والسطوع</li>
            <li>تسهيل الأنشطة اليومية</li>
            <li>تحسين الأداء المهني</li>
          </ul>

          <div class="cta-box">
            <h3>اختبر الفلاتر الضوئية في لطفي أوبتيكال</h3>
            <p>نوفر أحدث تقنيات الفلاتر الضوئية لعلاج عمى الألوان. احجز موعدك للاختبار!</p>
          </div>
        `,
        en: `
          <p class="lead">Color blindness affects about 8% of men and 0.5% of women. Modern technologies now offer effective solutions for this condition.</p>

          <h2>What is Color Blindness?</h2>
          <p>Color blindness is the inability to see or properly distinguish between certain colors. Main types:</p>
          <ul>
            <li><strong>Red-Green:</strong> Most common type</li>
            <li><strong>Blue-Yellow:</strong> Relatively rare</li>
            <li><strong>Complete:</strong> Very rare (black and white vision)</li>
          </ul>

          <h2>How Do Light Filters Work?</h2>
          <p>Advanced light filters use special technology to enhance contrast between colors, making it easier for the brain to distinguish them.</p>

          <h2>Benefits of Light Filters</h2>
          <ul>
            <li>Improved ability to distinguish colors</li>
            <li>Increased clarity and brightness</li>
            <li>Easier daily activities</li>
            <li>Improved professional performance</li>
          </ul>

          <div class="cta-box">
            <h3>Test Light Filters at Lotfy Optical</h3>
            <p>We offer the latest light filter technologies for color blindness treatment. Book your testing appointment!</p>
          </div>
        `,
      },
    },
    {
      id: '8',
      slug: 'artificial-eyes-technology',
      category: { ar: 'عيون صناعية بالبصمة', en: 'Custom Artificial Eyes' },
      categoryColor: 'secondary',
      title: {
        ar: 'العيون الصناعية: التقنيات الحديثة والنتائج المذهلة',
        en: 'Artificial Eyes: Modern Technologies and Amazing Results',
      },
      excerpt: {
        ar: 'تعرف على أحدث التقنيات في تصميم وتركيب العيون الصناعية والنتائج الطبيعية التي نحققها في لطفي أوبتيكال.',
        en: 'Learn about the latest technologies in artificial eye design and installation and the natural results we achieve at Lotfy Optical.',
      },
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=600&fit=crop',
      author: { ar: 'د. مصطفى عبدالله', en: 'Dr. Mostafa Abdullah' },
      date: { ar: '25 يناير 2026', en: 'January 25, 2026' },
      readTime: { ar: '10 دقائق قراءة', en: '10 min read' },
      views: 987,
      content: {
        ar: `
          <p class="lead">التقنيات الحديثة في مجال العيون الصناعية حققت قفزات نوعية مذهلة، مما يوفر نتائج طبيعية وراحة غير مسبوقة.</p>

          <h2>أنواع العيون الصناعية</h2>
          <h3>1. العين التجميلية الكاملة</h3>
          <p>تستخدم بعد استئصال العين بالكامل، وتوفر مظهراً طبيعياً مع إمكانية الحركة.</p>

          <h3>2. القشرة الصلبية</h3>
          <p>تستخدم عندما يكون جزء من العين الطبيعية موجوداً، توفر مظهراً أكثر طبيعية.</p>

          <h2>عملية التصميم والتركيب</h2>
          <p>نستخدم أحدث التقنيات الرقمية لتصميم عين صناعية تطابق عينك الطبيعية:</p>
          <ul>
            <li>التصوير الرقمي عالي الدقة</li>
            <li>مطابقة الألوان بدقة متناهية</li>
            <li>تصميم الأوعية الدموية بشكل طبيعي</li>
            <li>تخصيص الحجم والشكل</li>
          </ul>

          <h2>الرعاية والصيانة</h2>
          <p>الع��ن الصناعية تحتاج إلى عناية بسيطة:</p>
          <ul>
            <li>التنظيف اليومي بمحلول خاص</li>
            <li>فحص دوري كل 6 أشهر</li>
            <li>تلميع سنوي</li>
          </ul>

          <div class="cta-box">
            <h3>قسم العيون الصناعية في لطفي أوبتيكال</h3>
            <p>نوفر خدمة شاملة من الاستشارة إلى التصميم والتركيب والمتابعة. احجز استشارتك المجانية!</p>
          </div>
        `,
        en: `
          <p class="lead">Modern technologies in artificial eyes have achieved amazing qualitative leaps, providing natural results and unprecedented comfort.</p>

          <h2>Types of Artificial Eyes</h2>
          <h3>1. Complete Prosthetic Eye</h3>
          <p>Used after complete eye removal, provides natural appearance with movement capability.</p>

          <h3>2. Scleral Shell</h3>
          <p>Used when part of the natural eye is present, provides more natural appearance.</p>

          <h2>Design and Installation Process</h2>
          <p>We use the latest digital technologies to design an artificial eye matching your natural eye:</p>
          <ul>
            <li>High-resolution digital imaging</li>
            <li>Precise color matching</li>
            <li>Natural blood vessel design</li>
            <li>Custom size and shape</li>
          </ul>

          <h2>Care and Maintenance</h2>
          <p>Artificial eye needs simple care:</p>
          <ul>
            <li>Daily cleaning with special solution</li>
            <li>Regular checkup every 6 months</li>
            <li>Annual polishing</li>
          </ul>

          <div class="cta-box">
            <h3>Artificial Eyes Department at Lotfy Optical</h3>
            <p>We provide comprehensive service from consultation to design, installation, and follow-up. Book your free consultation!</p>
          </div>
        `,
      },
    },
    {
      id: '9',
      slug: 'sunglasses-guide',
      category: { ar: 'نظارات شمسية', en: 'Sunglasses' },
      categoryColor: 'primary',
      title: {
        ar: 'كيف تختار النظارة الشمسية المناسبة: دليل شامل لحماية عينيك',
        en: 'How to Choose the Right Sunglasses: Complete Guide to Protecting Your Eyes',
      },
      excerpt: {
        ar: 'ليست كل النظارات الشمسية متساوية! تعرف على معايير الاختيار الصحيحة لحماية عينيك من الأشعة فوق البنفسجية.',
        en: 'Not all sunglasses are created equal! Learn the right selection criteria to protect your eyes from UV rays.',
      },
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&h=600&fit=crop',
      author: { ar: 'فريق لطفي أوبتيكال', en: 'Lotfy Optical Team' },
      date: { ar: '22 يناير 2026', en: 'January 22, 2026' },
      readTime: { ar: '7 دقائق قراءة', en: '7 min read' },
      views: 3245,
      content: {
        ar: `
          <p class="lead">النظارات الشمسية ليست مجرد إكسسوار أنيق - إنها أداة حماية أساسية لعينيك من الأشعة فوق البنفسجية الضارة.</p>

          <h2>أهمية حماية UV</h2>
          <p>التعرض المطول للأشعة فوق البنفسجية يمكن أن يسبب:</p>
          <ul>
            <li>إعتام عدسة العين (الكاتاراكت)</li>
            <li>الضمور البقعي</li>
            <li>التهاب القرنية</li>
            <li>سرطان الجلد حول العين</li>
          </ul>

          <h2>معايير الاختيار الصحيحة</h2>
          <h3>1. الحماية من UV</h3>
          <p>ابحث عن نظارات توفر حماية 100% من UVA و UVB.</p>

          <h3>2. حجم العدسات</h3>
          <p>العدسات الكبيرة توفر حماية أفضل من الأشعة الجانبية.</p>

          <h3>3. لون العدسات</h3>
          <ul>
            <li><strong>رمادي:</strong> للاستخدام العام</li>
            <li><strong>بني:</strong> لتحسين التباين</li>
            <li><strong>أخضر:</strong> لتقليل الوهج</li>
            <li><strong>أصفر:</strong> لظروف الضوء المنخفض</li>
          </ul>

          <h2>الاستقطاب (Polarized)</h2>
          <p>العدسات المستقطبة تقلل الوهج من الأسطح العاكسة، مثالية لـ:</p>
          <ul>
            <li>القيادة</li>
            <li>الأنشطة المائية</li>
            <li>الرياضات الخارجية</li>
          </ul>

          <div class="cta-box">
            <h3>مجموعة النظارات الشمسية في لطفي أوبتيكال</h3>
            <p>نوفر أرقى الماركات العالمية بحماية UV كاملة وتصاميم عصرية. زر فروعنا الآن!</p>
          </div>
        `,
        en: `
          <p class="lead">Sunglasses aren't just a stylish accessory - they're an essential protection tool for your eyes from harmful UV rays.</p>

          <h2>Importance of UV Protection</h2>
          <p>Prolonged exposure to UV rays can cause:</p>
          <ul>
            <li>Cataracts</li>
            <li>Macular degeneration</li>
            <li>Keratitis</li>
            <li>Skin cancer around the eye</li>
          </ul>

          <h2>Right Selection Criteria</h2>
          <h3>1. UV Protection</h3>
          <p>Look for glasses that provide 100% UVA and UVB protection.</p>

          <h3>2. Lens Size</h3>
          <p>Large lenses provide better protection from side rays.</p>

          <h3>3. Lens Color</h3>
          <ul>
            <li><strong>Gray:</strong> For general use</li>
            <li><strong>Brown:</strong> For enhanced contrast</li>
            <li><strong>Green:</strong> For reduced glare</li>
            <li><strong>Yellow:</strong> For low light conditions</li>
          </ul>

          <h2>Polarization</h2>
          <p>Polarized lenses reduce glare from reflective surfaces, ideal for:</p>
          <ul>
            <li>Driving</li>
            <li>Water activities</li>
            <li>Outdoor sports</li>
          </ul>

          <div class="cta-box">
            <h3>Sunglasses Collection at Lotfy Optical</h3>
            <p>We offer the finest international brands with full UV protection and modern designs. Visit our branches now!</p>
          </div>
        `,
      },
    },
    {
      id: '10',
      slug: 'dry-eyes-treatment',
      category: { ar: 'صحة العيون', en: 'Eye Health' },
      categoryColor: 'primary',
      title: {
        ar: 'جفاف العين: الأسباب والعلاج والوقاية',
        en: 'Dry Eyes: Causes, Treatment, and Prevention',
      },
      excerpt: {
        ar: 'دليل شامل لفهم أسباب جفاف العين وطرق العلاج الفعالة، من قطرات العين إلى تغييرات نمط الحياة.',
        en: 'Comprehensive guide to understanding dry eye causes and effective treatments, from eye drops to lifestyle changes.',
      },
      image: 'https://images.unsplash.com/photo-1601847932342-d52e6499cee3?w=1200&h=600&fit=crop',
      author: { ar: 'د. سارة محمد', en: 'Dr. Sarah Mohamed' },
      date: { ar: '18 يناير 2026', en: 'January 18, 2026' },
      readTime: { ar: '8 دقائق قراءة', en: '8 min read' },
      views: 2567,
      content: {
        ar: `
          <p class="lead">جفاف العين مشكلة شائعة تؤثر على ملايين الأشخاص. فهم الأسباب واتباع العلاج المناسب يمكن أن يحسن راحتك بشكل كبير.</p>

          <h2>أسباب جفاف العين</h2>
          <h3>عوامل بيئية</h3>
          <ul>
            <li>الهواء الجاف والمكيفات</li>
            <li>الرياح والغبار</li>
            <li>التعرض للشاشات لفترات طويلة</li>
          </ul>

          <h3>عوامل طبية</h3>
          <ul>
            <li>التقدم في العمر</li>
            <li>بعض الأدوية</li>
            <li>أمراض المناعة الذاتية</li>
            <li>التغيرات الهرمونية</li>
          </ul>

          <h2>الأعراض</h2>
          <ul>
            <li>إحساس بالحرقة أو اللسع</li>
            <li>احمرار العين</li>
            <li>حساسية للضوء</li>
            <li>عدم وضوح الرؤية</li>
            <li>صعوبة في ارتداء العدسات اللاصقة</li>
          </ul>

          <h2>العلاج</h2>
          <h3>قطرات الدموع الاصطناعية</h3>
          <p>متوفرة بدون وصفة طبية، توفر راحة فورية.</p>

          <h3>تغييرات نمط الحياة</h3>
          <ul>
            <li>أخذ فترات راحة من الشاشات</li>
            <li>استخدام مرطب هواء</li>
            <li>شرب كمية كافية من الماء</li>
            <li>اتباع نظام غذائي غني بأوميغا-3</li>
          </ul>

          <div class="cta-box">
            <h3>استشر أطباءنا المتخصصين</h3>
            <p>إذا كنت تعاني من جفاف العين المزمن، احجز موعداً للحصول على خطة علاجية مخصصة.</p>
          </div>
        `,
        en: `
          <p class="lead">Dry eye is a common problem affecting millions of people. Understanding the causes and following appropriate treatment can significantly improve your comfort.</p>

          <h2>Causes of Dry Eyes</h2>
          <h3>Environmental Factors</h3>
          <ul>
            <li>Dry air and air conditioning</li>
            <li>Wind and dust</li>
            <li>Prolonged screen exposure</li>
          </ul>

          <h3>Medical Factors</h3>
          <ul>
            <li>Aging</li>
            <li>Certain medications</li>
            <li>Autoimmune diseases</li>
            <li>Hormonal changes</li>
          </ul>

          <h2>Symptoms</h2>
          <ul>
            <li>Burning or stinging sensation</li>
            <li>Eye redness</li>
            <li>Light sensitivity</li>
            <li>Blurred vision</li>
            <li>Difficulty wearing contact lenses</li>
          </ul>

          <h2>Treatment</h2>
          <h3>Artificial Tears</h3>
          <p>Available without prescription, provide immediate relief.</p>

          <h3>Lifestyle Changes</h3>
          <ul>
            <li>Take breaks from screens</li>
            <li>Use a humidifier</li>
            <li>Drink adequate water</li>
            <li>Follow diet rich in omega-3</li>
          </ul>

          <div class="cta-box">
            <h3>Consult Our Specialized Doctors</h3>
            <p>If you suffer from chronic dry eye, book an appointment for a customized treatment plan.</p>
          </div>
        `,
      },
    },
    {
      id: '11',
      slug: 'eyeglass-maintenance-tips',
      category: { ar: 'نصائح عامة', en: 'General Tips' },
      categoryColor: 'secondary',
      title: {
        ar: 'كيف تحافظ على نظارتك لأطول فترة ممكنة: نصائح عملية',
        en: 'How to Maintain Your Glasses for the Longest Time: Practical Tips',
      },
      excerpt: {
        ar: 'نصائح بسيطة وفعالة للعناية بنظارتك، من التنظيف الصحيح إلى التخزين الآمن.',
        en: 'Simple and effective tips for caring for your glasses, from proper cleaning to safe storage.',
      },
      image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=1200&h=600&fit=crop',
      author: { ar: 'فريق لطفي أوبتيكال', en: 'Lotfy Optical Team' },
      date: { ar: '15 يناير 2026', en: 'January 15, 2026' },
      readTime: { ar: '4 دقائق قراءة', en: '4 min read' },
      views: 1876,
      content: {
        ar: `
          <p class="lead">الاهتمام الصحيح بنظارتك يمكن أن يطيل عمرها ويحافظ على وضوح رؤيتك. إليك أهم النصائح.</p>

          <h2>التنظيف الصحيح</h2>
          <h3>الطريقة الأفضل</h3>
          <ol>
            <li>اشطف النظارة بالماء الفاتر</li>
            <li>ضع قطرة من سائل تنظيف النظارات</li>
            <li>افرك العدسات والإطار بلطف</li>
            <li>اشطف جيداً وجفف بقماش الميكروفايبر</li>
          </ol>

          <h3>ما يجب تجنبه</h3>
          <ul>
            <li>لا تستخدم ملابسك لتنظيف العدسات</li>
            <li>تجنب المنظفات المنزلية</li>
            <li>لا تستخدم الماء الساخن جداً</li>
          </ul>

          <h2>التخزين الآمن</h2>
          <ul>
            <li>احتفظ ب��لنظارة في العلبة دائماً</li>
            <li>ضع النظارة بالعدسات للأعلى</li>
            <li>تجنب تركها في السيارة</li>
          </ul>

          <h2>الصيانة الدورية</h2>
          <p>زر فرعنا كل 6 أشهر لـ:</p>
          <ul>
            <li>شد البراغي</li>
            <li>تعديل الإطار</li>
            <li>فحص العدسات</li>
          </ul>

          <div class="cta-box">
            <h3>خدمة الصيانة المجانية</h3>
            <p>نقدم خدمة صيانة مجانية لجميع النظارات المشتراة من لطفي أوبتيكال.</p>
          </div>
        `,
        en: `
          <p class="lead">Proper care of your glasses can extend their life and maintain clear vision. Here are the most important tips.</p>

          <h2>Proper Cleaning</h2>
          <h3>Best Method</h3>
          <ol>
            <li>Rinse glasses with lukewarm water</li>
            <li>Apply a drop of lens cleaner</li>
            <li>Gently rub lenses and frame</li>
            <li>Rinse well and dry with microfiber cloth</li>
          </ol>

          <h3>What to Avoid</h3>
          <ul>
            <li>Don't use your clothes to clean lenses</li>
            <li>Avoid household cleaners</li>
            <li>Don't use very hot water</li>
          </ul>

          <h2>Safe Storage</h2>
          <ul>
            <li>Always keep glasses in case</li>
            <li>Place glasses with lenses up</li>
            <li>Avoid leaving in car</li>
          </ul>

          <h2>Regular Maintenance</h2>
          <p>Visit our branch every 6 months for:</p>
          <ul>
            <li>Tightening screws</li>
            <li>Frame adjustment</li>
            <li>Lens inspection</li>
          </ul>

          <div class="cta-box">
            <h3>Free Maintenance Service</h3>
            <p>We offer free maintenance for all glasses purchased from Lotfy Optical.</p>
          </div>
        `,
      },
    },
    {
      id: '12',
      slug: 'luxury-eyewear-brands',
      category: { ar: 'موضة النظارات', en: 'Eyewear Fashion' },
      categoryColor: 'secondary',
      title: {
        ar: 'أفخم ماركات النظارات العالمية المتوفرة في لطفي أوبتيكال',
        en: 'Luxury International Eyewear Brands Available at Lotfy Optical',
      },
      excerpt: {
        ar: 'اكتشف مجموعتنا الحصرية من أرقى الماركات العالمية: Ray-Ban، Gucci، Fendi، وغيرها.',
        en: 'Discover our exclusive collection of the finest international brands: Ray-Ban, Gucci, Fendi, and more.',
      },
      image: 'https://images.unsplash.com/photo-1768297087306-491d4d84ede1?w=1200&h=600&fit=crop',
      author: { ar: 'فريق لطفي أوبتيكال', en: 'Lotfy Optical Team' },
      date: { ar: '12 يناير 2026', en: 'January 12, 2026' },
      readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
      views: 2987,
      content: {
        ar: `
          <p class="lead">في لطفي أوبتيكال، نفخر بتقديم مجموعة حصرية من أرقى الماركات العالمية التي تجمع بين الجودة والأناقة والابتكار.</p>

          <h2>Ray-Ban - الأيقونة الأمريكية</h2>
          <p>منذ عام 1937، Ray-Ban تمثل معيار التميز في النظارات الشمسية:</p>
          <ul>
            <li><strong>Aviator:</strong> التصميم العسكري الكلاسيكي</li>
            <li><strong>Wayfarer:</strong> الأيقونة العصرية</li>
            <li><strong>Clubmaster:</strong> الأناقة الريترو</li>
          </ul>

          <h2>Gucci - الفخامة الإيطالية</h2>
          <p>تصاميم جريئة تعكس الأناقة والفخامة الإيطالية:</p>
          <ul>
            <li>شعار GG الأيقوني</li>
            <li>تفاصيل معدنية فاخرة</li>
            <li>ألوان جريئة ومميزة</li>
          </ul>

          <h2>Fendi - الإبداع والابتكار</h2>
          <p>نظارات Fendi تتميز بـ:</p>
          <ul>
            <li>تصاميم هندسية مبتكرة</li>
            <li>إطارات oversized عصرية</li>
            <li>تفاصيل FF الشهيرة</li>
          </ul>

          <h2>Ralph Lauren - الأناقة الأمريكية الكلاسيكية</h2>
          <p>تصاميم راقية تناسب جميع المناسبات.</p>

          <h2>Police - القوة والشخصية</h2>
          <p>نظارات عصرية وجريئة للرجل العصري.</p>

          <div class="cta-box">
            <h3>تسوق الماركات العالمية</h3>
            <p>زر أحد فروعنا الـ 16 في محافظات مصر واستكشف مجموعتنا الحصرية!</p>
          </div>
        `,
        en: `
          <p class="lead">At Lotfy Optical, we pride ourselves on offering an exclusive collection of the finest international brands that combine quality, elegance, and innovation.</p>

          <h2>Ray-Ban - The American Icon</h2>
          <p>Since 1937, Ray-Ban represents the standard of excellence in sunglasses:</p>
          <ul>
            <li><strong>Aviator:</strong> Classic military design</li>
            <li><strong>Wayfarer:</strong> Modern icon</li>
            <li><strong>Clubmaster:</strong> Retro elegance</li>
          </ul>

          <h2>Gucci - Italian Luxury</h2>
          <p>Bold designs reflecting Italian elegance and luxury:</p>
          <ul>
            <li>Iconic GG logo</li>
            <li>Luxurious metal details</li>
            <li>Bold and distinctive colors</li>
          </ul>

          <h2>Fendi - Creativity and Innovation</h2>
          <p>Fendi glasses are characterized by:</p>
          <ul>
            <li>Innovative geometric designs</li>
            <li>Modern oversized frames</li>
            <li>Famous FF details</li>
          </ul>

          <h2>Ralph Lauren - Classic American Elegance</h2>
          <p>Elegant designs suitable for all occasions.</p>

          <h2>Police - Strength and Personality</h2>
          <p>Modern and bold glasses for the modern man.</p>

          <div class="cta-box">
            <h3>Shop International Brands</h3>
            <p>Visit one of our 16 branches in Egyptian governorates and explore our exclusive collection!</p>
          </div>
        `,
      },
    },
    {
      id: '13',
      slug: 'sports-sunglasses-guide',
      category: { ar: 'نظارات شمسية', en: 'Sunglasses' },
      categoryColor: 'primary',
      title: {
        ar: 'نظارات شمسية للرياضيين: كيف تختار الأفضل لنشاطك',
        en: 'Sports Sunglasses: How to Choose the Best for Your Activity',
      },
      excerpt: {
        ar: 'دليل متخصص لاختيار نظارات شمسية رياضية توفر الحماية والأداء الأمثل لنشاطك المفضل.',
        en: 'Specialized guide to choosing sports sunglasses that provide optimal protection and performance for your favorite activity.',
      },
      image: 'https://images.unsplash.com/photo-1770445912450-df0af2c0908f?w=1200&h=600&fit=crop',
      author: { ar: 'أحمد سالم', en: 'Ahmed Salem' },
      date: { ar: '8 يناير 2026', en: 'January 8, 2026' },
      readTime: { ar: '6 دقائق قراءة', en: '6 min read' },
      views: 1543,
      content: {
        ar: `
          <p class="lead">النظارات الشمسية الرياضية ليست مجرد حماية - إنها تحسن أداءك الرياضي وراحتك أثناء النشاط.</p>

          <h2>مميزات النظارات الرياضية</h2>
          <ul>
            <li>إطارات خفيفة ومرنة</li>
            <li>قبضة آمنة لا تنزلق</li>
            <li>عدسات مقاومة للصدمات</li>
            <li>تهوية جيدة لمنع التعرق</li>
          </ul>

          <h2>حسب نوع الرياضة</h2>
          <h3>الجري وركوب الدراجات</h3>
          <ul>
            <li>إطار wrap-around للحماية الكاملة</li>
            <li>عدسات photochromic تتكيف مع الإضاءة</li>
            <li>وزن خفيف جداً</li>
          </ul>

          <h3>الرياضات المائية</h3>
          <ul>
            <li>عدسات مستقطبة لتقليل الوهج</li>
            <li>إطار مقاوم للماء</li>
            <li>طفو في الماء (بعض الموديلات)</li>
          </ul>

          <h3>رياضات الجبال</h3>
          <ul>
            <li>حماية من الأشعة فوق البنفسجية العالية</li>
            <li>عدسات داكنة</li>
            <li>حماية جانبية</li>
          </ul>

          <div class="cta-box">
            <h3>قسم النظارات الرياضية</h3>
            <p>استكشف مجموعتنا المتخصصة من النظارات الرياضية في لطفي أوبتيكال!</p>
          </div>
        `,
        en: `
          <p class="lead">Sports sunglasses aren't just protection - they enhance your athletic performance and comfort during activity.</p>

          <h2>Sports Glasses Features</h2>
          <ul>
            <li>Lightweight and flexible frames</li>
            <li>Secure non-slip grip</li>
            <li>Impact-resistant lenses</li>
            <li>Good ventilation to prevent fogging</li>
          </ul>

          <h2>By Sport Type</h2>
          <h3>Running and Cycling</h3>
          <ul>
            <li>Wrap-around frame for complete protection</li>
            <li>Photochromic lenses adapt to lighting</li>
            <li>Very lightweight</li>
          </ul>

          <h3>Water Sports</h3>
          <ul>
            <li>Polarized lenses to reduce glare</li>
            <li>Water-resistant frame</li>
            <li>Floats on water (some models)</li>
          </ul>

          <h3>Mountain Sports</h3>
          <ul>
            <li>High UV protection</li>
            <li>Dark lenses</li>
            <li>Side protection</li>
          </ul>

          <div class="cta-box">
            <h3>Sports Eyewear Section</h3>
            <p>Explore our specialized collection of sports glasses at Lotfy Optical!</p>
          </div>
        `,
      },
    },
    {
      id: '14',
      slug: 'vintage-eyewear-comeback',
      category: { ar: 'موضة النظارات', en: 'Eyewear Fashion' },
      categoryColor: 'secondary',
      title: {
        ar: 'عودة النظارات الكلاسيكية: الأناقة الخالدة في عام 2026',
        en: 'Vintage Eyewear Comeback: Timeless Elegance in 2026',
      },
      excerpt: {
        ar: 'النظارات الكلاسيكية والريترو تعود بقوة! اكتشف كيف تدمج الأناقة القديمة مع العصرية.',
        en: 'Classic and retro glasses are back with a vengeance! Discover how to blend old elegance with modern style.',
      },
      image: 'https://images.unsplash.com/photo-1761896892087-7e36f6abb684?w=1200&h=600&fit=crop',
      author: { ar: 'مريم أحمد', en: 'Mariam Ahmed' },
      date: { ar: '5 يناير 2026', en: 'January 5, 2026' },
      readTime: { ar: '5 دقائق قراءة', en: '5 min read' },
      views: 2198,
      content: {
        ar: `
          <p class="lead">موضة النظارات الكلاسيكية تعود بقوة في 2026، مع لمسات عصرية تجعلها مثالية لعصرنا الحالي.</p>

          <h2>أساليب ريترو رائجة</h2>
          <h3>نظارات الخمسينيات</h3>
          <ul>
            <li>إطارات cat-eye للنساء</li>
            <li>إطارات browline للرجال</li>
            <li>ألوان كلاسيكية: أسود، سلحفاة</li>
          </ul>

          <h3>نظارات الستينيات</h3>
          <ul>
            <li>إطارات مستديرة كبيرة</li>
            <li>ألوان جريئة ومتعددة</li>
            <li>تفاصيل معدنية رفيعة</li>
          </ul>

          <h3>نظارات السبعينيات</h3>
          <ul>
            <li>إطارات oversized</li>
            <li>نظارات aviator الكلاسيكية</li>
            <li>ألوان earth tones</li>
          </ul>

          <h2>كيف تختار الأسلوب المناسب؟</h2>
          <p>الأسلوب الكلاسيكي يناسب:</p>
          <ul>
            <li>من يحب الأناقة الخالدة</li>
            <li>البيئات المهنية</li>
            <li>من يبحث عن استثمار طويل الأمد</li>
          </ul>

          <div class="cta-box">
            <h3>مجموعة الكلاسيك في لطفي أوبتيكال</h3>
            <p>استكشف مجموعتنا من النظارات الكلاسيكية والريترو المستوحاة من العصور الذهبية!</p>
          </div>
        `,
        en: `
          <p class="lead">Classic eyewear fashion is making a strong comeback in 2026, with modern touches that make them perfect for our current era.</p>

          <h2>Trending Retro Styles</h2>
          <h3>1950s Glasses</h3>
          <ul>
            <li>Cat-eye frames for women</li>
            <li>Browline frames for men</li>
            <li>Classic colors: black, tortoiseshell</li>
          </ul>

          <h3>1960s Glasses</h3>
          <ul>
            <li>Large round frames</li>
            <li>Bold and multiple colors</li>
            <li>Thin metal details</li>
          </ul>

          <h3>1970s Glasses</h3>
          <ul>
            <li>Oversized frames</li>
            <li>Classic aviator glasses</li>
            <li>Earth tone colors</li>
          </ul>

          <h2>How to Choose the Right Style?</h2>
          <p>Classic style suits:</p>
          <ul>
            <li>Those who love timeless elegance</li>
            <li>Professional environments</li>
            <li>Those seeking long-term investment</li>
          </ul>

          <div class="cta-box">
            <h3>Classic Collection at Lotfy Optical</h3>
            <p>Explore our collection of classic and retro glasses inspired by golden eras!</p>
          </div>
        `,
      },
    },
    {
      id: '15',
      slug: 'eyewear-face-shape-guide',
      category: { ar: 'نصائح عامة', en: 'General Tips' },
      categoryColor: 'secondary',
      title: {
        ar: 'دليل اختيار النظارة المثالية حسب شكل الوجه',
        en: 'Perfect Eyewear Selection Guide Based on Face Shape',
      },
      excerpt: {
        ar: 'تعرف على شكل وجهك واختر الإطار المثالي الذي يبرز جمال ملامحك ويخفي عيوبها.',
        en: 'Identify your face shape and choose the perfect frame that highlights your features and conceals flaws.',
      },
      image: 'https://images.unsplash.com/photo-1750390200298-3d5f30f670a1?w=1200&h=600&fit=crop',
      author: { ar: 'د. ليلى حسن', en: 'Dr. Laila Hassan' },
      date: { ar: '1 يناير 2026', en: 'January 1, 2026' },
      readTime: { ar: '7 دقائق قراءة', en: '7 min read' },
      views: 3456,
      content: {
        ar: `
          <p class="lead">اختيار الإطار المناسب يبدأ بمعرفة شكل وجهك. إليك دليلك الكامل لإيجاد النظارة المثالية.</p>

          <h2>كيف تحدد شكل وجهك؟</h2>
          <p>قف أمام المرآة وارسم محيط وجهك بقلم قابل للمسح. انظر إلى الشكل الناتج.</p>

          <h2>أشكال الوجه والإطارات المناسبة</h2>
          <h3>1. الوجه البيضاوي</h3>
          <p><strong>الخصائص:</strong> الطول أكبر من العرض، جبهة أعرض قليلاً من الذقن</p>
          <p><strong>الإطارات المناسبة:</strong></p>
          <ul>
            <li>محظوظ! معظم الأشكال تناسبك</li>
            <li>جرب الإطارات المربعة أو المستطيلة</li>
            <li>الإطارات الكبيرة تبدو رائعة</li>
          </ul>

          <h3>2. الوجه المستدير</h3>
          <p><strong>الخصائص:</strong> العرض والطول متساويان تقريباً، منحنيات ناعمة</p>
          <p><strong>الإطارات المناسبة:</strong></p>
          <ul>
            <li>إطارات مستطيلة لإضافة طول</li>
            <li>إطارات زاوية لإضافة تعريف</li>
            <li>تجنب الإطارات المستديرة جداً</li>
          </ul>

          <h3>3. الوجه المربع</h3>
          <p><strong>الخصائص:</strong> جبهة وفك عريضان، زوايا حادة</p>
          <p><strong>الإطارات المناسبة:</strong></p>
          <ul>
            <li>إطارات مستديرة أو بيضاوية</li>
            <li>إطارات cat-eye للنساء</li>
            <li>تجنب الإطارات المربعة الحادة</li>
          </ul>

          <h3>4. الوجه القلبي</h3>
          <p><strong>الخصائص:</strong> جبهة عريضة، ذقن مدبب</p>
          <p><strong>الإطارات المناسبة:</strong></p>
          <ul>
            <li>إطارات خفيفة في الأعلى</li>
            <li>إطارات بدون حواف علوية</li>
            <li>إطارات aviator</li>
          </ul>

          <h3>5. الوجه الماسي</h3>
          <p><strong>الخصائص:</strong> عظام خد بارزة، جبهة وذقن ضيقان</p>
          <p><strong>الإطارات المناسبة:</strong></p>
          <ul>
            <li>إطارات cat-eye</li>
            <li>إطارات بيضاوية</li>
            <li>إطارات بدون حواف</li>
          </ul>

          <div class="highlight-box">
            <p><strong>نصيحة ذهبية:</strong> هذه إرشادات عامة، لكن الأهم هو اختيار ما يجعلك تشعر بالثقة والراحة!</p>
          </div>

          <div class="cta-box">
            <h3>استشارة مجانية في لطفي أوبتيكال</h3>
            <p>خبراؤنا سيساعدونك في اختيار الإطار المثالي الذي يناسب شكل وجهك وأسلوبك!</p>
          </div>
        `,
        en: `
          <p class="lead">Choosing the right frame starts with knowing your face shape. Here's your complete guide to finding the perfect glasses.</p>

          <h2>How to Determine Your Face Shape?</h2>
          <p>Stand in front of a mirror and draw your face outline with an erasable pen. Look at the resulting shape.</p>

          <h2>Face Shapes and Suitable Frames</h2>
          <h3>1. Oval Face</h3>
          <p><strong>Characteristics:</strong> Length greater than width, forehead slightly wider than chin</p>
          <p><strong>Suitable Frames:</strong></p>
          <ul>
            <li>Lucky! Most shapes suit you</li>
            <li>Try square or rectangular frames</li>
            <li>Large frames look great</li>
          </ul>

          <h3>2. Round Face</h3>
          <p><strong>Characteristics:</strong> Width and length approximately equal, soft curves</p>
          <p><strong>Suitable Frames:</strong></p>
          <ul>
            <li>Rectangular frames to add length</li>
            <li>Angular frames to add definition</li>
            <li>Avoid very round frames</li>
          </ul>

          <h3>3. Square Face</h3>
          <p><strong>Characteristics:</strong> Wide forehead and jaw, sharp angles</p>
          <p><strong>Suitable Frames:</strong></p>
          <ul>
            <li>Round or oval frames</li>
            <li>Cat-eye frames for women</li>
            <li>Avoid sharp square frames</li>
          </ul>

          <h3>4. Heart-Shaped Face</h3>
          <p><strong>Characteristics:</strong> Wide forehead, pointed chin</p>
          <p><strong>Suitable Frames:</strong></p>
          <ul>
            <li>Light frames on top</li>
            <li>Rimless top frames</li>
            <li>Aviator frames</li>
          </ul>

          <h3>5. Diamond Face</h3>
          <p><strong>Characteristics:</strong> Prominent cheekbones, narrow forehead and chin</p>
          <p><strong>Suitable Frames:</strong></p>
          <ul>
            <li>Cat-eye frames</li>
            <li>Oval frames</li>
            <li>Rimless frames</li>
          </ul>

          <div class="highlight-box">
            <p><strong>Golden tip:</strong> These are general guidelines, but most important is choosing what makes you feel confident and comfortable!</p>
          </div>

          <div class="cta-box">
            <h3>Free Consultation at Lotfy Optical</h3>
            <p>Our experts will help you choose the perfect frame that suits your face shape and style!</p>
          </div>
        `,
      },
    },
  ];

  // Find the article by ID or slug
  const article = articles.find((a) => a.id === id || a.slug === id);

  // If article not found, show first article as fallback
  const displayArticle = article || articles[0];

  // Related articles (exclude current article)
  const relatedArticles = articles.filter((a) => a.id !== displayArticle.id).slice(0, 2);

  // Popular articles for sidebar
  const popularArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={displayArticle.image}
          alt={displayArticle.title[language]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent"></div>

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 text-sm"
            >
              <ArrowLeft className="w-4 h-4" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
              <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </Link>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 bg-${displayArticle.categoryColor} text-white rounded-full text-sm font-medium`}>
                  {displayArticle.category[language]}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-white mb-6 text-3xl md:text-4xl lg:text-5xl">
                {displayArticle.title[language]}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayArticle.author[language])}&background=ECB273&color=fff`}
                    alt={displayArticle.author[language]}
                    className="w-10 h-10 rounded-full border-2 border-white/20"
                  />
                  <span className="font-medium">{displayArticle.author[language]}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{displayArticle.date[language]}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{displayArticle.readTime[language]}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{displayArticle.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {/* Excerpt */}
                <p className="text-xl text-muted-foreground mb-8 pb-8 border-b border-border">
                  {displayArticle.excerpt[language]}
                </p>

                {/* Article Body */}
                <div
                  className="prose prose-lg max-w-none article-content"
                  dangerouslySetInnerHTML={{ __html: displayArticle.content[language] }}
                />

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-medium text-secondary flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      {language === 'ar' ? 'شارك المقالة:' : 'Share Article:'}
                    </span>

                    <div className="flex gap-3">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90 transition-colors duration-200"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>

                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(displayArticle.title[language])}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90 transition-colors duration-200"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>

                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 transition-colors duration-200"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-secondary mb-6">
                  {language === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      to={`/article/${relatedArticle.id}`}
                      className="group bg-white rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title[language]}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="p-6">
                        <span className={`inline-block px-3 py-1 bg-${relatedArticle.categoryColor}/10 text-${relatedArticle.categoryColor} rounded-full text-xs font-medium mb-3`}>
                          {relatedArticle.category[language]}
                        </span>

                        <h4 className="font-bold text-lg mb-2 text-secondary group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {relatedArticle.title[language]}
                        </h4>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {relatedArticle.excerpt[language]}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {relatedArticle.readTime[language]}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {relatedArticle.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Popular Articles */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg text-secondary">
                      {language === 'ar' ? 'المقالات الأكثر قراءة' : 'Most Popular Articles'}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {popularArticles.map((popularArticle, index) => (
                      <Link
                        key={popularArticle.id}
                        to={`/article/${popularArticle.id}`}
                        className="group flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0 hover:bg-background/50 -mx-2 px-2 py-2 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">
                            {index + 1}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-secondary group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2">
                            {popularArticle.title[language]}
                          </h4>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {popularArticle.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {popularArticle.readTime[language]}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Box */}
                <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg p-8 text-white text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    {language === 'ar' ? 'احجز فحصاً مجانياً' : 'Book a Free Exam'}
                  </h3>

                  <p className="text-white/90 text-sm mb-6">
                    {language === 'ar'
                      ? 'احجز موعدك الآن واحصل على استشارة مجانية'
                      : 'Book your appointment now and get a free consultation'}
                  </p>

                  <Link
                    to="/clinics"
                    className="inline-block bg-white text-primary hover:bg-background px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Link>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Tag className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg text-secondary">
                      {language === 'ar' ? 'التصنيفات' : 'Categories'}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {[
                      { ar: 'صحة العيون', en: 'Eye Health', count: 12 },
                      { ar: 'موضة النظارات', en: 'Eyewear Fashion', count: 8 },
                      { ar: 'الفحوصات الطبية', en: 'Medical Exams', count: 6 },
                      { ar: 'العدسات اللاصقة', en: 'Contact Lenses', count: 5 },
                      { ar: 'نصائح وإرشادات', en: 'Tips & Guides', count: 15 },
                    ].map((cat, index) => (
                      <Link
                        key={index}
                        to="/articles"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors duration-200 group"
                      >
                        <span className="text-secondary group-hover:text-primary transition-colors duration-200">
                          {cat[language]}
                        </span>
                        <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
                          {cat.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Article Content */}
      <style>{`
        .article-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #2C3E50;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #ECB273;
        }

        .article-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #2C3E50;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .article-content p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          color: #4a5568;
        }

        .article-content p.lead {
          font-size: 1.25rem;
          color: #2d3748;
          font-weight: 400;
          line-height: 1.7;
        }

        .article-content ul, .article-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
          color: #4a5568;
        }

        .article-content strong {
          font-weight: 600;
          color: #2C3E50;
        }

        .article-content .highlight-box {
          background: linear-gradient(135deg, #ECB273 0%, #d9a362 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 1rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px rgba(236, 178, 115, 0.2);
        }

        .article-content .highlight-box p {
          margin: 0;
          color: white;
          font-size: 1.125rem;
        }

        .article-content .cta-box {
          background: linear-gradient(135deg, #2C3E50 0%, #34495e 100%);
          color: white;
          padding: 2rem;
          border-radius: 1rem;
          margin: 2rem 0;
          text-align: center;
          box-shadow: 0 8px 16px rgba(44, 62, 80, 0.2);
        }

        .article-content .cta-box h3 {
          color: white;
          margin-top: 0;
          font-size: 1.5rem;
        }

        .article-content .cta-box p {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .article-content .warning-box {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin: 2rem 0;
        }

        .article-content .warning-box ul {
          margin-bottom: 0;
        }

        .article-content .warning-box li {
          color: #856404;
        }

        .article-content a {
          color: #ECB273;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .article-content a:hover {
          color: #d9a362;
        }
      `}</style>
    </div>
  );
}
