import { useLanguage } from '../context/LanguageContext';
import { Stethoscope } from 'lucide-react';

export function ClinicsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex p-6 bg-primary/10 rounded-full mb-8 animate-bounce">
          <Stethoscope className="w-16 h-16 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 tracking-tight">
          {language === 'ar' ? 'قريباً جداً' : 'Coming Soon'}
        </h1>
        
        <div className="h-1.5 w-24 bg-primary mx-auto mb-8 rounded-full" />
        
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          {language === 'ar' 
            ? 'نحن نعمل على تجهيز عياداتنا بأحدث التقنيات لنقدم لكم أفضل رعاية طبية لعيونكم. انتظرونا قريباً!' 
            : "We are currently equipping our clinics with the latest technologies to provide you with the best medical care for your eyes. Stay tuned!"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { 
              ar: 'فحص شامل', 
              en: 'Comprehensive Exam',
              desc_ar: 'أحدث أجهزة قياس النظر',
              desc_en: 'Latest vision measurement devices'
            },
            { 
              ar: 'فحص قاع العين', 
              en: 'Retinal Exam',
              desc_ar: 'تشخيص دقيق لمشاكل الشبكية',
              desc_en: 'Accurate diagnosis for retinal issues'
            },
            { 
              ar: 'ضغط العين', 
              en: 'Eye Pressure',
              desc_ar: 'متابعة دورية لضغط العين',
              desc_en: 'Regular eye pressure monitoring'
            }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow text-center">
              <h3 className="text-lg font-bold mb-2 text-secondary">
                {language === 'ar' ? item.ar : item.en}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? item.desc_ar : item.desc_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Old Implementation - Reverted and Commented
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, Stethoscope, Eye, Activity, Glasses, Baby, Droplets } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { toast } from 'sonner@2.0.3';

export function ClinicsPageOld() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    branch: '',
  });

  const services = [
    {
      icon: Eye,
      key: 'refraction',
      title: t('clinics.service.refraction'),
      desc: t('clinics.service.refraction_desc'),
    },
    {
      icon: Activity,
      key: 'retina',
      title: t('clinics.service.retina'),
      desc: t('clinics.service.retina_desc'),
    },
    {
      icon: Stethoscope,
      key: 'pressure',
      title: t('clinics.service.pressure'),
      desc: t('clinics.service.pressure_desc'),
    },
    {
      icon: Glasses,
      key: 'contacts',
      title: t('clinics.service.contacts'),
      desc: t('clinics.service.contacts_desc'),
    },
    {
      icon: Baby,
      key: 'amblyopia',
      title: t('clinics.service.amblyopia'),
      desc: t('clinics.service.amblyopia_desc'),
    },
    {
      icon: Droplets,
      key: 'dryeye',
      title: t('clinics.service.dryeye'),
      desc: t('clinics.service.dryeye_desc'),
    },
  ];

  const equipment = [
    {
      name: { ar: 'Auto Refractometer', en: 'Auto Refractometer' },
      desc: { ar: 'لقياس النظر الآلي', en: 'For automated vision measurement' },
    },
    {
      name: { ar: 'Slit Lamp', en: 'Slit Lamp' },
      desc: { ar: 'لفحص العين التفصيلي', en: 'For detailed eye examination' },
    },
    {
      name: { ar: 'Fundus Camera', en: 'Fundus Camera' },
      desc: { ar: 'لتصوير قاع العين', en: 'For retinal imaging' },
    },
    {
      name: { ar: 'Tonometer', en: 'Tonometer' },
      desc: { ar: 'لقياس ضغط العين', en: 'For eye pressure measurement' },
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time || !formData.branch) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    // Simulate booking
    toast.success(t('appointment.success'));
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      branch: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1663151064065-cb334788f77d?w=1200&h=400&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="text-white max-w-3xl">
            <h1 className="mb-4 text-white">{t('clinics.title')}</h1>
            <p className="text-xl opacity-90">{t('clinics.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">{t('clinics.services')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.key} className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="mb-2">{service.title}</h4>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">
            {t('clinics.latestEquipment', 'أحدث الأجهزة الطبية')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {equipment.map((item, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md text-center">
                <h4 className="mb-2">{item.name[language]}</h4>
                <p className="text-sm text-muted-foreground">{item.desc[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-2">{t('appointment.title')}</h2>
              <p className="text-muted-foreground">
                {t('appointment.subtitle', 'احجز موعدك الآن واحصل على أفضل رعاية لعينيك')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 rounded-lg">
              <div>
                <label className="block text-sm mb-2">{t('appointment.name')} *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">{t('appointment.phone')} *</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">{t('appointment.email')}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">{t('appointment.service')} *</label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('appointment.service')} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.key} value={service.key}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">{t('appointment.date')} *</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">{t('appointment.time')} *</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">{t('appointment.branch')} *</label>
                <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('appointment.branch')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ferial">{t('appointment.branch.ferial')}</SelectItem>
                    <SelectItem value="hoqoqyin">{t('appointment.branch.hoqoqyin')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
                <Calendar className="w-5 h-5 me-2" />
                {t('appointment.submit')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
