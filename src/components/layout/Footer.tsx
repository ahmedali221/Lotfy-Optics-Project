import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import logo from 'figma:asset/6cf34647e4fbb686586e5bf4df6ca696eb0c53aa.png';

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/sunglasses', label: t('nav.sunglasses') },
    { path: '/eyeglasses', label: t('nav.eyeglasses') },
    // No API endpoint — commented until backend adds clinic data
    // { path: '/clinics', label: t('nav.clinics') },
  ];

  const services = [
    // No API category — API only supports: frame, lens, accessory
    // { path: '/artificial-eyes', label: t('nav.artificial') },
    // { path: '/light-filters', label: t('nav.filters') },
    // No API endpoint — commented until backend adds branches data
    // { path: '/branches', label: t('nav.branches') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <img 
                src={logo} 
                alt="LOTFY OPTICAL" 
                className="h-20 w-auto brightness-0 invert" 
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.about.text')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a href="tel:01012115763" className="text-gray-300 hover:text-primary transition-colors">
                    01012115763
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a href="mailto:info@lotfyoptical.com" className="text-gray-300 hover:text-primary transition-colors">
                    info@lotfyoptical.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <div>أسيوط - فريال</div>
                  <div>أسيوط - الحقوقيين</div>
                </div>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm">{t('footer.followUs')}</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LOTFY OPTICAL. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}