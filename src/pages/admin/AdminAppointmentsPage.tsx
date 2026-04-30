import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Plus, Pencil, Trash2, Calendar, CheckCircle, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  branch: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const initialAppointments: Appointment[] = [
  { id: '#APT-001', patient: 'علي محمود', doctor: 'د. أحمد السيد', service: 'فحص شامل', date: '2026-04-25', time: '10:00 AM', branch: 'فريال', status: 'confirmed' },
  { id: '#APT-002', patient: 'نور الدين', doctor: 'د. سارة حسن', service: 'قياس نظر', date: '2026-04-25', time: '11:30 AM', branch: 'الحقوقيين', status: 'pending' },
  { id: '#APT-003', patient: 'ليلى أحمد', doctor: 'د. محمد علي', service: 'متابعة', date: '2026-04-26', time: '02:00 PM', branch: 'فريال', status: 'confirmed' },
  { id: '#APT-004', patient: 'يوسف عمر', doctor: 'د. أحمد السيد', service: 'تركيب عدسات', date: '2026-04-27', time: '09:00 AM', branch: 'الحقوقيين', status: 'cancelled' },
  { id: '#APT-005', patient: 'منى حسين', doctor: 'د. سارة حسن', service: 'فحص شامل', date: '2026-04-28', time: '03:30 PM', branch: 'فريال', status: 'pending' },
];

const emptyForm = (): Omit<Appointment, 'id'> => ({
  patient: '',
  doctor: '',
  service: '',
  date: '',
  time: '',
  branch: 'فريال',
  status: 'pending',
});

