import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from 'sonner@2.0.3';

export function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    const whatsappNumber = '201117744708';
    const text = language === 'ar'
      ? `الاسم: ${formData.name}${formData.subject ? `\nالموضوع: ${formData.subject}` : ''}`
      : `Name: ${formData.name}${formData.subject ? `\nSubject: ${formData.subject}` : ''}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    toast.success(language === 'ar' ? 'جاري فتح واتساب لإرسال رسالتك' : 'Opening WhatsApp to send your message');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero with Background Image */}
      <div className="relative bg-secondary text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1766066014237-00645c74e9c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Contact Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary border border-primary/30 mb-6">
            <span className="text-sm font-medium">
              {language === 'ar' ? 'نحن هنا لمساعدتك' : 'We Are Here to Help'}
            </span>
          </div>
          <h1 className="mb-4 text-white">
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="text-xl text-white/95">
            {language === 'ar'
              ? 'نحن هنا للإجابة على استفساراتك ومساعدتك'
              : 'We are here to answer your questions and help you'
            }
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2">
                      {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                    </h4>
                    <a href="tel:01012115763" className="text-muted-foreground hover:text-primary transition-colors">
                      01012115763
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2">
                      {language === 'ar' ? 'راسلنا' : 'Email Us'}
                    </h4>
                    <a href="mailto:info@lotfyoptical.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                      info@lotfyoptical.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2">
                      {language === 'ar' ? 'الفرع الأول' : 'Branch 1'}
                    </h4>
                    <a
                      href="https://www.google.com/maps/place/Lotfy+optics+Assuit/@27.1902185,31.1852709,17z/data=!3m1!4b1!4m6!3m5!1s0x14450b064060496b:0x3d69b9b67b0f290c!8m2!3d27.1902185!4d31.182696!16s%2Fg%2F11fq5jp4df?entry=tts&g_ep=EgoyMDI2MDQyOC4wIPu8ASoASAFQAw%3D%3D&skid=b1bad7ef-5e21-4534-ae10-81177cc6c9ad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {language === 'ar'
                        ? 'أسيوط شركه فريال، خلف النساجون الشرقيون للسجاد وبجوار مكتب بريد، قسم ثان أسيوط، محافظة أسيوط'
                        : 'Assiut, Ferial Company, behind Al-Nassajoun Al-Sharqioun carpet store, next to post office, 2nd district, Assiut Governorate'}
                    </a>
                  </div>
                </div>
                <div className="mt-4 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d982.3!2d31.182696!3d27.1902185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14450b064060496b%3A0x3d69b9b67b0f290c!2sLotfy%20optics%20Assuit!5e0!3m2!1sar!2seg!4v1714650000000!5m2!1sar!2seg"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={language === 'ar' ? 'موقع الفرع الأول' : 'Branch 1 Location'}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2">
                      {language === 'ar' ? 'الفرع الثاني' : 'Branch 2'}
                    </h4>
                    <a
                      href="https://www.google.com/maps?q=27.196409225463867,31.179893493652344&z=17&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {language === 'ar'
                        ? 'أسيوط، مدخل تقسيم الحقوقيين، برج الفيروز، خلف مساكن عزبة السجن، بجوار برج الحرية'
                        : 'Assiut, entrance of Hoqoqyin division, Al-Fayroz Tower, behind Ozbet El-Segn residences, next to Al-Horeya Tower'}
                    </a>
                  </div>
                </div>
                <div className="mt-4 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d982.3!2d31.179893!3d27.196409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1714650000000!5m2!1sar!2seg"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={language === 'ar' ? 'موقع الفرع الثاني' : 'Branch 2 Location'}
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
              <h2 className="mb-6">
                {language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">
                      {language === 'ar' ? 'الاسم' : 'Name'} *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      {language === 'ar' ? 'الموضوع' : 'Subject'}
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    {language === 'ar' ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
                  <Send className="w-5 h-5 me-2" />
                  {language === 'ar' ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}