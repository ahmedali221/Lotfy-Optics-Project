import { Link } from 'react-router';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/logo.png';

export function Footer() {
  const { t } = useLanguage();
  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/eyeglasses', label: t('nav.eyeglasses') },
    { path: '/lenses', label: t('nav.lenses') },
    { path: '/clinics', label: t('nav.clinics') },
  ];

  const services = [
    { path: '/artificial-eyes', label: t('nav.artificial') },
    { path: '/light-filters', label: t('nav.filters') },
    { path: '/branches', label: t('nav.branches') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-[#2c3e50] text-white mt-20 pt-16 pb-6 font-cairo" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Column 1: Logo & About */}
          <div className="flex flex-col items-start ">
            <div className="mb-4">
              <img
                src={logo}
                alt="LOTFY OPTICAL"
                className="h-24 w-auto brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              محلات لطفي للبصريات - وجهتك المثالية للنظارات والعناية بالعيون في أسيوط
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start text-start">
            <h4 className="mb-6 font-bold text-lg text-white">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#d4af37] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col items-start text-start">
            <h4 className="mb-6 font-bold text-lg text-white">خدماتنا</h4>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#d4af37] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="flex flex-col items-center text-center">
            <h4 className="mb-6 font-bold text-lg text-white">تواصل معنا</h4>
            <ul className="space-y-2 flex flex-col w-full">
              <li className="flex  gap-3 w-full">
                <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0" />

                <div className="text-sm">
                  <a href="tel:01037834311" className="text-gray-300 hover:text-[#d4af37] transition-colors" dir="ltr">
                    01037834311
                  </a>
                </div>
              </li>
              <li className="flex  gap-3 w-full">
                <Mail className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <div className="text-sm">
                  <a href="mailto:info@lotfyoptical.com" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                    info@lotfyoptical.com
                  </a>
                </div>
              </li>
              <li className="flex  gap-3 w-full">
                <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <div className="text-sm text-gray-300 text-right leading-relaxed">
                  <div>أسيوط - فريال</div>
                  <div>أسيوط - الحقوقيين</div>
                </div>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="mb-4 font-bold text-sm text-white">تابعنا</h4>
              <div className="flex justify-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#34495e] pt-6 flex flex-col items-center justify-center">
          <p className="text-gray-400 text-xs">
            © 2026 LOTFY OPTICAL. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}