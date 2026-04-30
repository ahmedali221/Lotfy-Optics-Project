import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  /** Force the modal to open on a specific tab */
  initialTab?: 'login' | 'register';
}

export function AuthModal({ onClose, onSuccess, initialTab = 'login' }: AuthModalProps) {
  const { language } = useLanguage();
  const { login, signup } = useAuth();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const extractApiError = (err: unknown): string | null => {
    const ax = err as { response?: { data?: Record<string, unknown> } };
    if (!ax.response) return null; // network error
    const data = ax.response.data;
    if (!data || typeof data !== 'object') return null;
    const first = Object.values(data).flat()[0];
    return typeof first === 'string' ? first : null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const ax = err as { message?: string; response?: { data?: Record<string, unknown> } };
      if (ax.message === 'staff') {
        setError(t('هذا الحساب مخصص للمشرفين', 'This account is for staff only'));
      } else if (!ax.response) {
        setError(t('تعذّر الاتصال بالخادم، تأكد من الاتصال وحاول مجدداً', 'Could not connect to server. Please try again.'));
      } else {
        setError(extractApiError(err) || t('بيانات غير صحيحة', 'Invalid credentials'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regName || !regPhone || !regEmail || !regPassword) {
      setError(t('يرجى تعبئة جميع الحقول', 'Please fill all fields'));
      return;
    }
    setLoading(true);
    try {
      await signup(regName, regPhone, regEmail, regPassword);
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const ax = err as { response?: { data?: Record<string, unknown> } };
      if (!ax.response) {
        setError(t('تعذّر الاتصال بالخادم، تأكد من الاتصال وحاول مجدداً', 'Could not connect to server. Please try again.'));
      } else {
        setError(extractApiError(err) || t('فشل إنشاء الحساب', 'Failed to create account'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {(['login', 'register'] as const).map((t_) => (
            <button
              key={t_}
              onClick={() => { setTab(t_); setError(''); }}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                tab === t_
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-secondary'
              }`}
            >
              {t_ === 'login' ? t('تسجيل الدخول', 'Sign In') : t('حساب جديد', 'Register')}
            </button>
          ))}
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('البريد الإلكتروني', 'Email')}</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('كلمة المرور', 'Password')}</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary pe-10"
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)} className="absolute inset-y-0 end-3 flex items-center text-muted-foreground">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {loading ? t('جارٍ...', 'Signing in...') : t('دخول', 'Sign In')}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                {t('ليس لديك حساب؟', "Don't have an account?")}{' '}
                <button type="button" onClick={() => setTab('register')} className="text-primary hover:underline">
                  {t('سجّل الآن', 'Register')}
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('الاسم', 'Full Name')}</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('الهاتف', 'Phone')}</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    required
                    placeholder="01xxxxxxxxx"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('البريد الإلكتروني', 'Email')}</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('كلمة المرور', 'Password')}</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary pe-10"
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)} className="absolute inset-y-0 end-3 flex items-center text-muted-foreground">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {loading ? t('جارٍ...', 'Creating account...') : t('إنشاء حساب', 'Create Account')}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                {t('لديك حساب؟', 'Already have an account?')}{' '}
                <button type="button" onClick={() => setTab('login')} className="text-primary hover:underline">
                  {t('سجّل دخولك', 'Sign In')}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
