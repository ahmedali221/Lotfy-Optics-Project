import { useState, ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Calendar, 
  FileText, 
  Users, 
  CreditCard, 
  MapPin, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  Eye,
  Sun,
  Bell,
  Search
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const menuItems = [
    {
      title: { ar: 'لوحة التحكم', en: 'Dashboard' },
      icon: LayoutDashboard,
      path: '/admin/dashboard',
    },
    {
      title: { ar: 'المنتجات', en: 'Products' },
      icon: Package,
      path: '/admin/products',
    },
    {
      title: { ar: 'الطلبات', en: 'Orders' },
      icon: ShoppingCart,
      path: '/admin/orders',
    },
    {
      title: { ar: 'المواعيد الطبية', en: 'Appointments' },
      icon: Calendar,
      path: '/admin/appointments',
    },
    {
      title: { ar: 'المقالات', en: 'Articles' },
      icon: FileText,
      path: '/admin/articles',
    },
    {
      title: { ar: 'المستخدمين', en: 'Users' },
      icon: Users,
      path: '/admin/users',
    },
    {
      title: { ar: 'طرق الدفع', en: 'Payment Methods' },
      icon: CreditCard,
      path: '/admin/payment-methods',
    },
    {
      title: { ar: 'الفروع', en: 'Branches' },
      icon: MapPin,
      path: '/admin/branches',
    },
    {
      title: { ar: 'الإعدادات', en: 'Settings' },
      icon: Settings,
      path: '/admin/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-64 bg-secondary shadow-2xl z-50 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">LOTFY</h2>
              <p className="text-white/60 text-xs">{language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.title[language]}</span>
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-8"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${language === 'ar' ? 'lg:mr-64' : 'lg:ml-64'} min-h-screen`}>
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-border sticky top-0 z-40 shadow-sm">
          <div className="h-full px-6 flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-secondary hover:text-primary"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-border w-80">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
                  className="bg-transparent border-none outline-none w-full text-sm"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-secondary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Quick View Site */}
              <Link
                to="/"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium text-secondary"
              >
                <Sun className="w-4 h-4" />
                <span>{language === 'ar' ? 'عرض الموقع' : 'View Site'}</span>
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {adminUser.name?.charAt(0) || 'A'}
                  </div>
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-secondary">{adminUser.name || 'Admin'}</p>
                    <p className="text-xs text-muted-foreground">{language === 'ar' ? 'مسؤول' : 'Administrator'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-border py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </div>
  );
}
