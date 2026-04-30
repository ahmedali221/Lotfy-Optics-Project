import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, Heart, Menu, X, ChevronDown, Sun, Glasses, Search, User, LogOut, LogIn } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { AuthModal } from '../auth/AuthModal';
const logo = '';

export function Navbar() {
  const { language, t } = useLanguage();
  const { getItemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productCategories = [
    {
      path: '/sunglasses',
      label: t('nav.sunglasses'),
      icon: Sun,
      color: 'text-yellow-600'
    },
    {
      path: '/eyeglasses',
      label: t('nav.eyeglasses'),
      icon: Glasses,
      color: 'text-blue-600'
    },
    // No API category — API only supports: frame, lens, accessory
    // { path: '/light-filters', label: t('nav.filters'), icon: Rainbow, color: 'text-purple-600' },
    // { path: '/artificial-eyes', label: t('nav.artificial'), icon: Eye, color: 'text-green-600' },
  ];

  const mainNavLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
  ];

  const otherNavLinks = [
    // No API endpoint — commented until backend adds clinic/article data
    // { path: '/clinics', label: t('nav.clinics') },
    // { path: '/articles', label: t('nav.articles') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="LOTFY OPTICAL" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {/* Main Links */}
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium text-secondary hover:text-primary transition-colors duration-200"
              >
                {t('nav.products')}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProductsDropdownOpen && (
                <div 
                  className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-border animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  style={language === 'ar' ? { right: 0 } : { left: 0 }}
                >
                  {productCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.path}
                        to={category.path}
                        onClick={() => setIsProductsDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-background transition-colors duration-200 ${index === 0 ? 'rounded-t-lg' : ''} ${index === productCategories.length - 1 ? 'rounded-b-lg' : ''}`}
                      >
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-sm text-secondary">
                          {category.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other Links */}
            {otherNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              className="hidden md:flex p-2 text-secondary hover:text-primary transition-colors duration-200"
              aria-label={t('nav.search')}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-secondary hover:text-primary transition-colors duration-200"
              aria-label={t('nav.cart')}
            >
              <ShoppingCart className="w-6 h-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 text-secondary hover:text-primary transition-colors duration-200"
              aria-label={t('nav.wishlist')}
            >
              <Heart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Auth — Desktop */}
            <div className="hidden lg:block">
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border hover:border-primary hover:text-primary transition-colors duration-200 text-sm font-medium text-secondary"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div
                      className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-border z-50"
                      style={language === 'ar' ? { right: 0 } : { left: 0 }}
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold text-secondary truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-medium transition-colors duration-200 shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-secondary hover:text-primary transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Auth Modal */}
          {showAuthModal && (
            <AuthModal onClose={() => setShowAuthModal(false)} />
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-1">
              {/* Main Links */}
              {mainNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-md text-sm font-medium text-secondary hover:text-primary hover:bg-background transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Products Dropdown */}
              <div className="border-t border-b border-border py-2 my-2">
                <button
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="flex items-center justify-between w-full px-4 py-2 rounded-md text-sm font-medium text-secondary hover:text-primary hover:bg-background transition-colors duration-200"
                >
                  <span>{t('nav.products')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileProductsOpen && (
                  <div className="mt-2 space-y-1 bg-background/50 rounded-lg p-2">
                    {productCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Link
                          key={category.path}
                          to={category.path}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileProductsOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white transition-colors duration-200"
                        >
                          <Icon className={`w-5 h-5 ${category.color}`} />
                          <span className="text-sm font-medium text-secondary">
                            {category.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Other Links */}
              {otherNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-md text-sm font-medium text-secondary hover:text-primary hover:bg-background transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth — Mobile */}
              <div className="border-t border-border pt-3 mt-1">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2 mb-1">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-secondary truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm font-medium text-primary hover:bg-background transition-colors duration-200"
                  >
                    <LogIn className="w-4 h-4" />
                    {language === 'ar' ? 'تسجيل الدخول / إنشاء حساب' : 'Sign In / Register'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}