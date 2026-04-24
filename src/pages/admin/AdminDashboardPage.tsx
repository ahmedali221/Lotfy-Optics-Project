import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';
import { 
  TrendingUp, 
  ShoppingCart, 
  Calendar, 
  Users, 
  Package,
  DollarSign,
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export function AdminDashboardPage() {
  const { language } = useLanguage();

  const stats = [
    {
      title: { ar: 'إجمالي المبيعات', en: 'Total Sales' },
      value: '245,670',
      unit: { ar: 'جنيه', en: 'EGP' },
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: { ar: 'الطلبات', en: 'Orders' },
      value: '1,234',
      unit: { ar: 'طلب', en: 'orders' },
      change: '+8.2%',
      trend: 'up' as const,
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: { ar: 'المواعيد', en: 'Appointments' },
      value: '89',
      unit: { ar: 'موعد', en: 'appointments' },
      change: '-3.1%',
      trend: 'down' as const,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: { ar: 'المستخدمين', en: 'Users' },
      value: '3,456',
      unit: { ar: 'مستخدم', en: 'users' },
      change: '+15.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'أحمد محمد',
      product: 'نظارة شمسية Ray-Ban',
      amount: 850,
      status: 'completed' as const,
      date: '2026-02-23',
    },
    {
      id: '#ORD-002',
      customer: 'سارة علي',
      product: 'نظارة طبية Gucci',
      amount: 1200,
      status: 'pending' as const,
      date: '2026-02-23',
    },
    {
      id: '#ORD-003',
      customer: 'محمد حسن',
      product: 'عدسات لاصقة',
      amount: 450,
      status: 'processing' as const,
      date: '2026-02-22',
    },
    {
      id: '#ORD-004',
      customer: 'فاطمة أحمد',
      product: 'نظارة أطفال',
      amount: 380,
      status: 'completed' as const,
      date: '2026-02-22',
    },
  ];

  const recentAppointments = [
    {
      id: '#APT-001',
      patient: 'علي محمود',
      doctor: 'د. أحمد السيد',
      type: 'فحص شامل',
      date: '2026-02-24',
      time: '10:00 AM',
      status: 'confirmed' as const,
    },
    {
      id: '#APT-002',
      patient: 'نور الدين',
      doctor: 'د. سارة حسن',
      type: 'قياس نظر',
      date: '2026-02-24',
      time: '11:30 AM',
      status: 'pending' as const,
    },
    {
      id: '#APT-003',
      patient: 'ليلى أحمد',
      doctor: 'د. محمد علي',
      type: 'متابعة',
      date: '2026-02-25',
      time: '02:00 PM',
      status: 'confirmed' as const,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { ar: string; en: string }> = {
      completed: { ar: 'مكتمل', en: 'Completed' },
      pending: { ar: 'قيد الانتظار', en: 'Pending' },
      processing: { ar: 'قيد المعالجة', en: 'Processing' },
      confirmed: { ar: 'مؤكد', en: 'Confirmed' },
    };
    return statusMap[status]?.[language] || status;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">
            {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'مرحباً بك في لوحة التحكم الإدارية' : 'Welcome to your admin dashboard'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-1">
                  {stat.value}
                  {stat.unit && <span className="text-base text-muted-foreground ml-2">{stat.unit[language]}</span>}
                </h3>
                <p className="text-sm text-muted-foreground">{stat.title[language]}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-border">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-secondary">
                {language === 'ar' ? 'أحدث الطلبات' : 'Recent Orders'}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                      {language === 'ar' ? 'رقم الطلب' : 'Order ID'}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                      {language === 'ar' ? 'العميل' : 'Customer'}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                      {language === 'ar' ? 'المبلغ' : 'Amount'}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                      {language === 'ar' ? 'الحالة' : 'Status'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                        {order.amount} {language === 'ar' ? 'ج.م' : 'EGP'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-border">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-secondary">
                {language === 'ar' ? 'المواعيد القادمة' : 'Upcoming Appointments'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-border hover:shadow-sm transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-secondary">{appointment.patient}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{appointment.type}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{appointment.date}</span>
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary">456</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إجمالي المنتجات' : 'Total Products'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary">12.5K</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'زيارات الموقع' : 'Site Visits'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary">89.5%</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