export function AdminAppointmentsPage() {
  const { language } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const statusOptions = [
    { id: 'all', ar: 'الكل', en: 'All' },
    { id: 'pending', ar: 'قيد الانتظار', en: 'Pending' },
    { id: 'confirmed', ar: 'مؤكد', en: 'Confirmed' },
    { id: 'cancelled', ar: 'ملغي', en: 'Cancelled' },
  ];

  const branches = [
    { id: 'all', ar: 'الكل', en: 'All' },
    { id: 'فريال', ar: 'فريال', en: 'Ferial' },
    { id: 'الحقوقيين', ar: 'الحقوقيين', en: 'Hoqoqyin' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return statusOptions.find(s => s.id === status)?.[language === 'ar' ? 'ar' : 'en'] || status;
  };

  const filtered = appointments.filter(a => {
    const matchesSearch =
      a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesBranch = branchFilter === 'all' || a.branch === branchFilter;
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (apt: Appointment) => {
    setEditingId(apt.id);
    const { id: _id, ...rest } = apt;
    setForm(rest);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.patient || !form.doctor || !form.date || !form.time) return;
    if (editingId) {
      setAppointments(prev => prev.map(a => a.id === editingId ? { ...form, id: editingId } : a));
    } else {
      const newId = `#APT-${String(appointments.length + 1).padStart(3, '0')}`;
      setAppointments(prev => [...prev, { ...form, id: newId }]);
    }
    setModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id !== id) return a;
      const next = a.status === 'confirmed' ? 'cancelled' : 'confirmed';
      return { ...a, status: next };
    }));
  };

  const handleDelete = () => {
    if (deleteId) {
      setAppointments(prev => prev.filter(a => a.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              {language === 'ar' ? 'إدارة المواعيد' : 'Appointments Management'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'إدارة ومتابعة جميع المواعيد' : 'Manage and track all appointments'}
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>{language === 'ar' ? 'موعد جديد' : 'New Appointment'}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: { ar: 'إجمالي المواعيد', en: 'Total' }, value: appointments.length, color: 'bg-blue-500' },
            { label: { ar: 'مؤكدة', en: 'Confirmed' }, value: appointments.filter(a => a.status === 'confirmed').length, color: 'bg-green-500' },
            { label: { ar: 'قيد الانتظار', en: 'Pending' }, value: appointments.filter(a => a.status === 'pending').length, color: 'bg-yellow-500' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-border flex items-center gap-4">
              <div className={`w-12 h-12 ${s.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-xl font-bold">{s.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{s.label[language]}</p>
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
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={language === 'ar' ? 'البحث بالاسم أو الطبيب...' : 'Search by patient or doctor...'}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full md:w-48 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statusOptions.map(o => (
                <option key={o.id} value={o.id}>{language === 'ar' ? o.ar : o.en}</option>
              ))}
            </select>
            <select
              value={branchFilter}
              onChange={e => setBranchFilter(e.target.value)}
              className="w-full md:w-48 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {branches.map(o => (
                <option key={o.id} value={o.id}>{language === 'ar' ? o.ar : o.en}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  {[
                    { ar: 'الرقم', en: 'ID' },
                    { ar: 'المريض', en: 'Patient' },
                    { ar: 'الطبيب', en: 'Doctor' },
                    { ar: 'الخدمة', en: 'Service' },
                    { ar: 'التاريخ والوقت', en: 'Date & Time' },
                    { ar: 'الفرع', en: 'Branch' },
                    { ar: 'الحالة', en: 'Status' },
                    { ar: 'الإجراءات', en: 'Actions' },
                  ].map((h, i) => (
                    <th key={i} className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase">
                      {language === 'ar' ? h.ar : h.en}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(apt => (
                  <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-secondary whitespace-nowrap">{apt.id}</td>
                    <td className="px-6 py-4 text-sm text-secondary whitespace-nowrap">{apt.patient}</td>
                    <td className="px-6 py-4 text-sm text-secondary whitespace-nowrap">{apt.doctor}</td>
                    <td className="px-6 py-4 text-sm text-secondary whitespace-nowrap">{apt.service}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-secondary">{apt.date}</p>
                      <p className="text-xs text-muted-foreground">{apt.time}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary whitespace-nowrap">{apt.branch}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(apt.status)}`}>
                        {getStatusText(apt.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(apt.id)}
                          className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                          title={language === 'ar' ? 'تبديل الحالة' : 'Toggle Status'}
                        >
                          {apt.status === 'confirmed'
                            ? <XCircle className="w-4 h-4" />
                            : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => openEdit(apt)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title={language === 'ar' ? 'تعديل' : 'Edit'}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(apt.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title={language === 'ar' ? 'حذف' : 'Delete'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>{language === 'ar' ? 'لا توجد مواعيد' : 'No appointments found'}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId
                ? (language === 'ar' ? 'تعديل الموعد' : 'Edit Appointment')
                : (language === 'ar' ? 'موعد جديد' : 'New Appointment')}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {[
              { field: 'patient' as const, ar: 'اسم المريض', en: 'Patient Name', type: 'text' },
              { field: 'doctor' as const, ar: 'الطبيب', en: 'Doctor', type: 'text' },
              { field: 'service' as const, ar: 'نوع الخدمة', en: 'Service Type', type: 'text' },
              { field: 'date' as const, ar: 'التاريخ', en: 'Date', type: 'date' },
              { field: 'time' as const, ar: 'الوقت', en: 'Time', type: 'time' },
            ].map(({ field, ar, en, type }) => (
              <div key={field} className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-secondary mb-1">
                  {language === 'ar' ? ar : en}
                </label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                {language === 'ar' ? 'الفرع' : 'Branch'}
              </label>
              <select
                value={form.branch}
                onChange={e => setForm(f => ({ ...f, branch: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="فريال">{language === 'ar' ? 'فريال' : 'Ferial'}</option>
                <option value="الحقوقيين">{language === 'ar' ? 'الحقوقيين' : 'Hoqoqyin'}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                {language === 'ar' ? 'الحالة' : 'Status'}
              </label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value as Appointment['status'] }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="pending">{language === 'ar' ? 'قيد الانتظار' : 'Pending'}</option>
                <option value="confirmed">{language === 'ar' ? 'مؤكد' : 'Confirmed'}</option>
                <option value="cancelled">{language === 'ar' ? 'ملغي' : 'Cancelled'}</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors"
            >
              {language === 'ar' ? 'حفظ' : 'Save'}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={open => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'ar' ? 'تأكيد الحذف' : 'Confirm Delete'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ar'
                ? 'هل أنت متأكد من حذف هذا الموعد؟ لا يمكن التراجع عن هذا الإجراء.'
                : 'Are you sure you want to delete this appointment? This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{language === 'ar' ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              {language === 'ar' ? 'حذف' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
