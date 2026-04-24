import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Eye, Trash2, Download, Filter } from 'lucide-react';

export function AdminOrdersPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [orders, setOrders] = useState([
    {
      id: '#ORD-001',
      customer: { name: 'أحمد محمد', email: 'ahmed@example.com' },
      items: 2,
      total: 1650,
      status: 'completed',
      paymentMethod: 'credit_card',
      date: '2026-02-23',
      time: '10:30 AM',
    },
    {
      id: '#ORD-002',
      customer: { name: 'سارة علي', email: 'sara@example.com' },
      items: 1,
      total: 1200,
      status: 'pending',
      paymentMethod: 'cash',
      date: '2026-02-23',
      time: '11:15 AM',
    },
    {
      id: '#ORD-003',
      customer: { name: 'محمد حسن', email: 'mohamed@example.com' },
      items: 3,
      total: 2450,
      status: 'processing',
      paymentMethod: 'credit_card',
      date: '2026-02-22',
      time: '03:45 PM',
    },
    {
      id: '#ORD-004',
      customer: { name: 'فاطمة أحمد', email: 'fatema@example.com' },
      items: 1,
      total: 380,
      status: 'completed',
      paymentMethod: 'vodafone_cash',
      date: '2026-02-22',
      time: '02:20 PM',
    },
    {
      id: '#ORD-005',
      customer: { name: 'علي محمود', email: 'ali@example.com' },
      items: 2,
      total: 1800,
      status: 'cancelled',
      paymentMethod: 'credit_card',
      date: '2026-02-21',
      time: '09:00 AM',
    },
  ]);

  const statusOptions = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'pending', labelAr: 'قيد الانتظار', labelEn: 'Pending' },
    { id: 'processing', labelAr: 'قيد المعالجة', labelEn: 'Processing' },
    { id: 'completed', labelAr: 'مكتمل', labelEn: 'Completed' },
    { id: 'cancelled', labelAr: 'ملغي', labelEn: 'Cancelled' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return statusOptions.find(s => s.id === status)?.[language === 'ar' ? 'labelAr' : 'labelEn'] || status;
  };

  const getPaymentMethodText = (method: string) => {
    const methods: Record<string, { ar: string; en: string }> = {
      credit_card: { ar: 'بطاقة ائتمان', en: 'Credit Card' },
      cash: { ar: 'نقداً', en: 'Cash on Delivery' },
      vodafone_cash: { ar: 'فودافون كاش', en: 'Vodafone Cash' },
    };
    return methods[method]?.[language] || method;
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الطلب؟' : 'Are you sure you want to delete this order?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              {language === 'ar' ? 'إدارة الطلبات' : 'Orders Management'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'إدارة ومتابعة جميع الطلبات' : 'Manage and track all orders'}
            </p>
          </div>
          <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
            <Download className="w-5 h-5" />
            <span>{language === 'ar' ? 'تصدير' : 'Export'}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: { ar: 'إجمالي الطلبات', en: 'Total Orders' }, value: orders.length, color: 'bg-blue-500' },
            { label: { ar: 'قيد الانتظار', en: 'Pending' }, value: orders.filter(o => o.status === 'pending').length, color: 'bg-yellow-500' },
            { label: { ar: 'قيد المعالجة', en: 'Processing' }, value: orders.filter(o => o.status === 'processing').length, color: 'bg-purple-500' },
            { label: { ar: 'مكتمل', en: 'Completed' }, value: orders.filter(o => o.status === 'completed').length, color: 'bg-green-500' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <span className="text-white text-xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label[language]}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'ar' ? 'البحث عن طلب...' : 'Search orders...'}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="w-full md:w-64">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {statusOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {language === 'ar' ? option.labelAr : option.labelEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'رقم الطلب' : 'Order ID'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'العميل' : 'Customer'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'المنتجات' : 'Items'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'المبلغ' : 'Total'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'طريقة الدفع' : 'Payment'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-secondary">{order.customer.name}</p>
                        <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                      {order.items} {language === 'ar' ? 'منتج' : 'items'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
                      {order.total} {language === 'ar' ? 'ج.م' : 'EGP'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                      {getPaymentMethodText(order.paymentMethod)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}
                      >
                        {statusOptions.filter(s => s.id !== 'all').map(option => (
                          <option key={option.id} value={option.id}>
                            {language === 'ar' ? option.labelAr : option.labelEn}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-secondary">
                        <p>{order.date}</p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title={language === 'ar' ? 'حذف' : 'Delete'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
